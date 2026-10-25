"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, TrendingUp, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CountyPicker } from "@/components/county-picker";
import { cn } from "@/lib/utils";

interface HeroSearchProps {
  counties: string[];
  trending?: { label: string; href: string }[];
}

const DEFAULT_TRENDING = [
  { label: "Kiambu plots", href: "/listings?county=Kiambu&landType=plot" },
  { label: "Nakuru farms", href: "/listings?county=Nakuru&landType=agricultural" },
  { label: "Laikipia ranches", href: "/listings?county=Laikipia&landType=ranch" },
  { label: "Diani commercial", href: "/listings?county=Kwale&landType=commercial" },
  { label: "Nairobi residential", href: "/listings?county=Nairobi&landType=residential" },
];

const RECENT_KEY = "ardhisoko:recent-searches";
const MAX_RECENT = 4;

export function HeroSearch({
  counties,
  trending = DEFAULT_TRENDING,
}: HeroSearchProps) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [county, setCounty] = React.useState("");
  const [recent, setRecent] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) setRecent(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = e.target as HTMLElement;
      const typing =
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.isContentEditable;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function persistRecent(query: string) {
    if (!query.trim()) return;
    const next = [query, ...recent.filter((r) => r !== query)].slice(
      0,
      MAX_RECENT
    );
    setRecent(next);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  function go(params: URLSearchParams) {
    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `/listings?${qs}` : "/listings");
    });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const q = String(form.get("q") ?? "").trim();
    const params = new URLSearchParams();
    if (county) params.set("county", county);
    if (q) {
      params.set("q", q);
      persistRecent(q);
    }
    go(params);
  }

  return (
    <div className="w-full max-w-3xl">
      <form
        onSubmit={onSubmit}
        role="search"
        className={cn(
          "flex flex-col gap-2 rounded-2xl border border-border/60 bg-background/95 p-2 shadow-xl backdrop-blur",
          "transition-all duration-200",
          "sm:flex-row sm:items-center",
          isPending && "opacity-80"
        )}
      >
        <CountyPicker
          counties={counties}
          value={county}
          onChange={setCounty}
        />

        <div className="hidden h-8 w-px bg-border sm:block" aria-hidden />

        <div className="flex flex-1 items-center gap-2 rounded-xl px-3">
          <Search
            className="h-4 w-4 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <Input
            ref={inputRef}
            name="q"
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            aria-label="Search land listings"
            placeholder="Title, area, keyword…"
            className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
          <kbd
            aria-hidden
            className="hidden rounded border border-border/60 bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block"
          >
            /
          </kbd>
        </div>

        <Button
          type="submit"
          size="lg"
          loading={isPending}
          className="h-11 px-6 shadow-brand sm:w-auto"
        >
          Search
        </Button>
      </form>

      {/* Trending chips */}
      {trending.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden />
            Trending
          </span>
          {trending.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => startTransition(() => router.push(t.href))}
              className="transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Badge
                variant="outline"
                size="sm"
                className="cursor-pointer bg-background/60 backdrop-blur-sm hover:bg-background"
              >
                {t.label}
              </Badge>
            </button>
          ))}
        </div>
      )}

      {/* Recent searches */}
      {recent.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            Recent
          </span>
          {recent.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                const params = new URLSearchParams({ q: r });
                go(params);
              }}
              className="transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Badge
                variant="ghost"
                size="sm"
                className="cursor-pointer bg-background/60 backdrop-blur-sm hover:bg-background"
              >
                {r}
              </Badge>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}