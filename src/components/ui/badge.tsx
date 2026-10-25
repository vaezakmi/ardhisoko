"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Base UI Badge primitive.
 * Renders as a <span> by default; pass `render={<a />}` to render as a link.
 *
 * @example
 *   <Badge>New</Badge>
 *   <Badge variant="featured">Featured</Badge>
 *   <Badge render={<Link href="/listings?county=Kiambu" />} variant="outline">
 *     Kiambu
 *   </Badge>
 */
const badgeVariants = cva(
  // ── base ─────────────────────────────────────────────────────
  [
    "group/badge",
    "inline-flex w-fit shrink-0 items-center justify-center gap-1",
    "overflow-hidden rounded-full border border-transparent",
    "font-medium whitespace-nowrap transition-all",
    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    "dark:aria-invalid:ring-destructive/40",
    "has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
    "[&>svg]:pointer-events-none [&>svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        // Core shadcn variants
        default:
          "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link:
          "text-primary underline-offset-4 hover:underline",

        // ── ArdhiSoko brand variants ──────────────────────────────
        /** Premium/paid listings — burnt orange */
        featured:
          "bg-brand-orange text-white shadow-sm ring-1 ring-brand-orange/30 [a]:hover:bg-brand-orange/90",
        /** Title verified badge — forest green */
        verified:
          "bg-brand-green text-white [a]:hover:bg-brand-green/90",
        /** Land type pill — cream background, brown text */
        landType:
          "border-brand-brown/20 bg-brand-cream text-brand-brown capitalize [a]:hover:bg-brand-brown/10",
        /** Title status pill — muted, non-clickable */
        titleStatus:
          "border-border/60 bg-muted/60 text-muted-foreground capitalize",
      },
      size: {
        sm: "h-5 px-2 py-0.5 text-[10px] [&>svg]:size-3",
        md: "h-6 px-2.5 py-0.5 text-xs [&>svg]:size-3.5",
        lg: "h-7 px-3 py-1 text-sm [&>svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type BadgeProps = useRender.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

function Badge({
  className,
  variant = "default",
  size = "md",
  render,
  ...props
}: BadgeProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      size,
    },
  });
}

export { Badge, badgeVariants };
export type { BadgeProps as BadgeVariantProps };