import Link from "next/link";
import { Link2 } from "lucide-react";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { appConfig } from "@/lib/config";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`${appConfig.name} home`}
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 transition-transform group-hover:scale-105">
            <Link2 className="size-4" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            {appConfig.name}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          <Button variant="ghost" className="rounded-full" render={<Link href="#features" />}>
            Features
          </Button>
          <Button variant="ghost" className="rounded-full" render={<Link href="#shortener" />}>
            Shorten
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            className="hidden rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20 hover:from-indigo-600 hover:to-violet-700 sm:inline-flex"
            render={<Link href="#shortener" />}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
