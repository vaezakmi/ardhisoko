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

const SORTS = [
  { value: "featured", label: "Featured first" },
  { value: "name-asc", label: "Name (A–Z)" },
  { value: "name-desc", label: "Name (Z–A)" },
  { value: "experience-desc", label: "Most experienced" },
] as const;

const DEFAULT_SORT = "featured" satisfies SortValue;

type SortValue = (typeof SORTS)[number]["value"];

function isValidSort(value: string | null | undefined): value is SortValue {
  if (!value) return false;
  return SORTS.some((s) => s.value === value);
}

interface ProfessionalSortSelectProps {
  value?: string;
  compact?: boolean;
  className?: string;
}

export function ProfessionalSortSelect({
  value,
  compact = false,
  className,
}: ProfessionalSortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();

  const currentValue: SortValue = isValidSort(value) ? value : DEFAULT_SORT;

  function onValueChange(next: string | null) {
    if (!isValidSort(next)) return;
    if (next === currentValue) return;

    const params = new URLSearchParams(searchParams.toString());

    if (next === DEFAULT_SORT) {
      params.delete("sort");
    } else {
      params.set("sort", next);
    }
    params.delete("page");

    const qs = params.toString();
    const href = qs
      ? `/professionals/directory?${qs}`
      : "/professionals/directory";

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
        aria-label="Sort professionals"
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