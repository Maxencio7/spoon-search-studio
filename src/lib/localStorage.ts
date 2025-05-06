
const STORAGE_KEYS = {
  API_KEY: 'spoonacular-api-key',
  FAVORITES: 'spoonacular-favorites'
};

export const getApiKey = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.API_KEY);
};

export const saveApiKey = (apiKey: string): void => {
  localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey);
};

export const clearApiKey = (): void => {
  localStorage.removeItem(STORAGE_KEYS.API_KEY);
};

export const getFavorites = (): number[] => {
  const favoritesJson = localStorage.getItem(STORAGE_KEYS.FAVORITES);
  return favoritesJson ? JSON.parse(favoritesJson) : [];
};

export const addFavorite = (recipeId: number): number[] => {
  const favorites = getFavorites();
  if (!favorites.includes(recipeId)) {
    favorites.push(recipeId);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }
  return favorites;
};

export const removeFavorite = (recipeId: number): number[] => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(id => id !== recipeId);
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
  return updatedFavorites;
};

export const isFavorite = (recipeId: number): boolean => {
  const favorites = getFavorites();
  return favorites.includes(recipeId);
};
