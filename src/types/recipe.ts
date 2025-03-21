export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  cookingTime: number; // in minutes
  servings: number;
  image?: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
} 