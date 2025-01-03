import { useState, useRef, useEffect } from 'react';
import { Surah } from '../types';

export type BackgroundMusicType = 'kus' | 'orman' | 'yagmur' | '';

export function useAudioPlayer(surah: Surah | undefined | null) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [backgroundMusic, setBackgroundMusic] = useState<BackgroundMusicType>('');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!surah) return;

    const audio = new Audio();
    audioRef.current = audio;

    audio.src = `https://ezanvaktipro.com/suremp3/${surah.id.toString().padStart(2, '0')}${surah.name.tr}.mp3`;
    
    audio.addEventListener('ended', () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play();
      } else {
        setIsPlaying(false);
      }
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [surah, isLooping]);

  useEffect(() => {
    if (!backgroundMusic) {
      bgMusicRef.current?.pause();
      return;
    }

    const bgAudio = new Audio(`https://ezanvaktipro.com/suremp3/${backgroundMusic}.mp3`);
    bgMusicRef.current = bgAudio;
    bgAudio.loop = true;
    bgAudio.volume = 0.5;

    if (isPlaying) {
      bgAudio.play();
    }

    return () => {
      bgAudio.pause();
      bgAudio.src = '';
    };
  }, [backgroundMusic, isPlaying]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      bgMusicRef.current?.pause();
    } else {
      try {
        await audioRef.current.play();
        if (backgroundMusic && bgMusicRef.current) {
          bgMusicRef.current.play();
        }
      } catch (error) {
        console.error('Audio playback error:', error);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const nextVerse = () => {
    if (!surah) return;
    setCurrentVerse((prev) => Math.min(prev + 1, surah.verses.length));
  };

  const previousVerse = () => {
    setCurrentVerse((prev) => Math.max(prev - 1, 1));
  };

  return {
    isPlaying,
    togglePlay,
    currentVerse,
    nextVerse,
    previousVerse,
    isLooping,
    toggleLoop,
    backgroundMusic,
    setBackgroundMusic,
  };
} 