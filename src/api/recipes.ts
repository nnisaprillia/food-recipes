import type { Recipe, RecipesResponse } from "@/types/recipe";

const BASE_URL = "https://dummyjson.com/recipes";

async function request<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Permintaan gagal (HTTP ${res.status})`);
  return res.json() as Promise<T>;
}

export const getRecipes = () =>
  request<RecipesResponse>(`${BASE_URL}?limit=100`);

export const searchRecipes = (query: string) =>
  request<RecipesResponse>(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);

export const getRecipeById = (id: string | number) =>
  request<Recipe>(`${BASE_URL}/${id}`);
