import Link from "next/link";
import {
  ShieldCheck,
  BadgeCheck,
  Clock,
  Users,
  TrendingUp,
  Briefcase,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { RegisterWizard } from "./register-wizard";
import {
  getCategories,
  getProfessionalStats,
} from "@/lib/professionals";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Register as a professional",
  description:
    "Join ArdhiSoko as a verified land surveyor, valuer, advocate, architect, or engineer and receive qualified client enquiries. Free to register.",
  alternates: { canonical: "/professionals/register" },
  openGraph: {
    title: "Register as a professional — ArdhiSoko",
    description:
      "Join Kenya's marketplace for land and property professionals. Free to register. Verified profile. Qualified client leads.",
    url: "/professionals/register",
  },
  twitter: {
    card: "summary_large_image",
    title: "Register as a professional — ArdhiSoko",
    description:
      "Join Kenya's marketplace for land and property professionals. Free to register.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Register as a professional",
  description:
    "Join ArdhiSoko as a verified land and property professional in Kenya.",
  url: "/professionals/register",
  isPartOf: {
    "@type": "WebSite",
    name: "ArdhiSoko",
  },
};

export default async function RegisterPage() {
  const [categories, stats] = await Promise.all([
    getCategories(),
    getProfessionalStats(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="pb-safe py-10 lg:py-16">
        {/* ═══════════════════════════════════════════════════════
            BREADCRUMB
            ═══════════════════════════════════════════════════════ */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/professionals"
                className="transition-colors hover:text-foreground"
              >
                Professionals
              </Link>
            </li>
            <li aria-hidden className="text-muted-foreground/50">
              /
            </li>
            <li className="font-medium text-foreground" aria-current="page">
              Register
            </li>
          </ol>
        </nav>

        {/* ═══════════════════════════════════════════════════════
            LAYOUT: 2-col on desktop (main + sticky sidebar)
            ═══════════════════════════════════════════════════════ */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ─── MAIN COLUMN ──────────────────────────────── */}
          <div className="lg:col-span-8">
            {/* Header */}
            <header className="mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                Free to register · Admin review
              </span>
              <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Register as a professional
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Join Kenya&rsquo;s marketplace for land and property
                professionals. Registration takes about 5 minutes. Our team
                reviews every application within 2 business days.
              </p>

              {/* What you'll need */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  ~5 minutes to complete
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                  No credit card required
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" aria-hidden />
                  {stats.totalProfessionals > 0
                    ? `${stats.totalProfessionals} already registered`
                    : "Be one of the first"}
                </span>
              </div>
            </header>

            {/* Wizard */}
            <RegisterWizard categories={categories} />
          </div>

          {/* ─── SIDEBAR (sticky on desktop) ──────────────── */}
          <aside className="lg:col-span-4">
            <div className="space-y-5 lg:sticky lg:top-24">
              {/* Benefits card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="font-display text-lg font-bold tracking-tight">
                  What you get
                </h2>
                <ul className="mt-4 space-y-3 text-sm">
                  <Benefit
                    icon={<BadgeCheck className="h-4 w-4" />}
                    text="A verified public profile with your portfolio and services"
                  />
                  <Benefit
                    icon={<TrendingUp className="h-4 w-4" />}
                    text="Client enquiries matched to your category and counties"
                  />
                  <Benefit
                    icon={<ShieldCheck className="h-4 w-4" />}
                    text="Admin-verified badge, only awarded to screened applicants"
                  />
                  <Benefit
                    icon={<Briefcase className="h-4 w-4" />}
                    text="Full control of your listing, availability, and contact details"
                  />
                </ul>

                <div className="mt-6 rounded-xl bg-success-soft p-3.5">
                  <p className="inline-flex items-start gap-2 text-xs font-medium leading-relaxed text-success">
                    <CheckCircle2
                      className="mt-0.5 h-3.5 w-3.5 shrink-0"
                      aria-hidden
                    />
                    <span>
                      <span className="font-semibold">Free forever</span> to
                      register and maintain your profile.
                    </span>
                  </p>
                </div>
              </div>

              {/* How it works */}
              <div className="rounded-2xl border border-border bg-background-subtle p-6">
                <h3 className="font-display text-base font-bold tracking-tight">
                  Approval process
                </h3>
                <ol className="mt-4 space-y-3 text-sm">
                  <StepLight number={1} text="Complete this form" />
                  <StepLight
                    number={2}
                    text="Upload your portfolio and credentials"
                  />
                  <StepLight
                    number={3}
                    text="Our team reviews within 2 business days"
                  />
                  <StepLight
                    number={4}
                    text="Approved — your profile goes live"
                  />
                </ol>
              </div>

              {/* Help card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-display text-base font-bold tracking-tight">
                  Have questions?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Reach our team on WhatsApp or email — we usually respond the
                  same day.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    variant="whatsapp"
                    size="sm"
                    asChild
                    className="flex-1"
                  >
                    <a
                      href="https://wa.me/254700000000"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link href="/contact">Contact</Link>
                  </Button>
                </div>
              </div>

              {/* Not a professional? */}
              <div className="rounded-2xl border border-dashed border-border bg-card/50 p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Not a professional?
                </p>
                <Link
                  href="/professionals/request"
                  className="group mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Request a professional instead
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════════════════════ */

function Benefit({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
        {icon}
      </span>
      <span className="leading-relaxed">{text}</span>
    </li>
  );
}

function StepLight({ number, text }: { number: number; text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/5 text-[11px] font-bold text-primary">
        {number}
      </span>
      <span className="leading-relaxed text-muted-foreground">{text}</span>
    </li>
  );
}