import Link from "next/link";

import { appConfig } from "@/lib/config";

export function Footer() {
  const year = new Date().getFullYear();
  const host = new URL(appConfig.url).host;

  return (
    <footer className="border-t border-border/60 bg-[#09090b] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl border border-brand/30 bg-[#141416] font-heading text-sm font-bold text-brand">
                ML
              </span>
              <div>
                <p className="font-heading font-semibold">{appConfig.fullName}</p>
                <p className="text-xs text-white/40">Link Studio</p>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              {appConfig.tagline}
            </p>
            <p className="font-mono text-xs text-brand">{host}</p>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Navigate
            </h3>
            <ul className="space-y-2.5 text-sm text-white/60">
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
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Built with
            </h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>Next.js 16 · TypeScript</li>
              <li>Prisma · Turso</li>
              <li>Deployed on Vercel</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-white/35 sm:flex-row">
          <p>© {year} {appConfig.fullName}</p>
          <p>Built for speed. Designed for sharing.</p>
        </div>
      </div>
    </footer>
  );
}
