"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import {
  ChevronDownIcon,
  CheckIcon,
  ChevronUpIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * ArdhiSoko Select.
 *
 * Wraps Base UI's Select. Typical usage:
 *
 *   <Select value={county} onValueChange={setCounty}>
 *     <SelectTrigger className="w-full">
 *       <SelectValue placeholder="Select county" />
 *     </SelectTrigger>
 *     <SelectContent>
 *       {counties.map((c) => (
 *         <SelectItem key={c} value={c}>{c}</SelectItem>
 *       ))}
 *     </SelectContent>
 *   </Select>
 *
 * For form fields, prefer the `<SelectField>` helper at the bottom —
 * it wraps Label + error message + this Select in the pattern used site-wide.
 */

const Select = SelectPrimitive.Root;

/* ─────────────────────────────────────────────────────────────
 *  Group
 * ───────────────────────────────────────────────────────────── */
function SelectGroup({
  className,
  ...props
}: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Value (the text shown inside the trigger)
 * ───────────────────────────────────────────────────────────── */
function SelectValue({
  className,
  ...props
}: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 truncate text-left", className)}
      {...props}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Trigger
 * ───────────────────────────────────────────────────────────── */
interface SelectTriggerProps extends SelectPrimitive.Trigger.Props {
  size?: "sm" | "default" | "lg";
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        // base
        "flex w-fit items-center justify-between gap-1.5",
        "rounded-lg border border-input bg-background",
        "px-2.5 text-sm whitespace-nowrap",
        "transition-colors outline-none select-none",
        // interactions
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        // placeholder styling
        "data-placeholder:text-muted-foreground",
        // sizes
        "data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-[size=sm]:text-xs",
        "data-[size=default]:h-9",
        "data-[size=lg]:h-11 data-[size=lg]:px-3 data-[size=lg]:text-base",
        // value slot defaults
        "*:data-[slot=select-value]:flex *:data-[slot=select-value]:min-w-0 *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5",
        // icon sizing
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // dark mode
        "dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground opacity-70 transition-transform duration-200 group-data-[popup-open]/select:rotate-180" />
        }
      />
    </SelectPrimitive.Trigger>
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Content (the popup list)
 * ───────────────────────────────────────────────────────────── */
interface SelectContentProps
  extends SelectPrimitive.Popup.Props,
    Pick<
      SelectPrimitive.Positioner.Props,
      "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
    > {
  /** Portal target. Pass `false` to render inline (useful inside modals/sheets). */
  container?: HTMLElement | null | false;
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  container,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal container={container === false ? undefined : container}>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            // layout & surface
            "relative isolate z-50",
            "max-h-(--available-height) w-(--anchor-width) min-w-36",
            "origin-(--transform-origin)",
            "overflow-x-hidden overflow-y-auto rounded-lg",
            "bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10",
            // animation
            "duration-100",
            "data-[align-trigger=true]:animate-none",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=top]:slide-in-from-bottom-2",
            "data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2",
            "data-[side=inline-start]:slide-in-from-right-2",
            "data-[side=inline-end]:slide-in-from-left-2",
            // dark mode (slightly darker popover)
            "dark:ring-border",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Group label (e.g. "Coastal counties")
 * ───────────────────────────────────────────────────────────── */
function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        "px-1.5 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Item
 * ───────────────────────────────────────────────────────────── */
function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // layout
        "relative flex w-full cursor-default items-center gap-1.5",
        "rounded-md py-1.5 pr-8 pl-2 text-sm",
        "outline-hidden select-none",
        // interactions
        "focus:bg-accent focus:text-accent-foreground",
        "not-data-[variant=destructive]:focus:**:text-accent-foreground",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        // child selectors
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 truncate">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none size-4 text-primary" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Separator
 * ───────────────────────────────────────────────────────────── */
function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Scroll buttons
 * ───────────────────────────────────────────────────────────── */
function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      aria-hidden
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      aria-hidden
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};