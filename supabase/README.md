# Supabase (PostgreSQL + Auth + RLS)

Database migrations and local Supabase configuration for CabinConnect.

## Local development

Requires [Docker](https://docs.docker.com/get-docker/) and the [Supabase CLI](https://supabase.com/docs/guides/cli).

```bash
# From repository root
npx supabase start
npx supabase status   # copy URL and keys into appsettings.Development.json and src/frontend/.env.local
```

## Migrations

Add SQL migrations under `supabase/migrations/`. Every table must have RLS enabled before production.

```bash
npx supabase migration new <description>
npx supabase db reset   # apply locally (destructive)
```

## API keys

| Key | Format | Where |
|---|---|---|
| Publishable | `sb_publishable_*` | Frontend (`VITE_SUPABASE_PUBLISHABLE_KEY`) |
| Secret | `sb_secret_*` | Backend only (`Supabase:SecretKey`) |

Legacy JWT `anon` / `service_role` keys still work during Supabase’s migration period. See [ai-dlc/guidelines/supabase-api-keys.md](../ai-dlc/guidelines/supabase-api-keys.md).

## Security

- **Publishable key** — safe in the browser only when RLS policies are correct; never use a secret key client-side
- **Secret key** — backend only; bypasses RLS; forbidden in browsers (HTTP 401)
- Enable RLS on every table; policies must scope data by community/resort (see NF-03 in requirements)
