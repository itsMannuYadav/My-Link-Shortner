import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { appConfig } from "@/lib/config";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.url),
  title: {
    default: `${appConfig.fullName} — Shorten URLs Instantly`,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.description,
  keywords: [
    "url shortener",
    "link shortener",
    "short links",
    "qr code",
    "custom alias",
    "my link",
  ],
  authors: [{ name: appConfig.fullName }],
  creator: appConfig.fullName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: appConfig.url,
    siteName: appConfig.fullName,
    title: `${appConfig.fullName} — Shorten URLs Instantly`,
    description: appConfig.tagline,
    images: [{ url: "/images/hero-product-mockup.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${appConfig.fullName} — Shorten URLs Instantly`,
    description: appConfig.tagline,
    images: ["/images/hero-product-mockup.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster richColors closeButton position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
