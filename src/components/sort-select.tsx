"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowDownWideNarrow } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════
   Sort options
   ═══════════════════════════════════════════════════════════ */

const SORTS = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "acreage-desc", label: "Acreage: large first" },
  { value: "acreage-asc", label: "Acreage: small first" },
] as const;

const DEFAULT_SORT = "newest" satisfies SortValue;

type SortValue = (typeof SORTS)[number]["value"];

/**
 * Type guard that also accepts `null` — Base UI's Select can emit
 * `null` when a value is cleared.
 */
function isValidSort(value: string | null | undefined): value is SortValue {
  if (!value) return false;
  return SORTS.some((s) => s.value === value);
}

/* ═══════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════ */

interface SortSelectProps {
  /** Current sort from URL search params. Defaults to "newest". */
  value?: string;
  /** Compact trigger for tight layouts (mobile header, sidebar). */
  compact?: boolean;
  className?: string;
}

export function SortSelect({
  value,
  compact = false,
  className,
}: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();

  // Sanitize incoming value — fall back to default if invalid
  const currentValue: SortValue = isValidSort(value) ? value : DEFAULT_SORT;

  // Matches Base UI's Select contract: (value: string | null, details) => void
  function onValueChange(next: string | null) {
    if (!isValidSort(next)) return;
    if (next === currentValue) return; // no-op if unchanged

    const params = new URLSearchParams(searchParams.toString());

    if (next === DEFAULT_SORT) {
      params.delete("sort");
    } else {
      params.set("sort", next);
    }
    // Reset pagination when sort changes
    params.delete("page");

    const qs = params.toString();
    const href = qs ? `/listings?${qs}` : "/listings";

    startTransition(() => {
      router.push(href, { scroll: false });
    });
  }

  return (
    <Select value={currentValue} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "group/sort",
          compact ? "w-auto min-w-[140px]" : "w-[180px]",
          isPending && "opacity-70",
          className
        )}
        aria-label="Sort listings"
        aria-busy={isPending || undefined}
      >
        <span className="flex min-w-0 flex-1 items-center gap-1.5">
          <ArrowDownWideNarrow
            className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <span className="truncate">
            <SelectValue />
          </span>
        </span>
      </SelectTrigger>

      <SelectContent align="end" className="min-w-[200px]">
        {SORTS.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/* ═══════════════════════════════════════════════════════════
   Suspense wrapper — REQUIRED for useSearchParams in RSC
   ═══════════════════════════════════════════════════════════ */

export function SortSelectSuspense(props: SortSelectProps) {
  return (
    <React.Suspense fallback={<SortSelectSkeleton compact={props.compact} />}>
      <SortSelect {...props} />
    </React.Suspense>
  );
}

function SortSelectSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-9 items-center gap-1.5 rounded-lg border border-input bg-background px-2.5 text-sm text-muted-foreground",
        compact ? "w-auto min-w-[140px]" : "w-[180px]"
      )}
      aria-hidden
    >
      <ArrowDownWideNarrow className="h-3.5 w-3.5 shrink-0 opacity-40" />
      <span className="animate-pulse-soft">Sort…</span>
    </div>
  );
}