import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { listingSchema } from "@/lib/schemas";
import type { Listing } from "@/lib/types";

const DATA_FILE = path.join(process.cwd(), "src", "data", "listings.json");

async function readListings(): Promise<Listing[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Listing[];
  } catch {
    return [];
  }
}

async function writeListings(listings: Listing[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(listings, null, 2), "utf-8");
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = listingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const listings = await readListings();

    const baseSlug = slugify(data.title);
    let slug = baseSlug;
    let n = 1;
    while (listings.some((l) => l.slug === slug)) {
      slug = `${baseSlug}-${n++}`;
    }

    const listing: Listing = {
      id: crypto.randomUUID(),
      slug,
      ...data,
      featured: false,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    listings.push(listing);
    await writeListings(listings);

    return NextResponse.json({ ok: true, listing }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/listings]", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const listings = await readListings();
  return NextResponse.json({ listings });
}