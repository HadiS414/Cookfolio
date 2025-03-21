import Image from 'next/image';
import { Recipe } from '@/types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {recipe.image && (
        <div className="relative h-48 w-full">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
          {recipe.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>{recipe.cookingTime} mins</span>
          <span>{recipe.servings} servings</span>
          {recipe.category && (
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {recipe.category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
} 