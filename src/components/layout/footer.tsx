import Link from "next/link";
import { Link2 } from "lucide-react";

import { appConfig } from "@/lib/config";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
                <Link2 className="size-3.5" aria-hidden="true" />
              </span>
              <span className="font-semibold">{appConfig.fullName}</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {appConfig.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="mb-3 text-sm font-medium">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="transition-colors hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#shortener" className="transition-colors hover:text-foreground">
                    Shorten Link
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <span>Privacy friendly</span>
                </li>
                <li>
                  <span>No tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-sm text-muted-foreground">
          © {year} {appConfig.fullName}. Built for speed, designed for sharing.
        </p>
      </div>
    </footer>
  );
}
