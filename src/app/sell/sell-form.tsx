"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MapPin,
  FileText,
  ImageIcon,
  Sparkles,
  Save,
  ShieldCheck,
  Phone,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardImage } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  listingSchema,
  landTypes,
  titleStatuses,
  counties,
  type ListingInput,
} from "@/lib/schemas";
import { formatKes, formatAcreage, landTypeLabel } from "@/lib/format";

/* ═══════════════════════════════════════════════════════════
   Step definitions
   ═══════════════════════════════════════════════════════════ */

type StepId = "basics" | "location" | "details" | "review";

interface Step {
  id: StepId;
  label: string;
  icon: React.ReactNode;
  /** Fields to validate before advancing from this step. */
  fields: (keyof ListingInput)[];
}

const STEPS: Step[] = [
  {
    id: "basics",
    label: "Basics",
    icon: <Sparkles className="h-4 w-4" />,
    fields: ["title", "priceKes", "acreage", "landType"],
  },
  {
    id: "location",
    label: "Location",
    icon: <MapPin className="h-4 w-4" />,
    fields: ["county", "subCounty"],
  },
  {
    id: "details",
    label: "Details",
    icon: <FileText className="h-4 w-4" />,
    fields: ["description", "titleStatus"],
  },
  {
    id: "review",
    label: "Review",
    icon: <ImageIcon className="h-4 w-4" />,
    fields: ["imageUrl"],
  },
];

const STORAGE_KEY = "ardhisoko:sell-draft";

/* ═══════════════════════════════════════════════════════════
   Main form
   ═══════════════════════════════════════════════════════════ */

export function SellForm() {
  const router = useRouter();

  const [stepIndex, setStepIndex] = React.useState(0);
  const [submitted, setSubmitted] = React.useState<ListingInput | null>(null);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [restoredDraft, setRestoredDraft] = React.useState(false);
  const [savedIndicator, setSavedIndicator] = React.useState(false);

  const form = useForm<ListingInput>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      description: "",
      priceKes: undefined,
      acreage: undefined,
      landType: "residential",
      titleStatus: "freehold",
      county: "Nairobi",
      subCounty: "",
      imageUrl: "",
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    watch,
    setValue,
    reset,
    trigger,
  } = form;

  const values = watch();
  const currentStep = STEPS[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === STEPS.length - 1;

  /* ── Restore draft on mount ────────────────────────────── */
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as Partial<ListingInput>;
      if (Object.keys(parsed).length === 0) return;
      reset((prev) => ({ ...prev, ...parsed }));
      setRestoredDraft(true);
    } catch {
      /* ignore corrupt draft */
    }
  }, [reset]);

  /* ── Autosave to localStorage ──────────────────────────── */
  React.useEffect(() => {
    const sub = form.watch((value) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
        if (isDirty) {
          setSavedIndicator(true);
          const t = setTimeout(() => setSavedIndicator(false), 1200);
          return () => clearTimeout(t);
        }
      } catch {
        /* ignore quota errors */
      }
    });
    return () => sub.unsubscribe();
  }, [form, isDirty]);

  /* ── Next / Back ───────────────────────────────────────── */
  async function goNext() {
    const valid = await trigger(currentStep.fields, { shouldFocus: true });
    if (!valid) return;
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function jumpTo(index: number) {
    // Only allow jumping backwards, or forwards to already-visited steps
    if (index <= stepIndex) setStepIndex(index);
  }

  /* ── Submit ────────────────────────────────────────────── */
  async function onSubmit(data: ListingInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error ?? "Failed to submit");
        return;
      }
      localStorage.removeItem(STORAGE_KEY);
      setSubmitted(data);
    } catch {
      setServerError("Network error. Please try again.");
    }
  }

  /* ── Discard draft ─────────────────────────────────────── */
  function discardDraft() {
    if (!confirm("Discard this draft and start over?")) return;
    reset();
    localStorage.removeItem(STORAGE_KEY);
    setStepIndex(0);
    setRestoredDraft(false);
  }

  /* ═══════════════════════════════════════════════════════
     Success state
     ═══════════════════════════════════════════════════════ */
  if (submitted) {
    return <SuccessState data={submitted} router={router} />;
  }

  /* ═══════════════════════════════════════════════════════
     Form
     ═══════════════════════════════════════════════════════ */
  return (
    <FormProvider {...form}>
      {/* Restored draft banner */}
      {restoredDraft && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-info/25 bg-info-soft px-4 py-3 text-sm text-info">
          <span className="inline-flex items-center gap-2">
            <Save className="h-4 w-4" aria-hidden />
            We restored your saved draft.
          </span>
          <button
            type="button"
            onClick={discardDraft}
            className="text-xs font-medium underline hover:no-underline"
          >
            Start over
          </button>
        </div>
      )}

      {/* Step indicator */}
      <StepIndicator
        steps={STEPS}
        currentIndex={stepIndex}
        onJump={jumpTo}
      />

      {/* Form card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-8 rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
      >
        {currentStep.id === "basics" && (
          <StepBasics
            register={register}
            errors={errors}
            values={values}
            setValue={setValue}
          />
        )}

        {currentStep.id === "location" && (
          <StepLocation
            register={register}
            errors={errors}
            values={values}
            setValue={setValue}
          />
        )}

        {currentStep.id === "details" && (
          <StepDetails
            register={register}
            errors={errors}
            values={values}
            setValue={setValue}
          />
        )}

        {currentStep.id === "review" && (
          <StepReview
            register={register}
            errors={errors}
            values={values}
            setValue={setValue}
          />
        )}

        {serverError && (
          <div className="rounded-md border border-destructive/40 bg-destructive-soft p-3 text-sm text-destructive">
            {serverError}
          </div>
        )}

        <Separator />

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {!isFirstStep && (
              <Button
                type="button"
                variant="ghost"
                onClick={goBack}
                disabled={isSubmitting}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
                Back
              </Button>
            )}
            {isDirty && (
              <span
                className={cn(
                  "hidden items-center gap-1.5 text-xs text-muted-foreground transition-opacity sm:inline-flex",
                  savedIndicator ? "opacity-100" : "opacity-0"
                )}
              >
                <Save className="h-3 w-3" aria-hidden />
                Draft saved
              </span>
            )}
          </div>

          {isLastStep ? (
            <Button type="submit" size="lg" loading={isSubmitting} className="shadow-brand">
              Submit listing
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
   Step indicator
   ═══════════════════════════════════════════════════════════ */

function StepIndicator({
  steps,
  currentIndex,
  onJump,
}: {
  steps: Step[];
  currentIndex: number;
  onJump: (index: number) => void;
}) {
  return (
    <nav aria-label="Form progress" className="w-full">
      <ol className="relative flex items-center justify-between gap-2">
        {/* Connecting line — desktop only */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-5 right-5 top-5 hidden h-px bg-border sm:block"
        />

        {steps.map((step, i) => {
          const isComplete = i < currentIndex;
          const isCurrent = i === currentIndex;
          const isClickable = i <= currentIndex;

          return (
            <li key={step.id} className="relative z-10 flex-1">
              <button
                type="button"
                onClick={() => isClickable && onJump(i)}
                disabled={!isClickable}
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "group flex w-full flex-col items-center gap-2 text-center",
                  isClickable && "cursor-pointer",
                  !isClickable && "cursor-not-allowed"
                )}
              >
                <span
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-full border-2 transition-all",
                    isComplete &&
                      "border-primary bg-primary text-primary-foreground shadow-brand",
                    isCurrent &&
                      "border-primary bg-background text-primary ring-4 ring-primary/15",
                    !isComplete &&
                      !isCurrent &&
                      "border-border bg-background text-muted-foreground"
                  )}
                >
                  {isComplete ? (
                    <CheckCircle2 className="h-5 w-5" aria-hidden />
                  ) : (
                    step.icon
                  )}
                </span>
                <span
                  className={cn(
                    "hidden text-xs font-medium transition-colors sm:block",
                    isCurrent && "text-primary",
                    isComplete && "text-foreground",
                    !isCurrent && !isComplete && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   Step 1 — Basics
   ═══════════════════════════════════════════════════════════ */

type StepProps = {
  register: ReturnType<typeof useForm<ListingInput>>["register"];
  errors: ReturnType<typeof useForm<ListingInput>>["formState"]["errors"];
  values: Partial<ListingInput>;
  setValue: ReturnType<typeof useForm<ListingInput>>["setValue"];
};

function StepBasics({ register, errors, values, setValue }: StepProps) {
  return (
    <section className="space-y-6">
      <StepHeader
        title="Land basics"
        description="The essentials buyers see first. Keep it clear and specific."
      />

      <Field
        label="Listing title"
        hint="Aim for 40–80 characters. Include size, area, and standout feature."
        error={errors.title?.message}
        required
      >
        <Input
          {...register("title")}
          placeholder="e.g. Half-Acre Prime Plot, Kiambu Road"
          autoFocus
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Asking price" error={errors.priceKes?.message} required>
          <Input
            type="number"
            step="1000"
            inputMode="numeric"
            prefix="KES"
            {...register("priceKes", { valueAsNumber: true })}
            placeholder="8500000"
          />
        </Field>

        <Field label="Size" error={errors.acreage?.message} required>
          <Input
            type="number"
            step="0.01"
            inputMode="decimal"
            suffix="acres"
            {...register("acreage", { valueAsNumber: true })}
            placeholder="0.5"
          />
        </Field>
      </div>

      <Field label="Land type" error={errors.landType?.message} required>
        <Select
          value={values.landType}
          onValueChange={(v) =>
            setValue("landType", v as ListingInput["landType"], {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select land type" />
          </SelectTrigger>
          <SelectContent>
            {landTypes.map((t) => (
              <SelectItem key={t} value={t}>
                {landTypeLabel[t] ?? t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Step 2 — Location
   ═══════════════════════════════════════════════════════════ */

function StepLocation({ register, errors, values, setValue }: StepProps) {
  return (
    <section className="space-y-6">
      <StepHeader
        title="Where is the land?"
        description="Buyers search by county first. Be as specific as you can."
      />

      <Field label="County" error={errors.county?.message} required>
        <Select
          value={values.county}
          onValueChange={(v) =>
            setValue("county", v as ListingInput["county"], {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select county" />
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
        label="Sub-county or area"
        hint="e.g. Karen, Kiambaa, Njoro, Kitengela, Diani"
        error={errors.subCounty?.message}
        required
      >
        <Input
          {...register("subCounty")}
          placeholder="e.g. Karen"
          prefix={<MapPin className="h-4 w-4" />}
        />
      </Field>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Step 3 — Details
   ═══════════════════════════════════════════════════════════ */

function StepDetails({ register, errors, values, setValue }: StepProps) {
  return (
    <section className="space-y-6">
      <StepHeader
        title="Land details"
        description="Give buyers confidence. Mention access, utilities, and title status."
      />

      <Field label="Title status" error={errors.titleStatus?.message} required>
        <Select
          value={values.titleStatus}
          onValueChange={(v) =>
            setValue("titleStatus", v as ListingInput["titleStatus"], {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select title status" />
          </SelectTrigger>
          <SelectContent>
            {titleStatuses.map((t) => (
              <SelectItem key={t} value={t}>
                <span className="capitalize">{t}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field
        label="Description"
        hint="Access roads, water, electricity, nearby landmarks, and any restrictions."
        error={errors.description?.message}
        required
      >
        <Textarea
          {...register("description")}
          rows={8}
          placeholder="This half-acre plot is 500m off Kiambu Road, near Runda. Mains water and electricity are on site. Ready title deed, no encumbrances. Suitable for a 4-bedroom family home…"
        />
      </Field>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Step 4 — Review + Photo
   ═══════════════════════════════════════════════════════════ */

function StepReview({ register, errors, values, setValue }: StepProps) {
  return (
    <section className="space-y-6">
      <StepHeader
        title="Photo & review"
        description="Add a photo and check everything looks right before submitting."
      />

      <Field
        label="Image URL"
        hint="Upload comes next phase. For now, paste an image URL (Unsplash, your host, etc.)."
        error={errors.imageUrl?.message}
        required
      >
        <Input
          {...register("imageUrl")}
          placeholder="https://images.unsplash.com/photo-…"
        />
      </Field>

      {values.imageUrl && (
        <div className="rounded-xl border p-3">
          <div className="mb-2 text-xs font-medium text-muted-foreground">
            Preview
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={values.imageUrl}
            alt="Preview"
            className="aspect-[4/3] w-full rounded-lg object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}

      <Separator />

      <div>
        <h3 className="mb-3 font-display text-base font-bold">
          Listing preview
        </h3>
        <PreviewCard values={values} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Preview card — mirrors ListingCard
   ═══════════════════════════════════════════════════════════ */

function PreviewCard({ values }: { values: Partial<ListingInput> }) {
  const price = values.priceKes ?? 0;
  const acreage = values.acreage ?? 0;

  return (
    <Card className="overflow-hidden" interactive={false}>
      <CardImage aspect="landscape">
        {values.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={values.imageUrl}
            alt="Listing preview"
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-muted text-muted-foreground">
            <ImageIcon className="h-8 w-8" aria-hidden />
          </div>
        )}
        <Badge variant="landType" size="sm" className="absolute left-3 top-3 shadow-sm">
          {values.landType ? landTypeLabel[values.landType] : "—"}
        </Badge>
      </CardImage>

      <div className="space-y-2 px-(--card-spacing) pb-(--card-spacing) pt-1">
        <h3 className="line-clamp-2 font-display text-lg font-bold leading-snug">
          {values.title || "Your listing title"}
        </h3>
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-display text-xl font-extrabold text-primary">
            {price ? formatKes(price) : "KES —"}
          </span>
          {acreage > 0 && (
            <span className="text-xs text-muted-foreground">
              · {formatAcreage(acreage)}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {values.subCounty || "—"}, {values.county || "—"}
          </span>
          <span className="inline-flex items-center gap-1 capitalize">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            {values.titleStatus || "—"}
          </span>
        </div>
      </div>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════
   Success state
   ═══════════════════════════════════════════════════════════ */

function SuccessState({
  data,
  router,
}: {
  data: ListingInput;
  router: ReturnType<typeof useRouter>;
}) {
  // Auto-redirect after 4 seconds if user doesn't click
  React.useEffect(() => {
    const t = setTimeout(() => {
      router.push("/listings");
    }, 4000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="rounded-2xl border border-success/30 bg-success-soft p-8 text-center sm:p-12">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success text-success-foreground">
        <CheckCircle2 className="h-8 w-8" aria-hidden />
      </div>

      <h2 className="mt-6 font-display text-2xl font-extrabold tracking-tight">
        Listing submitted!
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground">{data.title}</span> is
        now pending review. Our team verifies every title before it goes live —
        usually within 24 hours.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => router.push("/listings")} className="shadow-brand">
          Browse listings
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
        </Button>
        <Button variant="outline" onClick={() => router.refresh()}>
          List another
        </Button>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-background/60 p-4 text-left text-sm">
        <p className="mb-2 inline-flex items-center gap-2 font-semibold">
          <Phone className="h-4 w-4 text-primary" aria-hidden />
          What happens next
        </p>
        <ol className="ml-6 list-decimal space-y-1 text-muted-foreground">
          <li>Our team reviews your listing within 24 hours.</li>
          <li>We may call you to confirm the title deed.</li>
          <li>Once approved, your listing goes live and buyers can contact you.</li>
        </ol>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Redirecting you to listings in a moment…
      </p>
    </div>
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