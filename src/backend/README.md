# CabinConnect Backend

.NET 8 Web API. Business logic and data access live here; Supabase provides PostgreSQL, auth (JWT), and RLS.

## Setup

```bash
cp CabinConnect.Api/appsettings.Development.json.example CabinConnect.Api/appsettings.Development.json
# Edit Supabase URL, PublishableKey, SecretKey, and replace [YOUR-PASSWORD] in DefaultConnection

dotnet restore CabinConnect.sln
dotnet run --project CabinConnect.Api
```

Health check: `http://localhost:5283/health`

## Structure

```
CabinConnect.Api/          # HTTP API, controllers, configuration
  Configuration/           # Options classes (e.g. Supabase)
  Controllers/             # API endpoints
```

Future layers (Domain, Infrastructure) will be added as features are built from requirements.
