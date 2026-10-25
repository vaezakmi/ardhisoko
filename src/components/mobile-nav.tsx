"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  PlusCircle,
  Heart,
  UserRound,
  Sprout,
} from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { primaryNav, isActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
const searchParams = useSearchParams();
const search = searchParams?.toString() ?? "";

  // Close on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" size="sm" showCloseButton={false}>
        <SheetHeader className="flex-row items-center justify-between">
          <SheetTitle className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-orange text-white">
              <Sprout className="h-4 w-4" aria-hidden />
            </span>
            ArdhiSoko
          </SheetTitle>
        </SheetHeader>

        <SheetBody>
          <nav aria-label="Primary">
            <ul className="space-y-1">
              {primaryNav.map((item) => {
                const active = isActive(item, pathname);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                        active
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Separator className="my-4" />

            <ul className="space-y-1">
              <li>
                <Link
                  href="/favorites"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <Heart className="h-4 w-4 text-muted-foreground" aria-hidden />
                  Saved listings
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <UserRound className="h-4 w-4 text-muted-foreground" aria-hidden />
                  Sign in
                </Link>
              </li>
            </ul>
          </nav>
        </SheetBody>

        <SheetFooter>
          <Button asChild size="lg" className="w-full">
            <Link href="/sell">
              <PlusCircle className="h-4 w-4" aria-hidden />
              List your land
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/listings">
              <Search className="h-4 w-4" aria-hidden />
              Browse land
            </Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}