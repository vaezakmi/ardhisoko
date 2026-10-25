export interface ProfessionalCategory {
  id: string;
  slug: string;
  name: string;
  singularName: string;
  pluralName: string;
  description: string;
  icon: string;
  common: boolean;
}

export type VerificationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "suspended";

export type SubscriptionStatus = "active" | "inactive" | "expired";

export interface Professional {
  id: string;
  slug: string;
  fullName: string;
  companyName?: string;
  categoryId: string;
  registrationNumber?: string;
  yearsExperience?: number;
  bio: string;
  services: string[];
  baseCounty: string;
  workingCounties: string[];
  phone: string;
  countryCode: string;
  email: string;
  website?: string;
  profilePhotoUrl?: string;
  logoUrl?: string;
  portfolioImages: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  verificationStatus: VerificationStatus;
  subscriptionStatus: SubscriptionStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProfessionalRequest {
  id: string;
  categoryId: string;
  otherCategory?: string;
  county: string;
  fullName: string;
  phone: string;
  countryCode: string;
  email: string;
  description: string;
  status: "new" | "matched" | "contacted" | "closed";
  createdAt: string;
}