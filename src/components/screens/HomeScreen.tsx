import React from 'react';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ProgressStats } from '@/components/ProgressStats';
import { ClassCard } from '@/components/ClassCard';
import { classesData } from '@/data/learningContent';
import { useProgress } from '@/hooks/useProgress';
import { 
  Sparkles, 
  BookOpen, 
  Mic, 
  Wifi, 
  WifiOff,
  Info 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HomeScreenProps {
  isTamil: boolean;
  onToggleLanguage: () => void;
  onSelectClass: (classId: number) => void;
  onOpenMood: () => void;
  onOpenProgress: () => void;
  onOpenAbout: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  isTamil,
  onToggleLanguage,
  onSelectClass,
  onOpenMood,
  onOpenProgress,
  onOpenAbout
}) => {
  const { getOverallProgress } = useProgress();
  const stats = getOverallProgress();

  const features = [
    {
      icon: Mic,
      label: isTamil ? 'குரல் ஆதரவு' : 'Voice Support',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: WifiOff,
      label: isTamil ? 'இணையமின்றி' : 'Works Offline',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Sparkles,
      label: isTamil ? 'மனநிலை அடிப்படை' : 'Mood Based',
      color: 'bg-pink-100 text-pink-600'
    }
  ];

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-button">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground leading-tight">
                {isTamil ? 'புத்திசாலி கற்றல்' : 'Smart Learn'}
              </h1>
              <p className="text-xs text-muted-foreground">
                {isTamil ? 'மனநிலை அடிப்படை' : 'Mood-Based'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle isTamil={isTamil} onToggle={onToggleLanguage} />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onOpenAbout}
              className="text-muted-foreground"
            >
              <Info className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <section className="text-center py-8 animate-fade-in">
          <h2 className={cn(
            'text-3xl md:text-4xl font-bold text-foreground mb-3',
            isTamil && 'text-2xl md:text-3xl'
          )}>
            {isTamil ? 'வணக்கம்! கற்கத் தயாரா?' : 'Hello! Ready to Learn?'}
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            {isTamil 
              ? 'உங்கள் மனநிலைக்கு ஏற்ப தனிப்பயனாக்கப்பட்ட பாடங்கள்'
              : 'Personalized lessons based on your mood'}
          </p>

          {/* Feature badges */}
          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            {features.map((feature, i) => (
              <div
                key={i}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium',
                  feature.color
                )}
              >
                <feature.icon className="w-4 h-4" />
                {feature.label}
              </div>
            ))}
          </div>

          {/* Mood Detection CTA */}
          <Button 
            size="lg" 
            onClick={onOpenMood}
            className="mt-8 gap-2 animate-bounce-soft"
          >
            <Sparkles className="w-5 h-5" />
            {isTamil ? 'மனநிலை கண்டறிதல்' : 'Detect Your Mood'}
          </Button>
        </section>

        {/* Progress Stats */}
        {stats.totalCompleted > 0 && (
          <section className="animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-foreground">
                {isTamil ? 'உங்கள் முன்னேற்றம்' : 'Your Progress'}
              </h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onOpenProgress}
              >
                {isTamil ? 'மேலும் பார்க்க' : 'View All'}
              </Button>
            </div>
            <ProgressStats
              totalCompleted={stats.totalCompleted}
              averageScore={stats.averageScore}
              totalTimeSpent={stats.totalTimeSpent}
              streak={stats.streak}
              isTamil={isTamil}
            />
          </section>
        )}

        {/* Class Selection */}
        <section>
          <h3 className="font-bold text-lg text-foreground mb-4">
            {isTamil ? 'உங்கள் வகுப்பைத் தேர்ந்தெடுக்கவும்' : 'Select Your Class'}
          </h3>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {classesData.map((classData, index) => (
              <div 
                key={classData.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ClassCard
                  classNumber={classData.id}
                  nameTamil={classData.nameTamil}
                  isTamil={isTamil}
                  onClick={() => onSelectClass(classData.id)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-muted-foreground text-sm">
          <p>
            {isTamil 
              ? '© 2024 புத்திசாலி கற்றல் செயலி - அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை'
              : '© 2024 Smart Learning App - All rights reserved'}
          </p>
        </footer>
      </main>
    </div>
  );
};
