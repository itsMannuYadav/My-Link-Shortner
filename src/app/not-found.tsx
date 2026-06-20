import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

import { appConfig } from "@/lib/config";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#09090b] px-4 py-20 text-white">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-brand/20 bg-brand/10 text-brand">
          <SearchX className="size-8" aria-hidden="true" />
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Link not found
        </h1>
        <p className="mt-4 text-white/50">
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
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 text-sm text-white/80 transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="size-4" />
            Back to {appConfig.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
