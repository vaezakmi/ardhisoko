import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Users,
  Home,
  HardHat,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { ContactForm } from "./contact-form";
import { Faq } from "./faq";

export const metadata = {
  title: "Contact us",
  description:
    "Reach the ArdhiSoko team. WhatsApp, email, or phone — we usually respond within a few hours on business days.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact ArdhiSoko",
    description:
      "WhatsApp, email, or phone. We respond within hours on business days.",
    url: "/contact",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact ArdhiSoko",
  url: "/contact",
  mainEntity: {
    "@type": "Organization",
    name: "ArdhiSoko",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "hello@ardhisoko.co.ke",
        telephone: "+254700000000",
        availableLanguage: ["English", "Swahili"],
        areaServed: "KE",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-hero bg-grain">
        <Container className="pb-16 pt-16 lg:pb-20 lg:pt-24">
          <div className="max-w-3xl">
            <span className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <MessageCircle className="h-3.5 w-3.5" aria-hidden />
              We reply within hours
            </span>

            <h1 className="animate-fade-in-up delay-75 mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Talk to{" "}
              <span className="text-gradient-brand">our team.</span>
            </h1>

            <p className="animate-fade-in-up delay-150 mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Questions about a listing, registering as a professional, or
              anything else? Pick the channel that suits you best.
            </p>

            <div className="animate-fade-in-up delay-300 mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                Mon–Fri · 9am – 6pm EAT
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                No sales pressure
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" aria-hidden />
                Real humans, no bots
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ChannelCard
              href={siteConfig.social.whatsapp}
              external
              icon={<MessageCircle className="h-5 w-5" />}
              label="WhatsApp"
              value="Fastest response"
              cta="Chat now"
              variant="whatsapp"
            />
            <ChannelCard
              href={`mailto:${siteConfig.contact.email}`}
              icon={<Mail className="h-5 w-5" />}
              label="Email"
              value={siteConfig.contact.email}
              cta="Send email"
            />
            <ChannelCard
              href={`tel:${siteConfig.contact.phone}`}
              icon={<Phone className="h-5 w-5" />}
              label="Phone"
              value={siteConfig.contact.phone}
              cta="Call us"
            />
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="mb-8">
                <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Send us a message
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Tell us what you need and we&apos;ll route it to the right
                  person.
                </p>
              </div>

              <ContactForm />
            </div>

            <aside className="lg:col-span-5">
              <div className="space-y-6 lg:sticky lg:top-24">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="font-display text-lg font-bold tracking-tight">
                    Visit us
                  </h3>
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden
                      />
                      <div>
                        <p className="font-medium">
                          {siteConfig.address.city},{" "}
                          {siteConfig.address.country}
                        </p>
                        <p className="mt-0.5 text-muted-foreground">
                          Monday to Friday · 9am – 6pm
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden
                      />
                      <div>
                        <p className="font-medium">Response time</p>
                        <p className="mt-0.5 text-muted-foreground">
                          Same day on business days
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="font-display text-lg font-bold tracking-tight">
                    Skip the queue
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Looking for something specific?
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <ShortcutLink
                      href="/professionals/request"
                      icon={<Users className="h-4 w-4" />}
                      label="Request a professional"
                    />
                    <ShortcutLink
                      href="/professionals/register"
                      icon={<HardHat className="h-4 w-4" />}
                      label="Register as a professional"
                    />
                    <ShortcutLink
                      href="/sell"
                      icon={<Home className="h-4 w-4" />}
                      label="List your land"
                    />
                    <ShortcutLink
                      href="/listings"
                      icon={<MapPin className="h-4 w-4" />}
                      label="Browse land listings"
                    />
                  </ul>
                </div>

                <div className="rounded-2xl border border-border bg-background-subtle p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      We never share your details
                    </span>{" "}
                    with third parties. Your message goes directly to our
                    team and stays there.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t bg-background-subtle py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Frequently asked
              </h2>
              <p className="mt-3 text-muted-foreground">
                Quick answers before you reach out.
              </p>
            </div>

            <div className="mt-12">
              <Faq />
            </div>

            <p className="mt-12 text-center text-sm text-muted-foreground">
              Still stuck?{" "}
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              >
                WhatsApp us
              </a>{" "}
              — we usually reply in minutes.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 text-center lg:py-20">
        <Container>
          <p className="text-sm text-muted-foreground">
            Ready to browse?{" "}
            <Link
              href="/listings"
              className="inline-flex items-center gap-1 font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              See verified land across Kenya
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}

function ChannelCard({
  href,
  external,
  icon,
  label,
  value,
  cta,
  variant,
}: {
  href: string;
  external?: boolean;
  icon: React.ReactNode;
  label: string;
  value: string;
  cta: string;
  variant?: "whatsapp";
}) {
  const isWhatsapp = variant === "whatsapp";

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={
        isWhatsapp
          ? "group flex flex-col gap-4 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/5 p-6 transition-all hover:-translate-y-1 hover:border-[#25D366] hover:shadow-md"
          : "group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
      }
    >
      <div className="flex items-center gap-3">
        <span
          className={
            isWhatsapp
              ? "grid h-11 w-11 place-items-center rounded-xl bg-[#25D366] text-white shadow-sm"
              : "grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
          }
        >
          {icon}
        </span>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {label}
          </div>
          <div className="mt-0.5 font-medium text-foreground">{value}</div>
        </div>
      </div>

      <div className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors group-hover:text-primary/80">
        {cta}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </a>
  );
}

function ShortcutLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-accent"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </span>
        <span className="flex-1 font-medium text-foreground">{label}</span>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </Link>
    </li>
  );
}