import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MoodIcon } from './MoodIcon';
import { useMoodDetection, Mood } from '@/hooks/useMoodDetection';
import { Camera, Loader2, SmilePlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MoodDetectorProps {
  isTamil: boolean;
  onMoodDetected: (mood: Mood) => void;
  onSkip: () => void;
}

export const MoodDetector: React.FC<MoodDetectorProps> = ({
  isTamil,
  onMoodDetected,
  onSkip
}) => {
  const {
    videoRef,
    isDetecting,
    detectedMood,
    error,
    startCamera,
    stopCamera,
    detectMood,
    selectMoodManually
  } = useMoodDetection();

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  useEffect(() => {
    if (detectedMood) {
      const timer = setTimeout(() => {
        onMoodDetected(detectedMood);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [detectedMood, onMoodDetected]);

  const handleDetect = async () => {
    await detectMood();
  };

  const moods: { mood: Mood; label: string; labelTamil: string }[] = [
    { mood: 'happy', label: 'Happy', labelTamil: 'மகிழ்ச்சி' },
    { mood: 'neutral', label: 'Neutral', labelTamil: 'நடுநிலை' },
    { mood: 'bored', label: 'Bored', labelTamil: 'சலிப்பு' },
    { mood: 'stressed', label: 'Stressed', labelTamil: 'அழுத்தம்' }
  ];

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {isTamil ? 'உங்கள் மனநிலை என்ன?' : "How are you feeling?"}
        </h2>
        <p className="text-muted-foreground">
          {isTamil 
            ? 'உங்கள் மனநிலையை கண்டறிந்து சிறந்த பாடங்களை பரிந்துரைக்கிறோம்'
            : 'We detect your mood to suggest the best lessons for you'}
        </p>
      </div>

      {/* Camera Preview */}
      <div className="relative">
        <div className={cn(
          'w-64 h-48 rounded-2xl overflow-hidden bg-muted shadow-lg',
          'border-4 border-primary/20',
          isDetecting && 'animate-pulse'
        )}>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* Overlay when detecting */}
          {isDetecting && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
                <p className="text-sm text-foreground mt-2">
                  {isTamil ? 'கண்டறிகிறது...' : 'Detecting...'}
                </p>
              </div>
            </div>
          )}

          {/* Show detected mood */}
          {detectedMood && !isDetecting && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center animate-scale-in">
              <div className="text-center">
                <MoodIcon mood={detectedMood} size="lg" animated />
                <p className="text-lg font-semibold text-foreground mt-3">
                  {isTamil 
                    ? moods.find(m => m.mood === detectedMood)?.labelTamil
                    : moods.find(m => m.mood === detectedMood)?.label}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Camera frame decorations */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg" />
      </div>

      {error && (
        <p className="text-destructive text-sm text-center max-w-xs">{error}</p>
      )}

      {/* Detect Button */}
      <Button
        size="lg"
        onClick={handleDetect}
        disabled={isDetecting || !!detectedMood}
        className="gap-2"
      >
        <Camera className="w-5 h-5" />
        {isTamil ? 'மனநிலையைக் கண்டறி' : 'Detect Mood'}
      </Button>

      {/* Manual Selection */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-3">
          {isTamil ? 'அல்லது நீங்களே தேர்வு செய்யுங்கள்:' : 'Or select manually:'}
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          {moods.map(({ mood, label, labelTamil }) => (
            <button
              key={mood}
              onClick={() => selectMoodManually(mood)}
              disabled={isDetecting}
              className={cn(
                'flex flex-col items-center gap-1 p-2 rounded-xl transition-all',
                'hover:bg-muted hover:scale-105',
                detectedMood === mood && 'ring-2 ring-primary bg-primary/5'
              )}
            >
              <MoodIcon mood={mood} size="sm" />
              <span className="text-xs font-medium">
                {isTamil ? labelTamil : label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Skip Button */}
      <Button
        variant="ghost"
        onClick={onSkip}
        className="text-muted-foreground"
      >
        <SmilePlus className="w-4 h-4 mr-2" />
        {isTamil ? 'இப்போது தவிர்' : 'Skip for now'}
      </Button>
    </div>
  );
};
