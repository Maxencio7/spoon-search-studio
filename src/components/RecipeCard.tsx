
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recipe } from '@/types';
import { useFavorites } from '@/context/FavoritesContext';
import { Heart } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

interface RecipeCardProps {
  recipe: Recipe;
  isLoading?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isLoading = false }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorite(recipe.id);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorited) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe.id);
    }
  };

  const openRecipeInNewTab = () => {
    window.open(recipe.sourceUrl || `https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}`, '_blank');
  };
  
  if (isLoading) {
    return (
      <Card className="overflow-hidden recipe-card-shadow h-[360px]">
        <Skeleton className="h-48 w-full" />
        <CardContent className="p-4">
          <Skeleton className="h-6 w-4/5 mb-2" />
          <Skeleton className="h-4 w-2/3 mb-4" />
          <div className="space-x-2">
            <Skeleton className="h-6 w-16 inline-block" />
            <Skeleton className="h-6 w-16 inline-block" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 recipe-card-shadow h-full flex flex-col cursor-pointer" 
      onClick={openRecipeInNewTab}
    >
      {recipe.image ? (
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-48 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400">No image available</span>
        </div>
      )}

      <CardContent className="p-4 flex-grow">
        <h3 className="font-bold text-lg line-clamp-2 mb-1">{recipe.title}</h3>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {recipe.readyInMinutes && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              {recipe.readyInMinutes} min
            </span>
          )}
          
          {recipe.servings && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              {recipe.servings} servings
            </span>
          )}
          
          {recipe?.diets?.slice(0, 2).map((diet) => (
            <span key={diet} className="badge-diet">
              {diet}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          className={`rounded-full p-2 h-auto ${favorited ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
          onClick={handleFavoriteToggle}
          title={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-5 w-5 ${favorited ? 'fill-current' : ''}`} />
          <span className="sr-only">
            {favorited ? "Remove from favorites" : "Add to favorites"}
          </span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-recipe-primary hover:text-recipe-primary/80 py-1 h-auto"
        >
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
