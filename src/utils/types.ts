export type Ingredient = {
  name: string;
  measure: string;
};

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  [key: string]: string | undefined;
};

export type MealResponse = {
  meals: Meal[];
};

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type CategoriesResponse = {
  categories: Category[];
};
