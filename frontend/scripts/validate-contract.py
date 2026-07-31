#!/usr/bin/env python3
"""
Contract Validation: Frontend API calls vs Backend OpenAPI spec.

Usage:
  python3 scripts/validate-contract.py
  python3 scripts/validate-contract.py --refresh-spec

Exit code 0 = all endpoints match, 1 = mismatches found.
"""

import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SPEC_PATH = ROOT / "contracts" / "openapi-spec.json"

# Patterns for all fetch() call styles found in FE *Api.ts files
# Pattern A: fetch("/djp/api/v1/issues")
# Pattern B: fetch(`${BASE_URL}/issues`)  where BASE_URL="/djp/api/v1"
# Pattern C: fetch(`${BASE_URL}/${id}/read`, { method: "POST" })
# Pattern D: fetch(`/djp/api/v1/users/${userId}/onboarding`, { method: "PATCH" })

def load_spec():
    if not SPEC_PATH.exists():
        print(f"ERROR: OpenAPI spec not found at {SPEC_PATH}")
        print("Run: python3 scripts/validate-contract.py --refresh-spec")
        sys.exit(1)
    return json.loads(SPEC_PATH.read_text())


def refresh_spec():
    print("Starting backend to refresh OpenAPI spec...")
    backend_dir = ROOT.parent / "backend"
    proc = subprocess.Popen(
        [
            "mvn", "spring-boot:run",
            "-Dspring-boot.run.profiles=local",
            "-Dspring-boot.run.jvmArguments="
            "-Dspring.datasource.url=jdbc:h2:mem:djpdb;MODE=PostgreSQL "
            "-Dspring.datasource.driver-class-name=org.h2.Driver "
            "-Dspring.jpa.hibernate.ddl-auto=update "
            "-Dspring.jpa.database-platform=org.hibernate.dialect.H2Dialect "
            "-Dspring.flyway.enabled=false "
            "-Dapp.persistence.sql-file.enabled=false",
        ],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, cwd=str(backend_dir),
    )
    try:
        time.sleep(25)
        import urllib.request
        resp = urllib.request.urlopen("http://localhost:8081/v3/api-docs", timeout=10)
        spec = json.loads(resp.read())
        SPEC_PATH.parent.mkdir(parents=True, exist_ok=True)
        SPEC_PATH.write_text(json.dumps(spec, indent=2))
        print(f"Saved {SPEC_PATH} ({len(spec.get('paths', {}))} paths)")
    finally:
        proc.terminate()
        proc.wait(timeout=10)


def extract_fetch_calls(text):
    """Extract (method, url_template) pairs from a source file."""
    calls = []
    # Find all fetch() calls spanning multiple lines
    lines = text.split("\n")
    i = 0
    while i < len(lines):
        line = lines[i]
        if "fetch(" not in line:
            i += 1
            continue

        # Collect the full block including nested parens
        block = line
        depth = line.count("(") - line.count(")")
        j = i + 1
        while j < len(lines) and depth > 0:
            block += "\n" + lines[j]
            depth += lines[j].count("(") - lines[j].count(")")
            j += 1
        if depth > 0:
            block += ")"
        i = j  # skip consumed lines

        # Skip non-API fetch calls (not targeting /djp)
        if "/djp/" not in block and "BASE_URL" not in block:
            continue

        # Extract method (default GET)
        method = "GET"
        m = re.search(r'method:\s*["\'](\w+)["\']', block)
        if m:
            method = m.group(1).upper()

        # Extract URL from the fetch() call
        # Template literal: fetch(`...`)
        url_match = re.search(r'fetch\(\s*`([^`]+)`', block)
        if not url_match:
            # String literal: fetch("...")
            url_match = re.search(r'fetch\(\s*"([^"]+)"', block)
        if not url_match:
            # Single-quote string
            url_match = re.search(r"fetch\(\s*'([^']+)'", block)

        if url_match:
            raw = url_match.group(1)
        else:
            continue

        # Skip non-API URLs
        if not raw.startswith("/djp/") and "BASE_URL" not in raw:
            continue

        # Resolve BASE_URL placeholder
        if "BASE_URL" in raw:
            # Look for const BASE_URL = "..."
            m2 = re.search(r'const\s+BASE_URL\s*=\s*["\']([^"\']+)["\']', text)
            if m2:
                base = m2.group(1)
                raw = raw.replace("${BASE_URL}", base).replace("BASE_URL", base)

        # Replace template variables like ${userId}, ${id}, ${petitionId} with {id}
        normalized = re.sub(r'\$\{[^}]+\}', '{id}', raw)
        # Remove query params for endpoint matching (keep path only)
        normalized = re.sub(r'\?.*', '', normalized)
        # Ensure leading /
        if not normalized.startswith("/"):
            normalized = "/" + normalized

        calls.append((method, normalized))

    return calls


def get_fe_endpoints():
    """Extract all FE fetch() endpoints grouped by file."""
    endpoints = []
    extensions = ("*Api.ts", "*DetailPage.tsx", "*Page.tsx")
    for pattern in ("**/*Api.ts", "**/*DetailPage.tsx", "**/*Page.tsx"):
        for fpath in sorted(Path(ROOT / "src").rglob(pattern)):
            rel = str(fpath.relative_to(ROOT))
            calls = extract_fetch_calls(fpath.read_text())
            for method, url in calls:
                endpoints.append((rel, method, url))
    return endpoints


def normalize_path_param_names(path):
    """Normalize all path parameter names to {id} for comparison."""
    return re.sub(r'\{[^}]+\}', '{id}', path)


def validate(spec, fe_endpoints):
    paths = spec.get("paths", {})
    # Build lookup: (method, normalized_path_pattern) -> original_path
    spec_map = {}
    for p, methods in paths.items():
        norm_p = normalize_path_param_names(p)
        for method in methods:
            spec_map[(method.upper(), norm_p)] = p

    all_spec_norm_paths = set(norm for _, norm in spec_map.keys())

    errors = []
    passes = []

    for file_path, method, url in fe_endpoints:
        norm = url.rstrip("/")
        fe_norm = normalize_path_param_names(norm)

        # Direct match using normalized param names
        key = (method, fe_norm)
        alt_key = (method, re.sub(r'^/djp/api/v1', '', fe_norm))

        if key in spec_map:
            spec_orig = spec_map[key]
            passes.append((method, spec_orig, file_path))
            all_spec_norm_paths.discard(fe_norm)
            continue

        if alt_key in spec_map:
            spec_orig = spec_map[alt_key]
            passes.append((method, spec_orig, file_path))
            all_spec_norm_paths.discard(alt_key)
            continue

        # Check if path exists with wrong method
        matching_paths = [p for (m, p) in spec_map if p == fe_norm]
        if matching_paths:
            methods_on_path = sorted({m for (m, p) in spec_map if p == fe_norm})
            errors.append((method, norm, file_path, f"exists with method(s): {methods_on_path}"))
        else:
            errors.append((method, norm, file_path, "not found in spec"))

    print(f"\n{'='*60}")
    print(f"  FE ↔ BE Contract Validation")
    print(f"{'='*60}")
    print(f"\n  Spec paths: {len(paths)}")
    print(f"  FE fetch() calls: {len(fe_endpoints)}")
    print(f"\n  ✅ Matched endpoints:")
    for m, p, f in passes:
        print(f"    {m:6s} {p:45s} ({f})")

    if errors:
        print(f"\n  ❌ Errors:")
        for m, p, f, reason in errors:
            print(f"    {m:6s} {p:45s} ({f})")
            print(f"         └─ {reason}")

    if all_spec_norm_paths:
        print(f"\n  📋 Spec paths not directly called by FE (may be consumed indirectly):")
        seen = set()
        for norm in sorted(all_spec_norm_paths):
            for (m, n), o in sorted(spec_map.items()):
                if n == norm and o not in seen:
                    print(f"    {m:6s} {o}")
                    seen.add(o)

    print(f"\n{'='*60}")
    if errors:
        print(f"  RESULT: FAIL ({len(errors)} error(s))")
        return False
    print(f"  RESULT: PASS ({len(passes)} matches, {len(all_spec_norm_paths)} paths not directly called)")
    return True


def main():
    if "--refresh-spec" in sys.argv:
        refresh_spec()

    spec = load_spec()
    fe_endpoints = get_fe_endpoints()

    # Deduplicate
    seen = set()
    unique = []
    for ep in fe_endpoints:
        key = (ep[1], ep[2])
        if key not in seen:
            seen.add(key)
            unique.append(ep)

    success = validate(spec, unique)
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
