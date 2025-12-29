import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Lesson } from '@/data/learningContent';
import { useTTS } from '@/hooks/useTTS';
import { ArrowLeft, ArrowRight, Volume2, VolumeX, BookCheck, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonViewerProps {
  lesson: Lesson;
  isTamil: boolean;
  isCompleted: boolean;
  currentIndex: number;
  totalLessons: number;
  hasPrevious: boolean;
  hasNext: boolean;
  onBack: () => void;
  onComplete: () => void;
  onTakeQuiz: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  isTamil,
  isCompleted,
  currentIndex,
  totalLessons,
  hasPrevious,
  hasNext,
  onBack,
  onComplete,
  onTakeQuiz,
  onPrevious,
  onNext
}) => {
  const { speak, stop, isSpeaking, toggle } = useTTS();
  const content = isTamil ? lesson.contentTamil : lesson.content;
  const title = isTamil ? lesson.titleTamil : lesson.title;

  useEffect(() => {
    return () => stop();
  }, [stop]);

  // Stop TTS when lesson changes
  useEffect(() => {
    stop();
  }, [lesson.id, stop]);

  const handleListen = () => {
    toggle(content, isTamil);
  };

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    hard: 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack}
          className="flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-foreground truncate">
            {title}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className={cn(
              'text-xs px-2 py-0.5 rounded-full border',
              difficultyColors[lesson.difficulty]
            )}>
              {lesson.difficulty}
            </span>
            {isCompleted && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-mood-stressed/10 text-mood-stressed border border-mood-stressed/20">
                ✓ {isTamil ? 'முடிந்தது' : 'Completed'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Lesson Progress Indicator */}
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-sm text-muted-foreground">
          {isTamil ? `பாடம் ${currentIndex + 1} / ${totalLessons}` : `Lesson ${currentIndex + 1} of ${totalLessons}`}
        </span>
        <div className="flex-1 mx-4 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalLessons) * 100}%` }}
          />
        </div>
      </div>

      {/* Content Card */}
      <div className="flex-1 bg-card rounded-2xl shadow-card p-6 mb-4 overflow-auto">
        {/* Listen Button */}
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleListen}
            className={cn(
              'gap-2 transition-all',
              isSpeaking && 'bg-primary text-primary-foreground'
            )}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4" />
                {isTamil ? 'நிறுத்து' : 'Stop'}
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                {isTamil ? 'கேளுங்கள்' : 'Listen'}
              </>
            )}
          </Button>
        </div>

        {/* Lesson Content */}
        <div className="prose prose-lg max-w-none">
          <p className={cn(
            'text-lg leading-relaxed text-card-foreground',
            isTamil && 'text-xl'
          )}>
            {content}
          </p>
        </div>

        {/* Decorative elements */}
        <div className="mt-8 flex justify-center">
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-2 h-2 rounded-full',
                  i === 1 ? 'bg-primary' : 'bg-primary/30'
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons (Previous / Next) */}
      <div className="flex gap-3 mb-4">
        <Button
          variant="outline"
          className="flex-1 gap-2"
          onClick={onPrevious}
          disabled={!hasPrevious}
        >
          <ChevronLeft className="w-5 h-5" />
          {isTamil ? 'முந்தைய பாடம்' : 'Previous'}
        </Button>
        
        <Button
          variant="outline"
          className="flex-1 gap-2"
          onClick={onNext}
          disabled={!hasNext}
        >
          {isTamil ? 'அடுத்த பாடம்' : 'Next'}
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {!isCompleted && (
          <Button
            variant="default"
            className="flex-1 gap-2"
            onClick={onComplete}
          >
            <BookCheck className="w-5 h-5" />
            {isTamil ? 'முடித்தேன்' : 'Mark Complete'}
          </Button>
        )}
        
        <Button
          variant={isCompleted ? 'default' : 'secondary'}
          className="flex-1 gap-2"
          onClick={onTakeQuiz}
        >
          <HelpCircle className="w-5 h-5" />
          {isTamil ? 'வினாடி வினா' : 'Take Quiz'}
        </Button>
      </div>
    </div>
  );
};
