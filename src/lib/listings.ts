import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";

import type { Listing, LandType, ListingFilters } from "./types";

/* ═══════════════════════════════════════════════════════════
   Storage path
   ═══════════════════════════════════════════════════════════ */

const DATA_FILE = path.join(process.cwd(), "src", "data", "listings.json");

/* ═══════════════════════════════════════════════════════════
   Core read — cached per request via React's cache()
   Multiple calls in the same render share one disk read.
   ═══════════════════════════════════════════════════════════ */

export const readAll = cache(async (): Promise<Listing[]> => {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.error("[listings] Data file is not an array:", DATA_FILE);
      return [];
    }
    return parsed as Listing[];
  } catch (err) {
    // File missing or corrupt — degrade gracefully instead of crashing pages
    console.error("[listings] Failed to read listings:", err);
    return [];
  }
});

/* ═══════════════════════════════════════════════════════════
   Queries
   ═══════════════════════════════════════════════════════════ */

export async function getAllListings(): Promise<Listing[]> {
  const all = await readAll();
  // Return a shallow copy, sorted newest first
  return [...all].sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
  );
}

export async function getFeaturedListings(limit = 3): Promise<Listing[]> {
  const all = await readAll();
  return all
    .filter((l) => l.featured)
    .slice(0, limit);
}

export async function getListingBySlug(
  slug: string
): Promise<Listing | undefined> {
  const all = await readAll();
  return all.find((l) => l.slug === slug);
}

export async function getCounties(): Promise<string[]> {
  const all = await readAll();
  return [...new Set(all.map((l) => l.county))].sort();
}

/* ═══════════════════════════════════════════════════════════
   Filtering — county, landType, price, acreage, keyword
   ═══════════════════════════════════════════════════════════ */

export async function filterListings(
  f: ListingFilters
): Promise<Listing[]> {
  const all = await getAllListings();
  const needle = f.q?.trim().toLowerCase();

  return all.filter((l) => {
    if (f.county && l.county !== f.county) return false;
    if (f.landType && l.landType !== f.landType) return false;
    if (f.minPrice && l.priceKes < f.minPrice) return false;
    if (f.maxPrice && l.priceKes > f.maxPrice) return false;
    if (f.minAcreage && l.acreage < f.minAcreage) return false;

    if (needle) {
      const haystack = [
        l.title,
        l.description,
        l.county,
        l.subCounty,
        l.landType,
        l.titleStatus,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(needle)) return false;
    }

    return true;
  });
}

/* ═══════════════════════════════════════════════════════════
   Stats
   ═══════════════════════════════════════════════════════════ */

export interface SiteStats {
  totalListings: number;
  countiesCovered: number;
  totalAcreage: number;
}

export async function getStats(): Promise<SiteStats> {
  const all = await readAll();
  const counties = new Set(all.map((l) => l.county));
  const acreage = all.reduce((sum, l) => sum + l.acreage, 0);
  return {
    totalListings: all.length,
    countiesCovered: counties.size,
    totalAcreage: Math.round(acreage),
  };
}

export interface PopularCounty {
  county: string;
  count: number;
}

export async function getPopularCounties(
  limit = 6
): Promise<PopularCounty[]> {
  const all = await readAll();
  const tally = new Map<string, number>();
  for (const l of all) {
    tally.set(l.county, (tally.get(l.county) ?? 0) + 1);
  }
  return [...tally.entries()]
    .map(([county, count]) => ({ county, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/* ═══════════════════════════════════════════════════════════
   Re-exports — keep imports stable across the app
   ═══════════════════════════════════════════════════════════ */

// Legacy: `formatKes` used to live here. Now lives in `@/lib/format`.
// Re-exporting keeps older imports working while the codebase migrates.
export { formatKes } from "./format";