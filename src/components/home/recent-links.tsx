"use client";

import { Clock, Link2, Trash2 } from "lucide-react";

import { CopyButton } from "@/components/shared/copy-button";
import { QrCodeDialog } from "@/components/shared/qr-code-dialog";
import type { RecentLink } from "@/features/links/types";
import { truncateUrl } from "@/utils/url";
import { Button } from "@/components/ui/button";

interface RecentLinksProps {
  links: RecentLink[];
  isHydrated: boolean;
  onClear: () => void;
}

function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function RecentLinks({ links, isHydrated, onClear }: RecentLinksProps) {
  if (!isHydrated || links.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="recent-links-heading" className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2
            id="recent-links-heading"
            className="font-heading text-lg font-semibold tracking-tight"
          >
            Recent links
          </h2>
          <p className="text-sm text-muted-foreground">
            Saved in this browser · last 10
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="rounded-lg text-muted-foreground"
          onClick={onClear}
        >
          <Trash2 className="size-3.5" />
          Clear
        </Button>
      </div>

      <div className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/70 bg-card">
        {links.map((link) => (
          <article
            key={link.shortCode}
            className="flex items-start justify-between gap-3 p-4 transition-colors hover:bg-muted/30"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Link2 className="size-3.5 shrink-0 text-brand" aria-hidden="true" />
                <a
                  href={link.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate font-mono text-sm text-brand hover:underline"
                >
                  {link.shortUrl}
                </a>
              </div>
              <p className="mt-1 truncate pl-5 text-xs text-muted-foreground">
                {truncateUrl(link.originalUrl, 56)}
              </p>
              <p className="mt-1.5 flex items-center gap-1 pl-5 text-[10px] uppercase tracking-wider text-muted-foreground">
                <Clock className="size-3" aria-hidden="true" />
                {formatRelativeTime(link.createdAt)}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <CopyButton value={link.shortUrl} size="icon" />
              <QrCodeDialog
                url={link.shortUrl}
                triggerClassName="rounded-lg border-border/70"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
