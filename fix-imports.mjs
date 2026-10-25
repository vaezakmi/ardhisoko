import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

// ── Recursively collect .ts / .tsx files under src/ ────────────
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, out);
    } else if (/\.(ts|tsx)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

const files = walk("src");
let fixed = 0;

for (const file of files) {
  const original = readFileSync(file, "utf8");
  let content = original;

  // Fix `from "cn"` or `from 'cn'` → `from "@/lib/utils"`
  content = content.replace(/from\s+["']cn["']/g, 'from "@/lib/utils"');

  // Fix old component paths → ui/ subfolder
  const pathFixes = [
    ["@/components/button", "@/components/ui/button"],
    ["@/components/badge", "@/components/ui/badge"],
    ["@/components/card", "@/components/ui/card"],
    ["@/components/input", "@/components/ui/input"],
    ["@/components/label", "@/components/ui/label"],
    ["@/components/textarea", "@/components/ui/textarea"],
    ["@/components/select", "@/components/ui/select"],
    ["@/components/separator", "@/components/ui/separator"],
    ["@/components/sheet", "@/components/ui/sheet"],
    ["@/components/popover", "@/components/ui/popover"],
    ["@/components/command", "@/components/ui/command"],
    ["@/components/dialog", "@/components/ui/dialog"],
  ];

  for (const [from, to] of pathFixes) {
    // Only match when the string ends with a quote (avoid partial matches)
    const re = new RegExp(
      `(["'])${from.replace(/[/]/g, "\\/")}\\1`,
      "g"
    );
    content = content.replace(re, `$1${to}$1`);
  }

  if (content !== original) {
    writeFileSync(file, content, "utf8");
    console.log("✓", file);
    fixed++;
  }
}

console.log(`\nDone. Fixed ${fixed} file(s).`);