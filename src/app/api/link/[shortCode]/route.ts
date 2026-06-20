import { NextResponse } from "next/server";

import { getShortUrl } from "@/lib/config";
import {
  getLinkByShortCode,
  isReservedRoute,
} from "@/services/link.service";

interface RouteContext {
  params: Promise<{ shortCode: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { shortCode } = await context.params;

    if (isReservedRoute(shortCode)) {
      return NextResponse.json(
        { error: "Link not found", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    const link = await getLinkByShortCode(shortCode);

    if (!link) {
      return NextResponse.json(
        { error: "Link not found", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      shortCode: link.shortCode,
      shortUrl: getShortUrl(link.shortCode),
      originalUrl: link.originalUrl,
      createdAt: link.createdAt.toISOString(),
    });
  } catch (error) {
    console.error("[GET /api/link/[shortCode]]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred", code: "INTERNAL_ERROR" },
      { status: 500 },
    );
  }
}
