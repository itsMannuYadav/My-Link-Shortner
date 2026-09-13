import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

import { appConfig } from "@/lib/config";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-20 text-foreground">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-brand/20 bg-brand/10 text-brand">
          <SearchX className="size-8" aria-hidden="true" />
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Link not found
        </h1>
        <p className="mt-4 text-muted-foreground">
          This short link doesn&apos;t exist or may have been removed. Double-check
          the URL or create a new one.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-brand-foreground transition-all hover:brightness-110"
          >
            Create a new link
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-6 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to {appConfig.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
