"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

import { cn } from "@/lib/utils";

/**
 * ArdhiSoko Popover.
 *
 * Base UI primitive under the hood. `PopoverTrigger` and `PopoverClose`
 * support BOTH the shadcn `asChild` API and Base UI's `render` API — use
 * whichever you prefer:
 *
 *   <PopoverTrigger asChild>
 *     <Button>Open</Button>
 *   </PopoverTrigger>
 *
 *   <PopoverTrigger render={<Button>Open</Button>} />
 *
 * Never nest two interactive elements — pick one trigger API per call site.
 */

const Popover = PopoverPrimitive.Root;

/* ─────────────────────────────────────────────────────────────
 *  Trigger — accepts asChild OR render
 * ───────────────────────────────────────────────────────────── */
interface PopoverTriggerProps extends PopoverPrimitive.Trigger.Props {
  asChild?: boolean;
}

function PopoverTrigger({
  asChild,
  render,
  children,
  ...props
}: PopoverTriggerProps) {
  const resolvedRender =
    asChild && React.isValidElement(children)
      ? (children as React.ReactElement)
      : render;

  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      render={resolvedRender}
      {...props}
    >
      {asChild ? undefined : children}
    </PopoverPrimitive.Trigger>
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Close — accepts asChild OR render
 * ───────────────────────────────────────────────────────────── */
interface PopoverCloseProps extends PopoverPrimitive.Close.Props {
  asChild?: boolean;
}

function PopoverClose({
  asChild,
  render,
  children,
  ...props
}: PopoverCloseProps) {
  const resolvedRender =
    asChild && React.isValidElement(children)
      ? (children as React.ReactElement)
      : render;

  return (
    <PopoverPrimitive.Close
      data-slot="popover-close"
      render={resolvedRender}
      {...props}
    >
      {asChild ? undefined : children}
    </PopoverPrimitive.Close>
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Content
 * ───────────────────────────────────────────────────────────── */
interface PopoverContentProps
  extends PopoverPrimitive.Popup.Props,
    Pick<
      PopoverPrimitive.Positioner.Props,
      | "align"
      | "alignOffset"
      | "side"
      | "sideOffset"
      | "collisionPadding"
      | "anchor"
    > {
  /** Portal target. Pass `false` to render inline (needed inside modals). */
  container?: HTMLElement | null | false;
  /** Match the trigger width. Useful for combobox-style popovers. */
  matchTriggerWidth?: boolean;
}

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  collisionPadding = 8,
  container,
  matchTriggerWidth = false,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal
      container={container === false ? undefined : container}
    >
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            // layout
            "z-50 flex origin-(--transform-origin) flex-col gap-2.5",
            matchTriggerWidth
              ? "w-(--anchor-width) min-w-56"
              : "w-72",
            // surface
            "rounded-lg bg-popover p-2.5 text-sm text-popover-foreground",
            "shadow-md ring-1 ring-foreground/10 outline-hidden",
            "dark:ring-border",
            // animation
            "duration-100",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=top]:slide-in-from-bottom-2",
            "data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2",
            "data-[side=inline-start]:slide-in-from-right-2",
            "data-[side=inline-end]:slide-in-from-left-2",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Header / Title / Description
 * ───────────────────────────────────────────────────────────── */
function PopoverHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      {...props}
    />
  );
}

function PopoverTitle({
  className,
  ...props
}: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn(
        "font-display font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverTrigger,
  PopoverClose,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
};