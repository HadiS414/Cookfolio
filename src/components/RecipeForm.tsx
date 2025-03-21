import { useState } from 'react';
import { Recipe, Ingredient } from '@/types/recipe';

interface RecipeFormProps {
  onSubmit: (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export default function RecipeForm({ onSubmit, onCancel }: RecipeFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servings, setServings] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: '', amount: '', unit: '' }]);
  const [instructions, setInstructions] = useState<string[]>(['']);

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: '' }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      cookingTime: parseInt(cookingTime),
      servings: parseInt(servings),
      category,
      image,
      ingredients: ingredients.filter(ing => ing.name && ing.amount && ing.unit),
      instructions: instructions.filter(inst => inst.trim() !== ''),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Recipe Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="cookingTime" className="block text-sm font-medium mb-1">
            Cooking Time (minutes)
          </label>
          <input
            type="number"
            id="cookingTime"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="servings" className="block text-sm font-medium mb-1">
            Servings
          </label>
          <input
            type="number"
            id="servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          Category
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium mb-1">
          Image URL
        </label>
        <input
          type="url"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              className="flex-1 p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Amount"
              value={ingredient.amount}
              onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
              className="w-24 p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Unit"
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
              className="w-24 p-2 border rounded-md"
            />
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="px-3 py-2 text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="text-sm text-blue-500 hover:text-blue-700"
        >
          + Add Ingredient
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Instructions</label>
        {instructions.map((instruction, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <span className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full">
              {index + 1}
            </span>
            <input
              type="text"
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              className="flex-1 p-2 border rounded-md"
            />
            <button
              type="button"
              onClick={() => removeInstruction(index)}
              className="px-3 py-2 text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addInstruction}
          className="text-sm text-blue-500 hover:text-blue-700"
        >
          + Add Step
        </button>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-md hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Recipe
        </button>
      </div>
    </form>
  );
} 