import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Ruler,
  FileCheck2,
  Phone,
  MessageSquare,
  Heart,
  Share2,
  Shield,
  Calendar,
  Hash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getListingBySlug, formatKes } from "@/lib/listings";
import { formatAcreage, relativeTime, landTypeLabel, titleStatusLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) return { title: "Listing not found" };

  const price = formatKes(listing.priceKes);
  return {
    title: `${listing.title} — ${price}`,
    description: listing.description,
    openGraph: {
      title: listing.title,
      description: `${price} · ${listing.subCounty}, ${listing.county}`,
      images: [{ url: listing.imageUrl, width: 1200, height: 630 }],
    },
  };
}

export default async function ListingDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) notFound();

  const pricePerAcre =
    listing.acreage > 0
      ? Math.round(listing.priceKes / listing.acreage)
      : null;

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/listings"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to listings
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* ═══════════════════════════════════════════════════
            LEFT COLUMN — image + content
            ═══════════════════════════════════════════════════ */}
        <div className="min-w-0">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted shadow-md">
            <Image
              src={listing.imageUrl}
              alt={listing.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />

            {/* Top badges */}
            <div className="absolute left-4 top-4 flex flex-wrap items-center gap-1.5">
              <Badge variant="landType" size="sm" className="shadow-sm backdrop-blur-sm">
                {landTypeLabel[listing.landType] ?? listing.landType}
              </Badge>
              {listing.featured && (
                <Badge variant="featured" size="sm" className="gap-1 shadow-sm">
                  Featured
                </Badge>
              )}
            </div>

            {/* Actions (favorite + share) */}
            <div className="absolute right-4 top-4 flex items-center gap-2">
              <button
                type="button"
                aria-label="Save listing"
                className="grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background"
              >
                <Heart className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Share listing"
                className="grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Title + meta */}
          <div className="mt-8">
            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {listing.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                {listing.subCounty}, {listing.county}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Ruler className="h-4 w-4 shrink-0" aria-hidden />
                {formatAcreage(listing.acreage)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FileCheck2 className="h-4 w-4 shrink-0" aria-hidden />
                {titleStatusLabel[listing.titleStatus] ?? listing.titleStatus} title
              </span>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Description */}
          <div>
            <h2 className="font-display text-xl font-bold">
              About this land
            </h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">
              {listing.description}
            </p>
          </div>

          {/* Facts grid */}
          <div className="mt-10">
            <h2 className="font-display text-xl font-bold">Land details</h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <FactRow icon={<Ruler />} label="Size" value={formatAcreage(listing.acreage)} />
              <FactRow
                icon={<FileCheck2 />}
                label="Title"
                value={titleStatusLabel[listing.titleStatus] ?? listing.titleStatus}
              />
              <FactRow icon={<MapPin />} label="Location" value={`${listing.subCounty}, ${listing.county}`} />
              {pricePerAcre && listing.acreage >= 1 && (
                <FactRow
                  icon={<Hash />}
                  label="Price / acre"
                  value={formatKes(pricePerAcre)}
                />
              )}
              <FactRow
                icon={<Calendar />}
                label="Listed"
                value={relativeTime(listing.createdAt)}
              />
              <FactRow icon={<Hash />} label="Listing ID" value={listing.id.slice(0, 8)} />
            </dl>
          </div>

          {/* Trust note */}
          <div className="mt-10 flex items-start gap-3 rounded-xl border border-success/30 bg-success-soft p-4 text-success">
            <Shield className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <div>
              <p className="text-sm font-semibold">
                Title verified by ArdhiSoko
              </p>
              <p className="mt-1 text-xs opacity-90">
                Our team has reviewed the title deed and confirmed ownership. Ask
                the seller for the deed copy during negotiation.
              </p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            RIGHT COLUMN — sticky price card
            ═══════════════════════════════════════════════════ */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-6 shadow-lg">
            <div className="text-sm text-muted-foreground">Asking price</div>
            <div className="mt-1 font-display text-3xl font-extrabold tracking-tight text-primary">
              {formatKes(listing.priceKes)}
            </div>
            {pricePerAcre && listing.acreage >= 1 && (
              <div className="mt-1 text-xs text-muted-foreground">
                ≈ {formatKes(pricePerAcre)} per acre
              </div>
            )}

            <Separator className="my-6" />

            <div className="space-y-2">
              <Button className="w-full" size="lg">
                <Phone className="h-4 w-4" aria-hidden />
                Call seller
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <MessageSquare className="h-4 w-4" aria-hidden />
                Send inquiry
              </Button>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Usually responds within 24 hours
            </p>

            <Separator className="my-6" />

            <dl className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Listed</dt>
                <dd className="font-medium">{relativeTime(listing.createdAt)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Listing ID</dt>
                <dd className="font-mono text-[11px]">{listing.id.slice(0, 8)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Verified</dt>
                <dd className="inline-flex items-center gap-1 font-medium text-success">
                  <Shield className="h-3 w-3" aria-hidden />
                  Yes
                </dd>
              </div>
            </dl>
          </Card>

          {/* Safety tip */}
          <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
            Never send money before visiting the land in person and confirming
            the title deed at the lands office.
          </p>
        </aside>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════
   Fact row
   ═══════════════════════════════════════════════════════════ */

function FactRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <dt className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="[&_svg]:size-3.5" aria-hidden>
          {icon}
        </span>
        {label}
      </dt>
      <dd className="mt-1 truncate font-medium">{value}</dd>
    </div>
  );
}