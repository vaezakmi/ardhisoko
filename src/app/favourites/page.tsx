import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FavoritesList } from "./favorites-list";

export const metadata = {
  title: "Saved listings",
  description: "Land you've saved for later.",
};

export default function FavoritesPage() {
  return (
    <main className="container mx-auto py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Saved listings
        </h1>
        <p className="mt-2 text-muted-foreground">
          Land you&apos;ve bookmarked. Stored on this device for now.
        </p>
      </div>

      <FavoritesList />

      <div className="mt-12 rounded-2xl border border-dashed p-8 text-center">
        <Heart className="mx-auto h-6 w-6 text-muted-foreground" />
        <p className="mt-3 text-sm text-muted-foreground">
          Want your saved listings to sync across devices?
        </p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/account">Create an account</Link>
        </Button>
      </div>
    </main>
  );
}