import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Eye,
  ArrowRight,
  Info,
} from "lucide-react";

import { SellForm } from "./sell-form";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "List your land",
  description:
    "List your land on ArdhiSoko — Kenya's verified land marketplace. Free to list, nationwide reach, serious buyers only.",
  alternates: { canonical: "/sell" },
  openGraph: {
    title: "List your land on ArdhiSoko",
    description:
      "Reach thousands of verified buyers across all 47 counties. Free to list.",
    url: "/sell",
  },
};

/**
 * Structured data for the sell page.
 * Tells Google this is a service offer with FAQ.
 */
const sellPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "List your land on ArdhiSoko",
  description:
    "List land for sale across Kenya. Free to list, verified buyers, nationwide reach.",
  url: "/sell",
  isPartOf: {
    "@type": "WebSite",
    name: "ArdhiSoko",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ardhisoko.co.ke",
  },
};

export default function SellPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sellPageJsonLd) }}
      />

      <Container className="pb-safe py-12 lg:py-16">
        {/* ═══════════════════════════════════════════════════════
            HEADER
            ═══════════════════════════════════════════════════════ */}
        <header className="mb-10 lg:mb-14">
          {/* Eyebrow */}
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            Verified sellers only
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            List your land
          </h1>

          {/* Subhead */}
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Reach thousands of verified buyers across all 47 Kenyan counties.
            Every listing is reviewed by our team before it goes live.
          </p>

          {/* Trust strip — three quick reasons */}
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            <Perk
              icon={<Zap className="h-4 w-4" />}
              title="Free to list"
              body="No upfront cost. 2% commission on sale."
            />
            <Perk
              icon={<Eye className="h-4 w-4" />}
              title="Nationwide reach"
              body="Buyers from Nairobi to Kisumu see your listing."
            />
            <Perk
              icon={<ShieldCheck className="h-4 w-4" />}
              title="Verified buyers"
              body="Phone-verified accounts. Zero time-wasters."
            />
          </ul>
        </header>

        {/* ═══════════════════════════════════════════════════════
            INFO BANNER
            ═══════════════════════════════════════════════════════ */}
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-info/25 bg-info-soft p-4 text-info">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p className="text-sm leading-relaxed">
            <span className="font-semibold">
              Have your title deed ready.
            </span>{" "}
            We&apos;ll ask you to upload a photo or PDF of the deed during
            submission. This is how we verify ownership and keep scammers off
            ArdhiSoko.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════
            FORM
            ═══════════════════════════════════════════════════════ */}
        <SellForm />

        {/* ═══════════════════════════════════════════════════════
            FOOTER CTA — for people who aren't ready to list
            ═══════════════════════════════════════════════════════ */}
        <footer className="mt-16 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Not ready to list yet?
          </p>
          <Link
            href="/listings"
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
          >
            Browse land instead
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </footer>
      </Container>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Perk card
   ═══════════════════════════════════════════════════════════ */

function Perk({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <li className="rounded-xl border border-border bg-card p-4 shadow-xs">
      <div className="mb-2 inline-grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-display text-sm font-bold">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        {body}
      </p>
    </li>
  );
}