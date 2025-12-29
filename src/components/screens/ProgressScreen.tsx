import React from 'react';
import { Button } from '@/components/ui/button';
import { ProgressStats } from '@/components/ProgressStats';
import { useProgress } from '@/hooks/useProgress';
import { classesData } from '@/data/learningContent';
import { ArrowLeft, Trash2, Award, BookOpen, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressScreenProps {
  isTamil: boolean;
  onBack: () => void;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  isTamil,
  onBack
}) => {
  const { progress, getOverallProgress, resetProgress, isLessonComplete, getQuizScore } = useProgress();
  const stats = getOverallProgress();

  const handleReset = () => {
    if (confirm(isTamil 
      ? 'உங்கள் முன்னேற்றத்தை நீக்க விரும்புகிறீர்களா?' 
      : 'Are you sure you want to reset your progress?'
    )) {
      resetProgress();
    }
  };

  // Get completed lessons details
  const completedLessonsDetails = progress.completedLessons.map(lessonId => {
    for (const classData of classesData) {
      for (const subject of classData.subjects) {
        for (const chapter of subject.chapters) {
          for (const lesson of chapter.lessons) {
            if (lesson.id === lessonId) {
              return {
                lessonId,
                lessonTitle: isTamil ? lesson.titleTamil : lesson.title,
                subjectName: isTamil ? subject.nameTamil : subject.name,
                subjectIcon: subject.icon,
                className: isTamil ? classData.nameTamil : classData.name,
                score: getQuizScore(lessonId)
              };
            }
          }
        }
      }
    }
    return null;
  }).filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-bold text-foreground">
              {isTamil ? 'முன்னேற்றம்' : 'Progress'}
            </h1>
          </div>
          
          {stats.totalCompleted > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleReset}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {isTamil ? 'நீக்கு' : 'Reset'}
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Stats */}
        <section className="animate-fade-in">
          <ProgressStats
            totalCompleted={stats.totalCompleted}
            averageScore={stats.averageScore}
            totalTimeSpent={stats.totalTimeSpent}
            streak={stats.streak}
            isTamil={isTamil}
          />
        </section>

        {/* Achievements */}
        <section>
          <h2 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-secondary" />
            {isTamil ? 'சாதனைகள்' : 'Achievements'}
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                id: 'first_lesson',
                title: isTamil ? 'முதல் பாடம்' : 'First Lesson',
                description: isTamil ? 'முதல் பாடத்தை முடித்தது' : 'Completed your first lesson',
                icon: '🌟',
                unlocked: stats.totalCompleted >= 1
              },
              {
                id: 'quiz_master',
                title: isTamil ? 'வினா வல்லுநர்' : 'Quiz Master',
                description: isTamil ? '80% மேல் மதிப்பெண்' : 'Scored above 80%',
                icon: '🏆',
                unlocked: stats.averageScore >= 80
              },
              {
                id: 'consistent',
                title: isTamil ? 'தொடர்ச்சி' : 'Consistent',
                description: isTamil ? '3 நாள் தொடர்ச்சி' : '3 day streak',
                icon: '🔥',
                unlocked: stats.streak >= 3
              },
              {
                id: 'dedicated',
                title: isTamil ? 'அர்ப்பணிப்பு' : 'Dedicated',
                description: isTamil ? '5 பாடங்கள் முடித்தது' : 'Completed 5 lessons',
                icon: '📚',
                unlocked: stats.totalCompleted >= 5
              }
            ].map(achievement => (
              <div
                key={achievement.id}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all',
                  achievement.unlocked
                    ? 'bg-secondary/10 border-secondary/30'
                    : 'bg-muted/50 border-border opacity-50'
                )}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h3 className="font-semibold text-foreground text-sm">
                  {achievement.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Completed Lessons */}
        <section>
          <h2 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            {isTamil ? 'முடித்த பாடங்கள்' : 'Completed Lessons'}
          </h2>

          {completedLessonsDetails.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>{isTamil ? 'இன்னும் பாடங்கள் முடிக்கவில்லை' : 'No lessons completed yet'}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {completedLessonsDetails.map((item, index) => item && (
                <div
                  key={item.lessonId}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl bg-card shadow-soft',
                    'animate-fade-in'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-mood-stressed/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-mood-stressed" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm truncate">
                      {item.lessonTitle}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {item.subjectIcon} {item.subjectName} • {item.className}
                    </p>
                  </div>
                  {item.score !== null && (
                    <span className={cn(
                      'text-sm font-bold px-2 py-1 rounded-lg',
                      item.score >= 80 
                        ? 'bg-mood-stressed/10 text-mood-stressed'
                        : item.score >= 60
                          ? 'bg-secondary/10 text-secondary'
                          : 'bg-muted text-muted-foreground'
                    )}>
                      {item.score}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
