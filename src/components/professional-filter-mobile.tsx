"use client";

import * as React from "react";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import type { ProfessionalCategory } from "@/lib/professional-types";

interface ProfessionalFilterMobileProps {
  categories: ProfessionalCategory[];
  counties: string[];
  currentFilters: {
    category?: string;
    county?: string;
    q?: string;
    sort?: string;
  };
}

export function ProfessionalFilterMobile({
  categories,
  counties,
  currentFilters,
}: ProfessionalFilterMobileProps) {
  const { category, county } = currentFilters;
  const activeCount = [category, county].filter(Boolean).length;
  const featuredCategories = categories.filter((c) => c.common);

  return (
    <Sheet>
      <SheetContent side="bottom" size="lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Filter professionals
            {activeCount > 0 && (
              <Badge variant="default" size="sm">
                {activeCount}
              </Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            Narrow down by category and county.
          </SheetDescription>
        </SheetHeader>

        <SheetBody className="space-y-6">
          {/* Category */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Category
            </h3>
            <div className="flex flex-wrap gap-2">
              <FilterChip
                href={buildHref({ ...currentFilters, category: undefined })}
                active={!category}
              >
                All
              </FilterChip>
              {featuredCategories.map((cat) => (
                <FilterChip
                  key={cat.slug}
                  href={buildHref({ ...currentFilters, category: cat.slug })}
                  active={category === cat.slug}
                >
                  {cat.singularName}
                </FilterChip>
              ))}
            </div>
          </div>

          {/* County */}
          {counties.length > 0 && (
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                County
              </h3>
              <div className="flex flex-wrap gap-2">
                <FilterChip
                  href={buildHref({ ...currentFilters, county: undefined })}
                  active={!county}
                >
                  All
                </FilterChip>
                {counties.map((c) => (
                  <FilterChip
                    key={c}
                    href={buildHref({ ...currentFilters, county: c })}
                    active={county === c}
                  >
                    {c}
                  </FilterChip>
                ))}
              </div>
            </div>
          )}
        </SheetBody>

        <SheetFooter>
          {activeCount > 0 && (
            <SheetClose asChild>
              <Button
                asChild
                variant="ghost"
                className="flex-1 sm:flex-none"
              >
                <Link href="/professionals/directory">Clear filters</Link>
              </Button>
            </SheetClose>
          )}
          <SheetClose asChild>
            <Button className="flex-1 shadow-brand sm:flex-none">
              Apply filters
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <SheetClose asChild>
      <Link href={href}>
        <Badge
          variant={active ? "default" : "outline"}
          className="cursor-pointer whitespace-nowrap px-3 py-1.5 text-xs font-medium"
        >
          {children}
        </Badge>
      </Link>
    </SheetClose>
  );
}

function buildHref(sp: {
  category?: string;
  county?: string;
  q?: string;
  sort?: string;
}): string {
  const params = new URLSearchParams();
  if (sp.category) params.set("category", sp.category);
  if (sp.county) params.set("county", sp.county);
  if (sp.q) params.set("q", sp.q);
  if (sp.sort) params.set("sort", sp.sort);
  const qs = params.toString();
  return qs ? `/professionals/directory?${qs}` : "/professionals/directory";
}