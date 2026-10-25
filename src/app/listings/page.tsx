import Link from "next/link";
import { Metadata } from "next";
import { Search, X, SlidersHorizontal, ArrowRight } from "lucide-react";

import { ListingCard } from "@/components/listing-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { FilterBar } from "@/components/filter-bar";
import { SortSelect } from "@/components/sort-select";
import { MobileFilterSheet } from "@/components/mobile-filter-sheet";
import {
  filterListings,
  getAllListings,
  getCounties,
  getPopularCounties,
} from "@/lib/listings";
import { formatNumber } from "@/lib/format";
import type { LandType, ListingFilters } from "@/lib/types";

/* ═══════════════════════════════════════════════════════════
   Search params
   ═══════════════════════════════════════════════════════════ */

interface SearchParams {
  county?: string;
  landType?: LandType;
  minPrice?: string;
  maxPrice?: string;
  minAcreage?: string;
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
  if (sp.landType) parts.push(sp.landType);
  if (sp.county) parts.push(`in ${sp.county}`);
  if (sp.q) parts.push(`matching “${sp.q}”`);

  const title = parts.length
    ? `Land ${parts.join(" ")}`
    : "Browse land in Kenya";

  const description = sp.county
    ? `Verified land listings in ${sp.county}, Kenya. Plots, farms, ranches, and commercial parcels with title deeds you can trust.`
    : "Browse verified land across all 47 Kenyan counties. Plots, farms, ranches, and commercial parcels.";

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonical(sp),
    },
    openGraph: {
      title,
      description,
      url: buildCanonical(sp),
    },
  };
}

function buildCanonical(sp: SearchParams): string {
  const params = new URLSearchParams();
  if (sp.county) params.set("county", sp.county);
  if (sp.landType) params.set("landType", sp.landType);
  if (sp.q) params.set("q", sp.q);
  if (sp.sort) params.set("sort", sp.sort);
  const qs = params.toString();
  return qs ? `/listings?${qs}` : "/listings";
}

/* ═══════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════ */

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);

  const filters: ListingFilters = {
    county: sp.county,
    landType: sp.landType,
    minPrice: sp.minPrice ? Number(sp.minPrice) : undefined,
    maxPrice: sp.maxPrice ? Number(sp.maxPrice) : undefined,
    minAcreage: sp.minAcreage ? Number(sp.minAcreage) : undefined,
    q: sp.q,
  };

  const [allResults, counties, popular, total] = await Promise.all([
    filterListings(filters),
    getCounties(),
    getPopularCounties(10),
    getAllListings().then((l) => l.length),
  ]);

  const sorted = sortListings(allResults, sp.sort);
  const paginated = sorted.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < sorted.length;

  const activeFilters = buildActiveFilters(sp);
  const hasActiveFilters = activeFilters.length > 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Land listings on ArdhiSoko",
    numberOfItems: sorted.length,
    itemListElement: paginated.slice(0, 20).map((listing, i) => ({
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

      <Container className="py-10 lg:py-14">
        {/* ═══════════════════════════════════════════════════
            HEADER
            ═══════════════════════════════════════════════════ */}
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              {sp.q ? (
                <>
                  Results for{" "}
                  <span className="text-gradient-brand">“{sp.q}”</span>
                </>
              ) : sp.county ? (
                <>
                  Land in{" "}
                  <span className="text-gradient-brand">{sp.county}</span>
                </>
              ) : (
                "Browse land in Kenya"
              )}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {formatNumber(sorted.length)}{" "}
              {sorted.length === 1 ? "listing" : "listings"}
              {sp.county ? ` in ${sp.county}` : ""}
              {sorted.length !== total && ` · ${formatNumber(total)} total`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile: filters sheet trigger */}
            <MobileFilterSheet
              counties={counties}
              popularCounties={popular.map((p) => p.county)}
              currentFilters={sp}
            />

            {/* Desktop: sort select */}
            <div className="hidden sm:block">
              <SortSelect value={sp.sort ?? "newest"} />
            </div>
          </div>
        </header>

        {/* ═══════════════════════════════════════════════════
            FILTER BAR
            ═══════════════════════════════════════════════════ */}
        <FilterBar
          counties={counties}
          popularCounties={popular.map((p) => p.county)}
          currentFilters={sp}
        />

        {/* ═══════════════════════════════════════════════════
            ACTIVE FILTERS
            ═══════════════════════════════════════════════════ */}
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
              href="/listings"
              className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Clear all
            </Link>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════
            RESULTS
            ═══════════════════════════════════════════════════ */}
        {paginated.length === 0 ? (
          <EmptyState searchParams={sp} />
        ) : (
          <>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((l, i) => (
                <div
                  key={l.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
                >
                  <ListingCard listing={l} priority={i < 3} />
                </div>
              ))}
            </div>

            {/* Load more */}
            {hasMore && (
              <div className="mt-12 text-center">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                >
                  <Link href={buildPageHref(sp, page + 1)}>
                    Load more listings
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
   Helpers
   ═══════════════════════════════════════════════════════════ */

function sortListings<T extends { priceKes: number; acreage: number; createdAt: string }>(
  listings: T[],
  sort?: string
): T[] {
  const sorted = [...listings];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.priceKes - b.priceKes);
    case "price-desc":
      return sorted.sort((a, b) => b.priceKes - a.priceKes);
    case "acreage-asc":
      return sorted.sort((a, b) => a.acreage - b.acreage);
    case "acreage-desc":
      return sorted.sort((a, b) => b.acreage - a.acreage);
    case "newest":
    default:
      return sorted.sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
      );
  }
}

function buildActiveFilters(sp: SearchParams) {
  const filters: { key: string; label: string; removeHref: string }[] = [];

  if (sp.county) {
    filters.push({
      key: "county",
      label: sp.county,
      removeHref: buildHref({ ...sp, county: undefined }),
    });
  }
  if (sp.landType) {
    filters.push({
      key: "landType",
      label: sp.landType,
      removeHref: buildHref({ ...sp, landType: undefined }),
    });
  }
  if (sp.q) {
    filters.push({
      key: "q",
      label: `“${sp.q}”`,
      removeHref: buildHref({ ...sp, q: undefined }),
    });
  }
  if (sp.minPrice || sp.maxPrice) {
    filters.push({
      key: "price",
      label: `KES ${sp.minPrice ?? "0"}–${sp.maxPrice ?? "∞"}`,
      removeHref: buildHref({ ...sp, minPrice: undefined, maxPrice: undefined }),
    });
  }
  if (sp.minAcreage) {
    filters.push({
      key: "minAcreage",
      label: `≥ ${sp.minAcreage} acres`,
      removeHref: buildHref({ ...sp, minAcreage: undefined }),
    });
  }

  return filters;
}

function buildHref(sp: Partial<SearchParams>): string {
  const params = new URLSearchParams();
  if (sp.county) params.set("county", sp.county);
  if (sp.landType) params.set("landType", sp.landType);
  if (sp.minPrice) params.set("minPrice", sp.minPrice);
  if (sp.maxPrice) params.set("maxPrice", sp.maxPrice);
  if (sp.minAcreage) params.set("minAcreage", sp.minAcreage);
  if (sp.q) params.set("q", sp.q);
  if (sp.sort) params.set("sort", sp.sort);
  const qs = params.toString();
  return qs ? `/listings?${qs}` : "/listings";
}

function buildPageHref(sp: SearchParams, page: number): string {
  return buildHref({ ...sp, page: String(page) });
}

/* ═══════════════════════════════════════════════════════════
   Empty state
   ═══════════════════════════════════════════════════════════ */

function EmptyState({ searchParams }: { searchParams: SearchParams }) {
  const hasFilters = Boolean(
    searchParams.county ||
      searchParams.landType ||
      searchParams.q ||
      searchParams.minPrice ||
      searchParams.maxPrice
  );

  return (
    <div className="mt-16 rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center sm:p-16">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10">
        <Search className="h-6 w-6 text-primary" aria-hidden />
      </div>
      <h2 className="mt-4 font-display text-xl font-bold">
        No listings match those filters
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {hasFilters
          ? "Try removing a filter, or browse all listings below."
          : "No listings yet. Be the first to list land on ArdhiSoko."}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {hasFilters && (
          <Button asChild variant="outline">
            <Link href="/listings">
              <X className="mr-1.5 h-4 w-4" aria-hidden />
              Clear filters
            </Link>
          </Button>
        )}
        <Button asChild className="shadow-brand">
          <Link href="/sell">
            List your land
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>

      {/* Suggestions */}
      <div className="mt-10 border-t pt-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Popular searches
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { label: "Kiambu plots", href: "/listings?county=Kiambu&landType=plot" },
            { label: "Nakuru farms", href: "/listings?county=Nakuru&landType=agricultural" },
            { label: "Nairobi residential", href: "/listings?county=Nairobi&landType=residential" },
            { label: "Laikipia ranches", href: "/listings?county=Laikipia&landType=ranch" },
          ].map((s) => (
            <Link key={s.href} href={s.href}>
              <Badge variant="outline" className="cursor-pointer px-3 py-1.5 text-xs">
                {s.label}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}