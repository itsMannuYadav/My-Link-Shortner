import { notFound, redirect } from "next/navigation";

import {
  getLinkByShortCode,
  incrementClicks,
  isReservedRoute,
} from "@/services/link.service";

interface PageProps {
  params: Promise<{ shortCode: string }>;
}

export default async function RedirectPage({ params }: PageProps) {
  const { shortCode } = await params;

  if (isReservedRoute(shortCode)) {
    notFound();
  }

  const link = await getLinkByShortCode(shortCode);

  if (!link) {
    notFound();
  }

  // Fire-and-forget — don't block the redirect on the DB write
  incrementClicks(shortCode).catch(() => {});

  redirect(link.originalUrl);
}
