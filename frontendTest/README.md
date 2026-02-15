# Language Archive Frontend

React + TypeScript frontend for the Language Archive web app.

## Requirements

- Node.js 20+ (Node 24 also works)
- npm 10+

## Local Development

```bash
npm install
npm run dev
```

Vite starts on `http://localhost:8080`.

## Quality Checks

```bash
npm run lint
npm run test
npm run build
```

## Notes for Backend Integration

- Keep API calls behind a configurable base URL (for example `VITE_API_BASE_URL`).
- Confirm Firebase auth flow with backend before wiring protected routes.
- Keep request/response contracts in shared documentation so frontend and backend stay aligned.
