export const siteConfig = {
  name: "ArdhiSoko",
  tagline: "Where Kenya Finds Land",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"),
  description:
    "Buy and sell verified land across all 47 Kenyan counties. Plots, farms, ranches, and commercial parcels — with titles you can trust.",
  locale: "en_KE",
  twitter: "@ardhisoko",

  contact: {
    email: "hello@ardhisoko.co.ke",
    phone: "+254700000000",
  },

  social: {
    whatsapp: "https://wa.me/254700000000",
    twitter: "https://x.com/ardhisoko",
    instagram: "https://instagram.com/ardhisoko",
    linkedin: "https://linkedin.com/company/ardhisoko",
  },

  address: {
    city: "Nairobi",
    country: "Kenya",
  },

  legal: {
    privacy: "/privacy",
    terms: "/terms",
    cookies: "/cookies",
  },
} as const;

export type SiteConfig = typeof siteConfig;