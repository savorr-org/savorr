import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CloseIcon from '@/public/images/x.png';
import RecipeForm from './recipeForm';

export default function AddModal({ recipes, setRecipes }: any) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold font-manrope">Add recipe</h2>
          <Link href="/recipe-book">
            <Image src={CloseIcon} alt="X" width={30} height={30} className="cursor-pointer" />
          </Link>
        </div>
        <RecipeForm recipes={recipes} setRecipes={setRecipes}/>
      </div>
    </div>
  );
}
