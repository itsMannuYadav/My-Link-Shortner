import { notFound, redirect } from "next/navigation";

import {
  getLinkByShortCode,
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

  redirect(link.originalUrl);
}
