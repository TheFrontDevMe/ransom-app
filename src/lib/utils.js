import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format time (now) for a given timezone.
 * Returns { time: "HH:MM", amOrPm: "AM/PM" }
 */
export function formatTimeForTimezone(timeZone) {
  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(now);

  const hour = parts.find((part) => part.type === "hour")?.value ?? "";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "";
  const amOrPm = parts.find((part) => part.type === "dayPeriod")?.value ?? "";

  return { time: `${hour}:${minute}`, amOrPm };
}

/**
 * Format a number or numeric string with dots as thousand separators.
 * Always uses dots, regardless of locale.
 *
 * @param {string|number} value
 * @returns {string}
 */
export function formatValueWithDots(value) {
  if (value === null || value === undefined || value === "") return "";

  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Returns country metadata based on ISO country code.
 *
 * Converts a two-letter ISO country code (e.g., "US", "CA")
 * into a human-readable country name and a flag URL.
 *
 * Uses `Intl.DisplayNames` for localization and supports a locale.
 *
 * @param {string} code - ISO 3166-1 alpha-2 country code (e.g., "US", "CA").
 * @param {string} [locale="en"] - Locale for the country name (e.g., "en", "fr").
 * @returns {{code: string, name: string, flag: string}} Object containing:
 *   - code: original ISO code
 *   - name: localized country name
 *   - flag: URL to the country's SVG flag
 */
export function getCountryData(code, locale = "en") {
  if (!code || typeof code !== "string") {
    // Handle invalid input gracefully
    return { code: "", name: "Unknown", flag: "" };
  }

  // Create an Intl.DisplayNames instance for region names
  // This converts ISO codes to human-readable country names
  const regionNames = new Intl.DisplayNames([locale], { type: "region" });

  return {
    code, // keep original code for reference
    name: regionNames.of(code) || code, // fallback to code if name is not available
    flag: `https://flagcdn.com/${code.toLowerCase()}.svg`, // standard flag URL from FlagCDN
  };
}

/**
 * Converts a future timestamp into a human-readable countdown
 * format: "DDd HHh MMm" or "HHh MMm" if days = 0
 *
 * @param {number} expiryTimestamp - future timestamp in ms
 * @returns {string} countdown string
 */
export function getCountdown(expiryTimestamp) {
  const now = Date.now();
  let diff = expiryTimestamp - now;

  if (diff <= 0) return "0d 0h:0m";

  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const pad = (n) => String(n).padStart(2, "0");

  if (days > 0) {
    return `${days}d ${pad(hours)}h:${pad(minutes)}m`;
  }
  return `${pad(hours)}h:${pad(minutes)}m`;
}
