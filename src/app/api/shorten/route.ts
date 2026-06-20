import { NextResponse } from "next/server";

import type { ShortenLinkInput } from "@/features/links/types";
import { LinkServiceError, shortenLink } from "@/services/link.service";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ShortenLinkInput>;

    if (!body.url || typeof body.url !== "string") {
      return NextResponse.json(
        { error: "URL is required", code: "INVALID_URL" },
        { status: 400 },
      );
    }

    const result = await shortenLink({
      url: body.url,
      alias: typeof body.alias === "string" ? body.alias : undefined,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof LinkServiceError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.status },
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request body", code: "INVALID_JSON" },
        { status: 400 },
      );
    }

    console.error("[POST /api/shorten]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred", code: "INTERNAL_ERROR" },
      { status: 500 },
    );
  }
}
