const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5283';

export async function apiFetch(
  path: string,
  options: RequestInit & { accessToken?: string } = {},
): Promise<Response> {
  const { accessToken, headers, ...rest } = options;

  return fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
  });
}

export async function checkApiHealth(): Promise<{ status: string } | null> {
  try {
    const response = await apiFetch('/health');
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as { status: string };
  } catch {
    return null;
  }
}
