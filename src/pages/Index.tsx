import React, { useState } from 'react';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { SubjectScreen } from '@/components/screens/SubjectScreen';
import { LessonScreen } from '@/components/screens/LessonScreen';
import { MoodScreen } from '@/components/screens/MoodScreen';
import { ProgressScreen } from '@/components/screens/ProgressScreen';
import { AboutScreen } from '@/components/screens/AboutScreen';
import { useLanguage } from '@/hooks/useLanguage';
import { Mood } from '@/hooks/useMoodDetection';
import { Toaster } from '@/components/ui/toaster';
import { Helmet } from 'react-helmet-async';

type Screen = 'home' | 'subjects' | 'lesson' | 'mood' | 'progress' | 'about';

interface AppState {
  currentScreen: Screen;
  selectedClass: number | null;
  selectedLesson: string | null;
  selectedSubject: string | null;
  currentMood: Mood | null;
}

const Index: React.FC = () => {
  const { isTamil, toggleLanguage } = useLanguage();
  
  const [state, setState] = useState<AppState>({
    currentScreen: 'home',
    selectedClass: null,
    selectedLesson: null,
    selectedSubject: null,
    currentMood: null
  });

  const navigate = (screen: Screen, params?: Partial<Omit<AppState, 'currentScreen'>>) => {
    setState(prev => ({
      ...prev,
      currentScreen: screen,
      ...params
    }));
  };

  const handleSelectClass = (classId: number) => {
    navigate('subjects', { selectedClass: classId });
  };

  const handleSelectLesson = (lessonId: string, subjectId: string) => {
    navigate('lesson', { selectedLesson: lessonId, selectedSubject: subjectId });
  };

  const handleMoodContinue = (mood: Mood | null) => {
    setState(prev => ({
      ...prev,
      currentMood: mood,
      currentScreen: 'home'
    }));
  };

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'home':
        return (
          <HomeScreen
            isTamil={isTamil}
            onToggleLanguage={toggleLanguage}
            onSelectClass={handleSelectClass}
            onOpenMood={() => navigate('mood')}
            onOpenProgress={() => navigate('progress')}
            onOpenAbout={() => navigate('about')}
          />
        );

      case 'subjects':
        return state.selectedClass ? (
          <SubjectScreen
            classId={state.selectedClass}
            isTamil={isTamil}
            onToggleLanguage={toggleLanguage}
            onBack={() => navigate('home')}
            onSelectLesson={handleSelectLesson}
          />
        ) : null;

      case 'lesson':
        return state.selectedLesson && state.selectedSubject ? (
          <LessonScreen
            lessonId={state.selectedLesson}
            subjectId={state.selectedSubject}
            isTamil={isTamil}
            onBack={() => navigate('subjects')}
          />
        ) : null;

      case 'mood':
        return (
          <MoodScreen
            isTamil={isTamil}
            onBack={() => navigate('home')}
            onContinue={handleMoodContinue}
          />
        );

      case 'progress':
        return (
          <ProgressScreen
            isTamil={isTamil}
            onBack={() => navigate('home')}
          />
        );

      case 'about':
        return (
          <AboutScreen
            isTamil={isTamil}
            onBack={() => navigate('home')}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>{isTamil ? 'புத்திசாலி கற்றல் செயலி' : 'Smart Learning App'}</title>
        <meta 
          name="description" 
          content={isTamil 
            ? 'மனநிலை அடிப்படையிலான தனிப்பயனாக்கப்பட்ட கற்றல் செயலி - 1 முதல் 12 வகுப்பு வரை'
            : 'Mood-based personalized learning app for students from Class 1 to 12 with Tamil support'
          } 
        />
        <meta name="keywords" content="learning, education, tamil, mood detection, students, school" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Helmet>
      
      {renderScreen()}
      <Toaster />
    </>
  );
};

export default Index;
