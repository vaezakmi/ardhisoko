import * as React from "react";
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * ArdhiSoko Separator.
 *
 * - Decorative by default (aria-hidden, role=none) — the right choice for
 *   purely visual dividers. Set `decorative={false}` when the divider
 *   carries meaning (e.g. separates two distinct form sections).
 * - Pass `label` to render a labeled divider: `──── Or continue with ────`.
 *
 * @example
 *   <Separator />
 *   <Separator orientation="vertical" className="h-6" />
 *   <Separator label="Or continue with M-Pesa" />
 *   <Separator variant="dashed" />
 */
const separatorVariants = cva("shrink-0", {
  variants: {
    variant: {
      default: "bg-border",
      dashed:
        "bg-transparent border-t border-dashed border-border data-vertical:border-t-0 data-vertical:border-l",
      gradient:
        "bg-gradient-to-r from-transparent via-border to-transparent data-vertical:bg-gradient-to-b",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface SeparatorProps
  extends Omit<SeparatorPrimitive.Props, "style">,
    VariantProps<typeof separatorVariants> {
  style?: React.CSSProperties;
  /** Purely visual → aria-hidden + role=none. Default true. */
  decorative?: boolean;
  /** Renders a labeled divider. Forces horizontal orientation. */
  label?: string;
  /** Adds horizontal inset (px) around the divider line. */
  inset?: boolean;
}

function Separator({
  className,
  orientation = "horizontal",
  variant = "default",
  decorative = true,
  label,
  inset,
  ...props
}: SeparatorProps) {
  // Labeled mode — we render a custom flex row instead of the primitive
  if (label) {
    return (
      <div
        data-slot="separator"
        data-orientation="horizontal"
        data-variant={variant}
        role={decorative ? "none" : "separator"}
        aria-orientation={decorative ? undefined : "horizontal"}
        className={cn(
          "flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-muted-foreground",
          inset && "px-4",
          className
        )}
        {...props}
      >
        <span
          aria-hidden
          className={cn(
            "h-px flex-1",
            variant === "dashed"
              ? "border-t border-dashed border-border"
              : variant === "gradient"
                ? "bg-gradient-to-r from-transparent via-border to-transparent"
                : "bg-border"
          )}
        />
        <span className="shrink-0">{label}</span>
        <span
          aria-hidden
          className={cn(
            "h-px flex-1",
            variant === "dashed"
              ? "border-t border-dashed border-border"
              : variant === "gradient"
                ? "bg-gradient-to-r from-transparent via-border to-transparent"
                : "bg-border"
          )}
        />
      </div>
    );
  }

  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      aria-hidden={decorative || undefined}
      className={cn(
        separatorVariants({ variant }),
        inset && orientation === "horizontal" && "mx-4",
        // size by orientation
        "data-horizontal:h-px data-horizontal:w-full",
        "data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  );
}

export { Separator, separatorVariants };