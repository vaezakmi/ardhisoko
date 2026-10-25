"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

const STORAGE_KEY = "ardhisoko:theme";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const current: Theme =
      stored === "dark" || stored === "light"
        ? stored
        : prefersDark
          ? "dark"
          : "light";
    setTheme(current);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(next);
    root.setAttribute("data-theme", next);
    root.style.colorScheme = next;
    localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
  }

  // Placeholder until mounted — matches final dimensions, no layout shift
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="grid h-9 w-9 place-items-center rounded-md border border-border bg-card"
        disabled
      >
        <span className="h-4 w-4" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "group relative grid h-9 w-9 place-items-center rounded-md",
        "border border-border bg-card text-foreground",
        "transition-all duration-200 ease-out-soft",
        "hover:border-primary/40 hover:bg-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "dark:hover:shadow-[0_0_20px_rgba(255,165,61,0.2)]"
      )}
    >
      <Sun
        aria-hidden
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        )}
      />
      <Moon
        aria-hidden
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        )}
      />
    </button>
  );
}