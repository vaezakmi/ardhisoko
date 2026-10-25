import Link from "next/link";
import {
  ArrowRight,
  Ruler,
  Calculator,
  Scale,
  PencilRuler,
  HardHat,
  ArrowUpRight,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getCategories,
  getAllProfessionals,
} from "@/lib/professionals";
import { ProfessionalCard } from "@/components/professional-card";

const FEATURED_CATEGORY_SLUGS = [
  "land-surveyors",
  "property-valuers",
  "property-advocates",
  "architects",
];

const ICONS: Record<string, React.ReactNode> = {
  Ruler: <Ruler className="h-5 w-5" />,
  Calculator: <Calculator className="h-5 w-5" />,
  Scale: <Scale className="h-5 w-5" />,
  PencilRuler: <PencilRuler className="h-5 w-5" />,
  HardHat: <HardHat className="h-5 w-5" />,
};

export async function HomeProfessionalsSection() {
  const [categories, professionals] = await Promise.all([
    getCategories(),
    getAllProfessionals(),
  ]);

  // Top 4 featured professionals for the grid
  const featuredPros = professionals
    .filter((p) => p.verificationStatus === "approved" && p.featured)
    .slice(0, 3);

  // Featured categories for the strip
  const featuredCategories = categories.filter((c) =>
    FEATURED_CATEGORY_SLUGS.includes(c.slug)
  );

  // Count professionals per category
  const countsByCategory: Record<string, number> = {};
  for (const p of professionals) {
    if (p.verificationStatus !== "approved") continue;
    countsByCategory[p.categoryId] = (countsByCategory[p.categoryId] ?? 0) + 1;
  }

  return (
    <section className="relative isolate overflow-hidden py-24 lg:py-32">
      {/* Ambient ember glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 40% at 15% 50%, color-mix(in oklab, var(--primary) 6%, transparent) 0%, transparent 70%)",
        }}
      />

      <Container>
        {/* Asymmetric header */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary dark:drop-shadow-[0_0_12px_rgba(255,165,61,0.4)]">
              <HardHat className="h-3.5 w-3.5" />
              Find a professional
            </div>
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
              Bought land?
              <br />
              <span className="text-muted-foreground">
                Now you need the right people.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2 lg:text-right">
            <p className="text-muted-foreground">
              Verified surveyors, valuers, advocates, architects, and engineers
              — every one vetted by our team.
            </p>
            <Button
              variant="ghost"
              asChild
              className="mt-4 hidden hover:text-primary lg:inline-flex"
            >
              <Link href="/professionals">
                Browse all professionals
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Category strip */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((cat, i) => {
            const count = countsByCategory[cat.id] ?? 0;
            return (
              <Link
                key={cat.id}
                href={`/professionals/${cat.slug}`}
                className="
                  group animate-fade-in-up relative flex items-start gap-3
                  overflow-hidden rounded-2xl border border-border bg-card p-4
                  shadow-xs transition-all duration-300 ease-out-soft
                  hover:-translate-y-1 hover:border-border-ember hover:shadow-md
                  dark:hover:shadow-[0_0_24px_rgba(255,165,61,0.12)]
                "
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-brand dark:group-hover:shadow-glow">
                  {ICONS[cat.icon] ?? <HardHat className="h-5 w-5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-sm font-bold leading-tight">
                    {cat.singularName}
                  </h3>
                  {count > 0 ? (
                    <p className="mt-0.5 text-xs font-medium text-primary">
                      {count} verified
                    </p>
                  ) : (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Available
                    </p>
                  )}
                </div>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100"
                  aria-hidden
                />
              </Link>
            );
          })}
        </div>

        {/* Featured professionals */}
        {featuredPros.length > 0 && (
          <div className="mt-14">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <h3 className="font-display text-lg font-bold tracking-tight">
                Top-rated professionals this month
              </h3>
              <Link
                href="/professionals"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPros.map((pro, i) => {
                const cat = categories.find((c) => c.id === pro.categoryId);
                if (!cat) return null;
                return (
                  <div
                    key={pro.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <ProfessionalCard
                      professional={pro}
                      category={cat}
                      priority={i === 0}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="outline">
            <Link href="/professionals">
              Browse all professionals
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild className="shadow-brand dark:shadow-glow">
            <Link href="/professionals/request">
              Request a professional
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}