import { BadgeCheck, Lock, QrCode, Timer, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

const features = [
  {
    title: "Instant redirects",
    description:
      "Server-side HTTP redirects. No interstitial pages, no countdown timers — just go.",
    icon: Zap,
    className: "md:col-span-2 md:row-span-1",
    highlight: true,
  },
  {
    title: "Custom aliases",
    description: "Claim /launch, /cv, or /shop instead of random codes.",
    icon: BadgeCheck,
    className: "md:col-span-1",
  },
  {
    title: "QR codes built-in",
    description: "Generate and download PNG QR codes the moment your link is ready.",
    icon: QrCode,
    className: "md:col-span-1",
  },
  {
    title: "Privacy first",
    description: "No accounts. No tracking pixels. No selling your click data.",
    icon: Lock,
    className: "md:col-span-1",
  },
  {
    title: "Free, always",
    description: "No premium tier. No credit card. Shorten as many links as you need.",
    icon: Timer,
    className: "md:col-span-2",
  },
];

export function Features() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-brand">
            Features
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border/70 p-6 transition-all hover:border-brand/25",
                feature.highlight
                  ? "bg-[#111113] text-white dark:bg-[#111113]"
                  : "bg-card",
                feature.className,
              )}
            >
              {feature.highlight && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-brand/15 blur-2xl"
                />
              )}
              <feature.icon
                className={cn(
                  "mb-4 size-5",
                  feature.highlight ? "text-brand" : "text-brand",
                )}
                aria-hidden="true"
              />
              <h3
                className={cn(
                  "font-heading text-lg font-semibold",
                  feature.highlight ? "text-white" : "text-foreground",
                )}
              >
                {feature.title}
              </h3>
              <p
                className={cn(
                  "mt-2 text-sm leading-relaxed",
                  feature.highlight ? "text-white/60" : "text-muted-foreground",
                )}
              >
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
