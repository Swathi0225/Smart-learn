import React from 'react';
import { cn } from '@/lib/utils';
import { Subject } from '@/data/learningContent';
import { CheckCircle2 } from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
  isTamil: boolean;
  completedLessons?: number;
  totalLessons?: number;
  onClick: () => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  isTamil,
  completedLessons = 0,
  totalLessons = 0,
  onClick
}) => {
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  const isComplete = progress === 100;

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-2xl p-5 w-full text-left',
        'bg-card shadow-card transition-all duration-300',
        'hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'border border-border/50'
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          'w-14 h-14 rounded-xl flex items-center justify-center text-2xl',
          'bg-gradient-to-br shadow-md transition-transform group-hover:scale-110',
          subject.color
        )}>
          {subject.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-card-foreground truncate">
              {isTamil ? subject.nameTamil : subject.name}
            </h3>
            {isComplete && (
              <CheckCircle2 className="w-5 h-5 text-mood-stressed flex-shrink-0" />
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mt-1">
            {subject.chapters.length} {isTamil ? 'அத்தியாயங்கள்' : 'chapters'}
          </p>
          
          {totalLessons > 0 && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{completedLessons}/{totalLessons}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
};
