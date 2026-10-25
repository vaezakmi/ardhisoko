"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();

    if (!email) {
      setError("Enter your email");
      setStatus("error");
      return;
    }

    // Phase 2: POST to /api/newsletter (Resend + Supabase)
    await new Promise((r) => setTimeout(r, 600));

    setStatus("success");
    e.currentTarget.reset();
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-sm text-secondary-foreground/90">
        <CheckCircle2 className="h-4 w-4 text-brand-orange" aria-hidden />
        <span>Karibu! Check your inbox to confirm.</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex gap-2">
        <Input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-label="Email address"
          size="lg"
          className="h-10 border-white/20 bg-white/10 text-secondary-foreground placeholder:text-secondary-foreground/50 focus-visible:border-white/40"
        />
        <Button
          type="submit"
          size="lg"
          variant="default"
          loading={status === "loading"}
          className="shrink-0"
        >
          {status !== "loading" && (
            <ArrowRight className="h-4 w-4" aria-hidden />
          )}
          <span className="sr-only">Subscribe</span>
        </Button>
      </div>
      {error && <p className="text-xs text-red-300">{error}</p>}
      <p className="text-xs text-secondary-foreground/60">
        New listings weekly. No spam.
      </p>
    </form>
  );
}