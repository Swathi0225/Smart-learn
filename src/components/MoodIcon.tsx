import React from 'react';
import { cn } from '@/lib/utils';
import { Mood } from '@/hooks/useMoodDetection';

interface MoodIconProps {
  mood: Mood;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const moodConfig = {
  happy: {
    emoji: '😊',
    color: 'bg-mood-happy',
    label: 'Happy'
  },
  bored: {
    emoji: '😑',
    color: 'bg-mood-bored',
    label: 'Bored'
  },
  stressed: {
    emoji: '😰',
    color: 'bg-mood-stressed',
    label: 'Stressed'
  },
  neutral: {
    emoji: '😐',
    color: 'bg-mood-neutral',
    label: 'Neutral'
  }
};

const sizeClasses = {
  sm: 'w-10 h-10 text-xl',
  md: 'w-14 h-14 text-2xl',
  lg: 'w-20 h-20 text-4xl'
};

export const MoodIcon: React.FC<MoodIconProps> = ({ 
  mood, 
  size = 'md',
  animated = false,
  className 
}) => {
  const config = moodConfig[mood];

  return (
    <div 
      className={cn(
        'rounded-full flex items-center justify-center shadow-lg',
        config.color,
        sizeClasses[size],
        animated && 'animate-bounce-soft',
        className
      )}
    >
      <span role="img" aria-label={config.label}>
        {config.emoji}
      </span>
    </div>
  );
};
