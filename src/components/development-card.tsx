import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Ruler,
  Building2,
  ArrowUpRight,
  Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardImage } from "@/components/ui/card";
import { formatKes, formatNumber } from "@/lib/format";
import type { Development } from "@/lib/development-types";
import type { DevelopmentStats } from "@/lib/developments";

interface DevelopmentCardProps {
  development: Development;
  stats: DevelopmentStats;
  priority?: boolean;
}

export function DevelopmentCard({
  development,
  stats,
  priority = false,
}: DevelopmentCardProps) {
  const availablePercent =
    stats.totalPlots > 0
      ? Math.round((stats.availablePlots / stats.totalPlots) * 100)
      : 0;

  return (
    <Card
      asChild
      variant={development.featured ? "featured" : "default"}
      interactive
    >
      <Link
        href={`/developments/${development.slug}`}
        className="group/card block"
        aria-label={`${development.name} — ${development.tagline}`}
      >
        <CardImage aspect="landscape">
          <Image
            src={development.heroImageUrl}
            alt={development.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover/card:scale-105"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20"
          />

          {/* Left badges */}
          <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
            <Badge
              variant="outline"
              size="sm"
              className="border-white/30 bg-black/30 text-white backdrop-blur-sm capitalize"
            >
              <Building2 className="mr-1 h-3 w-3" aria-hidden />
              Development
            </Badge>
            {development.featured && (
              <Badge variant="featured" size="sm" className="gap-1 shadow-sm">
                <Star className="h-2.5 w-2.5 fill-current" aria-hidden />
                Featured
              </Badge>
            )}
          </div>

          {/* Inventory indicator */}
          {stats.availablePlots > 0 && (
            <div className="absolute right-3 top-3">
              <Badge
                variant="outline"
                size="sm"
                className="border-white/30 bg-black/30 text-white backdrop-blur-sm"
              >
                {stats.availablePlots} available
              </Badge>
            </div>
          )}

          {/* Hover CTA */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-3 right-3 hidden translate-y-2 items-center gap-1 rounded-full bg-background/95 px-3 py-1.5 text-xs font-semibold opacity-0 shadow-md backdrop-blur transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100 sm:inline-flex"
          >
            View project
            <ArrowUpRight className="h-3 w-3" />
          </div>
        </CardImage>

        <div className="space-y-2.5 px-(--card-spacing) pb-(--card-spacing) pt-1">
          <h3 className="line-clamp-2 font-display text-lg font-bold leading-snug tracking-tight">
            {development.name}
          </h3>

          <p className="line-clamp-1 text-sm text-muted-foreground">
            {development.tagline}
          </p>

          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-xs text-muted-foreground">From</span>
            <span className="font-display text-xl font-extrabold text-primary">
              {formatKes(development.startingPriceKes)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="line-clamp-1">
                {development.subCounty}, {development.county}
              </span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Ruler className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {stats.groupsCount} plot size{stats.groupsCount === 1 ? "" : "s"}
            </span>
          </div>

          {/* Inventory progress */}
          {stats.totalPlots > 0 && (
            <div className="border-t border-border/40 pt-2.5">
              <div className="mb-1.5 flex items-center justify-between text-[11px]">
                <span className="font-medium">
                  {stats.availablePlots} of {stats.totalPlots} available
                </span>
                <span className="text-muted-foreground">
                  {availablePercent}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${availablePercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
}