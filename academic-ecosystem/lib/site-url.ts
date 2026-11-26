/**
 * The canonical site address, resolved in this order:
 *   1. NEXT_PUBLIC_SITE_URL – set this in Vercel once the custom domain is live.
 *   2. VERCEL_PROJECT_PRODUCTION_URL – provided by Vercel automatically.
 *   3. http://localhost:3000 – local development.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export function absoluteUrl(path = "/"): string {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
