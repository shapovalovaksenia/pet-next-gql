import type { Media } from "@/graphql/generated/anilist";

import { MONTH_NAMES } from "@/shared/constant";

export const formatFuzzyDate = (date: Media["startDate"]): string => {
  if (!date?.year) {
    return "N/A";
  }

  const monthName =
    date.month && date.month >= 1 && date.month <= 12
      ? MONTH_NAMES[date.month - 1]
      : "";

  const day = date.day ?? "";

  return [day, monthName, date.year].filter(Boolean).join(" ").trim();
};

export const stripHtml = (html: string | null | undefined): string => {
  if (!html) return "-";

  try {
    return html.replace(/<[^>]*>?/gm, "");
  } catch (e) {
    console.error("Error stripping HTML:", e);
    return html;
  }
};
