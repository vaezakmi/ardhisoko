import { z } from "zod";

/* ═══════════════════════════════════════════════════════════
   Counties — 47 Kenyan counties as a Zod enum
   ═══════════════════════════════════════════════════════════ */

export const counties = [
  "Nairobi", "Kiambu", "Nakuru", "Kajiado", "Machakos", "Mombasa",
  "Kwale", "Kilifi", "Laikipia", "Nyeri", "Meru", "Uasin Gishu",
  "Kisumu", "Kakamega", "Bungoma", "Narok", "Kericho", "Bomet",
  "Embu", "Kitui", "Murang'a", "Nyandarua", "Trans Nzoia", "Siaya",
  "Homa Bay", "Migori", "Kisii", "Nyamira", "Baringo",
  "Elgeyo-Marakwet", "West Pokot", "Turkana", "Samburu", "Isiolo",
  "Marsabit", "Mandera", "Wajir", "Garissa", "Tana River", "Lamu",
  "Taita-Taveta", "Tharaka-Nithi", "Kirinyaga", "Vihiga", "Busia",
  "Nandi", "Makueni",
] as const;

export type County = (typeof counties)[number];

/* ═══════════════════════════════════════════════════════════
   Professional registration
   ─────────────────────────────────────────────────────────
   Every optional field uses `.default()` so the inferred type
   is NOT optional. This makes `useForm<Input>` happy and makes
   the wizard's `values.services ?? []` unnecessary — but we
   keep it as a defensive measure.
   ═══════════════════════════════════════════════════════════ */

const optionalString = z.string().optional().default("");
const optionalUrl = z
  .string()
  .url("Enter a valid URL")
  .or(z.literal(""))
  .optional()
  .default("");

export const professionalRegistrationSchema = z.object({
  /* ── Step 1: Basic ─────────────────────────────────────── */
  fullName: z.string().min(2, "Enter your full name").max(100),
  companyName: optionalString,
  categoryId: z.string().min(1, "Select a category"),
  otherCategory: optionalString,

  /* ── Step 2: Expertise ─────────────────────────────────── */
  registrationNumber: optionalString,
  yearsExperience: z
    .number()
    .int()
    .min(0)
    .max(60)
    .optional(),
  bio: z
    .string()
    .min(50, "Write at least 50 characters about yourself")
    .max(1500),
  services: z.array(z.string()).min(1, "Add at least one service"),

  /* ── Step 3: Coverage ──────────────────────────────────── */
  baseCounty: z.enum(counties, { message: "Select your base county" }),
  workingCounties: z
    .array(z.enum(counties))
    .min(1, "Select at least one working county"),

  /* ── Step 4: Portfolio ─────────────────────────────────── */
  profilePhotoUrl: optionalUrl,
  logoUrl: optionalUrl,
  portfolioImages: z.array(z.string().url()).default([]),

  /* ── Step 5: Contact ───────────────────────────────────── */
  phone: z
    .string()
    .min(6, "Enter a valid phone number")
    .max(20)
    .regex(/^\d+$/, "Digits only, no spaces or symbols"),
  countryCode: z.string().min(2).max(5).default("+254"),
  email: z.string().email("Enter a valid email"),
  website: optionalUrl,

  /* ── Step 6: Social ────────────────────────────────────── */
  socialLinks: z
    .object({
      linkedin: optionalUrl,
      twitter: optionalUrl,
      facebook: optionalUrl,
      instagram: optionalUrl,
    })
    .default({
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
    }),
});

export type ProfessionalRegistrationInput = z.infer<
  typeof professionalRegistrationSchema
>;

/* ═══════════════════════════════════════════════════════════
   Professional request
   ═══════════════════════════════════════════════════════════ */

export const professionalRequestSchema = z.object({
  categoryId: z.string().min(1, "Select a category"),
  otherCategory: optionalString,
  county: z.enum(counties, { message: "Select a county" }),
  fullName: z.string().min(2, "Enter your name").max(100),
  phone: z
    .string()
    .min(6, "Enter a valid phone number")
    .max(20)
    .regex(/^\d+$/, "Digits only"),
  countryCode: z.string().min(2).max(5).default("+254"),
  email: z.string().email("Enter a valid email"),
  description: z
    .string()
    .min(20, "Describe your requirement in at least 20 characters")
    .max(2000),
});

export type ProfessionalRequestInput = z.infer<
  typeof professionalRequestSchema
>;