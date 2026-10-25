import Link from "next/link";
import { Cookie, Mail, ShieldCheck, Info, Settings2, BarChart3, Megaphone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Cookie policy",
  description:
    "How ArdhiSoko uses cookies and similar technologies. What we set, why we set them, and how to control them.",
  alternates: { canonical: "/cookies" },
};

const LAST_UPDATED = "16 September 2026";

export default function CookiesPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-hero bg-grain">
        <Container className="pb-12 pt-16 lg:pb-16 lg:pt-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Cookie className="h-3.5 w-3.5" aria-hidden />
              Small files, big transparency
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Cookie policy
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10">
            {/* TL;DR */}
            <div className="rounded-2xl border border-success/30 bg-success-soft p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-success"
                  aria-hidden
                />
                <div>
                  <h2 className="font-display text-base font-bold text-success">
                    The short version
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    We use cookies only for essential functions (keeping you
                    signed in and remembering your theme preference) and for
                    privacy-respecting analytics. We do <strong>not</strong>{" "}
                    use advertising cookies, tracking pixels, or third-party
                    cookies that follow you around the internet.
                  </p>
                </div>
              </div>
            </div>

            <Section title="What are cookies?">
              <p>
                Cookies are small text files that websites place on your
                device to store information. They help websites remember who
                you are, what you prefer, and how you use the site.
              </p>
              <p>
                {siteConfig.name} uses a minimal set of cookies — nothing
                more than we need to make the platform work smoothly.
              </p>
            </Section>

            <Section title="Cookies we use">
              <div className="space-y-4">
                <CookieType
                  icon={<Settings2 className="h-5 w-5" />}
                  name="Essential cookies"
                  purpose="Authentication, session management, security."
                  examples={[
                    "sb-auth-token — keeps you signed in",
                    "csrf-token — protects against cross-site request forgery",
                  ]}
                  required
                />

                <CookieType
                  icon={<Cookie className="h-5 w-5" />}
                  name="Preference cookies"
                  purpose="Remember your choices so you don't have to re-enter them."
                  examples={[
                    "ardhisoko:theme — your dark/light mode preference",
                    "ardhisoko:recent-searches — your last few searches",
                    "ardhisoko:favorites — listings you've saved",
                  ]}
                  required
                />

                <CookieType
                  icon={<BarChart3 className="h-5 w-5" />}
                  name="Analytics cookies"
                  purpose="Help us understand which pages are useful and where to improve. Aggregated, anonymised, no personal profiling."
                  examples={[
                    "Privacy-respecting page view tracking",
                    "Error and performance monitoring",
                  ]}
                />

                <CookieType
                  icon={<Megaphone className="h-5 w-5" />}
                  name="Advertising cookies"
                  purpose="None. We do not use advertising cookies or third-party trackers."
                  examples={["—"]}
                  disabled
                />
              </div>
            </Section>

            <Section title="How long do cookies last?">
              <ul>
                <li>
                  <strong>Session cookies</strong> — deleted when you close
                  your browser. Used for authentication and security.
                </li>
                <li>
                  <strong>Persistent cookies</strong> — remain until they
                  expire or you delete them. Used for preferences and
                  analytics (typically 30 days to 1 year).
                </li>
              </ul>
            </Section>

            <Section title="Managing cookies">
              <p>
                You can control cookies through your browser settings. Most
                browsers let you:
              </p>
              <ul>
                <li>View and delete existing cookies.</li>
                <li>Block all cookies or just third-party cookies.</li>
                <li>
                  Block cookies from specific sites you don&rsquo;t trust.
                </li>
                <li>
                  Enable private/incognito mode, which clears cookies at the
                  end of each session.
                </li>
              </ul>
              <p>
                <strong>Note:</strong> blocking essential cookies will prevent
                you from signing in and using certain features of ArdhiSoko.
              </p>
            </Section>

            <Section title="Third-party services">
              <p>
                We use a small number of trusted third-party services that may
                set their own cookies when you use the platform:
              </p>
              <ul>
                <li>
                  <strong>Supabase</strong> — authentication and data storage
                </li>
                <li>
                  <strong>Vercel</strong> — hosting and content delivery
                </li>
                <li>
                  <strong>Privacy-respecting analytics</strong> — aggregate
                  usage data (no personal tracking)
                </li>
              </ul>
              <p>
                These providers operate under their own privacy policies,
                which you can review on their websites.
              </p>
            </Section>

            <Section title="Do Not Track">
              <p>
                We respect the &ldquo;Do Not Track&rdquo; browser setting. If
                you enable it, we disable all non-essential analytics for your
                session.
              </p>
            </Section>

            <Section title="Changes to this policy">
              <p>
                We may update this cookie policy from time to time. Changes
                take effect when posted on this page, and we&rsquo;ll update
                the &ldquo;last updated&rdquo; date above.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Questions about our use of cookies? Reach us at{" "}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-medium text-primary underline underline-offset-4"
                >
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </Section>

            {/* Related links */}
            <div className="mt-12 rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-base font-bold">
                Related policies
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href="/privacy"
                    className="font-medium text-primary hover:underline"
                  >
                    Privacy policy →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="font-medium text-primary hover:underline"
                  >
                    Terms of service →
                  </Link>
                </li>
              </ul>
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl font-extrabold tracking-tight">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_strong]:font-semibold [&_strong]:text-foreground">
        {children}
      </div>
    </section>
  );
}

function CookieType({
  icon,
  name,
  purpose,
  examples,
  required,
  disabled,
}: {
  icon: React.ReactNode;
  name: string;
  purpose: string;
  examples: string[];
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div
      className={
        disabled
          ? "rounded-xl border border-dashed border-border bg-muted/30 p-5"
          : "rounded-xl border border-border bg-card p-5"
      }
    >
      <div className="flex items-start gap-3">
        <span
          className={
            disabled
              ? "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground"
              : "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"
          }
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-bold text-foreground">
              {name}
            </h3>
            {required && (
              <span className="rounded-full bg-success-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success">
                Required
              </span>
            )}
            {disabled && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Not used
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {purpose}
          </p>
          {examples.length > 0 && examples[0] !== "—" && (
            <ul className="mt-3 space-y-1">
              {examples.map((ex) => (
                <li
                  key={ex}
                  className="font-mono text-[11px] leading-relaxed text-muted-foreground"
                >
                  {ex}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}