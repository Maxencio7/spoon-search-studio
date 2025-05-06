
export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  summary?: string;
  sourceUrl?: string;
  diets?: string[];
  dishTypes?: string[];
}

export interface SearchParams {
  query: string;
  cuisine?: string;
  diet?: string;
  intolerances?: string;
  includeIngredients?: string;
  excludeIngredients?: string;
  type?: string;
  number?: number; // number of results
  offset?: number; // pagination
}

export interface SearchResult {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface DietsFilter {
  gluten_free: boolean;
  ketogenic: boolean;
  vegetarian: boolean;
  vegan: boolean;
  pescetarian: boolean;
  paleo: boolean;
}

export interface IntolerancesFilter {
  dairy: boolean;
  egg: boolean;
  gluten: boolean;
  grain: boolean;
  peanut: boolean;
  seafood: boolean;
  sesame: boolean;
  shellfish: boolean;
  soy: boolean;
  sulfite: boolean;
  tree_nut: boolean;
  wheat: boolean;
}
