import { useEffect, useRef, useState } from 'react';
import { Surah } from '../types';

// Her sure için ayet zamanlamaları (mm:ss.ddd formatında)
const VERSE_TIMINGS_MAP: { [key: number]: string[] } = {
  1: [ // Fatiha
    "0:00.382",
    "0:17.383",
    "0:25.661",
    "0:31.519",
    "0:37.631",
    "0:46.992",
    "0:55.269"
  ],
  106: [ // Kureyş
    "0:00.000",
    "0:07.500",
    "0:15.000",
    "0:22.500"
  ],
  107: [ // Maun
    "0:00.000",
    "0:07.000",
    "0:14.000",
    "0:21.000",
    "0:28.000",
    "0:35.000",
    "0:42.000"
  ],
  108: [ // Kevser
    "0:00.000",
    "0:06.000",
    "0:12.000"
  ],
  109: [ // Kafirun
    "0:00.000",
    "0:07.000",
    "0:14.000",
    "0:21.000",
    "0:28.000",
    "0:35.000"
  ],
  110: [ // Nasr
    "0:00.000",
    "0:07.000",
    "0:14.000"
  ],
  111: [ // Tebbet
    "0:00.000",
    "0:07.000",
    "0:14.000",
    "0:21.000",
    "0:28.000"
  ],
  112: [ // İhlas
    "0:00.000",
    "0:06.000",
    "0:12.000",
    "0:18.000"
  ],
  113: [ // Felak
    "0:00.000",
    "0:07.000",
    "0:14.000",
    "0:21.000",
    "0:28.000"
  ],
  114: [ // Nas
    "0:00.000",
    "0:07.000",
    "0:14.000",
    "0:21.000",
    "0:28.000",
    "0:35.000"
  ]
};

// Arka plan müzik tipleri
export type BackgroundMusicType = 'kus' | 'orman' | 'yagmur' | null;

// mm:ss.ddd formatını saniyeye çeviren yardımcı fonksiyon
const timeToSeconds = (time: string): number => {
  const [minutes, rest] = time.split(':');
  const [seconds, milliseconds] = rest.split('.');
  return parseInt(minutes) * 60 + parseInt(seconds) + parseInt(milliseconds) / 1000;
};

export const useAudioPlayer = (surah: Surah | null) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [backgroundMusic, setBackgroundMusic] = useState<BackgroundMusicType>(null);
  const [isLooping, setIsLooping] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  // Mevcut sure için zamanlamaları al ve saniyeye çevir
  const verseTimings = surah ? VERSE_TIMINGS_MAP[surah.id]?.map(timeToSeconds) || [] : [];

  // Arka plan müziğini yönet
  useEffect(() => {
    if (!backgroundMusic) {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
      return;
    }

    const bgAudio = new Audio(`/mp3/${backgroundMusic}.mp3`);
    bgMusicRef.current = bgAudio;
    bgAudio.loop = true;
    bgAudio.volume = 0.5;

    if (isPlaying) {
      bgAudio.play().catch(console.error);
    }

    return () => {
      bgAudio.pause();
      bgMusicRef.current = null;
    };
  }, [backgroundMusic]);

  useEffect(() => {
    if (!surah) return;
    
    const audioUrl = `https://ezanvaktipro.com/suremp3/${surah.id.toString().padStart(2, '0')}${surah.name.tr}.mp3`;
    audioRef.current = new Audio(audioUrl);

    fetch(audioUrl)
      .then(response => {
        setHasAudio(response.ok);
      })
      .catch(() => {
        setHasAudio(false);
      });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
      setIsPlaying(false);
      setHasAudio(false);
      setCurrentVerse(1);
    };
  }, [surah]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = isLooping;

    const handleTimeUpdate = () => {
      if (!audioRef.current) return;
      
      const currentTime = audioRef.current.currentTime;
      const verseIndex = verseTimings.findIndex((time, index) => {
        const nextTime = verseTimings[index + 1];
        return currentTime >= time && (!nextTime || currentTime < nextTime);
      });
      
      if (verseIndex !== -1) {
        setCurrentVerse(verseIndex + 1);
      }
    };

    const handleEnded = () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        setIsPlaying(false);
        setCurrentVerse(1);
        if (bgMusicRef.current) {
          bgMusicRef.current.pause();
        }
      }
    };

    const handleError = () => {
      setHasAudio(false);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audioRef.current, verseTimings, isLooping]);

  const togglePlay = async () => {
    if (!audioRef.current || !hasAudio) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
        if (bgMusicRef.current) {
          await bgMusicRef.current.pause();
        }
      } else {
        await audioRef.current.play();
        if (bgMusicRef.current) {
          await bgMusicRef.current.play();
        }
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Ses oynatma hatası:', error);
      setHasAudio(false);
    }
  };

  const goToVerse = (verseNumber: number) => {
    if (!audioRef.current || !hasAudio || !verseTimings.length) return;
    
    const verseIndex = verseNumber - 1;
    if (verseIndex >= 0 && verseIndex < verseTimings.length) {
      audioRef.current.currentTime = verseTimings[verseIndex];
      setCurrentVerse(verseNumber);
    }
  };

  return {
    isPlaying,
    hasAudio,
    currentVerse,
    togglePlay,
    goToVerse,
    backgroundMusic,
    setBackgroundMusic,
    isLooping,
    setIsLooping
  };
}; 