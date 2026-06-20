import Image from "next/image";
import { ArrowUpRight, Globe, Smartphone, Users } from "lucide-react";

import { appConfig } from "@/lib/config";

const useCases = [
  {
    icon: Smartphone,
    title: "Social bios & stories",
    example: "go.mannuyadav.me/ig",
  },
  {
    icon: Users,
    title: "Events & invites",
    example: "go.mannuyadav.me/rsvp",
  },
  {
    icon: Globe,
    title: "Portfolios & resumes",
    example: "go.mannuyadav.me/me",
  },
];

export function Showcase() {
  const host = new URL(appConfig.url).host;

  return (
    <section className="overflow-hidden border-b border-border/60 bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[2rem] bg-brand/10 blur-3xl"
          />
          <div className="relative overflow-hidden rounded-2xl border border-border/70 shadow-2xl">
            <Image
              src="/images/hero-product-mockup.png"
              alt="My Link shortener on desktop and phone"
              width={800}
              height={600}
              className="h-auto w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="font-mono text-sm text-brand">{host}/your-name</p>
              <p className="mt-1 text-xs text-white/60">
                Branded, memorable, yours.
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-brand">
            Built for real sharing
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Links that look intentional, not accidental.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Whether you&apos;re sending a deck to a client, dropping a link in
            your Instagram bio, or printing a QR on a flyer — My Link keeps it
            clean.
          </p>

          <ul className="mt-8 space-y-4">
            {useCases.map((item) => (
              <li
                key={item.title}
                className="flex items-center gap-4 rounded-xl border border-border/60 bg-card/80 p-4 transition-colors hover:border-brand/25"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
                  <item.icon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="truncate font-mono text-xs text-brand">
                    {item.example}
                  </p>
                </div>
                <ArrowUpRight
                  className="size-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
