import { useState, useEffect, useCallback } from 'react';

export type Language = 'en' | 'ta';

interface TranslationStrings {
  [key: string]: {
    en: string;
    ta: string;
  };
}

export const translations: TranslationStrings = {
  appTitle: {
    en: "Smart Learning",
    ta: "புத்திசாலி கற்றல்"
  },
  appSubtitle: {
    en: "Mood-Based Personalized Learning",
    ta: "மனநிலை அடிப்படையிலான தனிப்பயனாக்கப்பட்ட கற்றல்"
  },
  selectClass: {
    en: "Select Your Class",
    ta: "உங்கள் வகுப்பைத் தேர்ந்தெடுக்கவும்"
  },
  selectSubject: {
    en: "Select Subject",
    ta: "பாடத்தைத் தேர்ந்தெடுக்கவும்"
  },
  moodDetection: {
    en: "Mood Detection",
    ta: "மனநிலை கண்டறிதல்"
  },
  startLesson: {
    en: "Start Lesson",
    ta: "பாடத்தைத் தொடங்கு"
  },
  takeQuiz: {
    en: "Take Quiz",
    ta: "வினாடி வினா"
  },
  progress: {
    en: "Progress",
    ta: "முன்னேற்றம்"
  },
  home: {
    en: "Home",
    ta: "முகப்பு"
  },
  about: {
    en: "About",
    ta: "பற்றி"
  },
  lesson: {
    en: "Lesson",
    ta: "பாடம்"
  },
  quiz: {
    en: "Quiz",
    ta: "வினாடி வினா"
  },
  completed: {
    en: "Completed",
    ta: "முடிந்தது"
  },
  score: {
    en: "Score",
    ta: "மதிப்பெண்"
  },
  next: {
    en: "Next",
    ta: "அடுத்து"
  },
  previous: {
    en: "Previous",
    ta: "முந்தைய"
  },
  submit: {
    en: "Submit",
    ta: "சமர்ப்பி"
  },
  correct: {
    en: "Correct!",
    ta: "சரி!"
  },
  incorrect: {
    en: "Incorrect",
    ta: "தவறு"
  },
  tryAgain: {
    en: "Try Again",
    ta: "மீண்டும் முயற்சி"
  },
  continueBtn: {
    en: "Continue",
    ta: "தொடர்க"
  },
  detectMood: {
    en: "Detect My Mood",
    ta: "என் மனநிலையைக் கண்டறி"
  },
  skipMood: {
    en: "Skip for now",
    ta: "இப்போது தவிர்"
  },
  happy: {
    en: "Happy 😊",
    ta: "மகிழ்ச்சி 😊"
  },
  bored: {
    en: "Bored 😑",
    ta: "சலிப்பு 😑"
  },
  stressed: {
    en: "Stressed 😰",
    ta: "மன அழுத்தம் 😰"
  },
  neutral: {
    en: "Neutral 😐",
    ta: "நடுநிலை 😐"
  },
  listenLesson: {
    en: "Listen to Lesson",
    ta: "பாடத்தைக் கேளுங்கள்"
  },
  stopListening: {
    en: "Stop",
    ta: "நிறுத்து"
  },
  lessonsCompleted: {
    en: "Lessons Completed",
    ta: "முடித்த பாடங்கள்"
  },
  averageScore: {
    en: "Average Score",
    ta: "சராசரி மதிப்பெண்"
  },
  timeSpent: {
    en: "Time Spent",
    ta: "செலவழித்த நேரம்"
  },
  dayStreak: {
    en: "Day Streak",
    ta: "தினசரி தொடர்ச்சி"
  },
  welcome: {
    en: "Welcome!",
    ta: "வருக!"
  },
  letsLearn: {
    en: "Let's Learn Together",
    ta: "ஒன்றாகக் கற்போம்"
  },
  offline: {
    en: "Works Offline",
    ta: "இணையமின்றி செயல்படும்"
  },
  tamilSupport: {
    en: "Tamil Support",
    ta: "தமிழ் ஆதரவு"
  },
  voiceEnabled: {
    en: "Voice Enabled",
    ta: "குரல் செயல்படுத்தப்பட்டது"
  },
  chapters: {
    en: "Chapters",
    ta: "அத்தியாயங்கள்"
  },
  lessons: {
    en: "Lessons",
    ta: "பாடங்கள்"
  },
  backToHome: {
    en: "Back to Home",
    ta: "முகப்புக்குத் திரும்பு"
  },
  quizComplete: {
    en: "Quiz Complete!",
    ta: "வினாடி வினா முடிந்தது!"
  },
  yourScore: {
    en: "Your Score",
    ta: "உங்கள் மதிப்பெண்"
  },
  excellent: {
    en: "Excellent!",
    ta: "அருமை!"
  },
  goodJob: {
    en: "Good Job!",
    ta: "நல்ல வேலை!"
  },
  keepPracticing: {
    en: "Keep Practicing!",
    ta: "பயிற்சியைத் தொடருங்கள்!"
  },
  retakeQuiz: {
    en: "Retake Quiz",
    ta: "மீண்டும் எழுது"
  },
  minutes: {
    en: "minutes",
    ta: "நிமிடங்கள்"
  },
  days: {
    en: "days",
    ta: "நாட்கள்"
  }
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const stored = localStorage.getItem('appLanguage');
    if (stored === 'ta' || stored === 'en') {
      setLanguage(stored);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ta' : 'en';
    setLanguage(newLang);
    localStorage.setItem('appLanguage', newLang);
  };

  const t = useCallback((key: string): string => {
    return translations[key]?.[language] || key;
  }, [language]);

  const isTamil = language === 'ta';

  return {
    language,
    toggleLanguage,
    t,
    isTamil
  };
};
