import Link from "next/link";
import {
  Ruler,
  Calculator,
  Scale,
  PencilRuler,
  HardHat,
  Mountain,
  Map,
  Hammer,
  Leaf,
  Briefcase,
} from "lucide-react";

import type { ProfessionalCategory } from "@/lib/professional-types";

const ICONS: Record<string, React.ReactNode> = {
  Ruler: <Ruler className="h-5 w-5" />,
  Calculator: <Calculator className="h-5 w-5" />,
  Scale: <Scale className="h-5 w-5" />,
  PencilRuler: <PencilRuler className="h-5 w-5" />,
  HardHat: <HardHat className="h-5 w-5" />,
  Mountain: <Mountain className="h-5 w-5" />,
  Map: <Map className="h-5 w-5" />,
  Hammer: <Hammer className="h-5 w-5" />,
  Leaf: <Leaf className="h-5 w-5" />,
  Briefcase: <Briefcase className="h-5 w-5" />,
};

interface CategoryGridProps {
  categories: ProfessionalCategory[];
  /** Optional counts per category id */
  counts?: Record<string, number>;
}

export function CategoryGrid({ categories, counts }: CategoryGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => {
        const count = counts?.[cat.id] ?? 0;
        const isComingSoon = count === 0;

        return (
          <Link
            key={cat.id}
            href={`/professionals/${cat.slug}`}
            className="group rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                {ICONS[cat.icon] ?? <Briefcase className="h-5 w-5" />}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-base font-bold leading-tight">
                  {cat.pluralName}
                </h3>
                {count > 0 ? (
                  <p className="mt-0.5 text-xs font-medium text-primary">
                    {count} available
                  </p>
                ) : (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Coming soon
                  </p>
                )}
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {cat.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
}