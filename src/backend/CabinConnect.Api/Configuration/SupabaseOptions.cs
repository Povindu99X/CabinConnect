namespace CabinConnect.Api.Configuration;

/// <summary>
/// Supabase project settings. Prefer <see cref="PublishableKey"/> and <see cref="SecretKey"/>
/// (sb_publishable_* / sb_secret_*). Legacy <see cref="AnonKey"/> and <see cref="ServiceRoleKey"/>
/// remain supported until Supabase removes JWT-based platform keys (planned late 2026).
/// </summary>
public sealed class SupabaseOptions
{
    public const string SectionName = "Supabase";

    public string Url { get; set; } = string.Empty;

    /// <summary>sb_publishable_* — safe for clients when RLS is correct.</summary>
    public string PublishableKey { get; set; } = string.Empty;

    /// <summary>sb_secret_* — backend only; bypasses RLS. Never expose to browsers.</summary>
    public string SecretKey { get; set; } = string.Empty;

    /// <summary>Legacy JWT anon key (optional during migration).</summary>
    public string AnonKey { get; set; } = string.Empty;

    /// <summary>Legacy JWT service_role key (optional during migration).</summary>
    public string ServiceRoleKey { get; set; } = string.Empty;

    /// <summary>Key for Supabase client libraries (publishable preferred).</summary>
    public string ResolvedPublishableKey =>
        FirstNonEmpty(PublishableKey, AnonKey);

    /// <summary>Key for elevated server-side Supabase access (secret preferred).</summary>
    public string ResolvedSecretKey =>
        FirstNonEmpty(SecretKey, ServiceRoleKey);

    private static string FirstNonEmpty(params string[] values)
    {
        foreach (var value in values)
        {
            if (!string.IsNullOrWhiteSpace(value))
            {
                return value;
            }
        }

        return string.Empty;
    }
}
