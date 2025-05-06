import { MediaSort } from "@/graphql/generated/anilist";

export const getInitialSortOrder = (
  sort: MediaSort | null
): "ascend" | "descend" | undefined => {
  if (!sort) {
    return undefined;
  }
  if (sort.endsWith("DESC")) {
    return "descend";
  }
  return "ascend";
};

export const getInitialSortColumnKey = (
  sort: MediaSort | null
): string | undefined => {
  if (sort?.startsWith("SCORE")) return "score";
  if (sort?.startsWith("TITLE")) return "title";
  return undefined;
};
