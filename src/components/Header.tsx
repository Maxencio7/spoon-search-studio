
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Key } from 'lucide-react';
import ApiKeyModal from './ApiKeyModal';
import { useApiKey } from '@/context/ApiKeyContext';

interface HeaderProps {
  activeTab: 'search' | 'favorites';
  setActiveTab: (tab: 'search' | 'favorites') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const { isApiKeySet } = useApiKey();

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-recipe-primary">Spoon Search</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex space-x-1">
            <Button
              variant={activeTab === 'search' ? 'default' : 'outline'}
              onClick={() => setActiveTab('search')}
              className={activeTab === 'search' ? 'bg-recipe-primary text-white' : 'text-recipe-text'}
            >
              Search
            </Button>
            <Button
              variant={activeTab === 'favorites' ? 'default' : 'outline'}
              onClick={() => setActiveTab('favorites')}
              className={activeTab === 'favorites' ? 'bg-recipe-primary text-white' : 'text-recipe-text'}
            >
              Favorites
            </Button>
          </div>
          
          <Button
            variant="outline"
            onClick={() => setApiKeyModalOpen(true)}
            className="border-recipe-primary ml-2"
            title="API Key Settings"
          >
            <Key size={16} className={isApiKeySet ? "text-green-500" : "text-recipe-primary"} />
            <span className="sr-only">API Key Settings</span>
          </Button>
        </div>
      </div>
      
      <div className="md:hidden container mx-auto px-4 pb-2">
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'search' ? 'default' : 'outline'}
            onClick={() => setActiveTab('search')}
            className={`flex-1 ${activeTab === 'search' ? 'bg-recipe-primary text-white' : 'text-recipe-text'}`}
          >
            Search
          </Button>
          <Button
            variant={activeTab === 'favorites' ? 'default' : 'outline'}
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 ${activeTab === 'favorites' ? 'bg-recipe-primary text-white' : 'text-recipe-text'}`}
          >
            Favorites
          </Button>
        </div>
      </div>
      
      <ApiKeyModal open={apiKeyModalOpen} setOpen={setApiKeyModalOpen} />
    </header>
  );
};

export default Header;
