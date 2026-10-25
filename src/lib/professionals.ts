import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";

import type {
  Professional,
  ProfessionalCategory,
} from "./professional-types";

const DATA_DIR = path.join(process.cwd(), "src", "data");

/* ── Categories ─────────────────────────────────────────── */

export const getCategories = cache(
  async (): Promise<ProfessionalCategory[]> => {
    try {
      const raw = await fs.readFile(
        path.join(DATA_DIR, "professional-categories.json"),
        "utf-8"
      );
      return JSON.parse(raw) as ProfessionalCategory[];
    } catch {
      return [];
    }
  }
);

export async function getCategoryBySlug(
  slug: string
): Promise<ProfessionalCategory | undefined> {
  const all = await getCategories();
  return all.find((c) => c.slug === slug);
}

export async function getCategoryById(
  id: string
): Promise<ProfessionalCategory | undefined> {
  const all = await getCategories();
  return all.find((c) => c.id === id);
}

/* ── Professionals ──────────────────────────────────────── */

export const getAllProfessionals = cache(
  async (): Promise<Professional[]> => {
    try {
      const raw = await fs.readFile(
        path.join(DATA_DIR, "professionals.json"),
        "utf-8"
      );
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed as Professional[];
    } catch {
      return [];
    }
  }
);

export async function getProfessionalBySlug(
  slug: string
): Promise<Professional | undefined> {
  const all = await getAllProfessionals();
  return all.find((p) => p.slug === slug);
}

/* ── Filtering / matching ───────────────────────────────── */

export interface ProfessionalFilters {
  categoryId?: string;
  county?: string;
  featured?: boolean;
  verified?: boolean;
}

export async function filterProfessionals(
  f: ProfessionalFilters
): Promise<Professional[]> {
  const all = await getAllProfessionals();

  return all.filter((p) => {
    if (p.verificationStatus !== "approved") return false;
    if (f.categoryId && p.categoryId !== f.categoryId) return false;
    if (f.county) {
      const inBase = p.baseCounty === f.county;
      const inWorking = p.workingCounties.includes(f.county);
      if (!inBase && !inWorking) return false;
    }
    if (f.featured && !p.featured) return false;
    return true;
  });
}

export function sortProfessionals(list: Professional[]): Professional[] {
  return [...list].sort((a, b) => {
    // Featured first
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    // Then active subscribers
    const aActive = a.subscriptionStatus === "active" ? 1 : 0;
    const bActive = b.subscriptionStatus === "active" ? 1 : 0;
    if (aActive !== bActive) return bActive - aActive;
    // Then most recently updated
    return +new Date(b.updatedAt) - +new Date(a.updatedAt);
  });
}

/* ── Stats ──────────────────────────────────────────────── */

export interface ProfessionalStats {
  totalProfessionals: number;
  totalCategories: number;
  activeCounties: number;
  activeSubscribers: number;
}

export async function getProfessionalStats(): Promise<ProfessionalStats> {
  const all = await getAllProfessionals();
  const approved = all.filter((p) => p.verificationStatus === "approved");
  const categories = await getCategories();
  const counties = new Set<string>();
  for (const p of approved) {
    counties.add(p.baseCounty);
    p.workingCounties.forEach((c) => counties.add(c));
  }
  return {
    totalProfessionals: approved.length,
    totalCategories: categories.length,
    activeCounties: counties.size,
    activeSubscribers: approved.filter(
      (p) => p.subscriptionStatus === "active"
    ).length,
  };
}

/* ── Formatters ─────────────────────────────────────────── */

export function formatPhone(countryCode: string, phone: string): string {
  return `${countryCode} ${phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")}`;
}

export function whatsappLink(countryCode: string, phone: string): string {
  const digits = (countryCode + phone).replace(/[^\d]/g, "");
  return `https://wa.me/${digits}`;
}