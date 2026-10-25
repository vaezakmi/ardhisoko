import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const mergeRefs = <T,>(...refs: Array<React.Ref<T> | undefined>) => {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref && typeof ref === "object") {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
};

const mergeEventHandlers = <E,>(
  childHandler?: ((event: E) => void) | undefined,
  slotHandler?: ((event: E) => void) | undefined
) => {
  if (!childHandler) return slotHandler;
  if (!slotHandler) return childHandler;

  return (event: E) => {
    childHandler(event);
    slotHandler(event);
  };
};

const Slot = React.forwardRef<any, React.HTMLAttributes<any> & { children?: React.ReactNode }>(
  ({ children, ...props }, forwardedRef) => {
    if (!React.isValidElement(children)) return null;

    const child = children as React.ReactElement<any>;
    const childProps = child.props ?? {};

    const mergedProps = {
      ...childProps,
      ...props,
      className: cn(childProps.className, props.className),
      style: { ...childProps.style, ...props.style },
      ref: mergeRefs((child as any).ref, forwardedRef),
    };

    Object.keys(props).forEach((key) => {
      if (!key.startsWith("on") || typeof props[key as keyof typeof props] !== "function") {
        return;
      }

      const propName = key as keyof typeof childProps;
      const childHandler = childProps[propName];
      const slotHandler = props[propName as keyof typeof props] as
        | ((event: any) => void)
        | undefined;

      if (typeof childHandler === "function" || typeof slotHandler === "function") {
        mergedProps[key] = mergeEventHandlers(childHandler, slotHandler);
      }
    });

    return React.cloneElement(child, mergedProps);
  }
);

Slot.displayName = "Slot";

const Slottable = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

const buttonVariants = cva(
  // ── base ──────────────────────────────────────────────
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-md text-sm font-medium",
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    // loading cursor — subtle UX signal
    "data-[loading=true]:cursor-wait",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/95",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:bg-destructive/95",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",

        // ── ArdhiSoko brand variants ─────────────────────────────
        /** WhatsApp green — seller contact CTA */
        whatsapp:
          "bg-[#25D366] text-white shadow-sm hover:bg-[#20BD5A] active:bg-[#1CAF52]",
        /** M-Pesa green — payment CTA */
        mpesa:
          "bg-[#0F8A3C] text-white shadow-sm hover:bg-[#0C7533] active:bg-[#0A652B]",
        /** Success state — forest green for confirmations */
        success:
          "bg-brand-green text-white shadow-sm hover:bg-brand-green/90",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs [&_svg]:size-3.5",
        default: "h-9 px-4 py-2",
        lg: "h-11 rounded-md px-6 text-base [&_svg]:size-5",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8 rounded-md",
        "icon-lg": "h-11 w-11 rounded-md [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Shows a spinner, sets aria-busy, disables interaction. Keeps children mounted. */
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      type = "button",
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={asChild ? undefined : isDisabled}
        aria-disabled={asChild ? isDisabled : undefined}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        {...props}
      >
        {loading && (
          <Loader2
            aria-hidden="true"
            className="animate-spin"
            data-slot="button-loading-icon"
          />
        )}
        <Slottable>{children}</Slottable>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps as ButtonVariantProps };