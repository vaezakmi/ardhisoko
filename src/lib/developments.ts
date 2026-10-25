import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";

import type {
  Company,
  Development,
  ListingGroup,
  InventoryItem,
} from "./development-types";

const DATA_DIR = path.join(process.cwd(), "src", "data");

/* ── Read helpers (cached per request) ───────────────────── */

const readJson = cache(async <T>(filename: string): Promise<T[]> => {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, filename), "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch (err) {
    console.error(`[developments] Failed to read ${filename}:`, err);
    return [];
  }
});

/* ── Companies ───────────────────────────────────────────── */

export const getCompanies = cache(async (): Promise<Company[]> => {
  return readJson<Company>("companies.json");
});

export async function getCompanyById(id: string): Promise<Company | undefined> {
  const all = await getCompanies();
  return all.find((c) => c.id === id);
}

export async function getCompanyBySlug(slug: string): Promise<Company | undefined> {
  const all = await getCompanies();
  return all.find((c) => c.slug === slug);
}

/* ── Developments ────────────────────────────────────────── */

export const getAllDevelopments = cache(async (): Promise<Development[]> => {
  const all = await readJson<Development>("developments.json");
  return [...all].sort(
    (a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)
  );
});

export async function getDevelopmentBySlug(
  slug: string
): Promise<Development | undefined> {
  const all = await getAllDevelopments();
  return all.find((d) => d.slug === slug);
}

export async function getFeaturedDevelopments(
  limit = 4
): Promise<Development[]> {
  const all = await getAllDevelopments();
  return all.filter((d) => d.featured && d.status === "selling").slice(0, limit);
}

/* ── Listing groups ──────────────────────────────────────── */

export const getAllListingGroups = cache(async (): Promise<ListingGroup[]> => {
  return readJson<ListingGroup>("listing-groups.json");
});

export async function getGroupsByDevelopment(
  developmentId: string
): Promise<ListingGroup[]> {
  const all = await getAllListingGroups();
  return all.filter((g) => g.developmentId === developmentId);
}

/* ── Inventory ───────────────────────────────────────────── */

export const getAllInventory = cache(async (): Promise<InventoryItem[]> => {
  return readJson<InventoryItem>("inventory.json");
});

export async function getInventoryByGroup(
  groupId: string
): Promise<InventoryItem[]> {
  const all = await getAllInventory();
  return all.filter((i) => i.listingGroupId === groupId);
}

export async function getInventoryByDevelopment(
  developmentId: string
): Promise<InventoryItem[]> {
  const groups = await getGroupsByDevelopment(developmentId);
  const all = await getAllInventory();
  const groupIds = new Set(groups.map((g) => g.id));
  return all.filter((i) => groupIds.has(i.listingGroupId));
}

/* ── Summary stats for a development ─────────────────────── */

export interface DevelopmentStats {
  totalPlots: number;
  availablePlots: number;
  reservedPlots: number;
  soldPlots: number;
  acreageTotal: number;
  groupsCount: number;
}

export async function getDevelopmentStats(
  developmentId: string
): Promise<DevelopmentStats> {
  const [groups, inventory] = await Promise.all([
    getGroupsByDevelopment(developmentId),
    getInventoryByDevelopment(developmentId),
  ]);

  const availablePlots = inventory.filter((i) => i.status === "available").length;
  const reservedPlots = inventory.filter((i) => i.status === "reserved").length;
  const soldPlots = inventory.filter((i) => i.status === "sold").length;

  return {
    totalPlots: inventory.length,
    availablePlots,
    reservedPlots,
    soldPlots,
    acreageTotal: inventory.reduce((sum, i) => sum + i.acreage, 0),
    groupsCount: groups.length,
  };
}

/* ── Aggregate for browse page ───────────────────────────── */

export interface DevelopmentWithMeta {
  development: Development;
  company: Company;
  stats: DevelopmentStats;
}

export async function getAllDevelopmentsWithMeta(): Promise<
  DevelopmentWithMeta[]
> {
  const developments = await getAllDevelopments();
  const companies = await getCompanies();

  const results: DevelopmentWithMeta[] = [];

  for (const development of developments) {
    const company = companies.find((c) => c.id === development.companyId);
    if (!company) continue;
    const stats = await getDevelopmentStats(development.id);
    results.push({ development, company, stats });
  }

  return results;
}