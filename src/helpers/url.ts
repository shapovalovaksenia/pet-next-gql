import type { FilterCharacter } from "@/graphql/generated/rickmorty";
import type { ReadonlyURLSearchParams } from "next/navigation";

type ServerSearchParams = { [key: string]: string | string[] | undefined };

export function parseFiltersFromSearchParams(
  searchParams: ReadonlyURLSearchParams | null | undefined
): FilterCharacter;

export function parseFiltersFromSearchParams(
  searchParams: ServerSearchParams | null | undefined
): FilterCharacter;

export function parseFiltersFromSearchParams(
  searchParams: ReadonlyURLSearchParams | ServerSearchParams | null | undefined
): FilterCharacter {
  const filters: FilterCharacter = {};
  if (!searchParams) {
    return filters;
  }

  const getParam = (key: string): string | null => {
    if (
      searchParams instanceof URLSearchParams ||
      typeof searchParams.get === "function"
    ) {
      const value = (searchParams as ReadonlyURLSearchParams).get(key);
      return value;
    } else {
      const value = searchParams[key];
      if (Array.isArray(value)) {
        return value[0] ?? null;
      }
      return value ?? null;
    }
  };

  const status = getParam("status");
  const species = getParam("species");
  const gender = getParam("gender");
  const type = getParam("type");

  if (status) filters.status = status;
  if (species) filters.species = species;
  if (gender) filters.gender = gender;
  if (type) filters.type = type;

  return filters;
}

export const createSearchQuery = (filters: FilterCharacter): string => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  return params.toString();
};
