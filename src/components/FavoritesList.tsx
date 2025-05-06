
import React, { useState, useEffect } from 'react';
import { Recipe } from '@/types';
import RecipeList from './RecipeList';
import { useApiKey } from '@/context/ApiKeyContext';
import { useFavorites } from '@/context/FavoritesContext';
import { Button } from '@/components/ui/button';
import { getRecipesByIds } from '@/lib/spoonacular';
import { toast } from '@/components/ui/use-toast';

const FavoritesList: React.FC = () => {
  const { apiKey } = useApiKey();
  const { favorites } = useFavorites();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = async () => {
    if (!apiKey || favorites.length === 0) {
      setFavoriteRecipes([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const recipes = await getRecipesByIds(apiKey, favorites);
      setFavoriteRecipes(recipes);
    } catch (err) {
      setError('Failed to fetch favorite recipes. Please try again later.');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [apiKey, favorites]);

  if (!apiKey) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-3">No API Key Set</h2>
        <p className="text-gray-500 mb-4">
          Please set your Spoonacular API key to view your favorite recipes.
        </p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-3">No Favorites Yet</h2>
        <p className="text-gray-500 mb-4">
          Start searching for recipes and click the heart icon to save your favorites.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">My Favorites</h2>
        {error && (
          <Button
            onClick={fetchFavorites}
            variant="outline"
            className="text-recipe-primary border-recipe-primary"
          >
            Retry
          </Button>
        )}
      </div>

      <RecipeList 
        recipes={favoriteRecipes} 
        isLoading={isLoading} 
        emptyMessage={error || "No favorite recipes found."}
      />
    </div>
  );
};

export default FavoritesList;
