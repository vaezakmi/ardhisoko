"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const QUESTIONS = [
  {
    q: "How do I know a listing is real?",
    a: "Every listing on ArdhiSoko is checked by our team before it goes live. We verify the title deed against the Ministry of Lands registry, walk the parcel, and confirm the seller's identity. Verified listings carry a badge.",
  },
  {
    q: "How long does registration take?",
    a: "Signing up takes about 5 minutes. If you're registering as a professional (surveyor, valuer, advocate, etc.), our team reviews your application within 2 business days.",
  },
  {
    q: "What does it cost to list land?",
    a: "Free to list. There's a small commission only when your property sells. Featured promotions and premium subscriptions are optional and always clearly priced.",
  },
  {
    q: "Can I buy land from outside Kenya?",
    a: "Yes. We serve the Kenyan diaspora and accept international phone numbers using country codes. If you're buying remotely, we strongly recommend hiring a local advocate or valuer — we can match you with one.",
  },
  {
    q: "How do I pay a deposit?",
    a: "Deposits are paid directly to the seller or through a lawyer's client account. ArdhiSoko does not hold funds. Never send money before visiting the land or confirming the title deed at the lands office.",
  },
];

export function Faq() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-card">
      {QUESTIONS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="px-5 py-4 sm:px-6 sm:py-5">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-4 text-left"
            >
              <span className="font-display text-base font-bold tracking-tight sm:text-lg">
                {item.q}
              </span>
              <ChevronDown
                className={cn(
                  "mt-0.5 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
                aria-hidden
              />
            </button>
            {isOpen && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}