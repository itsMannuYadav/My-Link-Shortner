"use client";

import QRCode from "qrcode";
import { CheckCircle2, Download, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

import { CopyButton } from "@/components/shared/copy-button";
import type { ShortenLinkResult } from "@/features/links/types";
import { truncateUrl } from "@/utils/url";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ResultCardProps {
  result: ShortenLinkResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    QRCode.toDataURL(result.shortUrl, {
      width: 160,
      margin: 1,
      color: {
        dark: "#312e81",
        light: "#ffffff",
      },
    })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl(null);
      });

    return () => {
      cancelled = true;
    };
  }, [result.shortUrl]);

  const downloadQr = () => {
    if (!qrDataUrl) return;
    const anchor = document.createElement("a");
    anchor.href = qrDataUrl;
    anchor.download = `${result.shortCode}-qr.png`;
    anchor.click();
  };

  return (
    <Card className="animate-in fade-in-0 slide-in-from-bottom-4 border-indigo-500/20 bg-gradient-to-br from-card to-indigo-500/5 shadow-lg shadow-indigo-500/10 duration-500">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CheckCircle2
            className="size-5 text-emerald-500"
            aria-hidden="true"
          />
          <CardTitle>Your link is ready</CardTitle>
        </div>
        <CardDescription>
          Share it anywhere — copy, scan, or download the QR code.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Short URL
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={result.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 items-center gap-2 rounded-xl border bg-background/80 px-4 py-3 font-mono text-sm transition-colors hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <span className="truncate">{result.shortUrl}</span>
              <ExternalLink
                className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
            </a>
            <CopyButton value={result.shortUrl} />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Original URL
          </p>
          <p className="rounded-xl border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
            {truncateUrl(result.originalUrl, 72)}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 rounded-2xl border bg-background/60 p-6 sm:flex-row sm:items-start">
          <div className="rounded-xl border bg-white p-3 shadow-sm">
            {qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                alt={`QR code for ${result.shortUrl}`}
                width={160}
                height={160}
                className="rounded-lg"
              />
            ) : (
              <div className="flex size-40 items-center justify-center text-sm text-muted-foreground">
                Generating...
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-3 text-center sm:text-left">
            <Badge variant="secondary" className="w-fit self-center sm:self-start">
              QR Code
            </Badge>
            <p className="text-sm text-muted-foreground">
              Scan with any camera app to open your shortened link instantly.
            </p>
            <Button
              type="button"
              variant="outline"
              className="rounded-full self-center sm:self-start"
              onClick={downloadQr}
              disabled={!qrDataUrl}
            >
              <Download className="size-4" />
              Download PNG
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
