import Link from "next/link";
import { Metadata } from "next";
import {
  Search,
  X,
  SlidersHorizontal,
  ArrowRight,
  Users,
  ArrowLeft,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProfessionalCard } from "@/components/professional-card";
import { ProfessionalFilterBar } from "@/components/professional-filter-bar";
import { ProfessionalSortSelect } from "@/components/professional-sort-select";
import { ProfessionalFilterMobile } from "@/components/professional-filter-mobile";
import {
  getAllProfessionals,
  getCategories,
  sortProfessionals,
} from "@/lib/professionals";
import type { Professional } from "@/lib/professional-types";
import { formatNumber } from "@/lib/format";

/* ═══════════════════════════════════════════════════════════
   Search params
   ═══════════════════════════════════════════════════════════ */

interface SearchParams {
  category?: string;
  county?: string;
  q?: string;
  sort?: string;
  page?: string;
}

const PAGE_SIZE = 12;

/* ═══════════════════════════════════════════════════════════
   Metadata — dynamic per filter
   ═══════════════════════════════════════════════════════════ */

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const parts: string[] = [];

  if (sp.category) parts.push(sp.category.replace(/-/g, " "));
  if (sp.county) parts.push(`in ${sp.county}`);

  const title = parts.length
    ? `${capitalize(parts.join(" "))} — Professionals`
    : "All professionals";

  const description = sp.county
    ? `Verified land and property professionals in ${sp.county}, Kenya. Surveyors, valuers, advocates, architects, engineers.`
    : "Browse all verified professionals on ArdhiSoko — land surveyors, property valuers, advocates, architects, and engineers across Kenya.";

  const params = new URLSearchParams();
  if (sp.category) params.set("category", sp.category);
  if (sp.county) params.set("county", sp.county);
  if (sp.q) params.set("q", sp.q);
  if (sp.sort) params.set("sort", sp.sort);
  const qs = params.toString();

  return {
    title,
    description,
    alternates: { canonical: qs ? `/professionals/directory?${qs}` : "/professionals/directory" },
    openGraph: { title, description },
  };
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ═══════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════ */

export const dynamic = "force-dynamic";

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);

  const [categories, allProfessionals] = await Promise.all([
    getCategories(),
    getAllProfessionals(),
  ]);

  // Only approved show in directory
  const approved = allProfessionals.filter(
    (p) => p.verificationStatus === "approved"
  );

  // Filter
  const filtered = applyFilters(approved, categories, sp);

  // Sort
  const sorted = sortProfessionals(filtered);

  // Paginate
  const paginated = sorted.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < sorted.length;

  // Active filters
  const activeFilters = buildActiveFilters(sp, categories);
  const hasActiveFilters = activeFilters.length > 0;

  // Distinct counties for filter bar
  const counties = [
    ...new Set(approved.flatMap((p) => [p.baseCounty, ...p.workingCounties])),
  ].sort();

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Professionals on ArdhiSoko",
    numberOfItems: sorted.length,
    itemListElement: paginated.slice(0, 20).map((pro, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `/professionals/profile/${pro.slug}`,
      name: pro.fullName,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="py-10 lg:py-14">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/professionals"
                className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                Professionals
              </Link>
            </li>
            <li aria-hidden className="text-muted-foreground/50">
              /
            </li>
            <li
              className="font-medium text-foreground"
              aria-current="page"
            >
              Directory
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              {sp.q ? (
                <>
                  Results for{" "}
                  <span className="text-gradient-brand">
                    &ldquo;{sp.q}&rdquo;
                  </span>
                </>
              ) : sp.county ? (
                <>
                  Professionals in{" "}
                  <span className="text-gradient-brand">{sp.county}</span>
                </>
              ) : (
                "All professionals"
              )}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {formatNumber(sorted.length)}{" "}
              {sorted.length === 1 ? "professional" : "professionals"}
              {sp.county ? ` in ${sp.county}` : ""}
              {sorted.length !== approved.length &&
                ` · ${formatNumber(approved.length)} total`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile filters */}
            <ProfessionalFilterMobile
              categories={categories}
              counties={counties}
              currentFilters={sp}
            />

            {/* Desktop sort */}
            <div className="hidden sm:block">
              <ProfessionalSortSelect value={sp.sort ?? "featured"} />
            </div>
          </div>
        </header>

        {/* Filter bar (desktop) */}
        <ProfessionalFilterBar
          categories={categories}
          counties={counties}
          currentFilters={sp}
        />

        {/* Active filters */}
        {hasActiveFilters && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Filters
            </span>
            {activeFilters.map((f) => (
              <Link
                key={f.key}
                href={f.removeHref}
                className="group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 py-1 pl-3 pr-2 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
              >
                {f.label}
                <span className="grid h-4 w-4 place-items-center rounded-full bg-primary/15 transition-colors group-hover:bg-primary/25">
                  <X className="h-2.5 w-2.5" aria-hidden />
                </span>
              </Link>
            ))}

            <Link
              href="/professionals/directory"
              className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Clear all
            </Link>
          </div>
        )}

        {/* Results */}
        {paginated.length === 0 ? (
          <EmptyState hasFilters={hasActiveFilters} />
        ) : (
          <>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((pro, i) => {
                const cat = categories.find((c) => c.id === pro.categoryId);
                if (!cat) return null;
                return (
                  <div
                    key={pro.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
                  >
                    <ProfessionalCard
                      professional={pro}
                      category={cat}
                      priority={i < 3}
                    />
                  </div>
                );
              })}
            </div>

            {hasMore && (
              <div className="mt-12 text-center">
                <Button asChild variant="outline" size="lg">
                  <Link href={buildPageHref(sp, page + 1)}>
                    Load more professionals
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  Showing {paginated.length} of {sorted.length}
                </p>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Filtering
   ═══════════════════════════════════════════════════════════ */

function applyFilters(
  professionals: Professional[],
  categories: { id: string; slug: string }[],
  sp: SearchParams
): Professional[] {
  let result = professionals;

  if (sp.category) {
    const cat = categories.find((c) => c.slug === sp.category);
    if (cat) {
      result = result.filter((p) => p.categoryId === cat.id);
    }
  }

  if (sp.county) {
    result = result.filter(
      (p) =>
        p.baseCounty === sp.county ||
        p.workingCounties.includes(sp.county!)
    );
  }

  if (sp.q) {
    const needle = sp.q.toLowerCase();
    result = result.filter((p) => {
      const haystack = [
        p.fullName,
        p.companyName ?? "",
        p.bio,
        p.baseCounty,
        ...p.workingCounties,
        ...p.services,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }

  return result;
}

/* ═══════════════════════════════════════════════════════════
   Active filters
   ═══════════════════════════════════════════════════════════ */

function buildActiveFilters(
  sp: SearchParams,
  categories: { slug: string; singularName: string }[]
) {
  const filters: { key: string; label: string; removeHref: string }[] = [];

  if (sp.category) {
    const cat = categories.find((c) => c.slug === sp.category);
    filters.push({
      key: "category",
      label: cat?.singularName ?? sp.category,
      removeHref: buildHref({ ...sp, category: undefined }),
    });
  }

  if (sp.county) {
    filters.push({
      key: "county",
      label: sp.county,
      removeHref: buildHref({ ...sp, county: undefined }),
    });
  }

  if (sp.q) {
    filters.push({
      key: "q",
      label: `&ldquo;${sp.q}&rdquo;`,
      removeHref: buildHref({ ...sp, q: undefined }),
    });
  }

  return filters;
}

function buildHref(sp: Partial<SearchParams>): string {
  const params = new URLSearchParams();
  if (sp.category) params.set("category", sp.category);
  if (sp.county) params.set("county", sp.county);
  if (sp.q) params.set("q", sp.q);
  if (sp.sort) params.set("sort", sp.sort);
  const qs = params.toString();
  return qs ? `/professionals/directory?${qs}` : "/professionals/directory";
}

function buildPageHref(sp: SearchParams, page: number): string {
  return buildHref({ ...sp, page: String(page) });
}

/* ═══════════════════════════════════════════════════════════
   Empty state
   ═══════════════════════════════════════════════════════════ */

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="mt-16 rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center sm:p-16">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10">
        <Users className="h-6 w-6 text-primary" aria-hidden />
      </div>
      <h2 className="mt-4 font-display text-xl font-bold">
        No professionals match
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {hasFilters
          ? "Try removing a filter, or browse all professionals."
          : "No professionals listed yet. Be the first to register."}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {hasFilters ? (
          <Button asChild variant="outline">
            <Link href="/professionals/directory">
              <X className="mr-1.5 h-4 w-4" aria-hidden />
              Clear filters
            </Link>
          </Button>
        ) : (
          <Button asChild variant="outline">
            <Link href="/professionals">
              <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden />
              Back to overview
            </Link>
          </Button>
        )}
        <Button asChild className="shadow-brand">
          <Link href="/professionals/register">
            Register as a professional
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </div>
  );
}