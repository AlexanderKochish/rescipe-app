import axios from "axios";
import {
  MealResponse,
  Meal,
  CategoriesResponse,
  Category,
} from "../utils/types";

const api = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
  headers: { "Content-Type": "application/json" },
});

export const getAllRecipes = async (search: string): Promise<Meal[]> => {
  const { data } = await api.get<MealResponse>(`/search.php?s=${search}`);
  return data.meals || [];
};

export const getRecipeById = async (id: string): Promise<Meal> => {
  const { data } = await api.get<MealResponse>(`/lookup.php?i=${id}`);
  return data.meals[0];
};

export const getAllCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<CategoriesResponse>("/categories.php");
  return data.categories || [];
};
