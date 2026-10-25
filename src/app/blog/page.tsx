import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Blog",
  description:
    "Guides, market analysis, and practical advice on buying, selling, and developing land in Kenya.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — ArdhiSoko",
    description:
      "Guides, market analysis, and practical advice on Kenyan land.",
    url: "/blog",
  },
};

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  publishedAt: string;
  imageUrl: string;
  featured?: boolean;
}

const posts: Post[] = [
  {
    slug: "how-to-verify-land-title-kenya",
    title: "How to verify a land title deed in Kenya (step by step)",
    excerpt:
      "A practical guide to checking a title deed at the Ministry of Lands, spotting forged documents, and knowing when to walk away.",
    category: "Buying",
    readTime: 8,
    publishedAt: "2026-09-12",
    imageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200",
    featured: true,
  },
  {
    slug: "land-prices-kiambu-2026",
    title: "Land prices in Kiambu: 2026 mid-year update",
    excerpt:
      "What's happened to plot prices across Ruiru, Juja, Kiambaa, and Limuru in the last 12 months. With actual sale data.",
    category: "Market analysis",
    readTime: 6,
    publishedAt: "2026-09-05",
    imageUrl:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
  },
  {
    slug: "buying-land-from-diaspora",
    title: "Buying land in Kenya from the diaspora: a safe playbook",
    excerpt:
      "Six things to do — and five never to do — when buying land from abroad. Based on conversations with 40+ diaspora buyers.",
    category: "Diaspora",
    readTime: 10,
    publishedAt: "2026-08-28",
    imageUrl:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200",
  },
  {
    slug: "grouped-developments-explained",
    title: "Grouped developments explained: why they beat buying a single plot",
    excerpt:
      "Amenities, security, and infrastructure shared across an estate. What to look for and what to avoid.",
    category: "Developments",
    readTime: 7,
    publishedAt: "2026-08-20",
    imageUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200",
  },
  {
    slug: "land-surveyor-checklist",
    title: "What a land surveyor actually checks (and why you need one)",
    excerpt:
      "Boundary beacons, acreage verification, and overlap detection. What a licensed surveyor does and how much it costs.",
    category: "Professionals",
    readTime: 5,
    publishedAt: "2026-08-14",
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200",
  },
  {
    slug: "agricultural-land-tax-changes",
    title: "2026 changes to agricultural land tax: what farmers need to know",
    excerpt:
      "The new land rate structure, how it's calculated, and how to plan for the increased costs.",
    category: "Market analysis",
    readTime: 6,
    publishedAt: "2026-08-02",
    imageUrl:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200",
  },
];

const CATEGORIES = [
  "All",
  "Buying",
  "Selling",
  "Market analysis",
  "Diaspora",
  "Developments",
  "Professionals",
];

export default function BlogPage() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <>
      {/* HERO */}
      <section className="bg-hero bg-grain">
        <Container className="pb-16 pt-16 lg:pb-20 lg:pt-24">
          <div className="max-w-3xl">
            <span className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <BookOpen className="h-3.5 w-3.5" aria-hidden />
              Guides & market notes
            </span>

            <h1 className="animate-fade-in-up delay-75 mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Kenya land,{" "}
              <span className="text-gradient-brand">decoded.</span>
            </h1>

            <p className="animate-fade-in-up delay-150 mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Practical guides, market analysis, and honest advice on buying,
              selling, and developing land in Kenya.
            </p>
          </div>

          {/* Categories */}
          <div className="animate-fade-in-up delay-300 mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((cat, i) => (
              <span
                key={cat}
                className={
                  i === 0
                    ? "rounded-full border border-primary bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
                    : "rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40"
                }
              >
                {cat}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURED POST */}
      {featured && (
        <section className="py-16 lg:py-20">
          <Container>
            <Link
              href={`/blog/${featured.slug}`}
              className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted lg:aspect-auto lg:min-h-[400px]">
                  <img
                    src={featured.imageUrl}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="featured" size="sm">
                      Featured
                    </Badge>
                    <span className="text-xs font-medium uppercase tracking-wide text-primary">
                      {featured.category}
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                    {featured.title}
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {featured.excerpt}
                  </p>

                  <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" aria-hidden />
                      {formatDate(featured.publishedAt)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {featured.readTime} min read
                    </span>
                  </div>

                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </Container>
        </section>
      )}

      {/* POSTS GRID */}
      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                Latest articles
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {rest.length} more {rest.length === 1 ? "article" : "articles"}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                style={{
                  animationDelay: `${i * 60}ms`,
                }}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge variant="landType" size="sm">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-2 font-display text-lg font-bold leading-snug tracking-tight">
                    {post.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-5 text-xs text-muted-foreground">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden />
                      {post.readTime} min
                    </span>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Read article
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t bg-background-subtle py-16 lg:py-20">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Have a topic you want us to write about?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Tell us what&rsquo;s confusing about Kenyan land. We&rsquo;ll
                tackle it in a future article.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-brand transition-all hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Suggest a topic
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}