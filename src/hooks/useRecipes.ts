import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRecipeById, getRecipes, searchRecipes } from "@/api/recipes";

const FIVE_MINUTES = 1000 * 60 * 5;

export function useRecipes() {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
    staleTime: FIVE_MINUTES,
  });
}

export function useSearchRecipes(query: string) {
  return useQuery({
    queryKey: ["recipes", "search", query],
    queryFn: () => searchRecipes(query),
    enabled: query.length > 0,
    staleTime: FIVE_MINUTES,
    placeholderData: keepPreviousData,
  });
}

export function useRecipe(id?: string) {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeById(id as string),
    enabled: !!id,
    staleTime: FIVE_MINUTES,
  });
}
