'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import RecipeCard from '@/components/RecipeCard';
import RecipeForm from '@/components/RecipeForm';
import RecipeDetail from '@/components/RecipeDetail';
import { Recipe } from '@/types/recipe';
import { saveRecipes, loadRecipes } from '@/utils/storage';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null);

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

  const handleDeleteRecipe = (recipe: Recipe) => {
    const updatedRecipes = recipes.filter(r => r.id !== recipe.id);
    setRecipes(updatedRecipes);
    saveRecipes(updatedRecipes);
    setRecipeToDelete(null);
    if (selectedRecipe?.id === recipe.id) {
      setSelectedRecipe(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="max-w-7xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Cookfolio
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Your personal recipe collection
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-colors shadow-lg hover:shadow-xl cursor-pointer"
          >
            Add New Recipe
          </motion.button>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-8 pb-8">
        <AnimatePresence mode="wait">
          {showForm ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg max-h-[90vh] overflow-y-auto shadow-2xl"
              >
                <RecipeForm
                  onSubmit={handleAddRecipe}
                  onCancel={() => setShowForm(false)}
                />
              </motion.div>
            </motion.div>
          ) : selectedRecipe ? (
            <RecipeDetail
              recipe={selectedRecipe}
              onClose={() => setSelectedRecipe(null)}
              onDelete={() => setRecipeToDelete(selectedRecipe)}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {recipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <RecipeCard
                    recipe={recipe}
                    onClick={() => setSelectedRecipe(recipe)}
                    onDelete={(e) => {
                      e.stopPropagation();
                      setRecipeToDelete(recipe);
                    }}
                  />
                </motion.div>
              ))}
              {recipes.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">No recipes yet</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Start your culinary journey by adding your first recipe!
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {recipeToDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-2xl"
              >
                <h3 className="text-xl font-semibold mb-4">Delete Recipe</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Are you sure you want to delete "{recipeToDelete.title}"? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRecipeToDelete(null)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteRecipe(recipeToDelete)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
