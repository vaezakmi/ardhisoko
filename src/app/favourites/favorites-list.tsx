"use client";

import * as React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

import { ListingCard } from "@/components/listing-card";
import { Button } from "@/components/ui/button";
import type { Listing } from "@/lib/types";

const STORAGE_KEY = "ardhisoko:favorites";

export function FavoritesList() {
  const [listings, setListings] = React.useState<Listing[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    async function load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const ids: string[] = raw ? JSON.parse(raw) : [];
        if (ids.length === 0) {
          setListings([]);
          setLoaded(true);
          return;
        }
        const res = await fetch("/api/listings");
        const json = await res.json();
        const all: Listing[] = json.listings ?? [];
        setListings(all.filter((l) => ids.includes(l.id)));
      } catch {
        setListings([]);
      } finally {
        setLoaded(true);
      }
    }
    load();

    const onChange = () => load();
    window.addEventListener("ardhisoko:favorites-changed", onChange);
    return () =>
      window.removeEventListener("ardhisoko:favorites-changed", onChange);
  }, []);

  if (!loaded) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/5] animate-pulse rounded-xl bg-muted"
          />
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-16 text-center">
        <Heart className="mx-auto h-10 w-10 text-muted-foreground/50" />
        <h2 className="mt-4 font-display text-lg font-bold">
          No saved listings yet
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          Tap the heart on any listing to save it for later.
        </p>
        <Button asChild className="mt-6">
          <Link href="/listings">Browse land</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((l) => (
        <ListingCard key={l.id} listing={l} />
      ))}
    </div>
  );
}