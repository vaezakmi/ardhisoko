import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Camera,
  FileText,
  MapPin,
  Ruler,
  Users,
  MessageCircle,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Seller guide",
  description:
    "Everything you need to sell land in Kenya safely and for the best price. Photos, pricing, verification, and closing the deal.",
  alternates: { canonical: "/guides/seller" },
  openGraph: {
    title: "Seller guide — ArdhiSoko",
    description:
      "How to sell land in Kenya: photos, pricing, verification, closing.",
    url: "/guides/seller",
  },
};

const STEPS = [
  {
    number: 1,
    title: "Prepare your documents",
    body: "You'll need the original title deed, your national ID, KRA PIN, and a recent land rates clearance certificate. If the land is jointly owned, get written consent from all co-owners.",
    icon: <FileText className="h-5 w-5" />,
    checklist: [
      "Original title deed (or certified copy)",
      "National ID and KRA PIN",
      "Land rates and rent clearance",
      "Consent from co-owners (if applicable)",
      "Recent survey map (if you have one)",
    ],
  },
  {
    number: 2,
    title: "Take great photos",
    body: "Buyers decide in the first 3 seconds. Shoot in daylight, at the actual site, and show the boundaries. Include access roads, nearby landmarks, and the view from the plot.",
    icon: <Camera className="h-5 w-5" />,
    checklist: [
      "Wide shot showing the full plot",
      "Close-up of boundary beacons",
      "Access road leading to the land",
      "Neighbours and landmarks for context",
      "Sunrise and sunset views if scenic",
    ],
  },
  {
    number: 3,
    title: "Price it right",
    body: "Overpricing scares off serious buyers. Look at 5–10 comparable listings in the same area, check what's actually sold (not just listed), and price within 5–10% of the market rate.",
    icon: <TrendingUp className="h-5 w-5" />,
    checklist: [
      "Compare 5+ similar listings nearby",
      "Ask a valuer for a market estimate",
      "Factor in road access and utilities",
      "Leave a small negotiation margin",
    ],
  },
  {
    number: 4,
    title: "Write a clear listing",
    body: "Describe the land honestly. Mention access, utilities, title status, and any restrictions. Buyers appreciate transparency, and it saves you time-wasters.",
    icon: <Ruler className="h-5 w-5" />,
    checklist: [
      "Acreage (exact and verified)",
      "County, sub-county, and nearest town",
      "Access road type (tarmac, murram, earth)",
      "Water and electricity availability",
      "Any caveats, disputes, or restrictions",
    ],
  },
  {
    number: 5,
    title: "Submit for verification",
    body: "We check every listing before it goes live. Upload your title deed and photos, and our team verifies ownership, boundaries, and seller identity within 2 business days.",
    icon: <ShieldCheck className="h-5 w-5" />,
    checklist: [
      "Upload title deed photo/scan",
      "Verify your phone number",
      "Complete your seller profile",
      "Wait for our team's approval (24–48h)",
    ],
  },
  {
    number: 6,
    title: "Handle enquiries professionally",
    body: "Respond to enquiries within a few hours. Be honest about what the land is and isn't. Serious buyers will ask detailed questions — this is a good sign, not a nuisance.",
    icon: <MessageCircle className="h-5 w-5" />,
    checklist: [
      "Reply within 24 hours",
      "Answer questions directly",
      "Schedule site visits at convenient times",
      "Never pressure buyers into a decision",
    ],
  },
];

const MISTAKES = [
  "Asking for a deposit before the buyer visits the land. Legitimate sellers never do this.",
  "Hiding problems (disputes, poor access, no water). They always surface — later, at higher cost.",
  "Pricing based on emotion (\"my grandfather's land is worth more\"). The market decides, not sentiment.",
  "Selling without a lawyer. A qualified advocate protects both you and the buyer.",
  "Accepting a verbal offer. Get everything in writing, even in the early stages.",
  "Rushing the buyer. If they feel pressured, they walk away — and tell others.",
];

export default function SellerGuidePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-hero bg-grain">
        <Container className="pb-16 pt-16 lg:pb-20 lg:pt-24">
          <div className="max-w-3xl">
            <span className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <FileText className="h-3.5 w-3.5" aria-hidden />
              Complete seller guide
            </span>

            <h1 className="animate-fade-in-up delay-75 mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Sell your land,{" "}
              <span className="text-gradient-brand">the right way.</span>
            </h1>

            <p className="animate-fade-in-up delay-150 mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Six steps from preparing your documents to closing the deal.
              Everything you need to sell land in Kenya safely and for the
              best price.
            </p>

            <div className="animate-fade-in-up delay-300 mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="shadow-brand">
                <Link href="/sell">
                  List your land
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#steps">Read the guide</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* QUICK SUMMARY */}
      <section className="border-y bg-background-subtle py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
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
                    Prepare your documents, take great photos, price honestly,
                    write a clear listing, submit for verification, and
                    respond to enquiries within 24 hours. That&rsquo;s it.
                    Everything below is the detail.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* STEPS */}
      <section id="steps" className="py-20 lg:py-24 scroll-mt-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Six steps to a successful sale
            </h2>
            <p className="mt-3 text-muted-foreground">
              Follow them in order for the smoothest experience.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-3xl space-y-6">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                <div className="flex items-start gap-5 p-6 sm:p-8">
                  <div className="flex shrink-0 flex-col items-center">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-white shadow-brand">
                      {step.icon}
                    </span>
                    <span className="mt-3 font-display text-2xl font-extrabold text-muted-foreground/30">
                      0{step.number}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl font-bold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>

                    <div className="mt-5 border-t border-border/60 pt-4">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                        Checklist
                      </p>
                      <ul className="space-y-2">
                        {step.checklist.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm"
                          >
                            <CheckCircle2
                              className="mt-0.5 h-4 w-4 shrink-0 text-success"
                              aria-hidden
                            />
                            <span className="text-foreground/85">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* MISTAKES */}
      <section className="border-y bg-background-subtle py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Six mistakes to avoid
              </h2>
              <p className="mt-3 text-muted-foreground">
                We&rsquo;ve seen these cost sellers months, or the sale
                entirely.
              </p>
            </div>

            <ul className="mt-12 space-y-3">
              {MISTAKES.map((mistake, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-destructive-soft text-xs font-bold text-destructive">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm leading-relaxed text-foreground/90">
                    {mistake}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* NEED HELP */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Ruler className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">
                  Need a land surveyor?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Verify your boundaries and acreage before listing. We can
                  match you with a licensed surveyor in your county within 24
                  hours.
                </p>
                <Link
                  href="/professionals/land-surveyors"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  Find a surveyor
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Users className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">
                  Need an advocate?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  A qualified advocate will handle the transfer, protect your
                  interests, and make sure the buyer pays on time.
                </p>
                <Link
                  href="/professionals/property-advocates"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  Find an advocate
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t bg-background-subtle py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to list your land?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Free to list. Verified by our team. Seen by buyers across all 47
              counties.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="shadow-brand">
                <Link href="/sell">
                  List your land
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Talk to our team</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}