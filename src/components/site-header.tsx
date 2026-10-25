"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Search,
  PlusCircle,
  Heart,
  Sprout,
  HardHat,
  BadgeCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { primaryNav, isActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.toString() ?? "";
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-[1020] w-full",
        "transition-[box-shadow,background-color,border-color] duration-300 ease-out",
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-border/40 bg-background/70 backdrop-blur-md"
      )}
    >
      {/* Ember hairline — appears on scroll */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-300",
          scrolled
            ? "bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-100"
            : "opacity-0"
        )}
      />

      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* ═══════════════════════════════════════════════
              Logo
              ═══════════════════════════════════════════════ */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5 rounded-md transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label="ArdhiSoko — home"
          >
            <span
              className={cn(
                "grid h-9 w-9 place-items-center rounded-lg",
                "bg-gradient-to-br from-[#FFA53D] to-[#C9600A] text-white",
                "shadow-[0_4px_12px_-2px_rgba(201,96,10,0.4)]",
                "transition-transform duration-300 ease-out group-hover:scale-105",
                "dark:shadow-[0_0_20px_rgba(255,165,61,0.35)]"
              )}
            >
              <Sprout className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-display text-xl font-extrabold tracking-[-0.03em] text-foreground">
              Ardhi
              <span className="text-primary dark:drop-shadow-[0_0_12px_rgba(255,165,61,0.4)]">
                Soko
              </span>
            </span>
          </Link>

          {/* ═══════════════════════════════════════════════
              Desktop nav
              ═══════════════════════════════════════════════ */}
          <nav
            aria-label="Primary"
            className="hidden flex-1 items-center gap-0.5 md:flex"
          >
            {primaryNav.map((item) => {
              const active = isActive(item, pathname, search);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    active
                      ? "text-primary dark:drop-shadow-[0_0_10px_rgba(255,165,61,0.35)]"
                      : "text-foreground/75 hover:text-foreground"
                  )}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-2.5 -bottom-[1px] h-[2px] rounded-full bg-gradient-to-r from-[#FFA53D] to-[#C9600A] shadow-[0_0_8px_rgba(255,165,61,0.5)]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ═══════════════════════════════════════════════
              Right cluster
              ═══════════════════════════════════════════════ */}
          <div className="flex items-center gap-1.5">
            {/* Register as a pro — xl only */}
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden text-muted-foreground hover:text-primary xl:inline-flex dark:hover:bg-primary/5"
            >
              <Link href="/professionals/register">
                <BadgeCheck className="h-4 w-4" aria-hidden />
                Join as a pro
              </Link>
            </Button>

            {/* Find a pro — desktop only, tight icon at lg */}
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden text-muted-foreground hover:text-primary lg:inline-flex dark:hover:bg-primary/5"
            >
              <Link href="/professionals">
                <HardHat className="h-4 w-4" aria-hidden />
                <span className="hidden xl:inline">Find a pro</span>
              </Link>
            </Button>

            {/* Search */}
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden text-muted-foreground hover:text-foreground sm:inline-flex dark:hover:bg-primary/5 dark:hover:text-primary"
            >
              <Link href="/listings">
                <Search className="h-4 w-4" aria-hidden />
                <span className="hidden lg:inline">Search</span>
              </Link>
            </Button>

            {/* Favorites */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              aria-label="Saved listings"
              className="hidden text-muted-foreground hover:text-primary sm:inline-flex dark:hover:bg-primary/10 dark:hover:shadow-[0_0_16px_rgba(255,165,61,0.2)]"
            >
              <Link href="/favorites">
                <Heart className="h-4 w-4" aria-hidden />
              </Link>
            </Button>

            {/* Theme toggle */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Divider */}
            <span
              aria-hidden
              className="hidden h-5 w-px bg-border sm:inline-block"
            />

            {/* List land CTA */}
            <Button
              asChild
              size="sm"
              className={cn(
                "hidden sm:inline-flex",
                "shadow-[0_4px_14px_-4px_rgba(201,96,10,0.45)]",
                "transition-all duration-200 ease-out hover:-translate-y-0.5",
                "dark:shadow-[0_6px_24px_-6px_rgba(255,165,61,0.5)]",
                "dark:hover:shadow-[0_8px_32px_-8px_rgba(255,165,61,0.6)]"
              )}
            >
              <Link href="/sell">
                <PlusCircle className="h-4 w-4" aria-hidden />
                <span className="hidden lg:inline">List land</span>
                <span className="lg:hidden">List</span>
              </Link>
            </Button>

            {/* ═══════════════════════════════════════════════
                Mobile cluster
                ═══════════════════════════════════════════════ */}
            <div className="flex items-center gap-0.5 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                asChild
                aria-label="Search listings"
                className="text-muted-foreground hover:text-primary"
              >
                <Link href="/listings">
                  <Search className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
              <ThemeToggle />
              <MobileNav />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}