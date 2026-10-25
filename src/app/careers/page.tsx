import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Briefcase,
  Heart,
  Rocket,
  Users,
  Zap,
  Coffee,
  Laptop,
  Clock,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Careers",
  description:
    "Join ArdhiSoko and help build Kenya's most trusted land marketplace. Open roles in engineering, sales, and operations.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers at ArdhiSoko",
    description:
      "Help build Kenya's most trusted land marketplace.",
    url: "/careers",
  },
};

interface Role {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

const openRoles: Role[] = [
  {
    title: "Senior Full-stack Engineer",
    department: "Engineering",
    location: "Nairobi · Hybrid",
    type: "Full-time",
    description:
      "Ship features across our Next.js frontend and Supabase backend. You'll own product surfaces end-to-end, from schema to UI.",
  },
  {
    title: "Field Verification Officer",
    department: "Trust & Safety",
    location: "Nairobi / Kiambu / Nakuru",
    type: "Full-time",
    description:
      "Visit listed land parcels, verify title deeds at Ministry of Lands offices, and confirm seller identities. Field-heavy role.",
  },
  {
    title: "Growth & Partnerships Lead",
    department: "Growth",
    location: "Nairobi · Hybrid",
    type: "Full-time",
    description:
      "Sign up developers, agents, and professional bodies. Build the network that makes ArdhiSoko the default platform.",
  },
  {
    title: "Customer Care Lead",
    department: "Operations",
    location: "Nairobi · On-site",
    type: "Full-time",
    description:
      "Own the customer experience across WhatsApp, email, and phone. Build our care playbook from the ground up.",
  },
];

const values = [
  {
    icon: <Rocket className="h-5 w-5" />,
    title: "Ship fast, fix fast",
    body: "Small teams, quick decisions, real impact. We prefer a rough v1 in a week to a polished plan in a month.",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Obsess over trust",
    body: "Every feature we build either adds or removes trust. That's the metric we optimize for.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Hire for slope, not intercept",
    body: "We care more about how fast you learn than what you already know. Show us your trajectory.",
  },
];

const perks = [
  { icon: <Laptop className="h-4 w-4" />, text: "Equipment of your choice" },
  { icon: <Clock className="h-4 w-4" />, text: "Flexible hours" },
  { icon: <Coffee className="h-4 w-4" />, text: "Free lunch at HQ" },
  { icon: <Zap className="h-4 w-4" />, text: "Quarterly team offsites" },
];

export default function CareersPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-hero bg-grain">
        <Container className="pb-16 pt-16 lg:pb-20 lg:pt-24">
          <div className="max-w-3xl">
            <span className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Briefcase className="h-3.5 w-3.5" aria-hidden />
              {openRoles.length} open roles
            </span>

            <h1 className="animate-fade-in-up delay-75 mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Build the future of{" "}
              <span className="text-gradient-brand">Kenyan land.</span>
            </h1>

            <p className="animate-fade-in-up delay-150 mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              We&rsquo;re a small team fixing a big problem. If you care about
              making land buying in Kenya safe, transparent, and fair — we
              want to hear from you.
            </p>

            <div className="animate-fade-in-up delay-300 mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="shadow-brand">
                <Link href="#roles">
                  See open roles
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* VALUES */}
      <section className="border-y bg-background-subtle py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              How we work
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three principles that guide everything we do.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-xs"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  {v.icon}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.body}
                </p>
              </div>
            ))}
          </div>

          {/* Perks */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {perks.map((p) => (
              <div
                key={p.text}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm"
              >
                <span className="text-primary">{p.icon}</span>
                <span className="text-muted-foreground">{p.text}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* OPEN ROLES */}
      <section id="roles" className="py-20 lg:py-24 scroll-mt-24">
        <Container>
          <div className="mb-10">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Open roles
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Don&rsquo;t see a role that fits? Email{" "}
              <a
                href="mailto:careers@ardhisoko.co.ke"
                className="font-medium text-primary underline underline-offset-4"
              >
                careers@ardhisoko.co.ke
              </a>{" "}
              with what you&apos;d like to work on.
            </p>
          </div>

          <div className="space-y-3">
            {openRoles.map((role) => (
              <div
                key={role.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg font-bold tracking-tight">
                        {role.title}
                      </h3>
                      <Badge variant="outline" size="sm">
                        {role.department}
                      </Badge>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        {role.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5" aria-hidden />
                        {role.type}
                      </span>
                    </div>

                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {role.description}
                    </p>
                  </div>

                  <a
                    href={`mailto:careers@ardhisoko.co.ke?subject=Application: ${encodeURIComponent(role.title)}`}
                    className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-md border border-border bg-background px-4 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    Apply
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t bg-background-subtle py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Not the right time?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Send us your CV anyway. We keep applications for 12 months and
              reach out when a matching role opens.
            </p>
            <Button asChild className="mt-6 shadow-brand">
              <a href="mailto:careers@ardhisoko.co.ke">
                careers@ardhisoko.co.ke
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}