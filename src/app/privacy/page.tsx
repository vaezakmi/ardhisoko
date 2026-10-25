import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Privacy policy",
  description:
    "How ArdhiSoko collects, uses, and protects your personal information under Kenya's Data Protection Act 2019.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "16 September 2026";

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-hero bg-grain">
        <Container className="pb-12 pt-16 lg:pb-16 lg:pt-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              Your privacy matters
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Privacy policy
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
            <Section title="Introduction">
              <p>
                {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
                &ldquo;our&rdquo;) operates a land and property marketplace
                for Kenya. This privacy policy explains what personal
                information we collect, how we use it, and your rights under
                the Kenya Data Protection Act 2019.
              </p>
              <p>
                By using {siteConfig.name}, you agree to the practices
                described here. If you do not agree, please do not use our
                platform.
              </p>
            </Section>

            <Section title="Information we collect">
              <SubTitle>Information you provide directly</SubTitle>
              <ul>
                <li>Name, email address, and phone number (including country code)</li>
                <li>Property details when listing land for sale</li>
                <li>Professional credentials when registering as a professional</li>
                <li>Messages sent to sellers or through our contact forms</li>
                <li>Payment details when purchasing a subscription or promotion</li>
              </ul>

              <SubTitle>Information collected automatically</SubTitle>
              <ul>
                <li>IP address and approximate location (country-level)</li>
                <li>Browser type, device type, and operating system</li>
                <li>Pages visited and time spent on the platform</li>
                <li>Referring URL or search term that brought you here</li>
              </ul>

              <SubTitle>Information from third parties</SubTitle>
              <ul>
                <li>Authentication providers (if you sign in via Google or similar)</li>
                <li>Payment gateways confirming a payment succeeded</li>
                <li>Public registries (e.g. Ministry of Lands) for verification purposes</li>
              </ul>
            </Section>

            <Section title="How we use your information">
              <ul>
                <li>To operate the marketplace and show you relevant land listings</li>
                <li>To verify your identity and the land you list</li>
                <li>To connect buyers with sellers and professionals</li>
                <li>To send transactional emails (enquiries, confirmations, receipts)</li>
                <li>To send optional marketing emails (you can unsubscribe any time)</li>
                <li>To detect and prevent fraud, abuse, and illegal activity</li>
                <li>To comply with legal obligations and respond to lawful requests</li>
                <li>To improve the platform through aggregated analytics</li>
              </ul>
            </Section>

            <Section title="What we do NOT do">
              <ul>
                <li>We never sell your personal information to third parties</li>
                <li>We never share your phone number with other users without your consent</li>
                <li>We never hold deposits or funds — money moves directly between buyer and seller</li>
                <li>We never use your data to train third-party AI models</li>
              </ul>
            </Section>

            <Section title="Legal basis for processing">
              <p>
                Under Kenya&rsquo;s Data Protection Act 2019, we process your
                personal information on the following lawful bases:
              </p>
              <ul>
                <li>
                  <strong>Contract</strong> — to deliver the services you
                  requested (account, listings, enquiries)
                </li>
                <li>
                  <strong>Legal obligation</strong> — to comply with tax,
                  anti-fraud, and land-registry requirements
                </li>
                <li>
                  <strong>Legitimate interest</strong> — to prevent fraud,
                  secure our platform, and improve our services
                </li>
                <li>
                  <strong>Consent</strong> — for marketing communications,
                  which you may withdraw at any time
                </li>
              </ul>
            </Section>

            <Section title="Who we share information with">
              <p>
                We share limited personal information only with the following
                categories of recipients, and only when necessary:
              </p>
              <ul>
                <li>
                  <strong>Other users</strong> — when you send an enquiry,
                  the seller or professional sees your name and contact
                  details
                </li>
                <li>
                  <strong>Service providers</strong> — hosting, email, SMS,
                  payment processing, and analytics vendors
                </li>
                <li>
                  <strong>Professional advisers</strong> — lawyers and
                  accountants when required
                </li>
                <li>
                  <strong>Authorities</strong> — when legally compelled or
                  when reporting suspected fraud
                </li>
              </ul>
            </Section>

            <Section title="Data retention">
              <p>
                We retain your personal information for as long as your
                account is active or as needed to provide services. When you
                delete your account, we remove personal data within 30 days,
                except where we are required to retain it for legal, tax, or
                anti-fraud purposes.
              </p>
            </Section>

            <Section title="Security">
              <p>
                We use industry-standard security measures including TLS
                encryption in transit, encrypted storage at rest, role-based
                access controls, and regular security reviews. No system is
                perfectly secure — if you believe your account has been
                compromised, contact us immediately.
              </p>
            </Section>

            <Section title="Your rights">
              <p>
                Under the Data Protection Act 2019, you have the right to:
              </p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your data (subject to legal exceptions)</li>
                <li>Object to certain processing activities</li>
                <li>Withdraw consent for marketing at any time</li>
                <li>Lodge a complaint with the Office of the Data Protection Commissioner</li>
              </ul>
              <p>
                To exercise any of these rights, email us at{" "}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-medium text-primary underline underline-offset-4"
                >
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </Section>

            <Section title="Cookies">
              <p>
                We use essential cookies to keep you logged in and to remember
                your preferences (like theme and language). We use privacy-
                respecting analytics to understand which pages are useful. We
                do not use advertising cookies or track you across other
                websites.
              </p>
            </Section>

            <Section title="International transfers">
              <p>
                Some of our service providers are located outside Kenya. When
                we transfer personal data abroad, we ensure appropriate
                safeguards are in place, such as standard contractual clauses
                and adequacy decisions.
              </p>
            </Section>

            <Section title="Children">
              <p>
                {siteConfig.name} is not intended for anyone under 18 years
                old. We do not knowingly collect personal information from
                minors.
              </p>
            </Section>

            <Section title="Changes to this policy">
              <p>
                We may update this privacy policy from time to time. When we
                do, we&rsquo;ll change the &ldquo;last updated&rdquo; date at
                the top and, for significant changes, notify you by email or
                through the platform.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Questions about this privacy policy or your personal data?
                Reach us at:
              </p>
              <ul>
                <li>
                  Email:{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-medium text-primary underline underline-offset-4"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  Phone:{" "}
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="font-medium text-primary underline underline-offset-4"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>
              </ul>
            </Section>

            {/* Contact footer */}
            <div className="mt-12 flex items-start gap-3 rounded-2xl border border-border bg-card p-6">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <div>
                <h3 className="font-display text-base font-bold">
                  Questions about privacy?
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Email us at{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>{" "}
                  or{" "}
                  <Link
                    href="/contact"
                    className="font-medium text-primary hover:underline"
                  >
                    use our contact form
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

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

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-4 font-display text-sm font-bold uppercase tracking-wide text-foreground">
      {children}
    </h3>
  );
}