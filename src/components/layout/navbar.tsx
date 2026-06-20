import Link from "next/link";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { appConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#shortener", label: "Shorten" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-lg"
          aria-label={`${appConfig.name} home`}
        >
          <span className="relative flex size-9 items-center justify-center">
            <span className="absolute inset-0 rounded-xl bg-brand/20 blur-md transition-opacity group-hover:opacity-100 opacity-60" />
            <span className="relative flex size-9 items-center justify-center rounded-xl border border-brand/30 bg-[#141416] font-heading text-sm font-bold text-brand">
              ML
            </span>
          </span>
          <div className="leading-tight">
            <span className="block font-heading text-base font-semibold tracking-tight text-white">
              {appConfig.name}
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.2em] text-white/40 sm:block">
              Link Studio
            </span>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="#shortener"
            className={cn(
              "hidden h-9 items-center justify-center rounded-lg bg-brand px-4 text-sm font-semibold text-brand-foreground",
              "transition-all hover:brightness-110 hover:shadow-[0_0_24px_oklch(0.88_0.19_125_/_0.35)] sm:inline-flex",
            )}
          >
            Shorten a link
          </Link>
        </div>
      </div>
    </header>
  );
}
