
import { Recipe, SearchParams, SearchResult } from "../types";

const BASE_URL = 'https://api.spoonacular.com';

export const searchRecipes = async (
  apiKey: string,
  params: SearchParams
): Promise<SearchResult> => {
  const queryParams = new URLSearchParams();
  
  // Add required API key
  queryParams.append('apiKey', apiKey);
  
  // Add all search parameters that are defined
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      queryParams.append(key, value.toString());
    }
  });
  
  const response = await fetch(`${BASE_URL}/recipes/complexSearch?${queryParams.toString()}`);
  
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Invalid API key. Please check your API key and try again.');
    }
    if (response.status === 402) {
      throw new Error('API quota exceeded. Please try again tomorrow or upgrade your API plan.');
    }
    throw new Error('Failed to fetch recipes. Please try again later.');
  }
  
  return await response.json();
};

export const getRecipeById = async (
  apiKey: string,
  recipeId: number
): Promise<Recipe> => {
  const response = await fetch(
    `${BASE_URL}/recipes/${recipeId}/information?apiKey=${apiKey}`
  );
  
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Invalid API key. Please check your API key and try again.');
    }
    throw new Error('Failed to fetch recipe details. Please try again later.');
  }
  
  return await response.json();
};

export const getRecipesByIds = async (
  apiKey: string,
  ids: number[]
): Promise<Recipe[]> => {
  if (ids.length === 0) return [];
  
  const response = await fetch(
    `${BASE_URL}/recipes/informationBulk?ids=${ids.join(',')}&apiKey=${apiKey}`
  );
  
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Invalid API key. Please check your API key and try again.');
    }
    throw new Error('Failed to fetch recipe details. Please try again later.');
  }
  
  return await response.json();
};
