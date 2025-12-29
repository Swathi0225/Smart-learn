import { useState, useCallback, useRef } from 'react';

export const useTTS = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string, isTamil: boolean = false) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Set language
    utterance.lang = isTamil ? 'ta-IN' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to find appropriate voice
    const voices = window.speechSynthesis.getVoices();
    const targetLang = isTamil ? 'ta' : 'en';
    const voice = voices.find(v => v.lang.startsWith(targetLang)) || voices[0];
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const toggle = useCallback((text: string, isTamil: boolean = false) => {
    if (isSpeaking) {
      stop();
    } else {
      speak(text, isTamil);
    }
  }, [isSpeaking, speak, stop]);

  return {
    speak,
    stop,
    toggle,
    isSpeaking
  };
};
