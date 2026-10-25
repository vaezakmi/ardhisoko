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
import { landTypeLabel } from "@/lib/format";
import type { LandType } from "@/lib/types";

interface MobileFilterSheetProps {
  counties: string[];
  popularCounties: string[];
  currentFilters: {
    county?: string;
    landType?: LandType;
    q?: string;
    sort?: string;
  };
}

const LAND_TYPES: LandType[] = [
  "residential",
  "agricultural",
  "commercial",
  "plot",
  "ranch",
];

export function MobileFilterSheet({
  popularCounties,
  currentFilters,
}: MobileFilterSheetProps) {
  const { county, landType } = currentFilters;
  const activeCount = [county, landType].filter(Boolean).length;

  return (
    <Sheet>
      <SheetContent side="bottom" size="lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Filter listings
            {activeCount > 0 && (
              <Badge variant="default" size="sm">
                {activeCount}
              </Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            Narrow down by land type and county.
          </SheetDescription>
        </SheetHeader>

        <SheetBody className="space-y-6">
          {/* Land type */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Land type
            </h3>
            <div className="flex flex-wrap gap-2">
              <FilterChip
                href={buildHref({ ...currentFilters, landType: undefined })}
                active={!landType}
              >
                All
              </FilterChip>
              {LAND_TYPES.map((t) => (
                <FilterChip
                  key={t}
                  href={buildHref({ ...currentFilters, landType: t })}
                  active={landType === t}
                >
                  {landTypeLabel[t] ?? t}
                </FilterChip>
              ))}
            </div>
          </div>

          {/* County */}
          {popularCounties.length > 0 && (
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
                {popularCounties.map((c) => (
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
              <Button variant="ghost" className="flex-1 sm:flex-none">
                Clear filters
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
  county?: string;
  landType?: string;
  q?: string;
  sort?: string;
}): string {
  const params = new URLSearchParams();
  if (sp.county) params.set("county", sp.county);
  if (sp.landType) params.set("landType", sp.landType);
  if (sp.q) params.set("q", sp.q);
  if (sp.sort) params.set("sort", sp.sort);
  const qs = params.toString();
  return qs ? `/listings?${qs}` : "/listings";
}