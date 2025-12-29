import React from 'react';
import { cn } from '@/lib/utils';
import { GraduationCap } from 'lucide-react';

interface ClassCardProps {
  classNumber: number;
  nameTamil: string;
  isTamil: boolean;
  isSelected?: boolean;
  onClick: () => void;
}

export const ClassCard: React.FC<ClassCardProps> = ({
  classNumber,
  nameTamil,
  isTamil,
  isSelected,
  onClick
}) => {
  const colors = [
    'from-red-400 to-red-500',
    'from-orange-400 to-orange-500',
    'from-amber-400 to-amber-500',
    'from-yellow-400 to-yellow-500',
    'from-lime-400 to-lime-500',
    'from-green-400 to-green-500',
    'from-emerald-400 to-emerald-500',
    'from-teal-400 to-teal-500',
    'from-cyan-400 to-cyan-500',
    'from-sky-400 to-sky-500',
    'from-blue-400 to-blue-500',
    'from-indigo-400 to-indigo-500'
  ];

  const colorClass = colors[(classNumber - 1) % colors.length];

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-2xl p-4 transition-all duration-300',
        'bg-gradient-to-br shadow-card hover:shadow-lg',
        'hover:scale-[1.02] hover:-translate-y-1',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        colorClass,
        isSelected && 'ring-4 ring-primary ring-offset-2 scale-[1.02]'
      )}
    >
      <div className="flex flex-col items-center gap-2 text-primary-foreground">
        <div className="relative">
          <GraduationCap className="w-8 h-8 transition-transform group-hover:scale-110" />
          <span className="absolute -top-1 -right-2 bg-background text-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {classNumber}
          </span>
        </div>
        <span className="font-bold text-lg">
          {isTamil ? nameTamil : `Class ${classNumber}`}
        </span>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary-foreground/10 rounded-full" />
      <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary-foreground/10 rounded-full" />
    </button>
  );
};
