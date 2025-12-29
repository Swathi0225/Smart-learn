import React from 'react';
import { Button } from '@/components/ui/button';
import { MoodDetector } from '@/components/MoodDetector';
import { MoodIcon } from '@/components/MoodIcon';
import { Mood } from '@/hooks/useMoodDetection';
import { getMoodSuggestion } from '@/data/learningContent';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MoodScreenProps {
  isTamil: boolean;
  onBack: () => void;
  onContinue: (mood: Mood | null) => void;
}

export const MoodScreen: React.FC<MoodScreenProps> = ({
  isTamil,
  onBack,
  onContinue
}) => {
  const [detectedMood, setDetectedMood] = React.useState<Mood | null>(null);
  const [showSuggestion, setShowSuggestion] = React.useState(false);

  const handleMoodDetected = (mood: Mood) => {
    setDetectedMood(mood);
    setShowSuggestion(true);
  };

  const handleSkip = () => {
    onContinue(null);
  };

  const handleContinue = () => {
    onContinue(detectedMood);
  };

  const moodColors = {
    happy: 'from-mood-happy to-yellow-400',
    bored: 'from-mood-bored to-purple-400',
    stressed: 'from-mood-stressed to-teal-400',
    neutral: 'from-mood-neutral to-slate-400'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-bold text-foreground ml-3">
            {isTamil ? 'மனநிலை கண்டறிதல்' : 'Mood Detection'}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!showSuggestion ? (
          <MoodDetector
            isTamil={isTamil}
            onMoodDetected={handleMoodDetected}
            onSkip={handleSkip}
          />
        ) : (
          <div className="max-w-md mx-auto text-center animate-scale-in">
            {/* Mood Result */}
            <div className={cn(
              'relative p-8 rounded-3xl mb-8',
              'bg-gradient-to-br',
              detectedMood && moodColors[detectedMood]
            )}>
              <div className="absolute inset-0 bg-background/30 rounded-3xl backdrop-blur-sm" />
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <MoodIcon mood={detectedMood!} size="lg" animated />
                </div>
                <h2 className="text-2xl font-bold text-primary-foreground mb-2">
                  {isTamil 
                    ? detectedMood === 'happy' ? 'மகிழ்ச்சி!'
                      : detectedMood === 'bored' ? 'சலிப்பு'
                      : detectedMood === 'stressed' ? 'அழுத்தம்'
                      : 'நடுநிலை'
                    : detectedMood === 'happy' ? 'Happy!'
                      : detectedMood === 'bored' ? 'Bored'
                      : detectedMood === 'stressed' ? 'Stressed'
                      : 'Neutral'}
                </h2>
              </div>
            </div>

            {/* Suggestion */}
            <div className="bg-card rounded-2xl shadow-card p-6 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-secondary" />
                <h3 className="font-semibold text-foreground">
                  {isTamil ? 'எங்கள் பரிந்துரை' : 'Our Suggestion'}
                </h3>
              </div>
              <p className={cn(
                'text-muted-foreground',
                isTamil && 'text-lg'
              )}>
                {getMoodSuggestion(detectedMood!, isTamil)}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full gap-2"
                onClick={handleContinue}
              >
                {isTamil ? 'பாடங்களைத் தொடங்கு' : 'Start Learning'}
                <ArrowRight className="w-5 h-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="lg"
                className="w-full"
                onClick={() => setShowSuggestion(false)}
              >
                {isTamil ? 'மீண்டும் கண்டறி' : 'Detect Again'}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
