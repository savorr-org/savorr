import React, { useState, ChangeEvent } from 'react';

interface Ingredient {
  name: string;
  quantity: string;
  alternatives?: string[];
}

export default function RecipeForm ({recipes, setRecipes}: any) {
  const [recipeName, setRecipeName] = useState<string>('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: '', quantity: '' }]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecipeName(e.target.value);
  };

  const handleIngredientChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedIngredients: any = [...ingredients];
    updatedIngredients[index][e.target.name] = e.target.value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    for (const ingredient of ingredients) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({grocery: ingredient.name})
      };
      const response = await fetch('/api/suggestions', options);
      const { data } = await response.json();

      ingredient.alternatives = data;
    }
    setIngredients(ingredients)
    setRecipes([...recipes, { name: recipeName, ingredients }]);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold" htmlFor="recipeName">
          Recipe Name
        </label>
        <input
          type="text"
          id="recipeName"
          name="recipeName"
          value={recipeName}
          onChange={handleNameChange}
          className="w-full p-2 border border-gray rounded"
          placeholder="Recipe Name"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              name="name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(e, index)}
              className="w-1/2 p-2 border border-gray rounded"
              placeholder="Ingredient Name"
              required
            />
            <input
              type="text"
              name="quantity"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(e, index)}
              className="w-1/2 p-2 border border-gray rounded"
              placeholder="Quantity"
              required
            />
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="text-gray-new-item p-2 rounded"
        >
          + New
        </button>
      </div>
      <div className="mb-4 flex">
        <button
          type="submit"
          className="bg-green text-white p-2 rounded ml-auto"
        >
          Complete
        </button>
      </div>
    </form>
  );
};
