
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApiKey } from '@/context/ApiKeyContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key } from 'lucide-react';

interface ApiKeyModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ open, setOpen }) => {
  const { apiKey, setApiKey, clearApiKey } = useApiKey();
  const [inputApiKey, setInputApiKey] = useState(apiKey || '');

  const handleSave = () => {
    if (inputApiKey.trim()) {
      setApiKey(inputApiKey);
      setOpen(false);
    }
  };

  const handleClear = () => {
    clearApiKey();
    setInputApiKey('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key size={16} className="text-recipe-primary" />
            Spoonacular API Key
          </DialogTitle>
          <DialogDescription>
            Enter your Spoonacular API key to use this application. 
            You can get a free API key from{' '}
            <a 
              href="https://spoonacular.com/food-api/console#Dashboard" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-recipe-primary hover:underline"
            >
              spoonacular.com
            </a>
          </DialogDescription>
        </DialogHeader>
        
        <Alert variant="outline" className="bg-amber-50 border-amber-200">
          <AlertDescription className="text-amber-800 text-sm">
            This API key will be stored only in your browser's local storage and not sent anywhere else.
          </AlertDescription>
        </Alert>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apiKey" className="text-right">
              API Key
            </Label>
            <Input
              id="apiKey"
              type="text"
              value={inputApiKey}
              onChange={(e) => setInputApiKey(e.target.value)}
              placeholder="Enter your Spoonacular API key"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClear}
            className="border-recipe-primary text-recipe-primary hover:bg-recipe-primary hover:text-white"
          >
            Clear Key
          </Button>
          <Button type="submit" onClick={handleSave} className="bg-recipe-primary hover:bg-recipe-primary/90">
            Save Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
