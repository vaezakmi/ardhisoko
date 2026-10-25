export type LandType =
  | "residential"
  | "agricultural"
  | "commercial"
  | "plot"
  | "ranch";

export type TitleStatus =
  | "freehold"
  | "leasehold"
  | "sectional"
  | "unregistered";

export interface Listing {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceKes: number;
  landType: LandType;
  acreage: number;
  county: string;
  subCounty: string;
  titleStatus: TitleStatus;
  imageUrl: string;
  featured?: boolean;
  createdAt: string;
}

export interface ListingFilters {
  county?: string;
  landType?: LandType;
  minPrice?: number;
  maxPrice?: number;
  minAcreage?: number;
  q?: string;
}