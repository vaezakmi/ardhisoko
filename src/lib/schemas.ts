import { z } from "zod";

export const landTypes = [
  "residential",
  "agricultural",
  "commercial",
  "plot",
  "ranch",
] as const;

export const titleStatuses = [
  "freehold",
  "leasehold",
  "sectional",
  "unregistered",
] as const;

export const counties = [
  "Nairobi",
  "Kiambu",
  "Nakuru",
  "Kajiado",
  "Machakos",
  "Mombasa",
  "Kwale",
  "Kilifi",
  "Laikipia",
  "Nyeri",
  "Meru",
  "Uasin Gishu",
  "Kisumu",
  "Kakamega",
  "Bungoma",
  "Narok",
  "Kericho",
  "Bomet",
  "Embu",
  "Kitui",
  "Murang'a",
  "Nyandarua",
  "Trans Nzoia",
  "Siaya",
  "Homa Bay",
  "Migori",
  "Kisii",
  "Nyamira",
  "Baringo",
  "Elgeyo-Marakwet",
  "West Pokot",
  "Turkana",
  "Samburu",
  "Isiolo",
  "Marsabit",
  "Mandera",
  "Wajir",
  "Garissa",
  "Tana River",
  "Lamu",
  "Taita-Taveta",
  "Tharaka-Nithi",
  "Kirinyaga",
  "Vihiga",
  "Busia",
  "Nandi",
  "Makueni",
] as const;

export const listingSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(120, "Title is too long"),
  description: z
    .string()
    .min(30, "Please describe the land in at least 30 characters")
    .max(2000, "Description is too long"),
  priceKes: z
    .number({ message: "Enter a price" })
    .int("Whole shillings only")
    .min(10_000, "Minimum price is KES 10,000")
    .max(2_000_000_000, "Price is too high"),
  acreage: z
    .number({ message: "Enter acreage" })
    .positive("Must be greater than 0")
    .max(10_000, "Acreage is too high"),
  landType: z.enum(landTypes, { message: "Select a land type" }),
  titleStatus: z.enum(titleStatuses, { message: "Select a title status" }),
  county: z.enum(counties, { message: "Select a county" }),
  subCounty: z.string().min(2, "Enter a sub-county or area"),
  imageUrl: z.string().url("Must be a valid URL"),
});

export type ListingInput = z.infer<typeof listingSchema>;