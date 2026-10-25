"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "ardhisoko:favorites";

function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeFavorites(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent("ardhisoko:favorites-changed"));
  } catch {
    /* ignore */
  }
}

export function FavoriteButton({
  listingId,
  className,
  size = "default",
}: {
  listingId: string;
  className?: string;
  size?: "default" | "sm";
}) {
  const [saved, setSaved] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setSaved(readFavorites().includes(listingId));
    const onChange = () => setSaved(readFavorites().includes(listingId));
    window.addEventListener("ardhisoko:favorites-changed", onChange);
    return () =>
      window.removeEventListener("ardhisoko:favorites-changed", onChange);
  }, [listingId]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const current = readFavorites();
    const next = saved
      ? current.filter((id) => id !== listingId)
      : [...current, listingId];
    writeFavorites(next);
    setSaved(!saved);
  }

  const dim = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <button
      type="button"
      aria-label={saved ? "Remove from favorites" : "Save to favorites"}
      aria-pressed={saved}
      onClick={toggle}
      className={cn(
        "grid place-items-center rounded-full",
        "bg-background/90 backdrop-blur shadow-sm ring-1 ring-black/5",
        "transition-colors hover:bg-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        dim,
        className
      )}
    >
      <Heart
        className={cn(
          icon,
          "transition-all",
          saved ? "fill-destructive text-destructive" : "text-foreground/70",
          // avoid painting empty heart during SSR mismatch
          !mounted && "opacity-0"
        )}
      />
    </button>
  );
}