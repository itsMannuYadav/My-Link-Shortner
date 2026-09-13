import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart2,
  Calendar,
  Clock,
  ExternalLink,
  MousePointerClick,
  TrendingUp,
} from "lucide-react";
import { notFound } from "next/navigation";

import { getLinkByShortCode } from "@/services/link.service";
import { appConfig, getShortUrl } from "@/lib/config";
import { CopyButton } from "@/components/shared/copy-button";
import { QrCodeDialog } from "@/components/shared/qr-code-dialog";

interface PageProps {
  params: Promise<{ shortCode: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { shortCode } = await params;
  return {
    title: `Stats for /${shortCode}`,
    robots: { index: false, follow: false },
  };
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function daysActive(createdAt: Date): number {
  return Math.max(1, Math.floor((Date.now() - createdAt.getTime()) / 86_400_000));
}

export default async function StatsPage({ params }: PageProps) {
  const { shortCode } = await params;
  const link = await getLinkByShortCode(shortCode);

  if (!link) notFound();

  const shortUrl = getShortUrl(shortCode);
  const days = daysActive(link.createdAt);
  const avgPerDay = (link.clicks / days).toFixed(1);

  const statCards = [
    {
      icon: MousePointerClick,
      label: "Total clicks",
      value: link.clicks.toLocaleString(),
    },
    {
      icon: Clock,
      label: "Days active",
      value: String(days),
    },
    {
      icon: TrendingUp,
      label: "Avg / day",
      value: avgPerDay,
    },
  ];

  return (
    <div className="min-h-[80vh] bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-lg text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to {appConfig.name}
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <BarChart2 className="size-4 text-brand" aria-hidden="true" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
              Link analytics
            </p>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            /{shortCode}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Stats are updated in real time on every redirect.
          </p>
        </div>

        {/* Stat cards */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-border/70 bg-card p-5"
            >
              <div className="mb-2 flex items-center gap-1.5 text-muted-foreground">
                <card.icon className="size-3.5" aria-hidden="true" />
                <span className="text-xs uppercase tracking-wider">{card.label}</span>
              </div>
              <p className="font-heading text-3xl font-bold tabular-nums text-foreground">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Link detail card */}
        <div className="space-y-5 rounded-2xl border border-border/70 bg-card p-6">
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Short URL
            </p>
            <div className="flex items-center gap-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 truncate font-mono text-sm text-brand hover:underline"
              >
                {shortUrl}
              </a>
              <CopyButton value={shortUrl} size="sm" />
              <QrCodeDialog url={shortUrl} shortCode={shortCode} />
            </div>
          </div>

          <div className="border-t border-border/60 pt-5">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Destination
            </p>
            <a
              href={link.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-2 break-all text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="flex-1">{link.originalUrl}</span>
              <ExternalLink className="mt-0.5 size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </div>

          <div className="flex items-center gap-1.5 border-t border-border/60 pt-5 text-xs text-muted-foreground">
            <Calendar className="size-3.5" aria-hidden="true" />
            Created {formatDate(link.createdAt)}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/#shortener"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-brand-foreground transition-all hover:brightness-110"
          >
            Shorten another link
          </Link>
          <p className="text-sm text-muted-foreground">
            Free · No account needed · Unlimited links
          </p>
        </div>
      </div>
    </div>
  );
}
