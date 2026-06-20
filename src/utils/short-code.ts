import { appConfig } from "@/lib/config";

const CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateShortCode(
  length: number = appConfig.shortCodeLength,
): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (byte) => CHARSET[byte % CHARSET.length]).join("");
}
