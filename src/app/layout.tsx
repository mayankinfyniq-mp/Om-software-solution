import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";

import SmoothScroll from "@/components/providers/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import Cursor from "@/components/ui/Cursor";
import Navbar from "@/components/layout/Navbar";
import ConditionalFooter from "@/components/layout/conditionalfooter";

const display = localFont({
  src: [
    {
      path: "./fonts/SpaceGrotesk-Variable.woff2",
      weight: "300 700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

const body = localFont({
  src: [
    {
      path: "./fonts/Inter-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://omsoftwaresolutions.com"),

  title: {
    default: "OM Software Solutions",
    template: "%s — OM Software Solutions",
  },

  description:
    "OM Software Solutions is a full-stack software studio in Ahmedabad, India — crafting cinematic websites, mobile apps and AI-powered platforms since 2016.",

  keywords: [
    "OM Software Solutions",
    "software company Ahmedabad",
    "web development India",
    "Next.js agency",
    "UI UX studio",
    "mobile app development",
    "Three.js websites",
    "GSAP animation studio",
  ],

  // Browser / search-engine icon
  icons: {
    icon: "/om-logo-mark.svg",
    shortcut: "/om-logo-mark.svg",
    apple: "/om-logo-mark.svg",
  },

  openGraph: {
    title: "OM Software Solutions",
    description:
      "A full-stack software studio crafting cinematic websites, mobile apps and AI platforms. Ahmedabad, India — for the world.",
    url: "https://omsoftwaresolutions.com",
    siteName: "OM Software Solutions",
    images: [
      {
        url: "/images/about-studio.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0F1C",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        {/* Graceful degradation when JS is disabled */}
        <noscript>
          <style>{`
            [data-template-overlay],
            [data-preloader] {
              display: none !important;
            }
          `}</style>
        </noscript>

        <SmoothScroll>
          <Preloader />

          <Cursor />

          <div className="noise-overlay" aria-hidden />

          <Navbar />

          <main id="main">{children}</main>

          <ConditionalFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}