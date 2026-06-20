import {
  ArrowRightLeft,
  BadgeCheck,
  Lock,
  QrCode,
  Sparkles,
  Zap,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Fast redirects",
    description:
      "Lightning-quick HTTP redirects so your audience reaches the destination without delay.",
  },
  {
    icon: BadgeCheck,
    title: "Custom aliases",
    description:
      "Create memorable branded links like /library instead of random codes.",
  },
  {
    icon: QrCode,
    title: "QR codes",
    description:
      "Generate scannable QR codes instantly and download them as PNG files.",
  },
  {
    icon: Sparkles,
    title: "Free forever",
    description:
      "No paywalls, no premium tiers. Shorten and share links without limits.",
  },
  {
    icon: Lock,
    title: "Privacy friendly",
    description:
      "No accounts required. Your links are stored securely with minimal data.",
  },
  {
    icon: ArrowRightLeft,
    title: "Built to scale",
    description:
      "Clean architecture ready for analytics, teams, and custom domains later.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="border-t border-border/60 bg-muted/20 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to share smarter
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A polished link shortener with the essentials done right — fast,
            beautiful, and ready for production.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5"
            >
              <CardHeader>
                <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 text-indigo-600 transition-colors group-hover:from-indigo-500/15 group-hover:to-violet-500/15 dark:text-indigo-400">
                  <feature.icon className="size-5" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
