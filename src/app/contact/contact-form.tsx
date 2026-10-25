"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountryCodeSelect } from "@/components/country-code-select";

/* ═══════════════════════════════════════════════════════════
   Schema
   ═══════════════════════════════════════════════════════════ */

const topics = [
  { value: "listing", label: "A land listing" },
  { value: "professional", label: "Hiring a professional" },
  { value: "register", label: "Registering as a professional" },
  { value: "sell", label: "Selling my land" },
  { value: "billing", label: "Billing or subscription" },
  { value: "press", label: "Press or partnership" },
  { value: "other", label: "Something else" },
] as const;

const contactSchema = z.object({
  fullName: z.string().min(2, "Enter your name").max(100),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .regex(/^\d*$/, "Digits only")
    .max(20)
    .optional()
    .or(z.literal("")),
  countryCode: z.string().default("+254"),
  topic: z.string().min(1, "Select a topic"),
  subject: z.string().min(3, "Add a short subject").max(120),
  message: z
    .string()
    .min(20, "Tell us at least 20 characters")
    .max(2000, "Keep it under 2000 characters"),
});

type ContactFormValues = z.input<typeof contactSchema>;
type ContactFormOutput = z.output<typeof contactSchema>;

/* ═══════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════ */

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues, unknown, ContactFormOutput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      countryCode: "+254",
      topic: "",
    },
  });

  const topic = watch("topic");
  const countryCode = watch("countryCode");

  async function onSubmit(data: ContactFormOutput) {
    // Simulate — swap to Supabase / Resend later
    await new Promise((r) => setTimeout(r, 900));
    console.log("[contact]", data);
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-success/30 bg-success-soft p-8 text-center sm:p-12">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success text-success-foreground">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </div>
        <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
          Message received
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Thank you. Someone from our team will reply within a few hours on
          business days. Check your spam folder if you don&apos;t hear from us.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      {/* Name + email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" required error={errors.fullName?.message}>
          <Input
            {...register("fullName")}
            placeholder="Jane Kamau"
            autoComplete="name"
            autoFocus
          />
        </Field>
        <Field label="Email" required error={errors.email?.message}>
          <Input
            type="email"
            {...register("email")}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </Field>
      </div>

      {/* Phone */}
      <Field label="Phone (optional)" error={errors.phone?.message}>
        <div className="flex gap-2">
          <div className="w-32 shrink-0">
            <CountryCodeSelect
              value={countryCode ?? "+254"}
              onChange={(v) =>
                setValue("countryCode", v, { shouldValidate: true })
              }
            />
          </div>
          <Input
            type="tel"
            inputMode="numeric"
            {...register("phone")}
            placeholder="712345678"
            className="flex-1"
            autoComplete="tel-national"
          />
        </div>
      </Field>

      {/* Topic */}
      <Field label="What is this about?" required error={errors.topic?.message}>
        <Select
          value={topic}
          onValueChange={(v) => {
            if (!v) return;
            setValue("topic", v, { shouldValidate: true });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            {topics.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      {/* Subject */}
      <Field label="Subject" required error={errors.subject?.message}>
        <Input
          {...register("subject")}
          placeholder="One line summary"
          maxLength={120}
        />
      </Field>

      {/* Message */}
      <Field label="Message" required error={errors.message?.message}>
        <Textarea
          {...register("message")}
          rows={6}
          placeholder="Tell us what you need — the more detail, the faster we can help."
          maxLength={2000}
        />
      </Field>

      <Button
        type="submit"
        size="lg"
        loading={isSubmitting}
        className="w-full shadow-brand"
      >
        <Send className="h-4 w-4" aria-hidden />
        Send message
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        We&apos;ll never share your details. See our{" "}
        <a
          href="/privacy"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════════
   Field
   ═══════════════════════════════════════════════════════════ */

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-1.5">
        {label}
        {required && (
          <span aria-hidden className="text-destructive">
            *
          </span>
        )}
      </Label>
      {children}
      {error && (
        <p role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}