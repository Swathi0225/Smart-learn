import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Brain, Mic, WifiOff, Smartphone, Users, Code, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AboutScreenProps {
  isTamil: boolean;
  onBack: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({
  isTamil,
  onBack
}) => {
  const features = [
    {
      icon: Brain,
      title: isTamil ? 'மனநிலை கண்டறிதல்' : 'Mood Detection',
      description: isTamil 
        ? 'OpenCV மற்றும் DeepFace பயன்படுத்தி மாணவர் மனநிலையை கண்டறிகிறது'
        : 'Uses OpenCV and DeepFace to detect student mood'
    },
    {
      icon: Mic,
      title: isTamil ? 'குரல் அங்கீகாரம்' : 'Voice Recognition',
      description: isTamil
        ? 'Vosk பயன்படுத்தி ஆஃப்லைன் குரல் அங்கீகாரம்'
        : 'Offline voice recognition using Vosk'
    },
    {
      icon: WifiOff,
      title: isTamil ? 'ஆஃப்லைன் ஆதரவு' : 'Offline Support',
      description: isTamil
        ? 'இணைய இணைப்பு இல்லாமலும் செயல்படும்'
        : 'Works without internet connection'
    },
    {
      icon: BookOpen,
      title: isTamil ? 'தமிழ் ஆதரவு' : 'Tamil Support',
      description: isTamil
        ? 'முழு தமிழ் மொழி ஆதரவு மற்றும் TTS'
        : 'Full Tamil language support with TTS'
    },
    {
      icon: Smartphone,
      title: isTamil ? 'மொபைல் நட்பு' : 'Mobile Friendly',
      description: isTamil
        ? 'அனைத்து சாதனங்களிலும் சிறப்பாக செயல்படும்'
        : 'Works great on all devices'
    }
  ];

  const teamMembers = [
    { name: 'Student 1', role: isTamil ? 'UI வடிவமைப்பு' : 'UI Design' },
    { name: 'Student 2', role: isTamil ? 'முகநூல் தர்க்கம்' : 'Frontend Logic' },
    { name: 'Student 3', role: isTamil ? 'உள்ளடக்கம்' : 'Content' },
    { name: 'Student 4', role: isTamil ? 'சோதனை' : 'Testing' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-bold text-foreground ml-3">
            {isTamil ? 'பற்றி' : 'About'}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* App Info */}
        <section className="text-center animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-2xl gradient-primary flex items-center justify-center shadow-button mb-4">
            <BookOpen className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            {isTamil ? 'புத்திசாலி கற்றல்' : 'Smart Learning'}
          </h2>
          <p className="text-muted-foreground mt-1">
            {isTamil 
              ? 'மனநிலை அடிப்படையிலான புத்திசாலி கற்றல் செயலி'
              : 'Mood-Based Smart Learning App'}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {isTamil ? 'பதிப்பு 1.0.0' : 'Version 1.0.0'}
          </p>
        </section>

        {/* Project Description */}
        <section className="bg-card rounded-2xl shadow-card p-6">
          <h3 className="font-bold text-lg text-foreground mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            {isTamil ? 'திட்ட விளக்கம்' : 'Project Description'}
          </h3>
          <p className={cn(
            'text-muted-foreground leading-relaxed',
            isTamil && 'text-lg'
          )}>
            {isTamil
              ? 'இந்த செயலி மாணவர்களின் மனநிலையை கண்டறிந்து அதற்கேற்ப தனிப்பயனாக்கப்பட்ட கற்றல் அனுபவத்தை வழங்குகிறது. 1 முதல் 12 வகுப்பு வரையிலான மாணவர்களுக்கு தமிழ், ஆங்கிலம், கணிதம், அறிவியல், சமூக அறிவியல் பாடங்கள் உள்ளடக்கியது.'
              : 'This application detects students\' mood and provides personalized learning experience accordingly. It covers Tamil, English, Mathematics, Science, and Social Science subjects for students from Class 1 to 12.'}
          </p>
        </section>

        {/* Features */}
        <section>
          <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-secondary" />
            {isTamil ? 'முக்கிய அம்சங்கள்' : 'Key Features'}
          </h3>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-4 p-4 rounded-xl bg-card shadow-soft',
                  'animate-fade-in'
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            {isTamil ? 'குழு உறுப்பினர்கள்' : 'Team Members'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-card shadow-soft text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl mb-2">
                  👤
                </div>
                <h4 className="font-semibold text-foreground text-sm">{member.name}</h4>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="bg-card rounded-2xl shadow-card p-6">
          <h3 className="font-bold text-lg text-foreground mb-3">
            {isTamil ? 'கட்டமைப்பு' : 'Architecture'}
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• <strong>Frontend:</strong> React, TypeScript, Tailwind CSS</p>
            <p>• <strong>Storage:</strong> LocalStorage / IndexedDB</p>
            <p>• <strong>Voice:</strong> Web Speech API (TTS)</p>
            <p>• <strong>Mood Detection:</strong> Camera API + ML Model</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 text-muted-foreground text-sm">
          <p>
            {isTamil 
              ? 'கல்லூரி மினி திட்டம் - 2024'
              : 'College Mini Project - 2024'}
          </p>
        </footer>
      </main>
    </div>
  );
};
