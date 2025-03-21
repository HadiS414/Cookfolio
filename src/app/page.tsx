'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import RecipeCard from '@/components/RecipeCard';
import RecipeForm from '@/components/RecipeForm';
import { Recipe } from '@/types/recipe';
import { saveRecipes, loadRecipes } from '@/utils/storage';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Load recipes from localStorage on component mount
  useEffect(() => {
    const savedRecipes = loadRecipes();
    setRecipes(savedRecipes);
  }, []);

  const handleAddRecipe = (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    saveRecipes(updatedRecipes);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen p-8">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">Cookfolio</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Add New Recipe
        </button>
      </header>

      <main className="max-w-7xl mx-auto">
        {showForm ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-h-[90vh] overflow-y-auto">
              <RecipeForm
                onSubmit={handleAddRecipe}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => {
                  // TODO: Implement recipe detail view
                  console.log('View recipe:', recipe.id);
                }}
              />
            ))}
            {recipes.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                <p>No recipes yet. Click "Add New Recipe" to get started!</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
