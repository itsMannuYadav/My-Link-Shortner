"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard");
      window.setTimeout(() => setCopied(false), 2000);
      return true;
    } catch {
      toast.error("Failed to copy. Please try again.");
      return false;
    }
  }, []);

  return { copy, copied };
}
