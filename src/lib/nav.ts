export interface NavItem {
  label: string;
  href: string;
  /**
   * Matches pathname for active-state highlighting.
   * - String: exact or prefix match
   * - Function: full control
   */
  match?: string | ((pathname: string, search: string) => boolean);
  /** Optional: show a small badge (e.g. "new", "beta"). */
  badge?: string;
}

/* ═══════════════════════════════════════════════════════════
   Primary navigation — main header + mobile drawer
   ═══════════════════════════════════════════════════════════ */

export const primaryNav: NavItem[] = [
  {
    label: "Browse land",
    href: "/listings",
    match: (p, s) =>
      p === "/listings" && !s.includes("landType="),
  },
  {
    label: "Developments",
    href: "/developments",
    match: "/developments",
  },
  {
    label: "Farms",
    href: "/listings?landType=agricultural",
    match: (p, s) =>
      p === "/listings" && s.includes("landType=agricultural"),
  },
  {
    label: "Find a pro",
    href: "/professionals",
    match: "/professionals",
  },
  {
    label: "About",
    href: "/about",
    match: "/about",
  },
];

/* ═══════════════════════════════════════════════════════════
   Secondary navigation — utility links (mobile drawer, footer)
   ═══════════════════════════════════════════════════════════ */

export const secondaryNav: NavItem[] = [
  {
    label: "Register as a pro",
    href: "/professionals/register",
    match: "/professionals/register",
  },
  {
    label: "Contact",
    href: "/contact",
    match: "/contact",
  },
];

/* ═══════════════════════════════════════════════════════════
   Active-state resolver
   ═══════════════════════════════════════════════════════════ */

export function isActive(
  item: NavItem,
  pathname: string,
  search = ""
): boolean {
  // Function matcher — full control
  if (typeof item.match === "function") {
    return item.match(pathname, search);
  }

  // String matcher — exact or prefix
  if (typeof item.match === "string") {
    if (pathname === item.match) return true;
    return pathname.startsWith(`${item.match}/`);
  }

  // No matcher — exact pathname match against href (without query)
  const hrefPath = item.href.split("?")[0];
  return pathname === hrefPath;
}