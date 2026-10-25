import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  BadgeCheck,
  Star,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Professional, ProfessionalCategory } from "@/lib/professional-types";

interface ProfessionalCardProps {
  professional: Professional;
  category: ProfessionalCategory;
  priority?: boolean;
  compact?: boolean;
}

export function ProfessionalCard({
  professional,
  category,
  priority = false,
  compact = false,
}: ProfessionalCardProps) {
  const isVerified = professional.verificationStatus === "approved";
  const isActive = professional.subscriptionStatus === "active";
  const displayCounties = [
    professional.baseCounty,
    ...professional.workingCounties.filter((c) => c !== professional.baseCounty),
  ].slice(0, 3);
  const remainingCounties =
    professional.workingCounties.length - displayCounties.length + 1;

  const initials = professional.fullName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card
      asChild
      variant={professional.featured ? "featured" : "default"}
      interactive
    >
      <Link
        href={`/professionals/profile/${professional.slug}`}
        className="group/card block"
        aria-label={`${professional.fullName}, ${category.singularName}`}
      >
        <div className="flex items-start gap-4 p-(--card-spacing)">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="relative h-16 w-16 overflow-hidden rounded-full bg-muted ring-2 ring-border">
              {professional.profilePhotoUrl ? (
                <Image
                  src={professional.profilePhotoUrl}
                  alt={professional.fullName}
                  fill
                  priority={priority}
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <div className="grid h-full w-full place-items-center bg-primary/10 font-display text-lg font-bold text-primary">
                  {initials}
                </div>
              )}
            </div>
            {isVerified && (
              <span
                aria-label="Verified"
                className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-brand-green text-white ring-2 ring-card"
              >
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
              </span>
            )}
          </div>

          {/* Body */}
          <div className="min-w-0 flex-1">
            {/* Badges */}
            <div className="mb-2 flex flex-wrap items-center gap-1.5">
              {professional.featured && (
                <Badge variant="featured" size="sm" className="gap-1">
                  <Star className="h-2.5 w-2.5 fill-current" aria-hidden />
                  Featured
                </Badge>
              )}
              <Badge variant="landType" size="sm">
                {category.singularName}
              </Badge>
            </div>

            {/* Name */}
            <h3 className="line-clamp-1 font-display text-base font-bold leading-tight">
              {professional.fullName}
            </h3>

            {/* Company */}
            {professional.companyName && (
              <p className="line-clamp-1 text-xs text-muted-foreground">
                {professional.companyName}
              </p>
            )}

            {/* Meta */}
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                <span className="line-clamp-1">
                  {professional.baseCounty}
                  {displayCounties.length > 1 && (
                    <span className="text-muted-foreground/70">
                      {" "}
                      +{displayCounties.length - 1}
                    </span>
                  )}
                </span>
              </span>
              {professional.yearsExperience && (
                <span className="inline-flex items-center gap-1">
                  <Briefcase className="h-3 w-3 shrink-0" aria-hidden />
                  {professional.yearsExperience}yr
                </span>
              )}
            </div>

            {/* Bio excerpt */}
            {!compact && (
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {professional.bio}
              </p>
            )}
          </div>

          {/* Arrow */}
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover/card:opacity-100"
            aria-hidden
          />
        </div>

        {/* Footer */}
        <div className="border-t border-border/40 px-(--card-spacing) py-2.5 text-xs">
          <span className="font-medium text-success">Available for new work</span>
        </div>
      </Link>
    </Card>
  );
}