"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  professionalRequestSchema,
  counties,
  type ProfessionalRequestInput,
} from "@/lib/professional-schema";
import type { ProfessionalCategory } from "@/lib/professional-types";

export function RequestForm({
  categories,
}: {
  categories: ProfessionalCategory[];
}) {
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfessionalRequestInput>({
    resolver: zodResolver(professionalRequestSchema) as any,
    defaultValues: {
      countryCode: "+254",
      county: "Nairobi",
    } as Partial<ProfessionalRequestInput>,
  });

  const categoryId = watch("categoryId");
  const countryCode = watch("countryCode");
  const county = watch("county");
  const needsOther = categoryId === "other";

  async function onSubmit(data: ProfessionalRequestInput) {
    // Simulate API call. Will swap to Supabase later.
    await new Promise((r) => setTimeout(r, 800));
    console.log("[request]", data);
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-success/30 bg-success-soft p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success text-success-foreground">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </div>
        <h2 className="mt-4 font-display text-xl font-bold">
          Request received!
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          We'll match you with a verified professional in your area and get back
          to you within 24 hours.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
    >
      {/* Category */}
      <Field label="What do you need?" error={errors.categoryId?.message} required>
        <Select
          value={categoryId}
          onValueChange={(v) => {
            if (!v) return;
            setValue("categoryId", v, { shouldValidate: true });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.singularName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      {needsOther && (
        <Field label="Please specify" error={errors.otherCategory?.message}>
          <Input
            {...register("otherCategory")}
            placeholder="e.g. Landscape designer"
          />
        </Field>
      )}

      {/* County */}
      <Field label="Which county?" error={errors.county?.message} required>
        <Select
          value={county}
          onValueChange={(v) => {
            if (!v) return;
            setValue("county", v as ProfessionalRequestInput["county"], {
              shouldValidate: true,
            });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a county" />
          </SelectTrigger>
          <SelectContent>
            {counties.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      {/* Name */}
      <Field label="Your name" error={errors.fullName?.message} required>
        <Input {...register("fullName")} placeholder="e.g. Jane Kamau" />
      </Field>

      {/* Phone */}
      <Field label="Phone number" error={errors.phone?.message} required>
        <div className="flex gap-2">
          <div className="w-32 shrink-0">
            <CountryCodeSelect
              value={countryCode}
              onChange={(v) => setValue("countryCode", v, { shouldValidate: true })}
            />
          </div>
          <Input
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            {...register("phone")}
            placeholder="712345678"
            className="flex-1"
          />
        </div>
      </Field>

      {/* Email */}
      <Field label="Email" error={errors.email?.message} required>
        <Input
          type="email"
          autoComplete="email"
          {...register("email")}
          placeholder="you@example.com"
        />
      </Field>

      {/* Description */}
      <Field
        label="Describe your requirement"
        hint="The more detail, the better the match."
        error={errors.description?.message}
        required
      >
        <Textarea
          {...register("description")}
          rows={5}
          placeholder="e.g. I've just bought a ½ acre plot in Nyeri and need a boundary survey and beacon placement before I start building."
        />
      </Field>

      <Button
        type="submit"
        size="lg"
        loading={isSubmitting}
        className="w-full shadow-brand"
      >
        <Send className="h-4 w-4" aria-hidden />
        Submit request
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        We only share your details with the professional we match you to.
      </p>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
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
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}