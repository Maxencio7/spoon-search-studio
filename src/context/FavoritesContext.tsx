
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getFavorites, addFavorite as addFavToStorage, removeFavorite as removeFavFromStorage } from '@/lib/localStorage';

interface FavoritesContextType {
  favorites: number[];
  addFavorite: (recipeId: number) => void;
  removeFavorite: (recipeId: number) => void;
  isFavorite: (recipeId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    // Load favorites from localStorage when the component mounts
    const storedFavorites = getFavorites();
    setFavorites(storedFavorites);
  }, []);

  const addFavorite = (recipeId: number) => {
    const updatedFavorites = addFavToStorage(recipeId);
    setFavorites(updatedFavorites);
  };

  const removeFavorite = (recipeId: number) => {
    const updatedFavorites = removeFavFromStorage(recipeId);
    setFavorites(updatedFavorites);
  };

  const isFavorite = (recipeId: number) => {
    return favorites.includes(recipeId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
