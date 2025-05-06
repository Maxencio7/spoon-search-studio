
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Filter } from 'lucide-react';
import { DietsFilter, IntolerancesFilter } from '@/types';

interface FiltersProps {
  diets: DietsFilter;
  intolerances: IntolerancesFilter;
  setDiets: React.Dispatch<React.SetStateAction<DietsFilter>>;
  setIntolerances: React.Dispatch<React.SetStateAction<IntolerancesFilter>>;
  applyFilters: () => void;
  resetFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  diets,
  intolerances,
  setDiets,
  setIntolerances,
  applyFilters,
  resetFilters
}) => {
  const handleDietChange = (diet: keyof DietsFilter) => {
    setDiets(prev => ({ ...prev, [diet]: !prev[diet] }));
  };

  const handleIntoleranceChange = (intolerance: keyof IntolerancesFilter) => {
    setIntolerances(prev => ({ ...prev, [intolerance]: !prev[intolerance] }));
  };

  const activeFiltersCount = () => {
    const dietCount = Object.values(diets).filter(Boolean).length;
    const intoleranceCount = Object.values(intolerances).filter(Boolean).length;
    return dietCount + intoleranceCount;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={16} />
          <span>Filters</span>
          {activeFiltersCount() > 0 && (
            <span className="ml-1 h-5 w-5 rounded-full bg-recipe-primary text-xs flex items-center justify-center text-white">
              {activeFiltersCount()}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-4" align="end">
        <div className="space-y-4">
          <h4 className="font-medium">Dietary Preferences</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="gluten_free" 
                checked={diets.gluten_free}
                onCheckedChange={() => handleDietChange('gluten_free')}
              />
              <Label htmlFor="gluten_free">Gluten-Free</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="ketogenic" 
                checked={diets.ketogenic}
                onCheckedChange={() => handleDietChange('ketogenic')}
              />
              <Label htmlFor="ketogenic">Ketogenic</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="vegetarian" 
                checked={diets.vegetarian}
                onCheckedChange={() => handleDietChange('vegetarian')}
              />
              <Label htmlFor="vegetarian">Vegetarian</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="vegan" 
                checked={diets.vegan}
                onCheckedChange={() => handleDietChange('vegan')}
              />
              <Label htmlFor="vegan">Vegan</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="pescetarian" 
                checked={diets.pescetarian}
                onCheckedChange={() => handleDietChange('pescetarian')}
              />
              <Label htmlFor="pescetarian">Pescetarian</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="paleo" 
                checked={diets.paleo}
                onCheckedChange={() => handleDietChange('paleo')}
              />
              <Label htmlFor="paleo">Paleo</Label>
            </div>
          </div>
          
          <Separator className="my-2" />
          
          <h4 className="font-medium">Allergies & Intolerances</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="dairy" 
                checked={intolerances.dairy}
                onCheckedChange={() => handleIntoleranceChange('dairy')}
              />
              <Label htmlFor="dairy">Dairy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="egg" 
                checked={intolerances.egg}
                onCheckedChange={() => handleIntoleranceChange('egg')}
              />
              <Label htmlFor="egg">Egg</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="gluten" 
                checked={intolerances.gluten}
                onCheckedChange={() => handleIntoleranceChange('gluten')}
              />
              <Label htmlFor="gluten">Gluten</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="peanut" 
                checked={intolerances.peanut}
                onCheckedChange={() => handleIntoleranceChange('peanut')}
              />
              <Label htmlFor="peanut">Peanut</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="seafood" 
                checked={intolerances.seafood}
                onCheckedChange={() => handleIntoleranceChange('seafood')}
              />
              <Label htmlFor="seafood">Seafood</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="shellfish" 
                checked={intolerances.shellfish}
                onCheckedChange={() => handleIntoleranceChange('shellfish')}
              />
              <Label htmlFor="shellfish">Shellfish</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="soy" 
                checked={intolerances.soy}
                onCheckedChange={() => handleIntoleranceChange('soy')}
              />
              <Label htmlFor="soy">Soy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="tree_nut" 
                checked={intolerances.tree_nut}
                onCheckedChange={() => handleIntoleranceChange('tree_nut')}
              />
              <Label htmlFor="tree_nut">Tree Nuts</Label>
            </div>
          </div>
          
          <div className="pt-2 flex justify-between">
            <Button 
              variant="outline" 
              onClick={resetFilters} 
              size="sm"
            >
              Reset
            </Button>
            <Button 
              onClick={applyFilters} 
              className="bg-recipe-primary hover:bg-recipe-primary/90" 
              size="sm"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Filters;
