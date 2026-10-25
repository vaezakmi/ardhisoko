import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  [
    "group/card",
    "flex flex-col gap-(--card-spacing)",
    "overflow-hidden rounded-xl bg-card text-sm text-card-foreground",
    "py-(--card-spacing)",
    "ring-1 ring-foreground/10",
    "[--card-spacing:--spacing(4)]",
    "*:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
    "has-[>img:first-child]:pt-0",
    "has-data-[slot=card-footer]:pb-0",
    "dark:ring-border",
  ].join(" "),
  {
    variants: {
      size: {
        default: "[--card-spacing:--spacing(4)]",
        sm: "[--card-spacing:--spacing(3)]",
      },
      variant: {
        default: "",
        featured:
          "ring-brand-orange/30 shadow-[0_0_0_1px_rgba(204,102,0,0.1)] hover:shadow-lg hover:shadow-brand-orange/10",
        muted: "bg-muted/50 ring-transparent",
        outline: "bg-transparent ring-border",
      },
      interactive: {
        true: [
          "cursor-pointer transition-all duration-200",
          "hover:ring-primary/40 hover:shadow-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ],
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
      interactive: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  function Card(
    {
      className,
      size = "default",
      variant,
      interactive,
      asChild = false,
      children,
      ...props
    },
    ref
  ) {
    const classes = cn(cardVariants({ size, variant, interactive }), className);

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<Record<string, unknown>>;
      const childProps = child.props as {
        className?: string;
        [key: string]: unknown;
      };
      return React.cloneElement(child, {
        ...props,
        ...childProps,
        className: cn(classes, childProps.className),
      } as Record<string, unknown>);
    }

    return (
      <div
        ref={ref}
        data-slot="card"
        data-size={size}
        data-variant={variant}
        data-interactive={interactive || undefined}
        className={classes}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-xl px-(--card-spacing)",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        "has-data-[slot=card-description]:grid-rows-[auto_auto]",
        "[.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "font-display text-base font-bold leading-snug tracking-tight",
        "group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/40 p-(--card-spacing)",
        className
      )}
      {...props}
    />
  );
}

function CardImage({
  className,
  aspect = "video",
  ...props
}: React.ComponentProps<"div"> & {
  aspect?: "video" | "square" | "landscape" | "portrait";
}) {
  const aspectClass = {
    video: "aspect-video",
    square: "aspect-square",
    landscape: "aspect-[4/3]",
    portrait: "aspect-[3/4]",
  }[aspect];

  return (
    <div
      data-slot="card-image"
      className={cn(
        "relative w-full overflow-hidden bg-muted",
        aspectClass,
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardImage,
  cardVariants,
};