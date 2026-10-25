import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { ProfessionalCategory } from "@/lib/professional-types";

interface ProfessionalFilterBarProps {
  categories: ProfessionalCategory[];
  counties: string[];
  currentFilters: {
    category?: string;
    county?: string;
    q?: string;
    sort?: string;
  };
}

export function ProfessionalFilterBar({
  categories,
  counties,
  currentFilters,
}: ProfessionalFilterBarProps) {
  const { category, county } = currentFilters;

  // Only show common categories as chips; rest are accessible via search
  const featuredCategories = categories.filter((c) => c.common);

  return (
    <div className="mt-6 space-y-3">
      {/* Category row */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
        <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Category
        </span>
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

      {/* County row */}
      {counties.length > 0 && (
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
          <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            County
          </span>
          <FilterChip
            href={buildHref({ ...currentFilters, county: undefined })}
            active={!county}
          >
            All counties
          </FilterChip>
          {counties.slice(0, 12).map((c) => (
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