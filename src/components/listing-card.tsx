import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Ruler,
  FileCheck2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardImage } from "@/components/ui/card";
import { FavoriteButton } from "@/components/favorite-button";
import {
  formatKes,
  formatAcreage,
  relativeTime,
  landTypeLabel,
  titleStatusLabel,
} from "@/lib/format";
import type { Listing } from "@/lib/types";

interface ListingCardProps {
  listing: Listing;
  /** Set true for the first 2-3 cards above the fold (LCP optimization). */
  priority?: boolean;
  /** Smaller variant for dense grids or sidebar recommendations. */
  compact?: boolean;
}

export function ListingCard({
  listing,
  priority = false,
  compact = false,
}: ListingCardProps) {
  const pricePerAcre =
    listing.acreage > 0
      ? Math.round(listing.priceKes / listing.acreage)
      : null;

  return (
    <Card
      asChild
      variant={listing.featured ? "featured" : "default"}
      interactive
    >
      <Link
        href={`/listings/${listing.slug}`}
        className="group/card block"
        aria-label={`${listing.title} — ${formatKes(listing.priceKes)} in ${listing.subCounty}, ${listing.county}`}
      >
        <CardImage aspect="landscape">
          <Image
            src={listing.imageUrl}
            alt={`${listing.title} — ${listing.landType} land in ${listing.county}, Kenya`}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out-soft will-change-transform group-hover/card:scale-[1.06]"
          />

          {/* Gradient scrim for legibility */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/10"
          />

          {/* Left badges */}
          <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
            <Badge variant="landType" size="sm" className="shadow-sm backdrop-blur-sm">
              {landTypeLabel[listing.landType] ?? listing.landType}
            </Badge>
            {listing.featured && (
              <Badge variant="featured" size="sm" className="gap-1 shadow-sm">
                <Sparkles className="h-3 w-3" aria-hidden />
                Featured
              </Badge>
            )}
          </div>

          {/* Favorite button */}
          <FavoriteButton
            listingId={listing.id}
            size="sm"
            className="absolute right-3 top-3"
          />

          {/* Hover CTA */}
          {!compact && (
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-3 right-3 hidden translate-y-2 items-center gap-1 rounded-full bg-background/95 px-3 py-1.5 text-xs font-semibold text-foreground opacity-0 shadow-md backdrop-blur transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100 sm:inline-flex"
            >
              View details
              <ArrowUpRight className="h-3 w-3" />
            </div>
          )}
        </CardImage>

        <div className="space-y-2.5 px-(--card-spacing) pb-(--card-spacing) pt-1">
          {/* Title */}
          <h3
            className={
              compact
                ? "line-clamp-2 font-display text-base font-bold leading-snug tracking-tight"
                : "line-clamp-2 font-display text-lg font-bold leading-snug tracking-tight"
            }
          >
            {listing.title}
          </h3>

          {/* Price + per-acre */}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span
              className={
                compact
                  ? "font-display text-lg font-extrabold text-primary"
                  : "font-display text-xl font-extrabold text-primary"
              }
            >
              {formatKes(listing.priceKes)}
            </span>
            {pricePerAcre && listing.acreage >= 1 && (
              <span className="text-xs text-muted-foreground">
                · {formatKes(pricePerAcre)}/acre
              </span>
            )}
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
            <span className="inline-flex min-w-0 items-center gap-1">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="line-clamp-1">
                {listing.subCounty}, {listing.county}
              </span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Ruler className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {formatAcreage(listing.acreage)}
            </span>
            <span className="inline-flex items-center gap-1">
              <FileCheck2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {titleStatusLabel[listing.titleStatus] ?? listing.titleStatus}
            </span>
          </div>

          {/* Footer — time posted */}
          <div className="border-t border-border/40 pt-2.5 text-[11px] text-muted-foreground/80">
            Listed {relativeTime(listing.createdAt)}
          </div>
        </div>
      </Link>
    </Card>
  );
}