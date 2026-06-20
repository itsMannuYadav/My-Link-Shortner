"use client";

import { ArrowDown, Sparkles, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToShortener = () => {
    document.getElementById("shortener")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-500/20 via-violet-500/10 to-transparent blur-3xl dark:from-indigo-500/15 dark:via-violet-500/5" />
        <div className="absolute -left-24 top-32 size-72 rounded-full bg-indigo-400/10 blur-3xl" />
        <div className="absolute -right-24 top-20 size-72 rounded-full bg-violet-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 text-sm text-indigo-700 dark:text-indigo-300">
          <Sparkles className="size-3.5" aria-hidden="true" />
          Free forever · No sign-up required
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Shorten Long URLs{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
            Instantly
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Create clean, shareable links in seconds.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="h-11 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-8 text-base text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-violet-700"
            onClick={scrollToShortener}
          >
            <Zap className="size-4" aria-hidden="true" />
            Shorten Link
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-11 rounded-full px-8 text-base"
            onClick={scrollToFeatures}
          >
            Learn More
            <ArrowDown className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
