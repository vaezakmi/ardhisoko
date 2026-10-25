"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Sheet = SheetPrimitive.Root;

/**
 * SheetTrigger — accepts either Base UI's `render` API or the shadcn-style
 * `asChild` API. Both compile to the same thing.
 */
function SheetTrigger({
  asChild,
  render,
  children,
  ...props
}: SheetPrimitive.Trigger.Props & { asChild?: boolean }) {
  const resolvedRender = asChild && React.isValidElement(children)
    ? (children as React.ReactElement)
    : render;

  return (
    <SheetPrimitive.Trigger
      data-slot="sheet-trigger"
      render={resolvedRender}
      {...props}
    >
      {asChild ? undefined : children}
    </SheetPrimitive.Trigger>
  );
}

/**
 * SheetClose — same dual API as SheetTrigger.
 */
function SheetClose({
  asChild,
  render,
  children,
  ...props
}: SheetPrimitive.Close.Props & { asChild?: boolean }) {
  const resolvedRender = asChild && React.isValidElement(children)
    ? (children as React.ReactElement)
    : render;

  return (
    <SheetPrimitive.Close
      data-slot="sheet-close"
      render={resolvedRender}
      {...props}
    >
      {asChild ? undefined : children}
    </SheetPrimitive.Close>
  );
}

const SheetPortal = SheetPrimitive.Portal;
/* ─────────────────────────────────────────────────────────────
 *  Overlay / Backdrop
 * ───────────────────────────────────────────────────────────── */
function SheetOverlay({
  className,
  ...props
}: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50",
        "bg-black/40 backdrop-blur-[2px]",
        "transition-opacity duration-200 ease-out",
        "data-ending-style:opacity-0 data-starting-style:opacity-0",
        className
      )}
      {...props}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Content
 * ───────────────────────────────────────────────────────────── */
type SheetSide = "top" | "right" | "bottom" | "left";
type SheetSize = "sm" | "default" | "lg" | "full";

interface SheetContentProps extends SheetPrimitive.Popup.Props {
  side?: SheetSide;
  size?: SheetSize;
  showCloseButton?: boolean;
  /** Renders a small drag-handle bar at the top (bottom sheets only). */
  showHandle?: boolean;
}

function SheetContent({
  className,
  children,
  side = "right",
  size = "default",
  showCloseButton = true,
  showHandle,
  ...props
}: SheetContentProps) {
  const showHandleResolved = showHandle ?? side === "bottom";

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        data-size={size}
        className={cn(
          // base
          "fixed z-50 flex flex-col",
          "bg-popover text-sm text-popover-foreground",
          "shadow-xl outline-none",

          // animation
          "transition-[transform,opacity] duration-300 ease-out",
          "data-ending-style:opacity-0 data-starting-style:opacity-0",

          // ── top ────────────────────────────────────────────
          "data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:border-b",
          "data-[side=top]:data-ending-style:-translate-y-full",
          "data-[side=top]:data-starting-style:-translate-y-full",

          // ── bottom ─────────────────────────────────────────
          "data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:rounded-t-2xl data-[side=bottom]:border-t",
          "data-[side=bottom]:data-ending-style:translate-y-full",
          "data-[side=bottom]:data-starting-style:translate-y-full",
          "data-[side=bottom]:max-h-[85vh]",

          // ── left ───────────────────────────────────────────
          "data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:border-r",
          "data-[side=left]:data-ending-style:-translate-x-full",
          "data-[side=left]:data-starting-style:-translate-x-full",

          // ── right ──────────────────────────────────────────
          "data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:border-l",
          "data-[side=right]:data-ending-style:translate-x-full",
          "data-[side=right]:data-starting-style:translate-x-full",

          // ── size variants ─────────────────────────────────
          // for top/bottom: height
          "data-[side=bottom]:data-[size=sm]:h-auto",
          "data-[side=bottom]:data-[size=default]:h-auto",
          "data-[side=bottom]:data-[size=lg]:h-[60vh]",
          "data-[side=bottom]:data-[size=full]:h-[92vh]",
          "data-[side=top]:data-[size=lg]:h-[60vh]",
          "data-[side=top]:data-[size=full]:h-[92vh]",

          // for left/right: width
          "data-[side=left]:data-[size=sm]:w-[280px]",
          "data-[side=left]:data-[size=default]:w-[340px]",
          "data-[side=left]:data-[size=lg]:w-[min(440px,90vw)]",
          "data-[side=left]:data-[size=full]:w-screen",
          "data-[side=right]:data-[size=sm]:w-[280px]",
          "data-[side=right]:data-[size=default]:w-[340px]",
          "data-[side=right]:data-[size=lg]:w-[min(440px,90vw)]",
          "data-[side=right]:data-[size=full]:w-screen",

          className
        )}
        {...props}
      >
        {showHandleResolved && (
          <div
            aria-hidden
            className="mx-auto mt-3 h-1.5 w-10 shrink-0 rounded-full bg-muted-foreground/30"
          />
        )}

        {children}

        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3 z-10 text-muted-foreground hover:text-foreground"
                aria-label="Close"
              />
            }
          >
            <XIcon />
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Header
 * ───────────────────────────────────────────────────────────── */
function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex shrink-0 flex-col gap-1 border-b px-5 pb-4 pt-5",
        className
      )}
      {...props}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Body — the scrollable middle region
 * ───────────────────────────────────────────────────────────── */
function SheetBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-body"
      className={cn(
        "flex-1 overflow-y-auto overscroll-contain px-5 py-4",
        className
      )}
      {...props}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Footer
 * ───────────────────────────────────────────────────────────── */
function SheetFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "flex shrink-0 flex-col gap-2 border-t bg-muted/30 px-5 py-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Title + Description (accessibility essentials)
 * ───────────────────────────────────────────────────────────── */
function SheetTitle({
  className,
  ...props
}: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-display text-lg font-bold leading-tight tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn(
        "text-sm leading-relaxed text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};