import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * ArdhiSoko form Label.
 *
 * Pairs with inputs via `htmlFor` (recommended) or by wrapping the input.
 * Automatically responds to the input's `disabled` / `aria-invalid` state
 * via the `peer` and `group-data-[disabled]` selectors.
 *
 * @example
 *   <Label htmlFor="title" required>Title</Label>
 *   <Input id="title" />
 *
 *   <Label htmlFor="subCounty" optional>Sub-county</Label>
 *   <Input id="subCounty" />
 */
const labelVariants = cva(
  [
    "inline-flex items-center gap-1.5",
    "text-sm font-medium leading-snug select-none",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
    "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
      tone: {
        default: "text-foreground",
        muted: "text-muted-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      tone: "default",
    },
  }
);

export interface LabelProps
  extends React.ComponentProps<"label">,
    VariantProps<typeof labelVariants> {
  /** Shows a red asterisk after the label text. Also sets aria required context. */
  required?: boolean;
  /** Shows a muted "(optional)" hint after the label text. */
  optional?: boolean;
  /** Visually hide the label but keep it available to screen readers. */
  srOnly?: boolean;
  /** Skip the automatic required/optional indicators. */
  hideIndicator?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(function Label(
  {
    className,
    size,
    tone,
    required,
    optional,
    srOnly,
    hideIndicator,
    children,
    ...props
  },
  ref
) {
  return (
    <label
      ref={ref}
      data-slot="label"
      data-required={required || undefined}
      data-optional={optional || undefined}
      className={cn(
        labelVariants({ size, tone }),
        srOnly && "sr-only",
        className
      )}
      {...props}
    >
      <span>{children}</span>

      {required && !hideIndicator && (
        <span
          aria-hidden
          className="text-destructive"
          title="Required"
        >
          *
        </span>
      )}

      {optional && !required && !hideIndicator && (
        <span className="text-xs font-normal text-muted-foreground">
          (optional)
        </span>
      )}
    </label>
  );
});
Label.displayName = "Label";

export { Label, labelVariants };