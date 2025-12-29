import React from 'react';
import { cn } from '@/lib/utils';
import { BookOpen, Trophy, Clock, Flame } from 'lucide-react';

interface ProgressStatsProps {
  totalCompleted: number;
  averageScore: number;
  totalTimeSpent: number;
  streak: number;
  isTamil: boolean;
}

export const ProgressStats: React.FC<ProgressStatsProps> = ({
  totalCompleted,
  averageScore,
  totalTimeSpent,
  streak,
  isTamil
}) => {
  const stats = [
    {
      icon: BookOpen,
      value: totalCompleted,
      label: isTamil ? 'முடித்த பாடங்கள்' : 'Lessons',
      color: 'from-blue-400 to-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Trophy,
      value: `${averageScore}%`,
      label: isTamil ? 'சராசரி' : 'Average',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Clock,
      value: totalTimeSpent,
      label: isTamil ? 'நிமிடங்கள்' : 'Minutes',
      color: 'from-purple-400 to-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Flame,
      value: streak,
      label: isTamil ? 'நாள் தொடர்ச்சி' : 'Day Streak',
      color: 'from-red-400 to-red-500',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={cn(
            'rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]',
            stat.bgColor,
            'border border-border/30'
          )}
        >
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center',
              stat.color
            )}>
              <stat.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-bold text-xl text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
