import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { landTypeLabel } from "@/lib/format";
import type { LandType } from "@/lib/types";

interface FilterBarProps {
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

export function FilterBar({
  popularCounties,
  currentFilters,
}: FilterBarProps) {
  const { county, landType } = currentFilters;

  return (
    <div className="mt-6 space-y-3">
      {/* Land type row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Type
        </span>
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

      {/* County row */}
      {popularCounties.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            County
          </span>
          <FilterChip
            href={buildHref({ ...currentFilters, county: undefined })}
            active={!county}
          >
            All counties
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
      )}
    </div>
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
    <Link href={href} className="shrink-0">
      <Badge
        variant={active ? "default" : "outline"}
        className="cursor-pointer whitespace-nowrap px-3 py-1.5 text-xs font-medium transition-all hover:-translate-y-0.5"
      >
        {children}
      </Badge>
    </Link>
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