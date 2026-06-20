import {
  ALIAS_MAX_LENGTH,
  ALIAS_MIN_LENGTH,
  ALIAS_REGEX,
  RESERVED_ROUTES,
} from "@/features/links/constants";
import type { LinkRecord, ShortenLinkInput, ShortenLinkResult } from "@/features/links/types";
import { getShortUrl } from "@/lib/config";
import { prisma } from "@/lib/prisma";
import { generateShortCode } from "@/utils/short-code";
import { normalizeUrl } from "@/utils/url";

const MAX_COLLISION_ATTEMPTS = 10;

export class LinkServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status: number = 400,
  ) {
    super(message);
    this.name = "LinkServiceError";
  }
}

function validateAlias(alias: string): string {
  const normalized = alias.trim();

  if (!normalized) {
    throw new LinkServiceError("Custom alias is required", "INVALID_ALIAS");
  }

  if (normalized.length < ALIAS_MIN_LENGTH) {
    throw new LinkServiceError(
      `Alias must be at least ${ALIAS_MIN_LENGTH} characters`,
      "INVALID_ALIAS",
    );
  }

  if (normalized.length > ALIAS_MAX_LENGTH) {
    throw new LinkServiceError(
      `Alias must be at most ${ALIAS_MAX_LENGTH} characters`,
      "INVALID_ALIAS",
    );
  }

  if (!ALIAS_REGEX.test(normalized)) {
    throw new LinkServiceError(
      "Alias can only contain letters, numbers, hyphens, and underscores",
      "INVALID_ALIAS",
    );
  }

  if (RESERVED_ROUTES.has(normalized.toLowerCase())) {
    throw new LinkServiceError(
      "This alias is reserved and cannot be used",
      "RESERVED_ALIAS",
    );
  }

  return normalized;
}

async function generateUniqueShortCode(): Promise<string> {
  for (let attempt = 0; attempt < MAX_COLLISION_ATTEMPTS; attempt++) {
    const shortCode = generateShortCode();
    const existing = await prisma.link.findUnique({
      where: { shortCode },
      select: { id: true },
    });

    if (!existing) {
      return shortCode;
    }
  }

  throw new LinkServiceError(
    "Unable to generate a unique short code. Please try again.",
    "CODE_GENERATION_FAILED",
    500,
  );
}

function toShortenResult(link: LinkRecord): ShortenLinkResult {
  return {
    shortCode: link.shortCode,
    shortUrl: getShortUrl(link.shortCode),
    originalUrl: link.originalUrl,
    createdAt: link.createdAt.toISOString(),
  };
}

export async function shortenLink(
  input: ShortenLinkInput,
): Promise<ShortenLinkResult> {
  const originalUrl = normalizeUrl(input.url);
  const shortCode = input.alias
    ? validateAlias(input.alias)
    : await generateUniqueShortCode();

  if (input.alias) {
    const existing = await prisma.link.findUnique({
      where: { shortCode },
      select: { id: true },
    });

    if (existing) {
      throw new LinkServiceError(
        "This alias is already taken. Try another one.",
        "DUPLICATE_ALIAS",
        409,
      );
    }
  }

  try {
    const link = await prisma.link.create({
      data: {
        shortCode,
        originalUrl,
      },
    });

    return toShortenResult(link);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint")
    ) {
      throw new LinkServiceError(
        "This alias is already taken. Try another one.",
        "DUPLICATE_ALIAS",
        409,
      );
    }

    throw new LinkServiceError(
      "Something went wrong while saving your link.",
      "DATABASE_ERROR",
      500,
    );
  }
}

export async function getLinkByShortCode(
  shortCode: string,
): Promise<LinkRecord | null> {
  return prisma.link.findUnique({
    where: { shortCode },
  });
}

export async function getRecentLinks(limit = 10): Promise<LinkRecord[]> {
  return prisma.link.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export function isReservedRoute(segment: string): boolean {
  return RESERVED_ROUTES.has(segment.toLowerCase());
}
