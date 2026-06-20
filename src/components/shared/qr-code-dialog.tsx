"use client";

import QRCode from "qrcode";
import { Download, QrCode } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface QrCodeDialogProps {
  url: string;
  label?: string;
  triggerClassName?: string;
}

export function QrCodeDialog({
  url,
  label = "View QR code",
  triggerClassName,
}: QrCodeDialogProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    QRCode.toDataURL(url, {
      width: 280,
      margin: 2,
      color: {
        dark: "#141414",
        light: "#ffffff",
      },
    })
      .then((result) => {
        if (!cancelled) setDataUrl(result);
      })
      .catch(() => {
        if (!cancelled) setDataUrl(null);
      });

    return () => {
      cancelled = true;
    };
  }, [open, url]);

  const download = useCallback(() => {
    if (!dataUrl) return;

    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = "my-link-qr.png";
    anchor.click();
  }, [dataUrl]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={triggerClassName}
            aria-label={label}
          />
        }
      >
        <QrCode className="size-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
          <DialogDescription>
            Scan to open your shortened link instantly.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-2">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            {dataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={dataUrl}
                alt={`QR code for ${url}`}
                width={280}
                height={280}
                className="rounded-lg"
              />
            ) : (
              <div className="flex size-[280px] items-center justify-center text-sm text-muted-foreground">
                Generating QR code...
              </div>
            )}
          </div>
          <Button
            type="button"
            className="rounded-full"
            onClick={download}
            disabled={!dataUrl}
          >
            <Download className="size-4" />
            Download PNG
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
