import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";

import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/site";

/* ═══════════════════════════════════════════════════════════
   Fonts — self-hosted, preloaded, zero CLS
   ═══════════════════════════════════════════════════════════ */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["600", "700", "800"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
});

/* ═══════════════════════════════════════════════════════════
   Metadata
   ═══════════════════════════════════════════════════════════ */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  generator: "Next.js",
  keywords: [
    "land for sale Kenya",
    "shamba for sale",
    "plots Nairobi",
    "agricultural land Kenya",
    "ranch land Laikipia",
    "verified title deed",
    "ArdhiSoko",
    "buy land Kenya",
    "sell land Kenya",
    "land marketplace",
    "land for sale Nakuru",
    "land for sale Kiambu",
    "land for sale Karen",
    "beach plots Diani",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "real estate",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    creator: siteConfig.twitter,
    site: siteConfig.twitter,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  referrer: "origin-when-cross-origin",

  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "black-translucent",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF9F2" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0805" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
};

/* ═══════════════════════════════════════════════════════════
   JSON-LD — Organization + WebSite
   ═══════════════════════════════════════════════════════════ */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  alternateName: "ArdhiSoko Kenya",
  url: siteConfig.url,
  logo: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/logo.png`,
    width: 512,
    height: 512,
  },
  image: `${siteConfig.url}/opengraph-image`,
  description: siteConfig.description,
  foundingDate: "2026",
  areaServed: {
    "@type": "Country",
    name: "Kenya",
    sameAs: "https://en.wikipedia.org/wiki/Kenya",
  },
  knowsLanguage: ["en", "sw"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      availableLanguage: ["English", "Swahili"],
      areaServed: "KE",
    },
  ],
  sameAs: [
    siteConfig.social.twitter,
    siteConfig.social.instagram,
    siteConfig.social.linkedin,
  ].filter(Boolean),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: { "@id": `${siteConfig.url}/#organization` },
  inLanguage: "en-KE",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/* ═══════════════════════════════════════════════════════════
   Inline scripts — strings, never React children
   ═══════════════════════════════════════════════════════════ */
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('ardhisoko:theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  } catch (e) {}
})();
`.trim();

const jsonLdScript = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [organizationJsonLd, websiteJsonLd],
});

/* ═══════════════════════════════════════════════════════════
   Root Layout
   ═══════════════════════════════════════════════════════════ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Theme init — runs before paint */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />

        {/* JSON-LD — Organization + WebSite */}
        <Script
          id="jsonld-org-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: jsonLdScript }}
        />

        {/* Preconnect — image CDN + fonts */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Favicon set */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>

      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        {/* Accessibility: skip link */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1080] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-brand"
        >
          Skip to content
        </a>

        {/* Header — Suspense boundary required for useSearchParams() */}
        <Suspense
          fallback={
            <div
              aria-hidden
              className="h-16 border-b border-border bg-background"
            />
          }
        >
          <SiteHeader />
        </Suspense>

        <main id="main" className="flex-1">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}