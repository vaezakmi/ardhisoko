export default async function ProfessionalCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold capitalize">
        {category.replace("-", " ")}
      </h1>
      <p className="text-muted-foreground mt-4">
        Listings for this category coming soon.
      </p>
    </main>
  );
}