import Link from "next/link";
import {
  ShieldCheck,
  MapPin,
  Users,
  ArrowRight,
  HardHat,
  Search,
  BadgeCheck,
  CheckCircle2,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { CategoryGrid } from "@/components/category-grid";
import { ProfessionalCard } from "@/components/professional-card";
import {
  getCategories,
  getAllProfessionals,
  getProfessionalStats,
} from "@/lib/professionals";

export const metadata = {
  title: "Find a Professional — Land Surveyors, Valuers, Advocates & More",
  description:
    "Connect with verified land surveyors, property valuers, advocates, architects, and engineers across Kenya. Free to request. Fast responses.",
  alternates: { canonical: "/professionals" },
  openGraph: {
    title: "Find a Professional — ArdhiSoko",
    description:
      "Verified land surveyors, property valuers, advocates, architects, and engineers across Kenya.",
    url: "/professionals",
  },
};

export default async function ProfessionalsPage() {
  const [categories, professionals, stats] = await Promise.all([
    getCategories(),
    getAllProfessionals(),
    getProfessionalStats(),
  ]);

  const approved = professionals.filter(
    (p) => p.verificationStatus === "approved"
  );
  const featured = approved.filter((p) => p.featured).slice(0, 3);

  const countsByCategory: Record<string, number> = {};
  for (const p of approved) {
    countsByCategory[p.categoryId] = (countsByCategory[p.categoryId] ?? 0) + 1;
  }

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════ */}
      <section className="bg-hero bg-grain">
        <Container className="pb-16 pt-16 lg:pb-20 lg:pt-24">
          <div className="max-w-3xl">
            <span className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <HardHat className="h-3.5 w-3.5" aria-hidden />
              Verified professionals · Nationwide
            </span>

            <h1 className="animate-fade-in-up delay-75 mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Find a{" "}
              <span className="text-gradient-brand">professional.</span>
            </h1>

            <p className="animate-fade-in-up delay-150 mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Surveyors, valuers, advocates, architects, engineers — everyone
              you need to buy, verify, and develop land in Kenya.
            </p>

            <div className="animate-fade-in-up delay-300 mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/professionals/request"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-base font-medium text-primary-foreground shadow-brand transition-all hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Request a professional
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="#browse"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-6 text-base font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Browse categories
              </Link>
            </div>

            <p className="animate-fade-in-up delay-500 mt-6 text-sm text-muted-foreground">
              Are you a professional?{" "}
              <Link
                href="/professionals/register"
                className="font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
              >
                Register here
              </Link>
            </p>
          </div>

          {/* Stats */}
          <dl className="animate-fade-in-up delay-500 mt-14 grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
            <Stat value={stats.totalProfessionals} label="Verified pros" />
            <Stat value={stats.totalCategories} label="Categories" />
            <Stat value={stats.activeCounties} label="Counties covered" />
            <Stat value="24h" label="Response time" />
          </dl>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          CATEGORIES
          ═══════════════════════════════════════════════════ */}
      <section id="browse" className="py-20 lg:py-24">
        <Container>
          <div className="mb-10">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Browse by category
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Every professional is verified before appearing on ArdhiSoko.
            </p>
          </div>

          <CategoryGrid categories={categories} counts={countsByCategory} />
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURED PROFESSIONALS
          ═══════════════════════════════════════════════════ */}
      {featured.length > 0 && (
        <section className="border-y bg-background-subtle py-20 lg:py-24">
          <Container>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Top-rated professionals
                </h2>
                <p className="mt-2 max-w-xl text-muted-foreground">
                  Experienced, verified, and actively taking new clients.
                </p>
              </div>
              <Link
  href="/professionals/directory"
  className="hidden text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:inline-flex sm:items-center sm:gap-1"
>
  View all
  <ArrowRight className="h-4 w-4" aria-hidden />
</Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p, i) => {
                const cat = categories.find((c) => c.id === p.categoryId);
                if (!cat) return null;
                return (
                  <div
                    key={p.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <ProfessionalCard
                      professional={p}
                      category={cat}
                      priority={i === 0}
                    />
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          HOW IT WORKS
          ═══════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              How it works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three steps from need to hired.
            </p>
          </div>

          <ol className="mt-14 grid gap-8 sm:grid-cols-3">
            <Step
              number={1}
              icon={<Search className="h-5 w-5" />}
              title="Tell us what you need"
              body="Select the category, county, and describe your requirement in 30 seconds."
            />
            <Step
              number={2}
              icon={<Users className="h-5 w-5" />}
              title="We match you"
              body="We connect you with verified professionals in your area, usually within 24 hours."
            />
            <Step
              number={3}
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Hire with confidence"
              body="Every professional is vetted. Discuss scope, get a quote, and proceed."
            />
          </ol>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA — register as a professional
          ═══════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-secondary py-20 text-secondary-foreground lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)",
          }}
        />

        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            {/* Left — pitch */}
            <div className="lg:col-span-7">
              <div className="mb-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
                <BadgeCheck className="h-3 w-3" aria-hidden />
                Join the network
              </div>

              <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Are you a land or property professional?
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed opacity-90">
                Join Kenya&rsquo;s fastest-growing land marketplace. Get
                verified, build your profile, and receive qualified client
                enquiries from buyers, developers, and diaspora investors.
              </p>

              <ul className="mt-6 space-y-2.5 text-sm opacity-95">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden
                  />
                  <span>
                    <span className="font-semibold">Free to register.</span>{" "}
                    Our team reviews every application within 2 business days.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden
                  />
                  <span>
                    <span className="font-semibold">
                      Enquiries matched by category and county
                    </span>{" "}
                    — you only see work in your area.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden
                  />
                  <span>
                    <span className="font-semibold">
                      Public verified profile
                    </span>{" "}
                    with portfolio, services, and direct contact.
                  </span>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                {/* Primary — white button, plain anchor */}
                <Link
                  href="/professionals/register"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-6 text-base font-semibold text-secondary shadow-lg transition-all hover:-translate-y-0.5 hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
                >
                  Register as a professional
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>

                {/* Secondary — outline */}
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/30 bg-transparent px-6 text-base font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
                >
                  Talk to our team
                </Link>
              </div>
            </div>

            {/* Right — stats / trust block */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm lg:p-8">
                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                  <StatLight
                    value={String(stats.totalProfessionals)}
                    label="Verified pros"
                  />
                  <StatLight value="24h" label="Response time" />
                  <StatLight
                    value={String(stats.activeCounties)}
                    label="Counties"
                  />
                  <StatLight value="Free" label="To register" />
                </div>

                <div className="mt-8 border-t border-white/15 pt-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-70">
                    Categories on ArdhiSoko
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {categories.slice(0, 6).map((cat) => (
                      <span
                        key={cat.id}
                        className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium opacity-90"
                      >
                        {cat.pluralName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          BUYER CTA — closing line for buyers
          ═══════════════════════════════════════════════════ */}
      <section className="py-16 text-center lg:py-20">
        <Container>
          <p className="text-sm text-muted-foreground">
            Need a professional instead?{" "}
            <Link
              href="/professionals/request"
              className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              Tell us what you need
            </Link>{" "}
            and we&apos;ll match you within 24 hours.
          </p>
        </Container>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════════════════════ */

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-extrabold tracking-tight text-primary">
        {value}
      </div>
      <div className="mt-1 text-sm font-medium text-foreground">{label}</div>
    </div>
  );
}

function StatLight({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-extrabold tracking-tight text-white">
        {value}
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/70">
        {label}
      </div>
    </div>
  );
}

function Step({
  number,
  icon,
  title,
  body,
}: {
  number: number;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <li className="group relative rounded-2xl border border-border bg-card p-6 shadow-xs transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-brand">
          {number}
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </span>
      </div>
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </li>
  );
}