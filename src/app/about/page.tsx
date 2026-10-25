import Link from "next/link";
import {
  ShieldCheck,
  MapPin,
  Users,
  ArrowRight,
  Heart,
  Target,
  Eye,
  Building2,
  Sprout,
  HandCoins,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About",
  description:
    "ArdhiSoko is Kenya's verified land marketplace. We exist to make buying and selling land safe, transparent, and fast for everyone — from Nairobi to the diaspora.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About ArdhiSoko",
    description:
      "Kenya's verified land marketplace. Safe, transparent, fast.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-hero bg-grain">
        <Container className="pb-16 pt-16 lg:pb-20 lg:pt-24">
          <div className="max-w-3xl">
            <span className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sprout className="h-3.5 w-3.5" aria-hidden />
              Est. 2026 · Nairobi, Kenya
            </span>

            <h1 className="animate-fade-in-up delay-75 mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Land, made{" "}
              <span className="text-gradient-brand">trustworthy.</span>
            </h1>

            <p className="animate-fade-in-up delay-150 mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              ArdhiSoko exists because buying land in Kenya shouldn&rsquo;t
              require guesswork, back-room deals, or luck. Every listing is
              checked. Every title verified. Every seller vetted.
            </p>
          </div>
        </Container>
      </section>

      {/* MISSION */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-xl leading-relaxed text-foreground sm:text-2xl">
              We&rsquo;re building the platform we wish had existed when our
              own families were buying land. A place where the deed matches
              the seller, the boundaries match the map, and the price matches
              reality.
            </p>
          </div>
        </Container>
      </section>

      {/* VALUES */}
      <section className="border-y bg-background-subtle py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              What we stand for
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three principles guide every decision we make.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            <ValueCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Verification first"
              body="We don't list land we wouldn't buy ourselves. Titles are checked at the Ministry of Lands. Sellers are confirmed. No exceptions."
            />
            <ValueCard
              icon={<MapPin className="h-6 w-6" />}
              title="Local to the core"
              body="Built in Nairobi, for Kenya. Every feature — from county filters to M-Pesa deposits — is designed around how land actually moves here."
            />
            <ValueCard
              icon={<Users className="h-6 w-6" />}
              title="People over profit"
              body="We take a small commission only when land sells. No hidden fees. No selling your data. No pressure tactics."
            />
          </div>
        </Container>
      </section>

      {/* FOUNDER STORY */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <div className="aspect-square overflow-hidden rounded-2xl bg-primary/10">
                <div className="grid h-full w-full place-items-center">
                  <Heart className="h-16 w-16 text-primary" aria-hidden />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Why we built this
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Kenya&rsquo;s land market is one of the most active in
                  Africa. It&rsquo;s also one of the most opaque. Family land
                  disputes, fraudulent titles, and middlemen who add nothing
                  but cost have made land buying a gamble most people only
                  take once.
                </p>
                <p>
                  We started ArdhiSoko because we believe technology can fix
                  most of this. A verified listing directory. A clear fee
                  structure. Tools that let you check a seller&rsquo;s
                  reputation before you send money. It&rsquo;s not
                  revolutionary — it&rsquo;s just what the market has been
                  missing.
                </p>
                <p>
                  Our goal is simple: make buying and selling land in Kenya as
                  safe and easy as buying anything else online.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="shadow-brand">
                  <Link href="/listings">
                    Browse land
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Talk to us</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* BY THE NUMBERS */}
      <section className="border-y bg-secondary py-16 text-secondary-foreground lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              By the numbers
            </h2>
            <p className="mt-3 opacity-90">
              Where we are today. Where we&rsquo;re headed.
            </p>
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <StatBig value="47" label="Counties covered" />
            <StatBig value="100%" label="Titles verified" />
            <StatBig value="24h" label="Response time" />
            <StatBig value="KES 0" label="Cost to list" />
          </div>
        </Container>
      </section>

      {/* PRINCIPLES */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                How we operate
              </h2>
              <p className="mt-3 text-muted-foreground">
                Six commitments we make to every user.
              </p>
            </div>

            <ul className="mt-14 space-y-4">
              <Commitment
                number={1}
                text="We never sell your personal data. Ever."
              />
              <Commitment
                number={2}
                text="Every listing is reviewed by a human before it goes live."
              />
              <Commitment
                number={3}
                text="We don't hold deposits or funds. Money moves directly between buyer and seller."
              />
              <Commitment
                number={4}
                text="Our pricing is public. No hidden charges, no surprises."
              />
              <Commitment
                number={5}
                text="If a listing is fraudulent, we remove it within 24 hours of being told."
              />
              <Commitment
                number={6}
                text="We support the Kenyan diaspora with international phone support and USD pricing."
              />
            </ul>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t bg-background-subtle py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Buy land, sell land, or hire a professional — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="shadow-brand">
                <Link href="/listings">
                  Browse land
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

function ValueCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}

function StatBig({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        {value}
      </div>
      <div className="mt-2 text-xs font-medium uppercase tracking-wider opacity-80">
        {label}
      </div>
    </div>
  );
}

function Commitment({ number, text }: { number: number; text: string }) {
  return (
    <li className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
        {number}
      </span>
      <span className="pt-1 text-base leading-relaxed text-foreground">
        {text}
      </span>
    </li>
  );
}