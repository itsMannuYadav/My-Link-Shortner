"use client";

import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";

import { ResultCard } from "@/components/home/result-card";
import { RecentLinks } from "@/components/home/recent-links";
import { useRecentLinks } from "@/hooks/use-recent-links";
import type { ShortenLinkResult } from "@/features/links/types";
import { isValidUrl } from "@/utils/url";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UrlShortener() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [showAlias, setShowAlias] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ShortenLinkResult | null>(null);
  const { links, addLink, clearLinks, isHydrated } = useRecentLinks();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!url.trim()) {
      setError("Please enter a URL to shorten");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid http or https URL");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          alias: alias.trim() || undefined,
        }),
      });

      const data = (await response.json()) as ShortenLinkResult & {
        error?: string;
      };

      if (!response.ok) {
        setError(data.error ?? "Failed to shorten URL");
        return;
      }

      setResult(data);
      addLink({
        shortCode: data.shortCode,
        shortUrl: data.shortUrl,
        originalUrl: data.originalUrl,
        createdAt: data.createdAt,
      });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="shortener" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-brand">
            Try it now
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Shorten your first link
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Paste a URL below. Your short link, QR code, and copy button appear
            instantly.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_20px_60px_oklch(0_0_0_/_0.08)] dark:shadow-[0_20px_60px_oklch(0_0_0_/_0.35)]">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand/80 via-brand to-brand/80"
          />

          <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8" noValidate>
            <div className="space-y-2">
              <Label htmlFor="url" className="text-xs uppercase tracking-wider text-muted-foreground">
                Long URL
              </Label>
              <Input
                id="url"
                type="url"
                inputMode="url"
                placeholder="https://your-website.com/really/long/path/here"
                value={url}
                onChange={(event) => {
                  setUrl(event.target.value);
                  if (error) setError(null);
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "url-error" : undefined}
                className="h-14 rounded-xl border-border/80 bg-background px-4 font-mono text-sm sm:text-base"
                autoComplete="url"
                required
              />
            </div>

            {showAlias ? (
              <div className="space-y-2 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                <Label htmlFor="alias" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Custom alias
                </Label>
                <div className="flex items-center gap-0 overflow-hidden rounded-xl border border-border/80 bg-background">
                  <span className="hidden shrink-0 border-r border-border/80 bg-muted/50 px-3 py-3.5 font-mono text-xs text-muted-foreground sm:inline">
                    …/
                  </span>
                  <Input
                    id="alias"
                    type="text"
                    placeholder="my-link"
                    value={alias}
                    onChange={(event) => setAlias(event.target.value)}
                    className="h-12 border-0 bg-transparent px-4 shadow-none focus-visible:ring-0"
                    pattern="[a-zA-Z0-9_-]+"
                    minLength={3}
                    maxLength={32}
                    aria-describedby="alias-hint"
                  />
                </div>
                <p id="alias-hint" className="text-xs text-muted-foreground">
                  Letters, numbers, hyphens, underscores · min 3 chars
                </p>
              </div>
            ) : (
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
                onClick={() => setShowAlias(true)}
              >
                <Wand2 className="size-3.5" />
                Add a custom alias
              </button>
            )}

            {error && (
              <p
                id="url-error"
                role="alert"
                className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-xl bg-brand text-sm font-semibold text-brand-foreground hover:brightness-110 sm:w-auto sm:px-10"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Shortening…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" aria-hidden="true" />
                  Shorten link
                </>
              )}
            </Button>
          </form>
        </div>

        {result && (
          <div className="mt-8">
            <ResultCard result={result} />
          </div>
        )}

        <div className="mt-12">
          <RecentLinks links={links} isHydrated={isHydrated} onClear={clearLinks} />
        </div>
      </div>
    </section>
  );
}
