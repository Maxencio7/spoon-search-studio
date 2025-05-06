
import React from 'react';
import { Recipe } from '@/types';
import RecipeCard from './RecipeCard';

interface RecipeListProps {
  recipes: Recipe[];
  isLoading: boolean;
  emptyMessage?: string;
}

const RecipeList: React.FC<RecipeListProps> = ({ 
  recipes, 
  isLoading, 
  emptyMessage = "No recipes found." 
}) => {
  // Show skeleton cards while loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, index) => (
          <RecipeCard key={`skeleton-${index}`} recipe={{} as Recipe} isLoading={true} />
        ))}
      </div>
    );
  }

  // Show empty state if no recipes
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  // Show recipes
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
