"use client";

import * as React from "react";
import Link from "next/link";
import { X, HardHat, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

const MESSAGES = [
  { label: "Need a Land Surveyor?", href: "/professionals/land-surveyors" },
  { label: "Looking for a Property Valuer?", href: "/professionals/property-valuers" },
  { label: "Need legal help with your title?", href: "/professionals/property-advocates" },
  { label: "Planning to build?", href: "/professionals/architects" },
  { label: "Need an Architect?", href: "/professionals/architects" },
  { label: "Need a Civil Engineer?", href: "/professionals/civil-engineers" },
];

const DISMISS_KEY = "ardhimart:ribbon-dismissed";

export function ProfessionalRibbon() {
  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  // Dismissed state — remember for 7 days
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(DISMISS_KEY);
      if (stored) {
        const dismissedAt = new Date(stored).getTime();
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        if (Date.now() - dismissedAt < sevenDays) {
          setDismissed(true);
          return;
        }
      }
    } catch {
      /* ignore */
    }
    setVisible(true);
  }, []);

  // Rotate messages every 4 seconds
  React.useEffect(() => {
    if (!visible || dismissed) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [visible, dismissed]);

  function dismiss(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      localStorage.setItem(DISMISS_KEY, new Date().toISOString());
    } catch {
      /* ignore */
    }
    setDismissed(true);
  }

  if (!visible || dismissed) return null;

  const current = MESSAGES[index];

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-md",
        "animate-fade-in-up",
        "sm:bottom-6 sm:left-6 sm:right-auto"
      )}
      role="complementary"
      aria-label="Find a professional"
    >
      <Link
        href={current.href}
        className="group flex items-center gap-3 rounded-2xl border border-brand-orange/30 bg-background p-3 pl-4 shadow-xl backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-2xl"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-orange text-white">
          <HardHat className="h-4 w-4" aria-hidden />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-orange">
            Find a Professional
          </p>
          <p className="line-clamp-1 text-sm font-medium">{current.label}</p>
        </div>

        <ArrowRight
          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-3 w-3" aria-hidden />
        </button>
      </Link>
    </div>
  );
}