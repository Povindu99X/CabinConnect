# CabinConnect Frontend

React 18 + TypeScript SPA. Uses Supabase client with the **publishable key** (`sb_publishable_*`) for auth tokens only; all data mutations go through the .NET API.

## Setup

```bash
cp .env.example .env.local
# Edit .env.local — match API port in ../backend/CabinConnect.Api/Properties/launchSettings.json

npm install
npm run dev
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite dev server (default http://localhost:5173) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
