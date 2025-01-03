import { useState, useRef, useEffect } from 'react';
import { Surah } from '../types';

export type BackgroundMusicType = 'kus' | 'Orman' | 'yagmur' | '';

const VERSE_TIMINGS_MAP: { [key: number]: string[] } = {
  1: [ // Fatiha
    '0:01.554',
    '0:18.656',
    '0:26.818',
    '0:32.778',
    '0:38.932',
    '0:48.131',
    '0:56.617'
  ],
  107: [ // Maun
    '00:00.000',
    '00:06.000',
    '00:12.000',
    '00:18.000',
    '00:24.000',
    '00:30.000',
    '00:36.000'
  ],
  108: [ // Kevser
    '00:00.000',
    '00:05.000',
    '00:10.000',
    '00:15.000'
  ],
  109: [ // Kafirun
    '00:00.000',
    '00:05.500',
    '00:11.000',
    '00:16.500',
    '00:22.000',
    '00:27.500'
  ],
  110: [ // Nasr
    '00:00.000',
    '00:06.000',
    '00:12.000',
    '00:18.000'
  ],
  111: [ // Tebbet
    '00:00.000',
    '00:06.000',
    '00:12.000',
    '00:18.000',
    '00:24.000'
  ],
  112: [ // İhlas
    '00:00.000',
    '00:04.500',
    '00:09.000',
    '00:13.500'
  ],
  113: [ // Felak
    '00:00.000',
    '00:05.500',
    '00:11.000',
    '00:16.500',
    '00:22.000'
  ],
  114: [ // Nas
    '00:00.000',
    '00:05.000',
    '00:10.000',
    '00:15.000',
    '00:20.000',
    '00:25.000'
  ]
};

const timeToSeconds = (time: string) => {
  const [minutes, rest] = time.split(':');
  const [seconds, milliseconds] = rest.split('.');
  return parseInt(minutes) * 60 + parseInt(seconds) + parseInt(milliseconds) / 1000;
};

export function useAudioPlayer(surah: Surah | undefined | null) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [backgroundMusic, setBackgroundMusic] = useState<BackgroundMusicType>('');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const verseTimingsRef = useRef<number[]>([]);

  useEffect(() => {
    if (!surah) return;

    // Convert verse timings for current surah
    const rawTimings = VERSE_TIMINGS_MAP[surah.id] || [];
    verseTimingsRef.current = rawTimings.map(timeToSeconds);

    const audio = new Audio();
    audioRef.current = audio;

    audio.src = `https://ezanvaktipro.com/suremp3/${surah.id.toString().padStart(2, '0')}${surah.name.tr}.mp3`;
    
    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;
      const verseIndex = verseTimingsRef.current.findIndex((time, index) => {
        const nextTime = verseTimingsRef.current[index + 1];
        return currentTime >= time && (!nextTime || currentTime < nextTime);
      });
      
      if (verseIndex !== -1) {
        setCurrentVerse(verseIndex + 1);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    
    audio.addEventListener('ended', () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play();
      } else {
        setIsPlaying(false);
      }
    });

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
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
    if (!surah || !audioRef.current) return;
    const nextVerseIndex = Math.min(currentVerse, surah.verses.length - 1);
    const nextTime = verseTimingsRef.current[nextVerseIndex];
    if (nextTime !== undefined) {
      audioRef.current.currentTime = nextTime;
      setCurrentVerse(nextVerseIndex + 1);
    }
  };

  const previousVerse = () => {
    if (!audioRef.current) return;
    const prevVerseIndex = Math.max(0, currentVerse - 2);
    const prevTime = verseTimingsRef.current[prevVerseIndex];
    if (prevTime !== undefined) {
      audioRef.current.currentTime = prevTime;
      setCurrentVerse(prevVerseIndex + 1);
    }
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