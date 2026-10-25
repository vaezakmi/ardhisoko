import Link from "next/link";
import {
  Sprout,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Camera,
  Building2,
  AtSign,
  ArrowUp,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  Ruler,
  Scale,
  HardHat,
  BadgeCheck,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/newsletter-form";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const year = new Date().getFullYear();

/* ═══════════════════════════════════════════════════════════
   Link columns
   ═══════════════════════════════════════════════════════════ */

interface FooterColumn {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

const columns: FooterColumn[] = [
  {
    title: "Buy land",
    links: [
      { label: "All listings", href: "/listings" },
      { label: "Developments", href: "/developments" },
      { label: "Farms & shambas", href: "/listings?landType=agricultural" },
      { label: "Residential plots", href: "/listings?landType=residential" },
      { label: "Ranch land", href: "/listings?landType=ranch" },
    ],
  },
  {
    title: "Find a pro",
    links: [
      { label: "Register as a pro", href: "/professionals/register" },
      { label: "Browse all professionals", href: "/professionals" },
      { label: "Land surveyors", href: "/professionals/land-surveyors" },
      { label: "Property valuers", href: "/professionals/property-valuers" },
      { label: "Property advocates", href: "/professionals/property-advocates" },
    ],
  },
  {
    title: "Sell land",
    links: [
      { label: "List your land", href: "/sell" },
      { label: "Pricing & fees", href: "/pricing" },
      { label: "Seller guide", href: "/guides/seller" },
      { label: "Verification process", href: "/trust" },
      { label: "Talk to our team", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About ArdhiSoko", href: "/about" },
      { label: "Trust & safety", href: "/trust" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Cookie policy", href: "/cookies" },
      { label: "Report a listing", href: "/trust" },
    ],
  },
];
/* ═══════════════════════════════════════════════════════════
   Quick-access professional category cards
   ═══════════════════════════════════════════════════════════ */

const proCategories = [
  {
    label: "Land surveyors",
    href: "/professionals/land-surveyors",
    icon: <Ruler className="h-4 w-4" />,
  },
  {
    label: "Property valuers",
    href: "/professionals/property-valuers",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    label: "Property advocates",
    href: "/professionals/property-advocates",
    icon: <Scale className="h-4 w-4" />,
  },
  {
    label: "Architects & engineers",
    href: "/professionals/architects",
    icon: <HardHat className="h-4 w-4" />,
  },
];

/* ═══════════════════════════════════════════════════════════
   Safe accessor — never crash on missing config
   ═══════════════════════════════════════════════════════════ */

function safeString(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return fallback;
}

/* ═══════════════════════════════════════════════════════════
   SiteFooter
   ═══════════════════════════════════════════════════════════ */

export function SiteFooter() {
  const contactEmail = safeString(
    (siteConfig.contact as { email?: string } | undefined)?.email,
    "hello@ardhisoko.co.ke"
  );
  const contactPhone = safeString(
    (siteConfig.contact as { phone?: string } | undefined)?.phone,
    "+254 700 000 000"
  );
  const addressCity = safeString(
    (siteConfig.address as { city?: string } | undefined)?.city,
    "Nairobi"
  );
  const addressCountry = safeString(
    (siteConfig.address as { country?: string } | undefined)?.country,
    "Kenya"
  );

  const socialWhatsapp = safeString(
    (siteConfig.social as { whatsapp?: string } | undefined)?.whatsapp
  );
  const socialTwitter = safeString(
    (siteConfig.social as { twitter?: string } | undefined)?.twitter
  );
  const socialInstagram = safeString(
    (siteConfig.social as { instagram?: string } | undefined)?.instagram
  );
  const socialLinkedin = safeString(
    (siteConfig.social as { linkedin?: string } | undefined)?.linkedin
  );

  const legalPrivacy = safeString(
    (siteConfig.legal as { privacy?: string } | undefined)?.privacy,
    "/privacy"
  );
  const legalTerms = safeString(
    (siteConfig.legal as { terms?: string } | undefined)?.terms,
    "/terms"
  );
  const legalCookies = safeString(
    (siteConfig.legal as { cookies?: string } | undefined)?.cookies,
    "/cookies"
  );

  const siteName = safeString(siteConfig.name, "ArdhiSoko");

  return (
    <footer className="relative isolate overflow-hidden border-t border-border bg-background-subtle dark:bg-[#0A0805]">
      {/* Ambient ember field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 55% at 85% 0%, color-mix(in oklab, var(--primary) 12%, transparent) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 10% 100%, color-mix(in oklab, var(--secondary) 8%, transparent) 0%, transparent 60%)",
        }}
      />

      {/* Ember top accent line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />

      <Container className="relative">
        {/* ═══════════════════════════════════════════════════
            TIER 1 — Brand + newsletter
            ═══════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
          {/* Brand */}
          <div className="space-y-6 lg:col-span-5">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label={`${siteName} home`}
            >
              <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#FFA53D] to-[#C9600A] text-white shadow-[0_8px_24px_-8px_rgba(255,165,61,0.6)] transition-transform duration-300 ease-out group-hover:scale-105 dark:shadow-[0_0_24px_rgba(255,165,61,0.35)]">
                <Sprout className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-display text-2xl font-extrabold tracking-[-0.03em] text-foreground">
                Ardhi
                <span className="text-primary dark:drop-shadow-[0_0_12px_rgba(255,165,61,0.5)]">
                  Soko
                </span>
              </span>
            </Link>

            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Kenya&rsquo;s verified land marketplace. Every title deed
              checked, every seller vetted, every parcel mapped. Plots, farms,
              and ranches across all 47 counties.
            </p>

            {/* Live signal */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary dark:bg-primary/10 dark:shadow-[0_0_20px_rgba(255,165,61,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Team online · Nairobi HQ
            </div>

            {/* Contact */}
            <address
              className="not-italic grid grid-cols-1 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-1"
              aria-label="Contact information"
            >
              <ContactLine
                icon={<MapPin className="h-4 w-4" />}
                label={`${addressCity}, ${addressCountry}`}
              />
              {contactPhone && (
                <ContactLine
                  icon={<Phone className="h-4 w-4" />}
                  label={contactPhone}
                  href={`tel:${contactPhone.replace(/\s/g, "")}`}
                />
              )}
              {contactEmail && (
                <ContactLine
                  icon={<Mail className="h-4 w-4" />}
                  label={contactEmail}
                  href={`mailto:${contactEmail}`}
                />
              )}
            </address>

            {/* Social */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {socialWhatsapp && (
                <SocialLink
                  href={socialWhatsapp}
                  label="WhatsApp"
                  icon={<MessageCircle className="h-4 w-4" />}
                />
              )}
              {socialTwitter && (
                <SocialLink
                  href={socialTwitter}
                  label="X (Twitter)"
                  icon={<AtSign className="h-4 w-4" />}
                />
              )}
              {socialInstagram && (
                <SocialLink
                  href={socialInstagram}
                  label="Instagram"
                  icon={<Camera className="h-4 w-4" />}
                />
              )}
              {socialLinkedin && (
                <SocialLink
                  href={socialLinkedin}
                  label="LinkedIn"
                  icon={<Building2 className="h-4 w-4" />}
                />
              )}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-9">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
              />

              <div className="grid gap-6 sm:grid-cols-[1.2fr_1fr] sm:items-start sm:gap-8">
                <div>
                  <div className="mb-2.5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                    <Mail className="h-3 w-3" aria-hidden />
                    Weekly digest
                  </div>
                  <h3 className="font-display text-2xl font-extrabold leading-[1.15] tracking-[-0.02em] text-foreground">
                    New listings,
                    <br />
                    straight to your inbox.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Hand-picked parcels from across Kenya, once a week. No
                    spam, unsubscribe anytime.
                  </p>

                  <ul className="mt-5 space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      Only verified titles featured
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      Sent Tuesdays · 8am EAT
                    </li>
                  </ul>
                </div>

                <div className="sm:pt-1">
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            TIER 1.5 — Professional services (quick access)
            ═══════════════════════════════════════════════════ */}
        <div className="border-t border-border py-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                <HardHat className="h-3 w-3" aria-hidden />
                Professional services
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight">
                Need a surveyor, valuer, or advocate?
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/professionals/register"
                className="group inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Join as a pro
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <span className="h-4 w-px bg-border" aria-hidden />
              <Link
                href="/professionals"
                className="group inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Browse all
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {proCategories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl border border-border bg-card p-3.5",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                )}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {cat.icon}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium">
                  {cat.label}
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            TIER 2 — Link columns
            ═══════════════════════════════════════════════════ */}
        <div className="border-t border-border py-12">
          <div className="grid grid-cols-5 gap-x-6 gap-y-10 md:grid-cols-5 lg:gap-x-12">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {col.title}
                </h3>
                <ul className="space-y-2.5 text-sm">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 rounded-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:hover:text-primary"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="h-3 w-3 -translate-x-0.5 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            TIER 3 — Legal + back-to-top
            ═══════════════════════════════════════════════════ */}
        <div className="border-t border-border py-7">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="font-medium">
                © {year} {siteName}. All rights reserved.
              </span>
              <span
                className="hidden h-3 w-px bg-border md:inline-block"
                aria-hidden
              />
              <Link
                href={legalPrivacy}
                className="transition-colors hover:text-foreground dark:hover:text-primary"
              >
                Privacy
              </Link>
              <Link
                href={legalTerms}
                className="transition-colors hover:text-foreground dark:hover:text-primary"
              >
                Terms
              </Link>
              <Link
                href={legalCookies}
                className="transition-colors hover:text-foreground dark:hover:text-primary"
              >
                Cookies
              </Link>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="font-medium tracking-wide">
                Kenya · <span className="text-foreground">EN</span> ·{" "}
                <span className="text-foreground">KES</span>
              </span>
              <BackToTop />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════════════════════ */

function ContactLine({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="text-primary">{icon}</span>
      <span className="transition-colors">{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="inline-flex items-center gap-2.5 text-muted-foreground hover:text-foreground dark:hover:text-primary"
      >
        {content}
      </a>
    );
  }

  return (
    <span className="inline-flex items-center gap-2.5 text-muted-foreground">
      {content}
    </span>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "group grid h-9 w-9 place-items-center rounded-lg",
        "border border-border bg-card text-muted-foreground",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-primary/40",
        "hover:bg-primary/5 hover:text-primary",
        "dark:hover:bg-primary/10 dark:hover:text-primary",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      )}
    >
      {icon}
    </a>
  );
}

function BackToTop() {
  return (
    <a
      href="#top"
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-full",
        "border border-border bg-card px-3 py-1.5 text-xs font-semibold",
        "text-muted-foreground transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary",
        "dark:hover:bg-primary/10",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      )}
    >
      <ArrowUp
        className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5"
        aria-hidden
      />
      Back to top
    </a>
  );
}