import Link from "next/link";
import { ArrowLeft, Link2, SearchX } from "lucide-react";

import { appConfig } from "@/lib/config";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-20">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 text-indigo-600 dark:text-indigo-400">
          <SearchX className="size-8" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Link not found
        </h1>
        <p className="mt-4 text-muted-foreground">
          This short link doesn&apos;t exist or may have been removed. Double-check
          the URL or create a new one.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white"
            render={<Link href="/" />}
          >
            <Link2 className="size-4" />
            Create a new link
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            render={<Link href="/" />}
          >
            <ArrowLeft className="size-4" />
            Back to {appConfig.name}
          </Button>
        </div>
      </div>
    </div>
  );
}
