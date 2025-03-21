import { Recipe } from '@/types/recipe';

const STORAGE_KEY = 'cookfolio_recipes';

export const saveRecipes = (recipes: Recipe[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }
};

export const loadRecipes = (): Recipe[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const recipes = JSON.parse(stored);
      // Convert string dates back to Date objects
      return recipes.map((recipe: any) => ({
        ...recipe,
        createdAt: new Date(recipe.createdAt),
        updatedAt: new Date(recipe.updatedAt),
      }));
    }
  }
  return [];
}; 