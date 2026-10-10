import { toFaDigits } from "@/lib/jalali";

export function faNum(n: number, digits = 0): string {
  return toFaDigits(
    n.toLocaleString("en-US", {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    }),
  );
}

export function formatRate(ratio: number, digits = 2): string {
  return `${faNum(ratio * 100, digits)}٪`;
}

export function formatPp(delta: number | null): string {
  if (delta == null || Number.isNaN(delta)) return "—";
  const pts = delta * 100;
  const sign = pts > 0 ? "+" : pts < 0 ? "−" : "";
  return `${sign}${faNum(Math.abs(pts), 2)} واحد`;
}

export function formatPct(delta: number): string {
  const sign = delta > 0 ? "+" : delta < 0 ? "−" : "";
  return `${sign}${faNum(Math.abs(delta), 1)}٪`;
}

export function formatPctPlain(n: number, digits = 0): string {
  return `${faNum(n, digits)}٪`;
}

export function deltaTone(delta: number, invert = false): "up" | "down" | "flat" {
  if (Math.abs(delta) < 0.05) return "flat";
  return (invert ? delta < 0 : delta > 0) ? "up" : "down";
}
