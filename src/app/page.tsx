import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
  HandCoins,
  FileSearch,
  Handshake,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { HeroSearch } from "@/components/hero-search";
import { ListingCard } from "@/components/listing-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HomeProfessionalsSection } from "@/components/home-professionals-section";
import {
  getCounties,
  getFeaturedListings,
  getPopularCounties,
  getStats,
} from "@/lib/listings";
import { formatNumber } from "@/lib/format";

export const metadata = {
  title: "Where Kenyans Finds Land",
  description:
    "Buy and sell verified land across all 47 Kenyan counties. Plots, farms, ranches, and commercial parcels — with titles you can trust.",
};

export default async function HomePage() {
  const [featured, counties, stats, popularCounties] = await Promise.all([
    getFeaturedListings(3),
    getCounties(),
    getStats(),
    getPopularCounties(6),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured land listings on ArdhiSoko",
    itemListElement: featured.map((listing, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `/listings/${listing.slug}`,
      name: listing.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-hero bg-grain">
        <div
          aria-hidden
          className="animate-drift pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[140px] dark:bg-primary/25"
        />
        <div
          aria-hidden
          className="animate-drift pointer-events-none absolute -bottom-32 -left-24 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[120px] dark:bg-secondary/15"
          style={{ animationDelay: "-8s" }}
        />

        <Container className="relative pb-24 pt-20 lg:pb-32 lg:pt-28">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="animate-fade-in-up flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Live · {formatNumber(stats.totalListings)} verified listings
              </div>

              <h1 className="animate-fade-in-up delay-75 mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Where Kenya
                <br />
                <span className="text-gradient-brand">finds land.</span>
              </h1>

              <p className="animate-fade-in-up delay-150 mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                Plots, farms, ranches, and commercial parcels across all 47
                counties. Every title checked. Every seller verified.
              </p>

              <ul className="animate-fade-in-up delay-300 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Title-deed verified
                </li>
                <li className="flex items-center gap-2">
                  <HandCoins className="h-4 w-4 text-primary" />
                  M-Pesa deposits
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Nationwide coverage
                </li>
              </ul>
            </div>

            <div className="animate-fade-in-up delay-500 lg:col-span-5 lg:pt-12">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-md sm:p-8">
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                />

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Market pulse
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-xs font-semibold text-success">
                    <TrendingUp className="h-3 w-3" />
                    Live
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
                  <MarketStat
                    value={formatNumber(stats.totalListings)}
                    label="Listings"
                  />
                  <MarketStat
                    value={`${stats.countiesCovered}/47`}
                    label="Counties"
                  />
                  <MarketStat
                    value={formatNumber(stats.totalAcreage)}
                    label="Acres listed"
                  />
                  <MarketStat value="100%" label="Title-checked" />
                </div>

                <div
                  aria-hidden
                  className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent"
                />

                <Link
                  href="/listings"
                  className="group flex items-center justify-between text-sm font-semibold text-foreground transition-colors hover:text-primary"
                >
                  Browse all listings
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up delay-700 mt-16 lg:mt-20">
            <HeroSearch counties={counties} />
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURED LISTINGS
          ═══════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Featured
              </div>
              <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
                Hand-picked parcels,
                <br />
                <span className="text-muted-foreground">
                  verified end to end.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-2 lg:text-right">
              <p className="text-muted-foreground">
                Premium land from trusted sellers, personally checked by our
                team before it goes live.
              </p>
              <Button
                variant="ghost"
                asChild
                className="mt-4 hidden hover:text-primary lg:inline-flex"
              >
                <Link href="/listings">
                  View all listings
                  <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {featured.length === 0 ? (
            <EmptyFeatured />
          ) : (
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((listing, i) => (
                <div
                  key={listing.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${300 + i * 100}ms` }}
                >
                  <ListingCard listing={listing} priority={i === 0} />
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 text-center lg:hidden">
            <Button asChild variant="outline">
              <Link href="/listings">
                View all listings <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          PROFESSIONALS
          ═══════════════════════════════════════════════════ */}
      <HomeProfessionalsSection />

      {/* ═══════════════════════════════════════════════════
          POPULAR COUNTIES
          ═══════════════════════════════════════════════════ */}
      {popularCounties.length > 0 && (
        <section className="pb-24 lg:pb-32">
          <Container>
            <div className="grid gap-4 lg:grid-cols-12 lg:items-baseline">
              <h2 className="font-display text-2xl font-bold tracking-[-0.02em] lg:col-span-4">
                Browse by county
              </h2>
              <p className="text-sm text-muted-foreground lg:col-span-8 lg:text-right">
                Kenya&rsquo;s most active land markets right now.
              </p>
            </div>

            <div className="no-scrollbar mt-8 -mx-4 flex gap-3 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              {popularCounties.map(({ county, count }, i) => (
                <Link
                  key={county}
                  href={`/listings?county=${encodeURIComponent(county)}`}
                  className="group animate-fade-in-up relative flex shrink-0 items-center gap-3 overflow-hidden rounded-full border border-border bg-card py-2.5 pl-4 pr-5 text-sm font-medium shadow-xs transition-all duration-200 ease-out-soft hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <MapPin className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
                  <span>{county}</span>
                  <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                    {count}
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          HOW IT WORKS
          ═══════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden border-y border-border bg-background-subtle py-24 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-100"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in oklab, var(--primary) 8%, transparent) 0%, transparent 70%)",
          }}
        />

        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  The process
                </div>
                <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
                  From search
                  <br />
                  to signed transfer.
                </h2>
                <p className="mt-5 max-w-md text-muted-foreground">
                  Three steps. No middlemen. Real legal support when you need
                  it.
                </p>

                <div className="mt-10 hidden lg:block">
                  <Button size="lg" asChild className="shadow-brand">
                    <Link href="/sell">
                      List your land
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <ol className="space-y-4 lg:col-span-7">
              <Step
                number={1}
                icon={<FileSearch className="h-5 w-5" />}
                title="Search verified land"
                body="Filter by county, land type, acreage, and price. Every listing has a checked title deed before it goes live."
                delay={0}
              />
              <Step
                number={2}
                icon={<Handshake className="h-5 w-5" />}
                title="Connect with the seller"
                body="Message or call directly. Book a site visit. Negotiate without a middleman skimming the deal."
                delay={100}
              />
              <Step
                number={3}
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Close with confidence"
                body="Pay your deposit via M-Pesa. Optional legal support for the transfer, so nothing gets left to chance."
                delay={200}
              />
            </ol>
          </div>

          <div className="mt-14 text-center lg:hidden">
            <Button size="lg" asChild className="shadow-brand">
              <Link href="/sell">
                List your land
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          TRUST BAR
          ═══════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden py-24 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 50% 60% at 50% 100%, color-mix(in oklab, var(--primary) 10%, transparent) 0%, transparent 70%)",
          }}
        />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              Trust, built in
            </div>
            <h2 className="font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              Every listing passes
              <br />
              <span className="text-gradient-brand">the same three checks.</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            <TrustCell
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Title deed verified"
              body="Original deed cross-checked against the Ministry of Lands registry before listing."
            />
            <TrustCell
              icon={<MapPin className="h-5 w-5" />}
              title="Site visited"
              body="Our team walks the parcel. Boundary beacons photographed. No surprise overlaps."
            />
            <TrustCell
              icon={<HandCoins className="h-5 w-5" />}
              title="Seller identity checked"
              body="National ID, KRA PIN, and ownership history confirmed before any deposit moves."
            />
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Something wrong? Report it —{" "}
            <Link
              href="/trust"
              className="font-medium text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
            >
              we take it seriously
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════════════════════ */

function MarketStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-extrabold leading-none tracking-[-0.02em] text-foreground">
        {value}
      </div>
      <div className="mt-2 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Step({
  number,
  icon,
  title,
  body,
  delay = 0,
}: {
  number: number;
  icon: React.ReactNode;
  title: string;
  body: string;
  delay?: number;
}) {
  return (
    <li
      className="group animate-fade-in-up relative flex gap-5 overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="flex shrink-0 flex-col items-center">
        <span className="font-display text-3xl font-extrabold leading-none tracking-[-0.04em] text-muted-foreground/40 transition-colors duration-300 group-hover:text-primary/60">
          0{number}
        </span>
        <span className="mt-3 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-brand">
          {icon}
        </span>
      </div>

      <div className="flex-1 pt-1">
        <h3 className="font-display text-lg font-bold tracking-[-0.015em]">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {body}
        </p>
      </div>
    </li>
  );
}

function TrustCell({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="group relative bg-card p-8 transition-colors duration-300 hover:bg-accent/30">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-brand">
        {icon}
      </div>
      <h3 className="mt-5 font-display text-base font-bold tracking-[-0.01em]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}

function EmptyFeatured() {
  return (
    <div className="mt-14 rounded-2xl border border-dashed border-border bg-card/50 p-16 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10">
        <Sparkles className="h-6 w-6 text-primary" aria-hidden />
      </div>
      <h3 className="mt-4 font-display text-lg font-bold">
        No featured listings yet
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        Be the first to list premium land on ArdhiSoko.
      </p>
      <Button asChild className="mt-6">
        <Link href="/sell">List your land</Link>
      </Button>
    </div>
  );
}