# FE ↔ BE Contract Testing

This directory holds the contract between frontend and backend.

## Files

| File | Purpose |
|------|---------|
| `openapi-spec.json` | Backend OpenAPI spec (Springdoc auto-generated). The source of truth. |
| `api-types.ts` | Auto-generated TypeScript types from the spec. |
| `../scripts/validate-contract.py` | Validates every `fetch()` call in `src/` matches a backend endpoint. |
| `../scripts/generate-types.py` | Generates `api-types.ts` from the spec. |

## Workflow

### Refresh the spec (after backend changes)
```bash
npm run contract:refresh
```
Starts the backend with H2, fetches `/v3/api-docs`, saves to `contracts/openapi-spec.json`.

### Validate frontend matches the spec
```bash
npm run contract:validate
```
Scans all `*Api.ts`, `*DetailPage.tsx`, `*Page.tsx` files in `src/`, extracts every `fetch()` call, checks it exists in the spec. Exit code 0 = all match.

### Generate TypeScript types
```bash
npm run contract:types
```
Generates `api-types.ts` from the spec. Use these types in FE code to stay in sync with BE DTOs.

## When to run

- After adding/removing a backend controller endpoint → `npm run contract:refresh && npm run contract:types`
- After changing frontend API calls → `npm run contract:validate`
- In CI → run `npm run contract:validate` to catch breaks
