
import React, { useState } from 'react';
import { ApiKeyProvider } from '@/context/ApiKeyContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import RecipeList from '@/components/RecipeList';
import FavoritesList from '@/components/FavoritesList';
import { useApiKey } from '@/context/ApiKeyContext';
import { Recipe } from '@/types';
import { searchRecipes } from '@/lib/spoonacular';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import ApiKeyModal from '@/components/ApiKeyModal';

const SearchContent = () => {
  const { apiKey, isApiKeySet } = useApiKey();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);

  const handleSearch = async (query: string, diets: string[], intolerances: string[]) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your Spoonacular API key before searching.",
        variant: "destructive",
      });
      setApiKeyModalOpen(true);
      return;
    }
    
    if (!query.trim()) {
      toast({
        title: "Search Query Required",
        description: "Please enter a recipe name or ingredient to search.",
      });
      return;
    }
    
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const result = await searchRecipes(apiKey, {
        query: query,
        diet: diets.join(','),
        intolerances: intolerances.join(','),
        number: 12,
        addRecipeInformation: true
      });
      
      setRecipes(result.results);
      
      if (result.results.length === 0) {
        toast({
          title: "No recipes found",
          description: "Try different search terms or filters.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to search recipes",
        variant: "destructive",
      });
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find the Perfect Recipe
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Search by ingredient, filter by diet, and save your favorite recipes.
        </p>
      </div>
    
      {/* Search Section */}
      <div className="mb-10">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {/* API Key Required Notice */}
      {!isApiKeySet && !hasSearched && (
        <div className="text-center py-8 bg-amber-50 rounded-lg border border-amber-200 mb-8">
          <h3 className="text-lg font-medium mb-2">API Key Required</h3>
          <p className="text-gray-600 mb-4">
            To use this application, you need to set up your Spoonacular API key.
          </p>
          <Button 
            onClick={() => setApiKeyModalOpen(true)}
            className="bg-recipe-primary hover:bg-recipe-primary/90"
          >
            Set API Key
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Get a free key at <a href="https://spoonacular.com/food-api/console#Dashboard" className="underline" target="_blank" rel="noreferrer">spoonacular.com</a>
          </p>
        </div>
      )}
      
      {/* Recipe Results */}
      {hasSearched && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Search Results</h2>
          <RecipeList 
            recipes={recipes} 
            isLoading={isLoading} 
          />
        </div>
      )}
      
      <ApiKeyModal open={apiKeyModalOpen} setOpen={setApiKeyModalOpen} />
    </div>
  );
};

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'favorites'>('search');

  return (
    <ApiKeyProvider>
      <FavoritesProvider>
        <div className="min-h-screen bg-recipe-background">
          <Header activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <main className="pt-4 pb-16">
            {activeTab === 'search' ? <SearchContent /> : <FavoritesList />}
          </main>
        </div>
      </FavoritesProvider>
    </ApiKeyProvider>
  );
};

export default Index;
