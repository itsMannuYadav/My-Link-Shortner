"use client";

import { Clock, Link2, Trash2 } from "lucide-react";

import { CopyButton } from "@/components/shared/copy-button";
import { QrCodeDialog } from "@/components/shared/qr-code-dialog";
import type { RecentLink } from "@/features/links/types";
import { truncateUrl } from "@/utils/url";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  if (!isHydrated) {
    return null;
  }

  if (links.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="recent-links-heading" className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2
            id="recent-links-heading"
            className="text-xl font-semibold tracking-tight"
          >
            Recent Links
          </h2>
          <p className="text-sm text-muted-foreground">
            Your last 10 links, saved locally in this browser.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="rounded-full text-muted-foreground"
          onClick={onClear}
        >
          <Trash2 className="size-3.5" />
          Clear
        </Button>
      </div>

      <div className="space-y-3">
        {links.map((link) => (
          <Card
            key={link.shortCode}
            className="border-border/60 transition-colors hover:border-indigo-500/20"
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-1">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Link2
                      className="size-4 shrink-0 text-indigo-500"
                      aria-hidden="true"
                    />
                    <a
                      href={link.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate font-mono text-sm hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      {link.shortUrl}
                    </a>
                  </CardTitle>
                  <CardDescription className="truncate">
                    {truncateUrl(link.originalUrl, 64)}
                  </CardDescription>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <CopyButton value={link.shortUrl} size="icon" />
                  <QrCodeDialog
                    url={link.shortUrl}
                    triggerClassName="rounded-full"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3" aria-hidden="true" />
                {formatRelativeTime(link.createdAt)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
