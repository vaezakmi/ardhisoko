import Link from "next/link";
import { Scale, Mail } from "lucide-react";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Terms of service",
  description:
    "The terms and conditions that govern your use of ArdhiSoko, Kenya's land and property marketplace.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "16 September 2026";

export default function TermsPage() {
  return (
    <>
      <section className="bg-hero bg-grain">
        <Container className="pb-12 pt-16 lg:pb-16 lg:pt-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Scale className="h-3.5 w-3.5" aria-hidden />
              Fair terms for everyone
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Terms of service
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
            <Section title="1. Acceptance of terms">
              <p>
                By accessing or using {siteConfig.name} (the
                &ldquo;Platform&rdquo;), you agree to be bound by these Terms
                of Service. If you do not agree, do not use the Platform.
              </p>
              <p>
                We may update these Terms from time to time. Continued use of
                the Platform after changes means you accept the updated
                Terms.
              </p>
            </Section>

            <Section title="2. Who can use the Platform">
              <ul>
                <li>You must be at least 18 years old.</li>
                <li>
                  You must have the legal capacity to enter into binding
                  contracts under Kenyan law.
                </li>
                <li>
                  If you register on behalf of a company or organisation, you
                  confirm you have authority to bind that entity.
                </li>
              </ul>
            </Section>

            <Section title="3. Your account">
              <ul>
                <li>
                  You are responsible for maintaining the confidentiality of
                  your account credentials.
                </li>
                <li>
                  You must provide accurate, current, and complete
                  information.
                </li>
                <li>
                  One person or entity per account unless expressly permitted
                  (e.g. company team accounts).
                </li>
                <li>
                  Notify us immediately at{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-medium text-primary underline underline-offset-4"
                  >
                    {siteConfig.contact.email}
                  </a>{" "}
                  if you suspect unauthorised access.
                </li>
              </ul>
            </Section>

            <Section title="4. Listing land on ArdhiSoko">
              <p>When you list land for sale, you agree that:</p>
              <ul>
                <li>
                  You are the legal owner of the land, or are authorised in
                  writing by the owner to list it.
                </li>
                <li>
                  The information you provide is accurate — including the
                  acreage, price, location, and title status.
                </li>
                <li>
                  The title deed you upload is genuine and matches the
                  current registered owner.
                </li>
                <li>
                  You will respond to genuine buyer enquiries within a
                  reasonable time.
                </li>
                <li>
                  You will not artificially inflate prices, post duplicate
                  listings, or misrepresent the land.
                </li>
                <li>
                  You will remove the listing promptly after the land is
                  sold.
                </li>
              </ul>
              <p>
                We reserve the right to reject, remove, or archive any
                listing that violates these Terms or that we believe is
                fraudulent, misleading, or illegal.
              </p>
            </Section>

            <Section title="5. Buying land on ArdhiSoko">
              <p>When you enquire about land, you agree that:</p>
              <ul>
                <li>
                  You will conduct your own due diligence before any money
                  changes hands.
                </li>
                <li>
                  You understand that ArdhiSoko is a marketplace, not a
                  party to any transaction between buyer and seller.
                </li>
                <li>
                  You will not hold ArdhiSoko responsible for the actions of
                  sellers, buyers, or third parties.
                </li>
                <li>
                  You will report any suspicious behaviour to us
                  immediately.
                </li>
              </ul>
            </Section>

            <Section title="6. Professionals">
              <p>
                If you register as a surveyor, valuer, advocate, architect,
                engineer, or other professional:
              </p>
              <ul>
                <li>
                  You confirm you hold all necessary qualifications and
                  licences in Kenya.
                </li>
                <li>
                  You consent to us verifying your credentials with the
                  relevant regulatory body.
                </li>
                <li>
                  You commit to professional standards of conduct and
                  competence.
                </li>
                <li>
                  You agree to treat every lead you receive through ArdhiSoko
                  confidentially and professionally.
                </li>
                <li>
                  You accept that we may suspend or remove your profile at
                  our sole discretion.
                </li>
              </ul>
            </Section>

            <Section title="7. Fees and payments">
              <ul>
                <li>
                  Listing land is free. A 2% commission applies when your
                  property sells through ArdhiSoko, as described on our
                  Pricing page.
                </li>
                <li>
                  Company subscriptions and professional premiums are billed
                  monthly in advance.
                </li>
                <li>
                  Featured promotions are charged as one-off payments for a
                  fixed term.
                </li>
                <li>
                  All fees are in Kenyan Shillings unless otherwise stated.
                  VAT applies where required by law.
                </li>
                <li>
                  Refunds are considered case-by-case. Contact us within 7
                  days of any payment for a refund request.
                </li>
              </ul>
            </Section>

            <Section title="8. Verification and badges">
              <ul>
                <li>
                  Verified badges are awarded at our sole discretion after
                  our internal verification process.
                </li>
                <li>
                  Verification is not a guarantee of title, quality, or
                  value — it confirms we performed certain checks on a given
                  date.
                </li>
                <li>
                  You may not claim to be verified, or imply a badge you do
                  not hold, in any communication.
                </li>
              </ul>
            </Section>

            <Section title="9. Prohibited content and behaviour">
              <p>You agree not to:</p>
              <ul>
                <li>Post false, misleading, or fraudulent listings.</li>
                <li>Impersonate any person or entity.</li>
                <li>Harass, threaten, or abuse other users.</li>
                <li>
                  Attempt to scrape, reverse-engineer, or overload the
                  Platform.
                </li>
                <li>
                  Upload viruses, malware, or any code designed to harm.
                </li>
                <li>
                  Use the Platform for money laundering or other illegal
                  activity.
                </li>
                <li>
                  Circumvent our fees by moving conversations off-platform to
                  avoid commission.
                </li>
              </ul>
            </Section>

            <Section title="10. Intellectual property">
              <p>
                All content on the Platform — including the logo, design,
                code, and copy — is owned by {siteConfig.name} or its
                licensors. You may not copy, reproduce, or distribute our
                content without permission.
              </p>
              <p>
                When you upload content (photos, descriptions, documents),
                you grant us a non-exclusive, worldwide, royalty-free licence
                to display and distribute that content as part of the
                Platform.
              </p>
            </Section>

            <Section title="11. Privacy">
              <p>
                Your use of the Platform is also governed by our{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  Privacy Policy
                </Link>
                , which is incorporated into these Terms by reference.
              </p>
            </Section>

            <Section title="12. Disclaimers">
              <p>
                The Platform is provided &ldquo;as is&rdquo; and
                &ldquo;as available&rdquo;. We do not guarantee:
              </p>
              <ul>
                <li>That any listing is accurate, complete, or current.</li>
                <li>
                  That any transaction between users will be successful,
                  profitable, or free of disputes.
                </li>
                <li>
                  That the Platform will be uninterrupted, secure, or
                  error-free.
                </li>
              </ul>
              <p>
                We are not a party to any transaction between users and
                accept no liability for the outcome of any such transaction.
              </p>
            </Section>

            <Section title="13. Limitation of liability">
              <p>
                To the maximum extent permitted by Kenyan law,{" "}
                {siteConfig.name} shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages
                arising from your use of the Platform.
              </p>
              <p>
                Our total liability for any claim arising from these Terms or
                your use of the Platform shall not exceed the greater of:
                (a) the amount you paid us in the 12 months preceding the
                claim, or (b) KES 10,000.
              </p>
            </Section>

            <Section title="14. Indemnification">
              <p>
                You agree to indemnify and hold harmless {siteConfig.name},
                its directors, employees, and agents from any claims,
                damages, losses, or expenses arising from:
              </p>
              <ul>
                <li>Your use of the Platform.</li>
                <li>Your violation of these Terms.</li>
                <li>
                  Your violation of any rights of a third party, including
                  intellectual property rights.
                </li>
                <li>
                  Any content you upload, post, or transmit through the
                  Platform.
                </li>
              </ul>
            </Section>

            <Section title="15. Termination">
              <ul>
                <li>
                  You may delete your account at any time by contacting us.
                </li>
                <li>
                  We may suspend or terminate your account immediately if you
                  breach these Terms.
                </li>
                <li>
                  Upon termination, your right to use the Platform ceases.
                  Provisions that by their nature should survive (e.g.
                  disclaimers, indemnification) will survive.
                </li>
              </ul>
            </Section>

            <Section title="16. Governing law">
              <p>
                These Terms are governed by the laws of the Republic of
                Kenya. Any dispute arising from these Terms or your use of
                the Platform shall be subject to the exclusive jurisdiction
                of the courts of Kenya.
              </p>
            </Section>

            <Section title="17. Contact">
              <p>Questions about these Terms? Reach us at:</p>
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

            <div className="mt-12 flex items-start gap-3 rounded-2xl border border-border bg-card p-6">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <div>
                <h3 className="font-display text-base font-bold">
                  Need to reach us about a legal matter?
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Email{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>{" "}
                  or use our{" "}
                  <Link
                    href="/contact"
                    className="font-medium text-primary hover:underline"
                  >
                    contact form
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