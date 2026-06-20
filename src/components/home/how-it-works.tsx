import { ClipboardCopy, Link2, QrCode } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Drop your long URL",
    description:
      "Paste any http or https link — blog posts, portfolios, product pages, anything.",
  },
  {
    number: "02",
    icon: ClipboardCopy,
    title: "Grab your short link",
    description:
      "We generate a unique code instantly. Add a custom alias like /launch if you want.",
  },
  {
    number: "03",
    icon: QrCode,
    title: "Share everywhere",
    description:
      "Copy to clipboard, download a QR code, or drop it in your bio, deck, or DMs.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-b border-border/60 bg-background px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-brand">
              How it works
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. Zero friction.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            No dashboards to learn. No accounts to create. Just paste, shorten,
            and share.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className="group relative rounded-2xl border border-border/70 bg-card p-6 transition-all hover:border-brand/30 hover:shadow-[0_8px_40px_oklch(0.88_0.19_125_/_0.08)]"
            >
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border md:block"
                />
              )}
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">
                  {step.number}
                </span>
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand/15 text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                  <step.icon className="size-4" aria-hidden="true" />
                </span>
              </div>
              <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
