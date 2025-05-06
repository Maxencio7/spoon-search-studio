
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Filters from './Filters';
import { DietsFilter, IntolerancesFilter } from '@/types';

interface SearchBarProps {
  onSearch: (query: string, diets: string[], intolerances: string[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [diets, setDiets] = useState<DietsFilter>({
    gluten_free: false,
    ketogenic: false,
    vegetarian: false,
    vegan: false,
    pescetarian: false,
    paleo: false
  });
  
  const [intolerances, setIntolerances] = useState<IntolerancesFilter>({
    dairy: false,
    egg: false,
    gluten: false,
    grain: false,
    peanut: false,
    seafood: false,
    sesame: false,
    shellfish: false,
    soy: false,
    sulfite: false,
    tree_nut: false,
    wheat: false
  });

  const handleSearch = () => {
    const selectedDiets = Object.entries(diets)
      .filter(([_, isSelected]) => isSelected)
      .map(([diet]) => diet);
      
    const selectedIntolerances = Object.entries(intolerances)
      .filter(([_, isSelected]) => isSelected)
      .map(([intolerance]) => intolerance);
      
    onSearch(query, selectedDiets, selectedIntolerances);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const resetFilters = () => {
    setDiets({
      gluten_free: false,
      ketogenic: false,
      vegetarian: false,
      vegan: false,
      pescetarian: false,
      paleo: false
    });
    
    setIntolerances({
      dairy: false,
      egg: false,
      gluten: false,
      grain: false,
      peanut: false,
      seafood: false,
      sesame: false,
      shellfish: false,
      soy: false,
      sulfite: false,
      tree_nut: false,
      wheat: false
    });
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <div className="flex w-full items-center space-x-2">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Search for recipes or ingredients..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-4 pr-10 py-6 border-2 border-gray-200 focus:border-recipe-primary focus-visible:ring-0 text-base"
          />
        </div>
        <Button 
          onClick={handleSearch} 
          className="bg-recipe-primary hover:bg-recipe-primary/90 p-6"
        >
          <Search className="h-5 w-5 mr-2" />
          Search
        </Button>
      </div>
      
      <div className="flex justify-end">
        <Filters 
          diets={diets}
          intolerances={intolerances}
          setDiets={setDiets}
          setIntolerances={setIntolerances}
          applyFilters={handleSearch}
          resetFilters={resetFilters}
        />
      </div>
    </div>
  );
};

export default SearchBar;
