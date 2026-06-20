"use client";

import { Loader2, Wand2 } from "lucide-react";
import { useState } from "react";

import { ResultCard } from "@/components/home/result-card";
import { RecentLinks } from "@/components/home/recent-links";
import { useRecentLinks } from "@/hooks/use-recent-links";
import type { ShortenLinkResult } from "@/features/links/types";
import { isValidUrl } from "@/utils/url";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <section
      id="shortener"
      className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8"
    >
      <Card className="border-border/60 shadow-xl shadow-indigo-500/5">
        <CardHeader>
          <CardTitle className="text-2xl">Shorten your link</CardTitle>
          <CardDescription>
            Paste a long URL below and get a clean, shareable link in seconds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="url">Long URL</Label>
              <Input
                id="url"
                type="url"
                inputMode="url"
                placeholder="https://example.com/very-long-url"
                value={url}
                onChange={(event) => {
                  setUrl(event.target.value);
                  if (error) setError(null);
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "url-error" : undefined}
                className="h-12 rounded-xl px-4 text-base"
                autoComplete="url"
                required
              />
            </div>

            {showAlias ? (
              <div className="space-y-2 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                <Label htmlFor="alias">Custom alias (optional)</Label>
                <Input
                  id="alias"
                  type="text"
                  placeholder="my-custom-link"
                  value={alias}
                  onChange={(event) => setAlias(event.target.value)}
                  className="h-11 rounded-xl px-4"
                  pattern="[a-zA-Z0-9_-]+"
                  minLength={3}
                  maxLength={32}
                  aria-describedby="alias-hint"
                />
                <p id="alias-hint" className="text-xs text-muted-foreground">
                  Letters, numbers, hyphens, and underscores only. Min 3
                  characters.
                </p>
              </div>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-full text-muted-foreground"
                onClick={() => setShowAlias(true)}
              >
                <Wand2 className="size-3.5" />
                Add custom alias
              </Button>
            )}

            {error && (
              <p
                id="url-error"
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-base text-white shadow-md shadow-indigo-500/20 hover:from-indigo-600 hover:to-violet-700 sm:w-auto sm:px-10"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Shortening...
                </>
              ) : (
                "Shorten Link"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && <ResultCard result={result} />}

      <RecentLinks links={links} isHydrated={isHydrated} onClear={clearLinks} />
    </section>
  );
}
