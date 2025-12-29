import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/LanguageToggle';
import { SubjectCard } from '@/components/SubjectCard';
import { LessonCard } from '@/components/LessonCard';
import { classesData, Subject, Chapter, Lesson } from '@/data/learningContent';
import { useProgress } from '@/hooks/useProgress';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubjectScreenProps {
  classId: number;
  isTamil: boolean;
  onToggleLanguage: () => void;
  onBack: () => void;
  onSelectLesson: (lessonId: string, subjectId: string) => void;
}

type ViewMode = 'subjects' | 'chapters' | 'lessons';

export const SubjectScreen: React.FC<SubjectScreenProps> = ({
  classId,
  isTamil,
  onToggleLanguage,
  onBack,
  onSelectLesson
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('subjects');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  
  const { isLessonComplete, getQuizScore } = useProgress();
  
  const classData = classesData.find(c => c.id === classId);
  
  if (!classData) {
    return <div>Class not found</div>;
  }

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    if (subject.chapters.length === 1) {
      setSelectedChapter(subject.chapters[0]);
      setViewMode('lessons');
    } else {
      setViewMode('chapters');
    }
  };

  const handleSelectChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setViewMode('lessons');
  };

  const handleBack = () => {
    if (viewMode === 'lessons') {
      if (selectedSubject && selectedSubject.chapters.length > 1) {
        setViewMode('chapters');
      } else {
        setViewMode('subjects');
        setSelectedSubject(null);
      }
    } else if (viewMode === 'chapters') {
      setViewMode('subjects');
      setSelectedSubject(null);
    } else {
      onBack();
    }
  };

  const countCompletedLessons = (subject: Subject): { completed: number; total: number } => {
    let completed = 0;
    let total = 0;
    subject.chapters.forEach(chapter => {
      chapter.lessons.forEach(lesson => {
        total++;
        if (isLessonComplete(lesson.id)) completed++;
      });
    });
    return { completed, total };
  };

  const getTitle = () => {
    if (viewMode === 'lessons' && selectedChapter) {
      return isTamil ? selectedChapter.titleTamil : selectedChapter.title;
    }
    if (viewMode === 'chapters' && selectedSubject) {
      return isTamil ? selectedSubject.nameTamil : selectedSubject.name;
    }
    return isTamil ? classData.nameTamil : classData.name;
  };

  const getBreadcrumb = () => {
    const parts = [isTamil ? classData.nameTamil : classData.name];
    if (selectedSubject) {
      parts.push(isTamil ? selectedSubject.nameTamil : selectedSubject.name);
    }
    if (selectedChapter && viewMode === 'lessons') {
      parts.push(isTamil ? selectedChapter.titleTamil : selectedChapter.title);
    }
    return parts;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={handleBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="font-bold text-foreground">
                  {getTitle()}
                </h1>
                {/* Breadcrumb */}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {getBreadcrumb().map((part, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <ChevronRight className="w-3 h-3" />}
                      <span className={i === getBreadcrumb().length - 1 ? 'text-primary' : ''}>
                        {part}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            <LanguageToggle isTamil={isTamil} onToggle={onToggleLanguage} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Subjects View */}
        {viewMode === 'subjects' && (
          <div className="space-y-4">
            <h2 className="font-semibold text-muted-foreground text-sm uppercase tracking-wide">
              {isTamil ? 'பாடங்களைத் தேர்ந்தெடுக்கவும்' : 'Choose a Subject'}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {classData.subjects.map((subject, index) => {
                const { completed, total } = countCompletedLessons(subject);
                return (
                  <div
                    key={subject.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <SubjectCard
                      subject={subject}
                      isTamil={isTamil}
                      completedLessons={completed}
                      totalLessons={total}
                      onClick={() => handleSelectSubject(subject)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Chapters View */}
        {viewMode === 'chapters' && selectedSubject && (
          <div className="space-y-4">
            <h2 className="font-semibold text-muted-foreground text-sm uppercase tracking-wide">
              {isTamil ? 'அத்தியாயங்கள்' : 'Chapters'}
            </h2>
            <div className="space-y-3">
              {selectedSubject.chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => handleSelectChapter(chapter)}
                  className={cn(
                    'w-full p-4 rounded-xl bg-card shadow-soft text-left',
                    'flex items-center gap-4 transition-all',
                    'hover:shadow-card hover:scale-[1.01]',
                    'animate-fade-in'
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg',
                    'bg-gradient-to-br text-primary-foreground',
                    selectedSubject.color
                  )}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {isTamil ? chapter.titleTamil : chapter.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {chapter.lessons.length} {isTamil ? 'பாடங்கள்' : 'lessons'}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Lessons View */}
        {viewMode === 'lessons' && selectedChapter && (
          <div className="space-y-4">
            <h2 className="font-semibold text-muted-foreground text-sm uppercase tracking-wide">
              {isTamil ? 'பாடங்கள்' : 'Lessons'}
            </h2>
            <div className="space-y-3">
              {selectedChapter.lessons.map((lesson, index) => {
                const isComplete = isLessonComplete(lesson.id);
                const quizScore = getQuizScore(lesson.id);
                // Lock lessons after the first uncompleted one (optional feature)
                const isLocked = false; // Set to true to enable progressive unlocking
                
                return (
                  <div
                    key={lesson.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <LessonCard
                      lesson={lesson}
                      index={index}
                      isTamil={isTamil}
                      isCompleted={isComplete}
                      isLocked={isLocked}
                      quizScore={quizScore}
                      onClick={() => onSelectLesson(lesson.id, selectedSubject!.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
