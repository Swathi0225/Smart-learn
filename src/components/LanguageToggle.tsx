import React from 'react';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  isTamil: boolean;
  onToggle: () => void;
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  isTamil,
  onToggle,
  className
}) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggle}
      className={cn(
        'gap-2 font-semibold transition-all duration-300',
        'hover:scale-105',
        className
      )}
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm">
        {isTamil ? 'English' : 'தமிழ்'}
      </span>
    </Button>
  );
};
