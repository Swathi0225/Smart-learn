import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuizQuestion } from '@/data/learningContent';
import { useTTS } from '@/hooks/useTTS';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Volume2,
  Trophy,
  RotateCcw 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface QuizViewProps {
  questions: QuizQuestion[];
  lessonTitle: string;
  isTamil: boolean;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  lessonTitle,
  isTamil,
  onBack,
  onComplete
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [isComplete, setIsComplete] = useState(false);
  
  const { speak } = useTTS();
  
  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedAnswer;
    setAnswers(newAnswers);
    setShowResult(true);

    // Read feedback
    if (isCorrect) {
      speak(isTamil ? 'சரி! நல்ல வேலை!' : 'Correct! Great job!', isTamil);
    } else {
      speak(isTamil ? 'தவறு. மீண்டும் முயற்சி செய்யுங்கள்.' : 'Incorrect. Try again next time.', isTamil);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Calculate score
      const correctCount = answers.filter(
        (a, i) => a === questions[i].correctAnswer
      ).length + (isCorrect ? 1 : 0);
      const score = Math.round((correctCount / questions.length) * 100);
      
      setIsComplete(true);
      
      if (score >= 70) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      
      onComplete(score);
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers(new Array(questions.length).fill(null));
    setIsComplete(false);
  };

  const handleListenQuestion = () => {
    const text = isTamil ? currentQuestion.questionTamil : currentQuestion.question;
    speak(text, isTamil);
  };

  // Calculate final score
  const correctAnswers = answers.filter(
    (a, i) => a === questions[i].correctAnswer
  ).length + (showResult && isCorrect ? 1 : 0);
  const finalScore = Math.round((correctAnswers / questions.length) * 100);

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 animate-scale-in">
        <div className={cn(
          'w-24 h-24 rounded-full flex items-center justify-center mb-6',
          finalScore >= 70 
            ? 'bg-mood-stressed text-primary-foreground' 
            : 'bg-secondary text-secondary-foreground'
        )}>
          <Trophy className="w-12 h-12" />
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {isTamil ? 'வினாடி வினா முடிந்தது!' : 'Quiz Complete!'}
        </h2>
        
        <p className="text-lg text-muted-foreground mb-4">
          {lessonTitle}
        </p>

        <div className="text-5xl font-bold text-primary mb-4">
          {finalScore}%
        </div>

        <p className="text-lg text-foreground mb-8">
          {finalScore >= 80 
            ? (isTamil ? 'அருமை!' : 'Excellent!') 
            : finalScore >= 60 
              ? (isTamil ? 'நல்ல வேலை!' : 'Good Job!') 
              : (isTamil ? 'பயிற்சியைத் தொடருங்கள்!' : 'Keep Practicing!')}
        </p>

        <div className="flex gap-4">
          <Button variant="outline" onClick={handleRetake} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            {isTamil ? 'மீண்டும் எழுது' : 'Retake'}
          </Button>
          <Button onClick={onBack} className="gap-2">
            {isTamil ? 'தொடர்' : 'Continue'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground">
            {isTamil ? 'வினாடி வினா' : 'Quiz'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {currentIndex + 1} / {questions.length}
          </p>
        </div>

        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleListenQuestion}
        >
          <Volume2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-muted rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col">
        <div className="bg-card rounded-2xl shadow-card p-6 mb-6">
          <h2 className={cn(
            'text-lg font-semibold text-card-foreground',
            isTamil && 'text-xl'
          )}>
            {isTamil ? currentQuestion.questionTamil : currentQuestion.question}
          </h2>
        </div>

        {/* Options */}
        <div className="flex-1 space-y-3">
          {(isTamil ? currentQuestion.optionsTamil : currentQuestion.options).map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === currentQuestion.correctAnswer;
            
            let optionClass = 'bg-card border-border hover:border-primary/50';
            
            if (showResult) {
              if (isCorrectAnswer) {
                optionClass = 'bg-mood-stressed/10 border-mood-stressed text-mood-stressed';
              } else if (isSelected && !isCorrectAnswer) {
                optionClass = 'bg-destructive/10 border-destructive text-destructive';
              }
            } else if (isSelected) {
              optionClass = 'bg-primary/10 border-primary text-primary';
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showResult}
                className={cn(
                  'w-full p-4 rounded-xl border-2 text-left transition-all',
                  'flex items-center gap-3',
                  optionClass,
                  !showResult && !isSelected && 'hover:scale-[1.01]'
                )}
              >
                <span className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
                  isSelected || (showResult && isCorrectAnswer)
                    ? 'bg-current text-card'
                    : 'bg-muted text-muted-foreground'
                )}>
                  {showResult && isCorrectAnswer ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : showResult && isSelected ? (
                    <XCircle className="w-5 h-5" />
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </span>
                <span className="flex-1 font-medium">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className={cn(
            'mt-4 p-4 rounded-xl animate-slide-up',
            isCorrect ? 'bg-mood-stressed/10' : 'bg-destructive/10'
          )}>
            <p className={cn(
              'text-sm',
              isCorrect ? 'text-mood-stressed' : 'text-destructive'
            )}>
              {isTamil ? currentQuestion.explanationTamil : currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="mt-6">
        {!showResult ? (
          <Button 
            className="w-full" 
            size="lg"
            disabled={selectedAnswer === null}
            onClick={handleSubmit}
          >
            {isTamil ? 'சமர்ப்பி' : 'Submit'}
          </Button>
        ) : (
          <Button 
            className="w-full gap-2" 
            size="lg"
            onClick={handleNext}
          >
            {currentIndex < questions.length - 1 ? (
              <>
                {isTamil ? 'அடுத்து' : 'Next'}
                <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              isTamil ? 'முடிக்கவும்' : 'Finish'
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
