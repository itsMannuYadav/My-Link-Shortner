"use client";

import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
  size?: "default" | "sm" | "icon";
}

export function CopyButton({
  value,
  label = "Copy link",
  className,
  size = "default",
}: CopyButtonProps) {
  const { copy, copied } = useCopyToClipboard();

  if (size === "icon") {
    return (
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={cn("rounded-full", className)}
        onClick={() => copy(value)}
        aria-label={label}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      size={size}
      className={cn("rounded-full", className)}
      onClick={() => copy(value)}
      aria-label={label}
    >
      {copied ? (
        <>
          <Check className="size-4" />
          Copied
        </>
      ) : (
        <>
          <Copy className="size-4" />
          Copy
        </>
      )}
    </Button>
  );
}
