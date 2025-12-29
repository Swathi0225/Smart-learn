import { useState, useEffect } from 'react';

export interface Progress {
  completedLessons: string[];
  quizScores: Record<string, number>;
  lastVisitedClass: number | null;
  lastVisitedSubject: string | null;
  lastVisitedLesson: string | null;
  totalTimeSpent: number; // in minutes
  streak: number;
  lastLoginDate: string | null;
}

const defaultProgress: Progress = {
  completedLessons: [],
  quizScores: {},
  lastVisitedClass: null,
  lastVisitedSubject: null,
  lastVisitedLesson: null,
  totalTimeSpent: 0,
  streak: 0,
  lastLoginDate: null
};

export const useProgress = () => {
  const [progress, setProgress] = useState<Progress>(defaultProgress);

  useEffect(() => {
    const stored = localStorage.getItem('learningProgress');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProgress(parsed);
        
        // Update streak
        const today = new Date().toDateString();
        if (parsed.lastLoginDate !== today) {
          const yesterday = new Date(Date.now() - 86400000).toDateString();
          const newStreak = parsed.lastLoginDate === yesterday ? parsed.streak + 1 : 1;
          updateProgress({ streak: newStreak, lastLoginDate: today });
        }
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    } else {
      const today = new Date().toDateString();
      updateProgress({ lastLoginDate: today, streak: 1 });
    }
  }, []);

  const updateProgress = (updates: Partial<Progress>) => {
    setProgress(prev => {
      const newProgress = { ...prev, ...updates };
      localStorage.setItem('learningProgress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const markLessonComplete = (lessonId: string) => {
    if (!progress.completedLessons.includes(lessonId)) {
      updateProgress({
        completedLessons: [...progress.completedLessons, lessonId],
        lastVisitedLesson: lessonId
      });
    }
  };

  const saveQuizScore = (lessonId: string, score: number) => {
    updateProgress({
      quizScores: { ...progress.quizScores, [lessonId]: score }
    });
  };

  const setLastVisited = (classId: number, subjectId: string, lessonId?: string) => {
    updateProgress({
      lastVisitedClass: classId,
      lastVisitedSubject: subjectId,
      lastVisitedLesson: lessonId || progress.lastVisitedLesson
    });
  };

  const addTimeSpent = (minutes: number) => {
    updateProgress({
      totalTimeSpent: progress.totalTimeSpent + minutes
    });
  };

  const isLessonComplete = (lessonId: string) => {
    return progress.completedLessons.includes(lessonId);
  };

  const getQuizScore = (lessonId: string) => {
    return progress.quizScores[lessonId] || null;
  };

  const getOverallProgress = () => {
    const totalCompleted = progress.completedLessons.length;
    const averageScore = Object.values(progress.quizScores).length > 0
      ? Object.values(progress.quizScores).reduce((a, b) => a + b, 0) / Object.values(progress.quizScores).length
      : 0;
    
    return {
      totalCompleted,
      averageScore: Math.round(averageScore),
      totalTimeSpent: progress.totalTimeSpent,
      streak: progress.streak
    };
  };

  const resetProgress = () => {
    localStorage.removeItem('learningProgress');
    setProgress(defaultProgress);
  };

  return {
    progress,
    markLessonComplete,
    saveQuizScore,
    setLastVisited,
    addTimeSpent,
    isLessonComplete,
    getQuizScore,
    getOverallProgress,
    resetProgress
  };
};
