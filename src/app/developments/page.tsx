import Link from "next/link";
import { Building2, ArrowRight, MapPin } from "lucide-react";

import { Container } from "@/components/ui/container";
import { DevelopmentCard } from "@/components/development-card";
import { getAllDevelopmentsWithMeta } from "@/lib/developments";

export const metadata = {
  title: "Developments",
  description:
    "Browse master-planned residential and commercial developments across Kenya. Multi-plot estates with ready titles, amenities, and flexible plot sizes.",
  alternates: { canonical: "/developments" },
  openGraph: {
    title: "Developments — ArdhiSoko",
    description:
      "Master-planned estates across Kenya. Plots from 50x100 to 1 acre.",
    url: "/developments",
  },
};

export default async function DevelopmentsPage() {
  const all = await getAllDevelopmentsWithMeta();
  const selling = all.filter((d) => d.development.status === "selling");
  const counties = [
    ...new Set(selling.map((d) => d.development.county)),
  ].sort();

  return (
    <>
      {/* HERO */}
      <section className="bg-hero bg-grain">
        <Container className="pb-16 pt-16 lg:pb-20 lg:pt-24">
          <div className="max-w-3xl">
            <span className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Building2 className="h-3.5 w-3.5" aria-hidden />
              Master-planned estates across Kenya
            </span>

            <h1 className="animate-fade-in-up delay-75 mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Find your{" "}
              <span className="text-gradient-brand">development.</span>
            </h1>

            <p className="animate-fade-in-up delay-150 mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Gated communities, serviced plots, and master-planned estates.
              Compare projects side by side and see live inventory.
            </p>

            <dl className="animate-fade-in-up delay-300 mt-10 grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-3">
              <Stat value={selling.length} label="Active developments" />
              <Stat value={counties.length} label="Counties covered" />
              <Stat
                value={selling.reduce(
                  (sum, d) => sum + d.stats.availablePlots,
                  0
                )}
                label="Plots available"
              />
            </dl>
          </div>
        </Container>
      </section>

      {/* GRID */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Active developments
              </h2>
              <p className="mt-2 text-muted-foreground">
                {selling.length}{" "}
                {selling.length === 1 ? "development" : "developments"}{" "}
                currently selling
              </p>
            </div>
          </div>

          {selling.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 p-16 text-center">
              <Building2
                className="mx-auto h-8 w-8 text-muted-foreground"
                aria-hidden
              />
              <h3 className="mt-4 font-display text-lg font-bold">
                No active developments yet
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                Check back soon or browse individual land listings.
              </p>
              <Link
                href="/listings"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Browse listings
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {selling.map((item, i) => (
                <div
                  key={item.development.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
                >
                  <DevelopmentCard
                    development={item.development}
                    stats={item.stats}
                    priority={i < 3}
                  />
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t bg-background-subtle py-16 lg:py-20">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Are you a developer?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                List your development on ArdhiSoko. Manage inventory, receive
                enquiries, and reach buyers nationwide.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-brand transition-all hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Talk to us
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-extrabold tracking-tight text-primary">
        {value}
      </div>
      <div className="mt-1 text-sm font-medium text-foreground">{label}</div>
    </div>
  );
}