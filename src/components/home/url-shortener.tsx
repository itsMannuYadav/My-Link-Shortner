"use client";

import { Loader2, Sparkles, Tag, Wand2, X } from "lucide-react";
import { useRef, useState } from "react";

import { ResultCard } from "@/components/home/result-card";
import { RecentLinks } from "@/components/home/recent-links";
import { useRecentLinks } from "@/hooks/use-recent-links";
import type { ShortenLinkResult } from "@/features/links/types";
import { isValidUrl } from "@/utils/url";
import { ALIAS_MAX_LENGTH, ALIAS_MIN_LENGTH, ALIAS_REGEX } from "@/features/links/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function getAliasHint(alias: string): { message: string; isError: boolean } | null {
  if (!alias) return null;
  if (!ALIAS_REGEX.test(alias)) {
    return { message: "Only letters, numbers, hyphens, and underscores", isError: true };
  }
  if (alias.length < ALIAS_MIN_LENGTH) {
    const needed = ALIAS_MIN_LENGTH - alias.length;
    return { message: `${needed} more character${needed > 1 ? "s" : ""} needed`, isError: true };
  }
  return null;
}

function buildUtmUrl(
  base: string,
  utm: { source: string; medium: string; campaign: string },
): string {
  if (!utm.source && !utm.medium && !utm.campaign) return base;
  try {
    const url = new URL(base);
    if (utm.source) url.searchParams.set("utm_source", utm.source.trim());
    if (utm.medium) url.searchParams.set("utm_medium", utm.medium.trim());
    if (utm.campaign) url.searchParams.set("utm_campaign", utm.campaign.trim());
    return url.toString();
  } catch {
    return base;
  }
}

export function UrlShortener() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [showAlias, setShowAlias] = useState(false);
  const [showUtm, setShowUtm] = useState(false);
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ShortenLinkResult | null>(null);
  const { links, addLink, removeLink, clearLinks, isHydrated } = useRecentLinks();
  const resultRef = useRef<HTMLDivElement>(null);

  const resetExtras = () => {
    setAlias("");
    setShowAlias(false);
    setShowUtm(false);
    setUtmSource("");
    setUtmMedium("");
    setUtmCampaign("");
  };

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

    const aliasHint = getAliasHint(alias);
    if (alias && aliasHint?.isError) {
      setError(aliasHint.message);
      return;
    }

    const finalUrl = buildUtmUrl(url, {
      source: utmSource,
      medium: utmMedium,
      campaign: utmCampaign,
    });

    setIsLoading(true);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: finalUrl,
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
      setUrl("");
      resetExtras();
      addLink({
        shortCode: data.shortCode,
        shortUrl: data.shortUrl,
        originalUrl: data.originalUrl,
        createdAt: data.createdAt,
      });

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 80);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const aliasHint = getAliasHint(alias);

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
            {/* URL input */}
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
                  if (result) setResult(null);
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "url-error" : undefined}
                className="h-14 rounded-xl border-border/80 bg-background px-4 font-mono text-sm sm:text-base"
                autoComplete="url"
                required
              />
            </div>

            {/* Custom alias */}
            {showAlias ? (
              <div className="space-y-2 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                <div className="flex items-center justify-between">
                  <Label htmlFor="alias" className="text-xs uppercase tracking-wider text-muted-foreground">
                    Custom alias
                  </Label>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs tabular-nums ${alias.length > ALIAS_MAX_LENGTH ? "text-destructive" : "text-muted-foreground"}`}>
                      {alias.length}/{ALIAS_MAX_LENGTH}
                    </span>
                    <button
                      type="button"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      onClick={() => { setAlias(""); setShowAlias(false); }}
                      aria-label="Remove custom alias"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center overflow-hidden rounded-xl border border-border/80 bg-background">
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
                    maxLength={ALIAS_MAX_LENGTH}
                    aria-describedby="alias-hint"
                  />
                </div>
                {aliasHint ? (
                  <p id="alias-hint" className={`text-xs ${aliasHint.isError ? "text-destructive" : "text-muted-foreground"}`}>
                    {aliasHint.message}
                  </p>
                ) : alias.length >= ALIAS_MIN_LENGTH ? (
                  <p id="alias-hint" className="text-xs text-brand">✓ Alias looks good</p>
                ) : (
                  <p id="alias-hint" className="text-xs text-muted-foreground">
                    Letters, numbers, hyphens, underscores · min {ALIAS_MIN_LENGTH} chars
                  </p>
                )}
              </div>
            ) : null}

            {/* UTM builder */}
            {showUtm ? (
              <div className="space-y-3 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                    UTM parameters
                  </Label>
                  <button
                    type="button"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => { setShowUtm(false); setUtmSource(""); setUtmMedium(""); setUtmCampaign(""); }}
                    aria-label="Remove UTM parameters"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="utm-source" className="text-xs text-muted-foreground">
                      Source <span className="text-brand">*</span>
                    </Label>
                    <Input
                      id="utm-source"
                      type="text"
                      placeholder="google"
                      value={utmSource}
                      onChange={(e) => setUtmSource(e.target.value)}
                      className="h-9 rounded-lg border-border/80 bg-background px-3 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="utm-medium" className="text-xs text-muted-foreground">
                      Medium
                    </Label>
                    <Input
                      id="utm-medium"
                      type="text"
                      placeholder="email"
                      value={utmMedium}
                      onChange={(e) => setUtmMedium(e.target.value)}
                      className="h-9 rounded-lg border-border/80 bg-background px-3 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="utm-campaign" className="text-xs text-muted-foreground">
                      Campaign
                    </Label>
                    <Input
                      id="utm-campaign"
                      type="text"
                      placeholder="summer-sale"
                      value={utmCampaign}
                      onChange={(e) => setUtmCampaign(e.target.value)}
                      className="h-9 rounded-lg border-border/80 bg-background px-3 text-sm"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  UTM params are appended to your destination URL before shortening.
                </p>
              </div>
            ) : null}

            {/* Toggle buttons row */}
            {(!showAlias || !showUtm) && (
              <div className="flex flex-wrap gap-4">
                {!showAlias && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
                    onClick={() => setShowAlias(true)}
                  >
                    <Wand2 className="size-3.5" />
                    Custom alias
                  </button>
                )}
                {!showUtm && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
                    onClick={() => setShowUtm(true)}
                  >
                    <Tag className="size-3.5" />
                    UTM tracking
                  </button>
                )}
              </div>
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
          <div ref={resultRef} className="mt-8">
            <ResultCard result={result} />
          </div>
        )}

        <div className="mt-12">
          <RecentLinks
            links={links}
            isHydrated={isHydrated}
            onClear={clearLinks}
            onRemove={removeLink}
          />
        </div>
      </div>
    </section>
  );
}
