export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-KE").format(n);
}

export function formatKes(amount: number): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatKesCompact(amount: number): string {
  if (amount >= 1_000_000) {
    return `KES ${(amount / 1_000_000).toFixed(amount % 1_000_000 === 0 ? 0 : 1)}M`;
  }
  if (amount >= 1_000) {
    return `KES ${(amount / 1_000).toFixed(0)}K`;
  }
  return `KES ${amount}`;
}

export function formatAcreage(acres: number): string {
  if (Math.abs(acres - 0.125) < 0.001) return "50×100 plot";
  if (Math.abs(acres - 0.25) < 0.001) return "100×100 plot";
  if (Math.abs(acres - 0.5) < 0.001) return "½ acre";
  if (Number.isInteger(acres)) return `${acres} acre${acres === 1 ? "" : "s"}`;
  return `${acres} acres`;
}

export function relativeTime(date: string | Date): string {
  const then = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - then.getTime();
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export const landTypeLabel: Record<string, string> = {
  residential: "Residential",
  agricultural: "Agricultural",
  commercial: "Commercial",
  plot: "Plot",
  ranch: "Ranch",
};

export const titleStatusLabel: Record<string, string> = {
  freehold: "Freehold",
  leasehold: "Leasehold",
  sectional: "Sectional",
  unregistered: "Unregistered",
};