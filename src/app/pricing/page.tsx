import Link from "next/link";
import {
  Check,
  ArrowRight,
  Building2,
  UserRound,
  HardHat,
  Sparkles,
  Info,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Pricing",
  description:
    "Free to list. Small commission only when land sells. Transparent pricing for sellers, companies, and professionals.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — ArdhiSoko",
    description:
      "Free to list. Commission only when land sells.",
    url: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-hero bg-grain">
        <Container className="pb-16 pt-16 lg:pb-20 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Simple. Transparent. Fair.
            </span>

            <h1 className="animate-fade-in-up delay-75 mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Pricing that{" "}
              <span className="text-gradient-brand">works for Kenya.</span>
            </h1>

            <p className="animate-fade-in-up delay-150 mt-5 text-lg leading-relaxed text-muted-foreground">
              Free to list. Pay only when your land sells. No hidden fees,
              no monthly minimums for individuals.
            </p>
          </div>
        </Container>
      </section>

      {/* PRICING CARDS */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Individual seller */}
            <PricingCard
              icon={<UserRound className="h-5 w-5" />}
              title="Individual seller"
              price="Free"
              priceNote="+ 2% commission on sale"
              description="Perfect for selling a single plot, family shamba, or inherited land."
              features={[
                "Unlimited listings",
                "Photo uploads",
                "Verification by our team",
                "Direct buyer enquiries",
                "WhatsApp integration",
                "No monthly fees",
              ]}
              ctaLabel="List your land"
              ctaHref="/sell"
            />

            {/* Company / Developer — highlighted */}
            <PricingCard
              icon={<Building2 className="h-5 w-5" />}
              title="Company / Developer"
              price="From KES 5,000"
              priceNote="per month, based on active listings"
              description="For developers with multiple projects and hundreds of plots."
              badge="Popular"
              highlighted
              features={[
                "Unlimited projects",
                "Grouped developments",
                "Bulk CSV + photo upload",
                "Full CRM & lead pipeline",
                "Analytics dashboard",
                "Team accounts (up to 5 users)",
                "Priority support",
              ]}
              ctaLabel="Talk to sales"
              ctaHref="/contact"
            />

            {/* Professional */}
            <PricingCard
              icon={<HardHat className="h-5 w-5" />}
              title="Professional"
              price="From KES 3,000"
              priceNote="per month, after approval"
              description="For surveyors, valuers, advocates, architects, and engineers."
              features={[
                "Verified public profile",
                "Portfolio & credentials showcase",
                "Client leads by category & county",
                "Direct WhatsApp contact",
                "Priority in matching",
                "Cancel anytime",
              ]}
              ctaLabel="Register as a pro"
              ctaHref="/professionals/register"
            />
          </div>

          {/* Company tier detail */}
          <div className="mt-16 rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="font-display text-2xl font-extrabold tracking-tight">
                  Company subscription tiers
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Active listings across all your projects count
                  cumulatively. You&rsquo;re charged on the tier your total
                  falls into — never per project.
                </p>
                <p className="mt-4 inline-flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                  <span>
                    &ldquo;Active&rdquo; means published or reserved. Drafts,
                    pending, sold, and archived listings don&rsquo;t count.
                  </span>
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="overflow-hidden rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-background-subtle">
                      <tr>
                        <th className="p-3 text-left font-semibold">
                          Active listings
                        </th>
                        <th className="p-3 text-right font-semibold">
                          Monthly
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <TierRow tier="50 or fewer" price="Free" />
                      <TierRow tier="51 – 100" price="KES 5,000" />
                      <TierRow tier="101 – 500" price="KES 10,000" />
                      <TierRow tier="More than 500" price="KES 30,000" />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t bg-background-subtle py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Common questions
              </h2>
            </div>

            <dl className="mt-14 space-y-6">
              <FaqItem
                q="Do I really pay nothing to list?"
                a="Yes. Listing is free. We charge a 2% commission only when your property sells through ArdhiSoko. If your land doesn't sell, you pay nothing."
              />
              <FaqItem
                q="How is the 2% commission charged?"
                a="Once a buyer and seller agree on terms, we invoice the commission. It's deducted from the deposit or paid separately — your choice. No commission, no hidden extras."
              />
              <FaqItem
                q="Can I list more than one property?"
                a="Absolutely. Individual sellers can list as many plots as they own, all free. Companies and developers get a dashboard to manage hundreds of plots across multiple projects."
              />
              <FaqItem
                q="What happens if I don't sell?"
                a="Nothing. Your listing stays active until you mark it sold or archive it. No monthly charge, no expiry date, no pressure."
              />
              <FaqItem
                q="Do professionals pay per lead?"
                a="No. Professionals pay a flat monthly subscription and receive every matching lead in their category and county. No per-lead billing, no bidding."
              />
              <FaqItem
                q="Is there a discount for annual payment?"
                a="Yes — pay 10 months up front and get 12 months of service. Contact us to switch to annual billing."
              />
            </dl>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Still have questions?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our team usually replies within a few hours on business days.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="shadow-brand">
                <Link href="/contact">
                  Contact us
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/sell">List your land</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════════════════════ */

function PricingCard({
  icon,
  title,
  price,
  priceNote,
  description,
  features,
  ctaLabel,
  ctaHref,
  badge,
  highlighted,
}: {
  icon: React.ReactNode;
  title: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  badge?: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={
        highlighted
          ? "relative overflow-hidden rounded-2xl border-2 border-primary bg-card p-8 shadow-lg"
          : "relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm"
      }
    >
      {badge && (
        <div className="absolute right-4 top-4">
          <Badge variant="featured">{badge}</Badge>
        </div>
      )}

      <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
        {title}
      </h3>

      <div className="mt-4">
        <div className="font-display text-3xl font-extrabold tracking-tight">
          {price}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">{priceNote}</div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <ul className="mt-6 space-y-2.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success-soft text-success">
              <Check className="h-3 w-3" aria-hidden />
            </span>
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          asChild
          size="lg"
          className="w-full shadow-brand"
          variant={highlighted ? "default" : "outline"}
        >
          <Link href={ctaHref}>
            {ctaLabel}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function TierRow({ tier, price }: { tier: string; price: string }) {
  return (
    <tr className="border-t border-border">
      <td className="p-3 text-muted-foreground">{tier}</td>
      <td className="p-3 text-right font-medium">{price}</td>
    </tr>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <dt className="font-display text-base font-bold tracking-tight">
        {q}
      </dt>
      <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {a}
      </dd>
    </div>
  );
}