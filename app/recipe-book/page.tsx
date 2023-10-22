'use client'
import Modal from '@/components/recipeModal';
import Link from 'next/link';
import { useState } from 'react';

interface Ingredient {
  name: string;
  quantity: string;
  alternatives?: string[];
}

type Props = {
  searchParams: Record<string, string> | null | undefined;
};

function RecipeCard ({ recipe }: any) {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-4 w-full">
      <h2 className="text-center text-xl font-bold mb-4">{recipe.name}</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Ingredients</h3>
        <ul className="list-disc ml-4">
          {recipe.ingredients.map((ingredient: Ingredient, index: number) => {
            const text = `${ingredient.name} x${ingredient.quantity} `;

            return (
              <li key={index} className='flex justify-between items-center'>
                <div>{text}</div>
                <ul>
                  {ingredient.alternatives && <span className='font-bold text-green'>Alternatives</span>}
                  {ingredient.alternatives?.map((alternative: string, altIndex: number)=> <li key={altIndex} className="text-right">{alternative}</li>)}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default function Page({ searchParams }: Props) {
    const showModal = searchParams?.modal;

    const [recipes, setRecipes] = useState([]);

    return (
        <>
          <div className="container mx-auto px-4 md:px-12 md:pt-2"> 
            <div className="text-3xl text-green font-manrope font-bold pt-10 pb-10">
              Recipe Book
              <Link href="/recipe-book/?modal=true" className="bg-green text-white text-xl py-2 px-8 ml-6 rounded">+ Add</Link>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe, index) => <RecipeCard key={index} recipe={recipe} />)}
              {recipes.length == 0 && <>Empty.</>} 
            </div>    
          </div>
          {showModal && <Modal recipes={recipes} setRecipes={setRecipes}/>}
        </>
    );
}
