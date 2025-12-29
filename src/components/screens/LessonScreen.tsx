import React, { useState, useEffect, useMemo } from 'react';
import { classesData, quizQuestions, Lesson } from '@/data/learningContent';
import { LessonViewer } from '@/components/LessonViewer';
import { QuizView } from '@/components/QuizView';
import { useProgress } from '@/hooks/useProgress';

interface LessonScreenProps {
  lessonId: string;
  subjectId: string;
  isTamil: boolean;
  onBack: () => void;
}

type ViewMode = 'lesson' | 'quiz';

// Get all lessons for a subject in order
const getAllLessonsForSubject = (subjectId: string): Lesson[] => {
  const lessons: Lesson[] = [];
  for (const classData of classesData) {
    for (const subject of classData.subjects) {
      if (subject.id === subjectId) {
        for (const chapter of subject.chapters) {
          lessons.push(...chapter.lessons);
        }
        return lessons;
      }
    }
  }
  return lessons;
};

export const LessonScreen: React.FC<LessonScreenProps> = ({
  lessonId,
  subjectId,
  isTamil,
  onBack
}) => {
  const [currentLessonId, setCurrentLessonId] = useState(lessonId);
  const [viewMode, setViewMode] = useState<ViewMode>('lesson');
  const { markLessonComplete, isLessonComplete, saveQuizScore, setLastVisited } = useProgress();

  // Get all lessons for navigation
  const allLessons = useMemo(() => getAllLessonsForSubject(subjectId), [subjectId]);
  
  // Find current lesson and index
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  const lesson = allLessons[currentIndex] || null;
  
  // Navigation state
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allLessons.length - 1;

  // Save current lesson to localStorage
  useEffect(() => {
    if (lesson) {
      localStorage.setItem('lastLessonId', currentLessonId);
      localStorage.setItem('lastSubjectId', subjectId);
    }
  }, [currentLessonId, subjectId, lesson]);

  if (!lesson) {
    return <div className="p-4 text-center text-muted-foreground">Lesson not found</div>;
  }

  const lessonTitle = isTamil ? lesson.titleTamil : lesson.title;
  const questions = quizQuestions[currentLessonId] || [];
  const isComplete = isLessonComplete(currentLessonId);

  const handleComplete = () => {
    markLessonComplete(currentLessonId);
  };

  const handleTakeQuiz = () => {
    if (questions.length > 0) {
      setViewMode('quiz');
    } else {
      handleComplete();
    }
  };

  const handleQuizComplete = (score: number) => {
    saveQuizScore(currentLessonId, score);
    if (!isComplete) {
      markLessonComplete(currentLessonId);
    }
  };

  const handleBackFromQuiz = () => {
    setViewMode('lesson');
  };

  const handlePreviousLesson = () => {
    if (hasPrevious) {
      setCurrentLessonId(allLessons[currentIndex - 1].id);
      setViewMode('lesson');
    }
  };

  const handleNextLesson = () => {
    if (hasNext) {
      setCurrentLessonId(allLessons[currentIndex + 1].id);
      setViewMode('lesson');
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-2xl mx-auto h-full">
        {viewMode === 'lesson' ? (
          <LessonViewer
            lesson={lesson}
            isTamil={isTamil}
            isCompleted={isComplete}
            currentIndex={currentIndex}
            totalLessons={allLessons.length}
            hasPrevious={hasPrevious}
            hasNext={hasNext}
            onBack={onBack}
            onComplete={handleComplete}
            onTakeQuiz={handleTakeQuiz}
            onPrevious={handlePreviousLesson}
            onNext={handleNextLesson}
          />
        ) : (
          <QuizView
            questions={questions}
            lessonTitle={lessonTitle}
            isTamil={isTamil}
            onBack={handleBackFromQuiz}
            onComplete={handleQuizComplete}
          />
        )}
      </div>
    </div>
  );
};
