import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  BadgeCheck,
  Briefcase,
  Mail,
  Phone,
  Globe,
  MessageCircle,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Star,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getProfessionalBySlug,
  getCategoryById,
  formatPhone,
  whatsappLink,
} from "@/lib/professionals";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pro = await getProfessionalBySlug(slug);
  if (!pro) return { title: "Professional not found" };
  const cat = await getCategoryById(pro.categoryId);
  return {
    title: `${pro.fullName} — ${cat?.singularName ?? "Professional"}`,
    description: pro.bio.slice(0, 160),
    openGraph: {
      title: pro.fullName,
      description: pro.bio.slice(0, 160),
      images: pro.profilePhotoUrl ? [pro.profilePhotoUrl] : undefined,
    },
  };
}

export default async function ProfessionalProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pro = await getProfessionalBySlug(slug);
  if (!pro || pro.verificationStatus !== "approved") notFound();

  const cat = await getCategoryById(pro.categoryId);
  if (!cat) notFound();

  const initials = pro.fullName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Container className="py-10 lg:py-14">
      <Link
        href={`/professionals/${cat.slug}`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All {cat.pluralName.toLowerCase()}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* LEFT */}
        <div className="min-w-0">
          {/* Header */}
          <div className="flex flex-wrap items-start gap-6">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-muted ring-2 ring-border">
              {pro.profilePhotoUrl ? (
                <Image
                  src={pro.profilePhotoUrl}
                  alt={pro.fullName}
                  fill
                  priority
                  sizes="96px"
                  className="object-cover"
                />
              ) : (
                <div className="grid h-full w-full place-items-center bg-primary/10 font-display text-2xl font-bold text-primary">
                  {initials}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="landType" size="sm">
                  {cat.singularName}
                </Badge>
                {pro.featured && (
                  <Badge variant="featured" size="sm" className="gap-1">
                    <Star className="h-2.5 w-2.5 fill-current" aria-hidden />
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                {pro.fullName}
              </h1>
              {pro.companyName && (
                <p className="mt-1 text-muted-foreground">{pro.companyName}</p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                  {pro.baseCounty}
                </span>
                {pro.yearsExperience && (
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 shrink-0" aria-hidden />
                    {pro.yearsExperience} years
                  </span>
                )}
                {pro.verificationStatus === "approved" && (
                  <span className="inline-flex items-center gap-1.5 text-brand-green">
                    <BadgeCheck className="h-4 w-4 shrink-0" aria-hidden />
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Bio */}
          <section>
            <h2 className="font-display text-xl font-bold">About</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">
              {pro.bio}
            </p>
          </section>

          {/* Services */}
          {pro.services.length > 0 && (
            <section className="mt-8">
              <h2 className="font-display text-xl font-bold">Services</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {pro.services.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-green"
                      aria-hidden
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Coverage */}
          <section className="mt-8">
            <h2 className="font-display text-xl font-bold">Coverage</h2>
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Based in
              </p>
              <Badge variant="default" className="mt-2">
                {pro.baseCounty}
              </Badge>
            </div>
            {pro.workingCounties.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Also works in
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {pro.workingCounties
                    .filter((c) => c !== pro.baseCounty)
                    .map((c) => (
                      <Badge key={c} variant="outline">
                        {c}
                      </Badge>
                    ))}
                </div>
              </div>
            )}
          </section>

          {/* Portfolio */}
          {pro.portfolioImages.length > 0 && (
            <section className="mt-8">
              <h2 className="font-display text-xl font-bold">Portfolio</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {pro.portfolioImages.map((url, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-xl bg-muted"
                  >
                    <Image
                      src={url}
                      alt={`${pro.fullName} portfolio ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT — Sticky contact card */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-6 shadow-lg">
            <h3 className="font-display text-lg font-bold">Contact</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Usually responds within 24 hours
            </p>

            <div className="mt-6 space-y-2">
              <Button
                className="w-full"
                size="lg"
                variant="whatsapp"
                asChild
              >
                <a
                  href={whatsappLink(pro.countryCode, pro.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  WhatsApp
                </a>
              </Button>
              <Button className="w-full" size="lg" asChild>
                <a href={`tel:${pro.countryCode}${pro.phone}`}>
                  <Phone className="h-4 w-4" aria-hidden />
                  Call
                </a>
              </Button>
              <Button variant="outline" className="w-full" size="lg" asChild>
                <a href={`mailto:${pro.email}`}>
                  <Mail className="h-4 w-4" aria-hidden />
                  Email
                </a>
              </Button>
            </div>

            <Separator className="my-6" />

            <dl className="space-y-3 text-xs">
              <div className="flex items-start justify-between gap-3">
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="text-right font-medium">
                  {formatPhone(pro.countryCode, pro.phone)}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-muted-foreground">Email</dt>
                <dd className="break-all text-right font-medium">
                  {pro.email}
                </dd>
              </div>
              {pro.website && (
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-muted-foreground">Website</dt>
                  <dd className="text-right font-medium">
                    <a
                      href={pro.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      <Globe className="h-3 w-3" aria-hidden />
                      Visit
                    </a>
                  </dd>
                </div>
              )}
              {pro.registrationNumber && (
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-muted-foreground">Reg. no.</dt>
                  <dd className="font-mono text-[11px]">
                    {pro.registrationNumber}
                  </dd>
                </div>
              )}
            </dl>
          </Card>

          {/* Trust note */}
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-success/30 bg-success-soft p-4 text-success">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <p className="text-xs leading-relaxed">
              <span className="font-semibold">Verified by ArdhiSoko.</span>{" "}
              Registration and credentials reviewed by our team.
            </p>
          </div>
        </aside>
      </div>
    </Container>
  );
}