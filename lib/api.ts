const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Params = Record<string, string | undefined>;

export async function apiGet<T>(path: string, params: Params = {}): Promise<T> {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, value);
  }
  const qs = query.toString();

  const res = await fetch(`${BASE_URL}${path}${qs ? `?${qs}` : ""}`);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed (${res.status})`);
  }
  return res.json();
}