const DEFAULT_APP_URL = "http://localhost:3000";

export const appConfig = {
  name: "My Link",
  fullName: "My Link Shortner",
  tagline: "Create short, clean and shareable links instantly.",
  description:
    "Shorten long URLs instantly with My Link. Create clean, shareable links with custom aliases, QR codes, and lightning-fast redirects.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? DEFAULT_APP_URL,
  shortCodeLength: 6,
  recentLinksLimit: 10,
} as const;

export function getShortUrl(shortCode: string): string {
  const base = appConfig.url.replace(/\/$/, "");
  return `${base}/${shortCode}`;
}
