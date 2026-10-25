export type DevelopmentStatus =
  | "planning"
  | "selling"
  | "sold-out"
  | "archived";

export type InventoryStatus =
  | "available"
  | "reserved"
  | "sold";

export interface Company {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  description: string;
  phone: string;
  countryCode: string;
  email: string;
  website?: string;
  verificationStatus: "unverified" | "verified";
  socialLinks?: {
    whatsapp?: string;
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
  createdAt: string;
}

export interface Development {
  id: string;
  slug: string;
  companyId: string;
  name: string;
  tagline: string;
  description: string;
  county: string;
  subCounty: string;
  town: string;
  locationDescription: string;
  latitude?: number;
  longitude?: number;
  heroImageUrl: string;
  galleryImages: string[];
  sitePlanImageUrl?: string;
  droneImageUrl?: string;
  amenities: string[];
  status: DevelopmentStatus;
  featured: boolean;
  startingPriceKes: number;
  createdAt: string;
  updatedAt: string;
}

export interface ListingGroup {
  id: string;
  developmentId: string;
  name: string;
  acreage: number;
  propertyType: "residential" | "commercial" | "mixed-use";
  defaultPriceKes: number;
  description: string;
}

export interface InventoryItem {
  id: string;
  listingGroupId: string;
  plotRef: string;
  acreage: number;
  priceKes: number;
  status: InventoryStatus;
  latitude?: number;
  longitude?: number;
  description?: string;
}