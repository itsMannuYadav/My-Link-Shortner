"use client";

import QRCode from "qrcode";
import Link from "next/link";
import { BarChart2, Check, Download, ExternalLink, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

import { CopyButton } from "@/components/shared/copy-button";
import type { ShortenLinkResult } from "@/features/links/types";
import { truncateUrl } from "@/utils/url";
import { Button } from "@/components/ui/button";

interface ResultCardProps {
  result: ShortenLinkResult;
}

const SHARE_PLATFORMS = [
  {
    label: "X / Twitter",
    href: (url: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
  },
  {
    label: "WhatsApp",
    href: (url: string) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
  },
  {
    label: "Telegram",
    href: (url: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}`,
  },
  {
    label: "LinkedIn",
    href: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
];

export function ResultCard({ result }: ResultCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  useEffect(() => {
    let cancelled = false;

    QRCode.toDataURL(result.shortUrl, {
      width: 180,
      margin: 1,
      color: { dark: "#141414", light: "#ffffff" },
    })
      .then((url) => { if (!cancelled) setQrDataUrl(url); })
      .catch(() => { if (!cancelled) setQrDataUrl(null); });

    return () => { cancelled = true; };
  }, [result.shortUrl]);

  const downloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `${result.shortCode}-qr.png`;
    a.click();
  };

  const share = async () => {
    try {
      await navigator.share({ title: "My shortened link", url: result.shortUrl });
    } catch { /* user cancelled */ }
  };

  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-4 overflow-hidden rounded-2xl border border-brand/20 bg-[#111113] text-white shadow-[0_0_60px_oklch(0.88_0.19_125_/_0.12)] duration-500">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
        <span className="flex size-8 items-center justify-center rounded-full bg-brand/20 text-brand">
          <Check className="size-4" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <p className="font-heading font-semibold">Your link is ready</p>
          <p className="text-xs text-white/50">Copy, scan, or share below</p>
        </div>
        {canShare && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-lg border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            onClick={share}
          >
            <Share2 className="size-3.5" />
            Share
          </Button>
        )}
      </div>

      <div className="space-y-6 p-6">
        {/* Short URL */}
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
              <ExternalLink className="size-3.5 shrink-0 opacity-40 transition-opacity group-hover:opacity-100" aria-hidden="true" />
            </a>
            <CopyButton
              value={result.shortUrl}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            />
          </div>
        </div>

        {/* Social share */}
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            Share on
          </p>
          <div className="flex flex-wrap gap-2">
            {SHARE_PLATFORMS.map(({ label, href }) => (
              <a
                key={label}
                href={href(result.shortUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-7 items-center rounded-full border border-white/10 bg-white/5 px-3 text-xs text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Original URL */}
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            Original
          </p>
          <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
            {truncateUrl(result.originalUrl, 72)}
          </p>
        </div>

        {/* QR code */}
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

        {/* Stats link */}
        <div className="flex justify-end border-t border-white/10 pt-4">
          <Link
            href={`/stats/${result.shortCode}`}
            className="inline-flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-brand"
          >
            <BarChart2 className="size-3.5" />
            View analytics
          </Link>
        </div>
      </div>
    </div>
  );
}
