import Link from "next/link";

import { appConfig } from "@/lib/config";

export function Footer() {
  const year = new Date().getFullYear();
  const host = new URL(appConfig.url).host;

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl border border-brand/30 bg-card font-heading text-sm font-bold text-brand">
                ML
              </span>
              <div>
                <p className="font-heading font-semibold text-foreground">{appConfig.fullName}</p>
                <p className="text-xs text-muted-foreground">Link Studio</p>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {appConfig.tagline}
            </p>
            <p className="font-mono text-xs text-brand">{host}</p>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Navigate
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="#shortener" className="transition-colors hover:text-brand">
                  Shorten a link
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="transition-colors hover:text-brand">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="#features" className="transition-colors hover:text-brand">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Built with
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>Next.js 16 · TypeScript</li>
              <li>Prisma · Turso</li>
              <li>Deployed on Vercel</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} {appConfig.fullName}</p>
          <p>Built for speed. Designed for sharing.</p>
        </div>
      </div>
    </footer>
  );
}
