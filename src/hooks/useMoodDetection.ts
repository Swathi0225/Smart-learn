import { useState, useCallback, useRef } from 'react';

export type Mood = 'happy' | 'bored' | 'stressed' | 'neutral';

interface MoodResult {
  mood: Mood;
  confidence: number;
}

export const useMoodDetection = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedMood, setDetectedMood] = useState<Mood | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setError(null);
      return true;
    } catch (err) {
      setError('Camera access denied. Please allow camera access to detect mood.');
      return false;
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Simplified mood detection simulation
  // In a real app, this would use OpenCV/DeepFace
  const detectMood = useCallback(async (): Promise<MoodResult> => {
    setIsDetecting(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Random mood for demonstration (in real app, use AI model)
    const moods: Mood[] = ['happy', 'bored', 'stressed', 'neutral'];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    const confidence = 0.7 + Math.random() * 0.25;
    
    setDetectedMood(randomMood);
    setIsDetecting(false);
    
    return { mood: randomMood, confidence };
  }, []);

  const selectMoodManually = useCallback((mood: Mood) => {
    setDetectedMood(mood);
  }, []);

  const resetMood = useCallback(() => {
    setDetectedMood(null);
  }, []);

  return {
    videoRef,
    isDetecting,
    detectedMood,
    error,
    startCamera,
    stopCamera,
    detectMood,
    selectMoodManually,
    resetMood
  };
};
