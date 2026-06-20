export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("URL is required");
  }

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  let parsed: URL;
  try {
    parsed = new URL(withProtocol);
  } catch {
    throw new Error("Please enter a valid URL");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only http and https URLs are supported");
  }

  if (!parsed.hostname) {
    throw new Error("Please enter a valid URL");
  }

  return parsed.toString();
}

export function isValidUrl(input: string): boolean {
  try {
    normalizeUrl(input);
    return true;
  } catch {
    return false;
  }
}

export function truncateUrl(url: string, maxLength = 48): string {
  if (url.length <= maxLength) return url;
  return `${url.slice(0, maxLength - 3)}...`;
}
