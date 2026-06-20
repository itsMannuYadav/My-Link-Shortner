"use client";

import QRCode from "qrcode";
import { Check, Download, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

import { CopyButton } from "@/components/shared/copy-button";
import type { ShortenLinkResult } from "@/features/links/types";
import { truncateUrl } from "@/utils/url";
import { Button } from "@/components/ui/button";

interface ResultCardProps {
  result: ShortenLinkResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    QRCode.toDataURL(result.shortUrl, {
      width: 180,
      margin: 1,
      color: {
        dark: "#141414",
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
    <div className="animate-in fade-in-0 slide-in-from-bottom-4 overflow-hidden rounded-2xl border border-brand/20 bg-[#111113] text-white shadow-[0_0_60px_oklch(0.88_0.19_125_/_0.12)] duration-500">
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
        <span className="flex size-8 items-center justify-center rounded-full bg-brand/20 text-brand">
          <Check className="size-4" aria-hidden="true" />
        </span>
        <div>
          <p className="font-heading font-semibold">Your link is ready</p>
          <p className="text-xs text-white/50">Copy, scan, or download below</p>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            Short URL
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={result.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 font-mono text-sm text-brand transition-colors hover:border-brand/30 hover:bg-brand/5"
            >
              <span className="truncate">{result.shortUrl}</span>
              <ExternalLink
                className="size-3.5 shrink-0 opacity-40 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
            </a>
            <CopyButton
              value={result.shortUrl}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            Original
          </p>
          <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
            {truncateUrl(result.originalUrl, 72)}
          </p>
        </div>

        <div className="flex flex-col items-center gap-5 rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-start">
          <div className="rounded-xl border border-white/10 bg-white p-2.5">
            {qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                alt={`QR code for ${result.shortUrl}`}
                width={180}
                height={180}
                className="rounded-lg"
              />
            ) : (
              <div className="flex size-[180px] items-center justify-center text-sm text-white/40">
                Generating QR…
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-3 text-center sm:text-left">
            <p className="font-heading font-medium">QR Code</p>
            <p className="text-sm text-white/50">
              Scan from any phone camera or print on flyers and posters.
            </p>
            <Button
              type="button"
              variant="outline"
              className="self-center rounded-xl border-white/10 bg-transparent text-white hover:bg-white/10 sm:self-start"
              onClick={downloadQr}
              disabled={!qrDataUrl}
            >
              <Download className="size-4" />
              Download PNG
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
