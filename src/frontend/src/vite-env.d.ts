/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_SUPABASE_URL: string;
  /** sb_publishable_* (preferred) */
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
  /** @deprecated Legacy anon JWT — use VITE_SUPABASE_PUBLISHABLE_KEY */
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
