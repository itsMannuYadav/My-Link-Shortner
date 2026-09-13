"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { appConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#shortener", label: "Shorten" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
          aria-label={`${appConfig.name} home`}
        >
          <span className="relative flex size-9 items-center justify-center">
            <span className="absolute inset-0 rounded-xl bg-brand/20 opacity-60 blur-md transition-opacity group-hover:opacity-100" />
            <span className="relative flex size-9 items-center justify-center rounded-xl border border-brand/30 bg-card font-heading text-sm font-bold text-brand">
              ML
            </span>
          </span>
          <div className="leading-tight">
            <span className="block font-heading text-base font-semibold tracking-tight text-foreground">
              {appConfig.name}
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
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
              className="rounded-lg px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#shortener"
              className="mt-2 flex h-10 items-center justify-center rounded-lg bg-brand text-sm font-semibold text-brand-foreground transition-all hover:brightness-110"
              onClick={() => setMobileOpen(false)}
            >
              Shorten a link
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
