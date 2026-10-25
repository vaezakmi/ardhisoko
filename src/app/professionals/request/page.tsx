import { Container } from "@/components/ui/container";
import { RequestForm } from "./request-form";
import { getCategories } from "@/lib/professionals";

export const metadata = {
  title: "Request a professional",
  description:
    "Tell us what you need — surveyor, valuer, advocate, architect, engineer — and we'll match you with a verified professional in your county.",
  alternates: { canonical: "/professionals/request" },
};

export default async function RequestPage() {
  const categories = await getCategories();

  return (
    <Container className="py-12 lg:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Free · 24-hour response
          </span>
          <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Request a professional
          </h1>
          <p className="mt-4 text-muted-foreground">
            Tell us what you need and where. We'll match you with verified
            professionals in your area.
          </p>
        </div>

        <RequestForm categories={categories} />
      </div>
    </Container>
  );
}