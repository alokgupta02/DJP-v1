#!/usr/bin/env python3
"""
Generate TypeScript type definitions from the backend OpenAPI spec.
Output: contracts/api-types.ts

This ensures FE types stay in sync with BE DTOs.
"""

import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
SPEC_PATH = ROOT / "contracts" / "openapi-spec.json"
OUTPUT_PATH = ROOT / "contracts" / "api-types.ts"

TYPE_MAP = {
    "string": "string",
    "integer": "number",
    "number": "number",
    "boolean": "boolean",
    "array": "unknown[]",
    "object": "Record<string, unknown>",
}

SKIP_PREFIXES = ("ApiResponse", "PaginationMeta", "ValidationError")


def to_pascal(s):
    return "".join(word.capitalize() for word in re.split(r'[_\s-]+', s))


def to_camel(s):
    parts = re.split(r'[_\s-]+', s)
    return parts[0].lower() + "".join(p.capitalize() for p in parts[1:])


def resolve_ref(ref, schemas):
    """Resolve $ref to schema name."""
    name = ref.split("/")[-1]
    return schemas.get(name, {})


def render_type(props, required, schemas, indent=2):
    """Render a TS interface body."""
    lines = []
    for name, prop in props.items():
        ts_name = to_camel(name)
        req = name in (required or [])
        optional = "" if req else "?"
        ts_type = resolve_ts_type(prop, schemas)
        lines.append(f"{' ' * indent}{ts_name}{optional}: {ts_type};")
    return "\n".join(lines)


def resolve_ts_type(schema, schemas, depth=0):
    if depth > 5:
        return "unknown"

    if "$ref" in schema:
        ref_name = schema["$ref"].split("/")[-1]
        s = schemas.get(ref_name, {})
        if s.get("type") == "object" or "properties" in s:
            return to_pascal(ref_name)
        return resolve_ts_type(s, schemas, depth + 1)

    if schema.get("type") == "array":
        items = schema.get("items", {})
        item_type = resolve_ts_type(items, schemas, depth + 1)
        return f"{item_type}[]"

    if schema.get("type") == "object" or "properties" in schema:
        props = schema.get("properties", {})
        required = schema.get("required", [])
        if not props:
            return "Record<string, unknown>"
        fields = []
        for name, prop in props.items():
            ts_name = to_camel(name)
            req = name in required
            optional = "" if req else "?"
            ts_type = resolve_ts_type(prop, schemas, depth + 1)
            fields.append(f"{ts_name}{optional}: {ts_type}")
        return "{\n        " + ";\n        ".join(fields) + ";\n      }"

    if "oneOf" in schema:
        return " | ".join(resolve_ts_type(s, schemas, depth + 1) for s in schema["oneOf"])

    if "enum" in schema:
        return " | ".join(f'"{v}"' for v in schema["enum"])

    fmt = schema.get("format", "")
    t = schema.get("type", "string")

    if t == "string" and fmt == "date-time":
        return "string"
    if t == "integer":
        return "number"
    return TYPE_MAP.get(t, "string")


def generate():
    spec = json.loads(SPEC_PATH.read_text())
    schemas = spec.get("components", {}).get("schemas", {})

    lines = [
        "// Auto-generated from backend OpenAPI spec. Do not edit manually.",
        "// Run: python3 scripts/generate-types.py",
        f"// Source: {SPEC_PATH.name}",
        "",
    ]

    for name, schema in schemas.items():
        if any(name.startswith(p) for p in SKIP_PREFIXES):
            continue

        props = schema.get("properties", {})
        required = schema.get("required", [])
        if not props:
            continue

        ts_name = to_pascal(name)
        lines.append(f"export interface {ts_name} {{")
        lines.append(render_type(props, required, schemas))
        lines.append("}")
        lines.append("")

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text("\n".join(lines))
    print(f"Generated {OUTPUT_PATH} ({len(schemas)} schemas processed)")


if __name__ == "__main__":
    generate()
