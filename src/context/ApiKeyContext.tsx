
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getApiKey, saveApiKey } from '@/lib/localStorage';
import { toast } from '@/components/ui/use-toast';

interface ApiKeyContextType {
  apiKey: string | null;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
  isApiKeySet: boolean;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiKey, setApiKeyState] = useState<string | null>(null);

  useEffect(() => {
    // Load API key from localStorage when the component mounts
    const storedApiKey = getApiKey();
    setApiKeyState(storedApiKey);
  }, []);

  const setApiKey = (key: string) => {
    if (key && key.trim()) {
      saveApiKey(key.trim());
      setApiKeyState(key.trim());
      toast({
        title: "API Key Set",
        description: "Your Spoonacular API key has been saved.",
      });
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('spoonacular-api-key');
    setApiKeyState(null);
    toast({
      title: "API Key Removed",
      description: "Your Spoonacular API key has been removed.",
      variant: "destructive"
    });
  };

  return (
    <ApiKeyContext.Provider value={{
      apiKey,
      setApiKey,
      clearApiKey,
      isApiKeySet: !!apiKey
    }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = (): ApiKeyContextType => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
};
