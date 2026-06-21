const WP_URL = process.env.WORDPRESS_URL ?? "";

export function isWpConfigured(): boolean {
  return Boolean(WP_URL);
}

// Converts ACF date picker format "Ymd" (e.g. "20260602") to ISO "YYYY-MM-DD".
export function parseAcfDate(d: string): string {
  if (/^\d{8}$/.test(d)) return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
  return d;
}

export async function wpQuery<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.WORDPRESS_API_KEY) {
    headers["Authorization"] = `Bearer ${process.env.WORDPRESS_API_KEY}`;
  }

  const revalidate = Number(process.env.NEXT_REVALIDATE_TTL ?? "60");

  const res = await fetch(`${WP_URL}/graphql`, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });

  if (!res.ok) throw new Error(`WP GraphQL HTTP ${res.status}`);

  const json = (await res.json()) as {
    data: T;
    errors?: { message: string }[];
  };
  if (json.errors?.length) throw new Error(json.errors[0].message);

  return json.data;
}
