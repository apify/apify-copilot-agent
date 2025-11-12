import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toFiniteNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim();
    if (!normalized) {
      return null;
    }

    const parsed = Number.parseFloat(normalized);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

type FormatPriceOptions = {
  currency?: string;
  locale?: string;
  fallback?: string;
};

export function formatPrice(value: unknown, options: FormatPriceOptions = {}): string {
  const { currency = "USD", locale = "en-US", fallback = "N/A" } = options;
  const numeric = toFiniteNumber(value);

  if (numeric === null) {
    return fallback;
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numeric);
  } catch {
    return `${currency === "USD" ? "$" : ""}${numeric.toFixed(2)}`;
  }
}
