"use client";

import Image from "next/image";
import { ArrowRight, Zap } from "lucide-react";

import { appConfig } from "@/lib/config";

const stats = [
  { value: "<50ms", label: "Redirect speed" },
  { value: "6-char", label: "Unique codes" },
  { value: "Free", label: "No account needed" },
];

const marqueeLinks = [
  "go.mannuyadav.me/portfolio",
  "go.mannuyadav.me/resume",
  "go.mannuyadav.me/launch",
  "go.mannuyadav.me/event",
  "go.mannuyadav.me/shop",
  "go.mannuyadav.me/blog",
];

export function Hero() {
  const scrollToShortener = () => {
    document.getElementById("shortener")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-[#09090b] text-white grain hero-glow">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
      >
        <Image
          src="/images/hero-bg-texture.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6 sm:pb-12 sm:pt-14 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand">
              <span className="size-1.5 rounded-full bg-brand animate-pulse" />
              Live at {new URL(appConfig.url).host}
            </div>

            <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Your links,
              <br />
              <span className="text-brand">shorter &amp; sharper.</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
              Paste a long URL. Get a clean short link, QR code, and custom alias
              — ready to share in seconds. No signup. No clutter.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={scrollToShortener}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-brand-foreground transition-all hover:brightness-110 hover:shadow-[0_0_32px_oklch(0.88_0.19_125_/_0.4)]"
              >
                <Zap className="size-4" aria-hidden="true" />
                Shorten a link now
              </button>
              <a
                href="#how-it-works"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                See how it works
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-heading text-xl font-bold text-white sm:text-2xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs text-white/45">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-3xl bg-brand/10 blur-3xl"
            />
            <div className="float-slow relative overflow-hidden rounded-2xl border border-white/10 bg-[#111113] shadow-2xl shadow-black/50">
              <Image
                src="/images/hero-product-mockup.png"
                alt="My Link app showing URL shortening on desktop and mobile"
                width={1200}
                height={900}
                className="h-auto w-full"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-white/10 bg-[#141416]/95 px-4 py-3 shadow-xl backdrop-blur sm:block">
              <p className="font-mono text-xs text-brand">go.mannuyadav.me/aB3xY2</p>
              <p className="mt-1 text-[10px] text-white/40">Copied · Ready to share</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/5 bg-[#0c0c0e]/80 py-4">
        <div className="overflow-hidden">
          <div className="link-marquee flex w-max gap-8 whitespace-nowrap px-4">
            {[...marqueeLinks, ...marqueeLinks].map((link, index) => (
              <span
                key={`${link}-${index}`}
                className="font-mono text-sm text-white/30"
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
