import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";

import SmoothScroll from "@/components/providers/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import Cursor from "@/components/ui/Cursor";
import Navbar from "@/components/layout/Navbar";
import ConditionalFooter from "@/components/layout/conditionalfooter";

/* -------------------------------------------------------------------------- */
/* Fonts                                                                      */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Metadata                                                                   */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL("https://www.omsoftwaresolutions.in"),

  title: {
    default: "OM Software Solutions",
    template: "%s — OM Software Solutions",
  },

  description:
    "OM Software Solutions is a software studio in Ahmedabad, India, building modern websites, mobile applications, digital experiences and AI-powered software solutions.",

  keywords: [
    "OM Software Solutions",
    "software company Ahmedabad",
    "software company India",
    "web development Ahmedabad",
    "web development India",
    "Next.js agency Ahmedabad",
    "UI UX design Ahmedabad",
    "mobile app development",
    "AI development company Ahmedabad",
    "Three.js websites",
    "GSAP websites",
  ],

  /* ---------------------------------------------------------------------- */
  /* Favicon                                                                */
  /* ---------------------------------------------------------------------- */

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],

    shortcut: "/favicon.ico",

    apple: "/icon.svg",
  },

  /* ---------------------------------------------------------------------- */
  /* Open Graph                                                             */
  /* ---------------------------------------------------------------------- */

  openGraph: {
    title: "OM Software Solutions",

    description:
      "OM Software Solutions is a software studio in Ahmedabad, India, building modern websites, mobile applications, digital experiences and AI-powered software solutions.",

    url: "https://www.omsoftwaresolutions.in",

    siteName: "OM Software Solutions",

    images: [
      {
        url: "/images/about-studio.jpg",
        width: 1200,
        height: 630,
        alt: "OM Software Solutions",
      },
    ],

    locale: "en_IN",

    type: "website",
  },

  /* ---------------------------------------------------------------------- */
  /* Robots                                                                 */
  /* ---------------------------------------------------------------------- */

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* -------------------------------------------------------------------------- */
/* Viewport                                                                   */
/* -------------------------------------------------------------------------- */

export const viewport: Viewport = {
  themeColor: "#0A0F1C",
  width: "device-width",
  initialScale: 1,
};

/* -------------------------------------------------------------------------- */
/* Root Layout                                                                */
/* -------------------------------------------------------------------------- */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
    >
      <body>
        {/* Graceful degradation when JavaScript is disabled */}
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

          <div
            className="noise-overlay"
            aria-hidden="true"
          />

          <Navbar />

          <main id="main">
            {children}
          </main>

          <ConditionalFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}