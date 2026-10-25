import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Building2,
  Ruler,
  Check,
  ArrowLeft,
  Phone,
  MessageSquare,
  BadgeCheck,
  Home,
  Layers,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  getDevelopmentBySlug,
  getCompanyById,
  getGroupsByDevelopment,
  getInventoryByGroup,
  getDevelopmentStats,
} from "@/lib/developments";
import { formatKes, formatNumber, formatAcreage, relativeTime } from "@/lib/format";
import type { DevelopmentStats } from "@/lib/developments";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const development = await getDevelopmentBySlug(slug);
  if (!development) return { title: "Development not found" };

  return {
    title: `${development.name} — ${development.subCounty}, ${development.county}`,
    description: development.description.slice(0, 160),
    openGraph: {
      title: development.name,
      description: development.tagline,
      images: [{ url: development.heroImageUrl }],
    },
  };
}

export default async function DevelopmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const development = await getDevelopmentBySlug(slug);
  if (!development) notFound();

  const [company, groups, stats] = await Promise.all([
    getCompanyById(development.companyId),
    getGroupsByDevelopment(development.id),
    getDevelopmentStats(development.id),
  ]);

  if (!company) notFound();

  // Fetch inventory for each group
  const groupsWithInventory = await Promise.all(
    groups.map(async (group) => ({
      group,
      inventory: await getInventoryByGroup(group.id),
    }))
  );

  return (
    <article className="pb-20">
      {/* ═══════════════════════════════════════════════════════
          HERO IMAGE
          ═══════════════════════════════════════════════════════ */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted sm:aspect-[21/9]">
        <Image
          src={development.heroImageUrl}
          alt={development.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30"
        />

        {/* Back link */}
        <div className="absolute left-4 top-4 sm:left-8 sm:top-8">
          <Link
            href="/developments"
            className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition-colors hover:bg-black/60"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            All developments
          </Link>
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0">
          <Container className="pb-6 sm:pb-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    size="sm"
                    className="border-white/30 bg-white/10 text-white backdrop-blur-sm"
                  >
                    <Building2 className="mr-1 h-3 w-3" aria-hidden />
                    Development
                  </Badge>
                  {development.featured && (
                    <Badge variant="featured" size="sm">
                      Featured
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    size="sm"
                    className="border-white/30 bg-white/10 text-white capitalize backdrop-blur-sm"
                  >
                    {development.status}
                  </Badge>
                </div>

                <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {development.name}
                </h1>
                <p className="mt-2 text-base text-white/80">
                  {development.tagline}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-white/90">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                    {development.town}, {development.county}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Layers className="h-4 w-4 shrink-0" aria-hidden />
                    {stats.totalPlots} plots
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Home className="h-4 w-4 shrink-0" aria-hidden />
                    From {formatKes(development.startingPriceKes)}
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          MAIN CONTENT
          ═══════════════════════════════════════════════════════ */}
      <Container className="mt-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT COLUMN */}
          <div className="min-w-0 lg:col-span-8">
            {/* Description */}
            <section>
              <h2 className="font-display text-2xl font-extrabold tracking-tight">
                About {development.name}
              </h2>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">
                {development.description}
              </p>
            </section>

            <Separator className="my-10" />

            {/* Amenities */}
            {development.amenities.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-extrabold tracking-tight">
                  Amenities & features
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {development.amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success-soft text-success">
                        <Check className="h-3 w-3" aria-hidden />
                      </span>
                      <span className="text-muted-foreground">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <Separator className="my-10" />

            {/* Plot size groups */}
            <section>
              <h2 className="font-display text-2xl font-extrabold tracking-tight">
                Plot sizes
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {groupsWithInventory.length} size
                {groupsWithInventory.length === 1 ? "" : "s"} available ·{" "}
                {stats.availablePlots} plots currently available
              </p>

              <div className="mt-6 space-y-4">
                {groupsWithInventory.map(({ group, inventory }) => {
                  const available = inventory.filter(
                    (i) => i.status === "available"
                  );
                  const reserved = inventory.filter(
                    (i) => i.status === "reserved"
                  );
                  const sold = inventory.filter((i) => i.status === "sold");

                  return (
                    <Card key={group.id} className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <Ruler
                              className="h-4 w-4 text-primary"
                              aria-hidden
                            />
                            <h3 className="font-display text-lg font-bold">
                              {group.name}
                            </h3>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {group.description}
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                            <span className="font-medium text-foreground">
                              {formatKes(group.defaultPriceKes)}
                            </span>
                            <span className="text-muted-foreground">
                              {formatAcreage(group.acreage)}
                            </span>
                            <span className="capitalize text-muted-foreground">
                              {group.propertyType}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="default" size="sm">
                            {available.length} available
                          </Badge>
                          {reserved.length > 0 && (
                            <Badge variant="outline" size="sm">
                              {reserved.length} reserved
                            </Badge>
                          )}
                          {sold.length > 0 && (
                            <Badge variant="secondary" size="sm">
                              {sold.length} sold
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Plot reference grid — the killer detail */}
                      {inventory.length > 0 && (
                        <div className="mt-5 border-t border-border/40 pt-4">
                          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                            Plot references
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {inventory.map((item) => (
                              <span
                                key={item.id}
                                className={
                                  item.status === "available"
                                    ? "rounded-md border border-primary/30 bg-primary/5 px-2 py-1 text-[11px] font-medium text-primary"
                                    : item.status === "reserved"
                                      ? "rounded-md border border-warning/30 bg-warning-soft px-2 py-1 text-[11px] font-medium text-warning"
                                      : "rounded-md border border-border bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground line-through"
                                }
                              >
                                {item.plotRef}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </section>

            <Separator className="my-10" />

            {/* Gallery */}
            {development.galleryImages.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-extrabold tracking-tight">
                  Gallery
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {development.galleryImages.map((url, i) => (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden rounded-xl bg-muted"
                    >
                      <Image
                        src={url}
                        alt={`${development.name} photo ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Site plan + drone */}
            {(development.sitePlanImageUrl || development.droneImageUrl) && (
              <>
                <Separator className="my-10" />
                <section>
                  <h2 className="font-display text-2xl font-extrabold tracking-tight">
                    Site plan & aerial
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {development.sitePlanImageUrl && (
                      <div>
                        <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          <ImageIcon className="h-3.5 w-3.5" aria-hidden />
                          Site plan
                        </p>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                          <Image
                            src={development.sitePlanImageUrl}
                            alt="Site plan"
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                    {development.droneImageUrl && (
                      <div>
                        <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          <ImageIcon className="h-3.5 w-3.5" aria-hidden />
                          Aerial view
                        </p>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                          <Image
                            src={development.droneImageUrl}
                            alt="Aerial view"
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </>
            )}
          </div>

          {/* RIGHT COLUMN — STICKY */}
          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-24">
              {/* Price card */}
              <Card className="p-6 shadow-lg">
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="mt-1 font-display text-3xl font-extrabold tracking-tight text-primary">
                  {formatKes(development.startingPriceKes)}
                </p>

                <Separator className="my-5" />

                <div className="grid grid-cols-3 gap-3 text-center">
                  <MiniStat value={stats.availablePlots} label="Available" />
                  <MiniStat value={stats.reservedPlots} label="Reserved" />
                  <MiniStat value={stats.soldPlots} label="Sold" />
                </div>

                <Separator className="my-5" />

                <div className="space-y-2">
                  <Button className="w-full" size="lg">
                    <Phone className="h-4 w-4" aria-hidden />
                    Call developer
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <MessageSquare className="h-4 w-4" aria-hidden />
                    Send enquiry
                  </Button>
                </div>
              </Card>

              {/* Developer card */}
              <Card className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Developer
                </p>
                <div className="mt-3 flex items-start gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Building2 className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-display text-base font-bold">
                        {company.name}
                      </h3>
                      {company.verificationStatus === "verified" && (
                        <BadgeCheck
                          className="h-4 w-4 shrink-0 text-success"
                          aria-label="Verified company"
                        />
                      )}
                    </div>
                    <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                      {company.description}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Trust note */}
              <div className="rounded-xl border border-success/30 bg-success-soft p-4 text-success">
                <p className="inline-flex items-start gap-2 text-xs leading-relaxed">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <span>
                    <span className="font-semibold">
                      Verified developer.
                    </span>{" "}
                    Company documents and title deeds checked by ArdhiSoko.
                  </span>
                </p>
              </div>

              {/* Updated */}
              <p className="text-center text-xs text-muted-foreground">
                Updated {relativeTime(development.updatedAt)}
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}

function MiniStat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="font-display text-lg font-extrabold text-foreground">
        {value}
      </div>
      <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}