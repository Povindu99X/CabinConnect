# Supabase API Keys — CabinConnect

Supabase is replacing long-lived JWT-based **anon** and **service_role** platform keys with **publishable** and **secret** keys. CabinConnect uses the new names in config; legacy keys remain supported until you remove them.

## Key mapping

| New (preferred) | Legacy (migration) | Privilege | CabinConnect usage |
|---|---|---|---|
| `sb_publishable_*` | `anon` (JWT) | Low | React app — auth session + realtime only |
| `sb_secret_*` | `service_role` (JWT) | Elevated | .NET API — server-side only, never in browser |

## Configuration

**Backend** (`appsettings.Development.json`, gitignored):

```json
"Supabase": {
  "Url": "https://<ref>.supabase.co",
  "PublishableKey": "sb_publishable_...",
  "SecretKey": "sb_secret_..."
}
```

**Frontend** (`.env.local`, gitignored):

```
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

`SupabaseOptions.ResolvedPublishableKey` / `ResolvedSecretKey` pick the new key when set, otherwise fall back to legacy names.

## Auth vs API keys

- **User JWTs** (from Supabase Auth) still go in the `Authorization` header for the .NET API — unchanged.
- **Publishable/secret keys** are not JWTs — do not put them in `Authorization`; the Supabase JS client sends them via `apikey` as today.
- The .NET API validates user JWTs via JWKS at `{Supabase.Url}/auth/v1` (ADR-005).

## Migration timeline (Supabase)

| When | Action |
|---|---|
| Now (preview) | Opt in via Dashboard; use new keys in this repo |
| Nov 2025+ | Legacy keys dropped on new/restored projects — migrate before then |
| Late 2026 (TBC) | Legacy keys removed — required migration |

## References

- [Supabase discussion: new API keys](https://github.com/orgs/supabase/discussions)
- [ai-dlc/rules/security.md](../rules/security.md)
