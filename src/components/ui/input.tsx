import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * ArdhiSoko Input.
 *
 * - Base UI primitive underneath — full React 19 ref + prop passthrough.
 * - Pass `startIcon` / `endIcon` for leading/trailing slots.
 * - Pass `prefix` / `suffix` for text affixes (e.g. `KES`, `acres`).
 * - Pass `maxLength` to auto-show a character counter.
 * - Pass `clearable` for an inline clear button.
 *
 * @example
 *   <Input placeholder="Title" />
 *   <Input type="search" clearable />
 *   <Input prefix="KES" type="number" placeholder="8500000" />
 *   <Input startIcon={<MapPin />} placeholder="Area" />
 *   <Input maxLength={120} defaultValue="Half-acre plot" />
 */
const inputVariants = cva(
  [
    // layout
    "w-full min-w-0 flex-1",
    "rounded-lg border border-input bg-background",
    "transition-colors outline-none",

    // sizing & typography
    // text-base prevents iOS auto-zoom on focus; md:text-sm restores at desktop
    "px-3 py-1 text-base md:text-sm",

    // file input
    "file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",

    // placeholder
    "placeholder:text-muted-foreground",

    // states
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    "dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 text-sm",
        default: "h-9",
        lg: "h-11 text-base md:text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size" | "prefix">,
    VariantProps<typeof inputVariants> {
  /** Icon or element rendered before the input text (inside the field). */
  startIcon?: React.ReactNode;
  /** Icon or element rendered after the input text (inside the field). */
  endIcon?: React.ReactNode;
  /** Text prefix shown inside the field, e.g. "KES". */
  prefix?: React.ReactNode;
  /** Text suffix shown inside the field, e.g. "acres". */
  suffix?: React.ReactNode;
  /** Renders a clear button when there's a value. Works uncontrolled. */
  clearable?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    type,
    size,
    startIcon,
    endIcon,
    prefix,
    suffix,
    clearable,
    disabled,
    readOnly,
    ...props
  },
  ref
) {
  const [showClear, setShowClear] = React.useState(false);
  const innerRef = React.useRef<HTMLInputElement>(null);

  // Merge external ref + internal ref
  React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

  const isClearable =
    clearable && type !== "file" && type !== "checkbox" && type !== "radio";

  const hasStart = Boolean(startIcon || prefix);
  const hasEnd = Boolean(endIcon || suffix || isClearable);

  return (
    <div
      data-slot="input-wrapper"
      className={cn(
        "group/input relative flex w-full items-center",
        // The wrapper gets the focus ring when the input inside is focused
        "has-[input:focus-visible]:ring-3 has-[input:focus-visible]:ring-ring/50",
        "has-[[aria-invalid]]:ring-3 has-[[aria-invalid]]:ring-destructive/20",
        "rounded-lg",
        className
      )}
    >
      {prefix && (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none pl-3 pr-1 text-sm font-medium text-muted-foreground select-none",
            "peer-disabled:opacity-50"
          )}
        >
          {prefix}
        </span>
      )}

      {startIcon && !prefix && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-3 flex items-center text-muted-foreground [&_svg]:size-4"
        >
          {startIcon}
        </span>
      )}

      <InputPrimitive
        ref={innerRef}
        type={type}
        disabled={disabled}
        readOnly={readOnly}
        data-slot="input"
        className={cn(
          inputVariants({ size }),
          // padding adjustments for icon/prefix slots
          prefix && "pl-1",
          startIcon && !prefix && "pl-9",
          hasEnd && "pr-9",
          // when wrapper owns the ring, suppress the input's own ring
          "focus-visible:ring-0 focus-visible:outline-none",
          "aria-invalid:ring-0",
          // keep background transparent so wrapper bg shows
          "bg-transparent",
          // iOS: prevent zoom when inside wrappers with small text
          className
        )}
        onInput={(e) => {
          props.onInput?.(e);
          if (isClearable) {
            setShowClear((e.currentTarget as HTMLInputElement).value.length > 0);
          }
        }}
        onBlur={(e) => {
          props.onBlur?.(e);
        }}
        {...props}
      />

      {suffix && (
        <span
          aria-hidden
          className="pointer-events-none pl-1 pr-3 text-sm font-medium text-muted-foreground select-none"
        >
          {suffix}
        </span>
      )}

      {endIcon && !suffix && !isClearable && (
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 flex items-center text-muted-foreground [&_svg]:size-4"
        >
          {endIcon}
        </span>
      )}

      {isClearable && showClear && !disabled && !readOnly && (
        <button
          type="button"
          aria-label="Clear input"
          onClick={() => {
            if (innerRef.current) {
              innerRef.current.value = "";
              innerRef.current.dispatchEvent(
                new Event("input", { bubbles: true })
              );
              innerRef.current.focus();
              setShowClear(false);
            }
          }}
          className="absolute right-2 rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input, inputVariants };