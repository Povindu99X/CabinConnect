# Security Rules

## Never Do These
- Never commit secrets, API keys, or connection strings — use environment variables or a secrets manager
- Never trust client-supplied IDs without verifying ownership server-side
- Never expose internal stack traces or error details to the client
- Never use raw string concatenation to build SQL queries
- Never disable CSRF protection or CORS wildcard (`*`) in production
- Never store passwords in plain text or with weak hashing (MD5/SHA1)
- Never log personally identifiable information (PII) or sensitive user data
- Never allow unrestricted file uploads — validate type, size, and scan for malware

## Always Do These
- Validate and sanitize all input at the API boundary
- Enforce row-level security (RLS) on all Supabase tables
- Use parameterized queries / ORM for all database interactions
- Authenticate every API endpoint — no unauthenticated routes unless explicitly public
- Apply the principle of least privilege to database roles and service accounts
- Use HTTPS everywhere; reject HTTP in production
- Rate-limit authentication endpoints to prevent brute-force attacks
- Rotate secrets immediately if accidentally exposed

## Supabase-Specific
- Enable RLS on every table before going to production
- Use Supabase Auth for all user identity — do not roll your own auth
- **Secret key** (`sb_secret_*`) or legacy **service_role** must never be used client-side — browsers receive HTTP 401
- **Publishable key** (`sb_publishable_*`) or legacy **anon** is safe in the client only when RLS policies are correct
- Do not put publishable/secret keys in the `Authorization` header — only the user's Auth JWT belongs there
- Prefer new publishable/secret keys; migrate off legacy JWT platform keys before Supabase retires them (see [guidelines/supabase-api-keys.md](../guidelines/supabase-api-keys.md))

## Dependency Management
- Run `npm audit` and `dotnet list package --vulnerable` in CI
- Pin major versions; review breaking changes before upgrading
- Remove unused packages promptly
