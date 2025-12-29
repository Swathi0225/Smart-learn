import React from 'react';
import { cn } from '@/lib/utils';
import { Lesson } from '@/data/learningContent';
import { BookOpen, CheckCircle2, Lock, PlayCircle } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  isTamil: boolean;
  isCompleted: boolean;
  isLocked: boolean;
  quizScore?: number | null;
  onClick: () => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  index,
  isTamil,
  isCompleted,
  isLocked,
  quizScore,
  onClick
}) => {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    hard: 'bg-red-100 text-red-700 border-red-200'
  };

  const difficultyLabels = {
    easy: { en: 'Easy', ta: 'எளிது' },
    medium: { en: 'Medium', ta: 'நடுத்தரம்' },
    hard: { en: 'Hard', ta: 'கடினம்' }
  };

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={cn(
        'group relative w-full text-left rounded-xl p-4 transition-all duration-300',
        'border-2 border-transparent',
        isLocked 
          ? 'bg-muted/50 cursor-not-allowed opacity-60' 
          : 'bg-card shadow-soft hover:shadow-card hover:border-primary/20',
        isCompleted && 'border-mood-stressed/30 bg-mood-stressed/5',
        !isLocked && 'hover:scale-[1.01]'
      )}
    >
      <div className="flex items-center gap-4">
        {/* Index circle */}
        <div className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0',
          isCompleted 
            ? 'bg-mood-stressed text-primary-foreground' 
            : isLocked 
              ? 'bg-muted text-muted-foreground'
              : 'bg-primary/10 text-primary'
        )}>
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : isLocked ? (
            <Lock className="w-4 h-4" />
          ) : (
            index + 1
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-card-foreground truncate">
            {isTamil ? lesson.titleTamil : lesson.title}
          </h4>
          
          <div className="flex items-center gap-2 mt-1">
            <span className={cn(
              'text-xs px-2 py-0.5 rounded-full border',
              difficultyColors[lesson.difficulty]
            )}>
              {isTamil 
                ? difficultyLabels[lesson.difficulty].ta 
                : difficultyLabels[lesson.difficulty].en}
            </span>
            
            {quizScore !== null && quizScore !== undefined && (
              <span className="text-xs text-muted-foreground">
                {isTamil ? 'மதிப்பெண்:' : 'Score:'} {quizScore}%
              </span>
            )}
          </div>
        </div>

        {/* Action icon */}
        <div className={cn(
          'flex-shrink-0 transition-transform',
          !isLocked && 'group-hover:translate-x-1'
        )}>
          {isLocked ? (
            <Lock className="w-5 h-5 text-muted-foreground" />
          ) : isCompleted ? (
            <BookOpen className="w-5 h-5 text-mood-stressed" />
          ) : (
            <PlayCircle className="w-5 h-5 text-primary" />
          )}
        </div>
      </div>
    </button>
  );
};
