"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  User,
  Briefcase,
  MapPin,
  ImageIcon,
  Phone,
  Share2,
  Send,
  Sparkles,
} from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import { CountryCodeSelect } from "@/components/country-code-select";
import { cn } from "@/lib/utils";
import {
  professionalRegistrationSchema,
  counties,
  type County,
} from "@/lib/professional-schema";
import type { ProfessionalCategory } from "@/lib/professional-types";

type ProfessionalRegistrationInput = z.input<typeof professionalRegistrationSchema>;

/* ═══════════════════════════════════════════════════════════
   Step definitions
   ═══════════════════════════════════════════════════════════ */

type StepId =
  | "basic"
  | "professional"
  | "coverage"
  | "portfolio"
  | "contact"
  | "social"
  | "review";

interface Step {
  id: StepId;
  label: string;
  icon: React.ReactNode;
  /** Field names to validate before advancing. */
  fields: (keyof ProfessionalRegistrationInput)[];
}

const STEPS: Step[] = [
  {
    id: "basic",
    label: "Basic",
    icon: <User className="h-4 w-4" />,
    fields: ["fullName", "categoryId"],
  },
  {
    id: "professional",
    label: "Expertise",
    icon: <Briefcase className="h-4 w-4" />,
    fields: ["bio", "services"],
  },
  {
    id: "coverage",
    label: "Coverage",
    icon: <MapPin className="h-4 w-4" />,
    fields: ["baseCounty", "workingCounties"],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    icon: <ImageIcon className="h-4 w-4" />,
    fields: [],
  },
  {
    id: "contact",
    label: "Contact",
    icon: <Phone className="h-4 w-4" />,
    fields: ["phone", "email"],
  },
  {
    id: "social",
    label: "Social",
    icon: <Share2 className="h-4 w-4" />,
    fields: [],
  },
  {
    id: "review",
    label: "Review",
    icon: <CheckCircle2 className="h-4 w-4" />,
    fields: [],
  },
];

/* ═══════════════════════════════════════════════════════════
   Wizard
   ═══════════════════════════════════════════════════════════ */

export function RegisterWizard({
  categories,
}: {
  categories: ProfessionalCategory[];
}) {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);
  const [serviceInput, setServiceInput] = React.useState("");

const form = useForm<ProfessionalRegistrationInput>({
  resolver: zodResolver(professionalRegistrationSchema),
  defaultValues: {
    fullName: "",
    companyName: "",
    categoryId: "",
    otherCategory: "",
    registrationNumber: "",
    bio: "",
    services: [],
    baseCounty: "Nairobi",
    workingCounties: [],
    profilePhotoUrl: "",
    logoUrl: "",
    portfolioImages: [],
    phone: "",
    countryCode: "+254",
    email: "",
    website: "",
    socialLinks: {},
  },
  mode: "onChange",
});

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    trigger,
    reset,
  } = form;

  const values = watch();
  const currentStep = STEPS[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === STEPS.length - 1;

  /* ── Navigation ────────────────────────────────────────── */

  async function goNext() {
    if (currentStep.fields.length > 0) {
      const valid = await trigger(currentStep.fields, { shouldFocus: true });
      if (!valid) return;
    }
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ── Services helpers ──────────────────────────────────── */

  function addService() {
    const trimmed = serviceInput.trim();
    if (!trimmed) return;
    const existing = values.services ?? [];
    if (existing.includes(trimmed)) return;
    setValue("services", [...existing, trimmed], { shouldValidate: true });
    setServiceInput("");
  }

  function removeService(s: string) {
    const existing = values.services ?? [];
    setValue(
      "services",
      existing.filter((x) => x !== s),
      { shouldValidate: true }
    );
  }

  /* ── County helpers ────────────────────────────────────── */

  function toggleCounty(c: County) {
    const current = values.workingCounties ?? [];
    if (current.includes(c)) {
      setValue(
        "workingCounties",
        current.filter((x) => x !== c),
        { shouldValidate: true }
      );
    } else {
      setValue("workingCounties", [...current, c], { shouldValidate: true });
    }
  }

  /* ── Submit ────────────────────────────────────────────── */

  async function onSubmit(data: ProfessionalRegistrationInput) {
    // Simulate API — swap to Supabase later
    await new Promise((r) => setTimeout(r, 1200));
    console.log("[register]", data);
    setSubmitted(true);
    reset();
  }

  /* ── Success state ─────────────────────────────────────── */

  if (submitted) {
    return (
      <div className="rounded-2xl border border-success/30 bg-success-soft p-8 text-center sm:p-12">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success text-success-foreground">
          <CheckCircle2 className="h-8 w-8" aria-hidden />
        </div>
        <h2 className="mt-6 font-display text-2xl font-extrabold tracking-tight">
          Registration submitted!
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Our team reviews every application. You&apos;ll hear from us within 2
          business days. Once approved, you can activate your subscription and
          start receiving client enquiries.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => setSubmitted(false)} variant="outline">
            Register another
          </Button>
        </div>
      </div>
    );
  }

  /* ── Wizard ────────────────────────────────────────────── */

  return (
    <FormProvider {...form}>
      {/* Steps indicator */}
      <nav aria-label="Registration progress" className="mb-8">
        <ol className="flex items-center justify-between gap-1">
          {STEPS.map((step, i) => {
            const isComplete = i < stepIndex;
            const isCurrent = i === stepIndex;
            return (
              <li key={step.id} className="flex flex-1 items-center">
                <div className="flex flex-1 flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      "grid h-9 w-9 place-items-center rounded-full border-2 transition-all",
                      isComplete &&
                        "border-primary bg-primary text-primary-foreground",
                      isCurrent &&
                        "border-primary bg-background text-primary ring-4 ring-primary/15",
                      !isComplete &&
                        !isCurrent &&
                        "border-border bg-background text-muted-foreground"
                    )}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="h-4 w-4" aria-hidden />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span
                    className={cn(
                      "hidden text-[10px] font-medium sm:block",
                      isCurrent && "text-primary",
                      isComplete && "text-foreground",
                      !isCurrent && !isComplete && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "mx-1 h-px flex-1",
                      i < stepIndex ? "bg-primary" : "bg-border"
                    )}
                    aria-hidden
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isLast) {
            void handleSubmit(onSubmit)(e);
          } else {
            void goNext();
          }
        }}
        className="space-y-6 rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
      >
        {currentStep.id === "basic" && (
          <StepBasic
            register={register}
            errors={errors}
            values={values}
            setValue={setValue}
            categories={categories}
          />
        )}

        {currentStep.id === "professional" && (
          <StepExpertise
            register={register}
            errors={errors}
            values={values}
            serviceInput={serviceInput}
            setServiceInput={setServiceInput}
            addService={addService}
            removeService={removeService}
          />
        )}

        {currentStep.id === "coverage" && (
          <StepCoverage
            errors={errors}
            values={values}
            setValue={setValue}
            toggleCounty={toggleCounty}
          />
        )}

        {currentStep.id === "portfolio" && (
          <StepPortfolio register={register} errors={errors} values={values} />
        )}

        {currentStep.id === "contact" && (
          <StepContact
            register={register}
            errors={errors}
            values={values}
            setValue={setValue}
          />
        )}

        {currentStep.id === "social" && <StepSocial register={register} />}

        {currentStep.id === "review" && (
          <StepReview values={values} categories={categories} />
        )}

        <Separator />

        <div className="flex items-center justify-between gap-3">
          {!isFirst ? (
            <Button
              type="button"
              variant="ghost"
              onClick={goBack}
              disabled={isSubmitting}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              Back
            </Button>
          ) : (
            <div />
          )}

          {isLast ? (
            <Button
              type="submit"
              size="lg"
              loading={isSubmitting}
              className="shadow-brand"
            >
              <Send className="h-4 w-4" aria-hidden />
              Submit for approval
            </Button>
          ) : (
            <Button
              type="button"
              size="lg"
              onClick={goNext}
              className="shadow-brand"
            >
              Continue
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

/* ═══════════════════════════════════════════════════════════
   Steps
   ═══════════════════════════════════════════════════════════ */

type FormType = ReturnType<typeof useForm<ProfessionalRegistrationInput>>;
type FormRegister = FormType["register"];
type FormErrors = FormType["formState"]["errors"];
type FormSetValue = FormType["setValue"];

function StepBasic({
  register,
  errors,
  values,
  setValue,
  categories,
}: {
  register: FormRegister;
  errors: FormErrors;
  values: Partial<ProfessionalRegistrationInput>;
  setValue: FormSetValue;
  categories: ProfessionalCategory[];
}) {
  const needsOther = values.categoryId === "other";

  return (
    <section className="space-y-5">
      <StepHeader
        title="Basic details"
        description="Start with who you are and what you do."
      />

      <Field label="Full name" required error={errors.fullName?.message}>
        <Input
          {...register("fullName")}
          placeholder="e.g. James Mwangi"
          autoFocus
        />
      </Field>

      <Field
        label="Company or practice name"
        error={errors.companyName?.message}
      >
        <Input
          {...register("companyName")}
          placeholder="Optional — e.g. Mount Kenya Surveyors Ltd"
        />
      </Field>

      <Field
        label="Professional category"
        required
        error={errors.categoryId?.message}
      >
        <Select
          value={values.categoryId ?? ""}
          onValueChange={(v) => {
            if (!v) return;
            setValue("categoryId", v, { shouldValidate: true });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your category" />
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
        <Field
          label="Please specify"
          required
          error={errors.otherCategory?.message}
        >
          <Input
            {...register("otherCategory")}
            placeholder="e.g. Landscape designer"
          />
        </Field>
      )}
    </section>
  );
}

function StepExpertise({
  register,
  errors,
  values,
  serviceInput,
  setServiceInput,
  addService,
  removeService,
}: {
  register: FormRegister;
  errors: FormErrors;
  values: Partial<ProfessionalRegistrationInput>;
  serviceInput: string;
  setServiceInput: (v: string) => void;
  addService: () => void;
  removeService: (s: string) => void;
}) {
  const services = values.services ?? [];

  return (
    <section className="space-y-5">
      <StepHeader
        title="Your expertise"
        description="Describe your background and list what you offer."
      />

      <Field
        label="Professional bio"
        required
        hint="At least 50 characters. Mention experience, specializations, and what makes you stand out."
        error={errors.bio?.message}
      >
        <Textarea
          {...register("bio")}
          rows={6}
          placeholder="Licensed land surveyor with 14 years' experience across Central Kenya…"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Registration number"
          error={errors.registrationNumber?.message}
        >
          <Input
            {...register("registrationNumber")}
            placeholder="e.g. LS-KE-4821"
          />
        </Field>
        <Field
          label="Years of experience"
          error={errors.yearsExperience?.message}
        >
          <Input
            type="number"
            inputMode="numeric"
            {...register("yearsExperience", { valueAsNumber: true })}
            placeholder="14"
          />
        </Field>
      </div>

      <Field label="Services offered" required error={errors.services?.message}>
        <div className="flex gap-2">
          <Input
            value={serviceInput}
            onChange={(e) => setServiceInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addService();
              }
            }}
            placeholder="Type a service and press Enter"
          />
          <Button type="button" variant="outline" onClick={addService}>
            Add
          </Button>
        </div>
        {services.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {services.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => removeService(s)}
                className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs transition-colors hover:border-destructive/40 hover:bg-destructive-soft"
              >
                {s}
                <span className="text-muted-foreground group-hover:text-destructive">
                  ×
                </span>
              </button>
            ))}
          </div>
        )}
      </Field>
    </section>
  );
}

function StepCoverage({
  errors,
  values,
  setValue,
  toggleCounty,
}: {
  errors: FormErrors;
  values: Partial<ProfessionalRegistrationInput>;
  setValue: FormSetValue;
  toggleCounty: (c: County) => void;
}) {
  const working = values.workingCounties ?? [];

  return (
    <section className="space-y-5">
      <StepHeader
        title="Coverage area"
        description="Where do you work? Pick a base county and any additional counties you serve."
      />

      <Field label="Base county" required error={errors.baseCounty?.message}>
        <Select
          value={values.baseCounty ?? "Nairobi"}
          onValueChange={(v) => {
            if (!v) return;
            setValue("baseCounty", v as County, { shouldValidate: true });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your base county" />
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

      <Field
        label="Additional working counties"
        hint="Select all counties you're willing to travel to."
        error={errors.workingCounties?.message}
      >
        <div className="flex flex-wrap gap-1.5">
          {counties.map((c) => {
            const selected = working.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleCounty(c)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                  selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
      </Field>
    </section>
  );
}

function StepPortfolio({
  register,
  errors,
  values,
}: {
  register: FormRegister;
  errors: FormErrors;
  values: Partial<ProfessionalRegistrationInput>;
}) {
  return (
    <section className="space-y-5">
      <StepHeader
        title="Portfolio"
        description="Show clients what you can do. Paste image URLs for now — file upload comes soon."
      />

      <Field
        label="Profile photo URL"
        hint="Square image, at least 400×400px"
        error={errors.profilePhotoUrl?.message}
      >
        <Input {...register("profilePhotoUrl")} placeholder="https://…" />
      </Field>

      {values.profilePhotoUrl && (
        <div className="flex items-center gap-3 rounded-xl border p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={values.profilePhotoUrl}
            alt="Preview"
            className="h-16 w-16 rounded-lg object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <p className="text-xs text-muted-foreground">Preview</p>
        </div>
      )}

      <Field label="Company logo URL" error={errors.logoUrl?.message}>
        <Input {...register("logoUrl")} placeholder="https://…" />
      </Field>
    </section>
  );
}

function StepContact({
  register,
  errors,
  values,
  setValue,
}: {
  register: FormRegister;
  errors: FormErrors;
  values: Partial<ProfessionalRegistrationInput>;
  setValue: FormSetValue;
}) {
  return (
    <section className="space-y-5">
      <StepHeader
        title="Contact details"
        description="How clients can reach you. Only shown after approval."
      />

      <Field label="Phone number" required error={errors.phone?.message}>
        <div className="flex gap-2">
          <div className="w-32 shrink-0">
            <CountryCodeSelect
              value={values.countryCode ?? "+254"}
              onChange={(v: string) =>
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
          />
        </div>
      </Field>

      <Field label="Email" required error={errors.email?.message}>
        <Input
          type="email"
          {...register("email")}
          placeholder="you@example.com"
        />
      </Field>

      <Field label="Website" error={errors.website?.message}>
        <Input
          {...register("website")}
          placeholder="https://yourwebsite.co.ke"
        />
      </Field>
    </section>
  );
}

function StepSocial({ register }: { register: FormRegister }) {
  return (
    <section className="space-y-5">
      <StepHeader
        title="Social profiles"
        description="Optional. Help clients find you elsewhere."
      />

      <Field label="LinkedIn">
        <Input
          {...register("socialLinks.linkedin")}
          placeholder="https://linkedin.com/in/…"
        />
      </Field>
      <Field label="Twitter / X">
        <Input
          {...register("socialLinks.twitter")}
          placeholder="https://x.com/…"
        />
      </Field>
      <Field label="Facebook">
        <Input
          {...register("socialLinks.facebook")}
          placeholder="https://facebook.com/…"
        />
      </Field>
      <Field label="Instagram">
        <Input
          {...register("socialLinks.instagram")}
          placeholder="https://instagram.com/…"
        />
      </Field>
    </section>
  );
}

function StepReview({
  values,
  categories,
}: {
  values: Partial<ProfessionalRegistrationInput>;
  categories: ProfessionalCategory[];
}) {
  const category = categories.find((c) => c.id === values.categoryId);

  return (
    <section className="space-y-5">
      <StepHeader
        title="Review & submit"
        description="Check everything looks right. Our team reviews within 2 business days."
      />

      <div className="rounded-xl border bg-background-subtle p-4">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <Row label="Name" value={values.fullName || "—"} />
          <Row label="Category" value={category?.singularName ?? "—"} />
          <Row label="Company" value={values.companyName || "—"} />
          <Row
            label="Years"
            value={
              values.yearsExperience ? `${values.yearsExperience} yrs` : "—"
            }
          />
          <Row label="Base county" value={values.baseCounty || "—"} />
          <Row
            label="Working counties"
            value={(values.workingCounties ?? []).join(", ") || "—"}
          />
          <Row
            label="Phone"
            value={`${values.countryCode ?? ""} ${values.phone ?? ""}`.trim()}
          />
          <Row label="Email" value={values.email || "—"} />
        </dl>
      </div>

      <div className="rounded-xl border border-info/25 bg-info-soft p-4 text-sm text-info">
        <p className="inline-flex items-center gap-2 font-semibold">
          <Sparkles className="h-4 w-4" aria-hidden />
          What happens next
        </p>
        <ol className="ml-6 mt-2 list-decimal space-y-1 text-xs opacity-90">
          <li>Our team reviews your application (2 business days).</li>
          <li>Once approved, you&apos;ll receive an activation email.</li>
          <li>Activate your subscription and start receiving enquiries.</li>
        </ol>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Shared primitives
   ═══════════════════════════════════════════════════════════ */

function StepHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header>
      <h2 className="font-display text-xl font-bold tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </header>
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}