import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Pause, ChevronLeft, ChevronRight, Type } from 'lucide-react';
import { Surah } from '../types';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import SurahContent from './surah/SurahContent';
import FontSettings from './surah/FontSettings';
import { Link } from 'react-router-dom';

interface Props {
  surahs: Surah[];
}

export default function SurahDetail({ surahs }: Props) {
  const { id } = useParams<{ id: string }>();
  const surah = surahs.find((s) => s.id === Number(id));

  const [arabicFontSize, setArabicFontSize] = useLocalStorage('arabicFontSize', 32);
  const [translationFontSize, setTranslationFontSize] = useLocalStorage('translationFontSize', 16);

  const {
    isPlaying,
    togglePlay,
    currentVerse,
    nextVerse,
    previousVerse,
    isLooping,
    toggleLoop,
    backgroundMusic,
    setBackgroundMusic
  } = useAudioPlayer(surah);

  const [showFontSettings, setShowFontSettings] = useState(false);

  if (!surah) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-primary-light dark:text-primary-dark">Sure bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-24">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <ChevronLeft size={20} />
              <span>Geri</span>
            </Link>
            <button
              onClick={() => setShowFontSettings(!showFontSettings)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Type size={18} />
              <span className="text-sm">Font</span>
            </button>
          </div>

          {showFontSettings && (
            <FontSettings
              arabicFontSize={arabicFontSize}
              translationFontSize={translationFontSize}
              setArabicFontSize={setArabicFontSize}
              setTranslationFontSize={setTranslationFontSize}
            />
          )}

          {surah && (
            <div className="flex flex-col gap-4">
              <div className="text-center">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {surah.name.tr}
                </h1>
                <p className="text-lg font-arabic text-gray-800 dark:text-gray-200">
                  {surah.name.ar}
                </p>
              </div>

              <SurahContent 
                surah={surah} 
                currentVerse={currentVerse}
                arabicFontSize={arabicFontSize}
                translationFontSize={translationFontSize}
              />
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={previousVerse}
                className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-all active:scale-95"
                aria-label="Previous verse"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={togglePlay}
                className="p-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white transition-all active:scale-95"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
              </button>

              <button
                onClick={nextVerse}
                className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-all active:scale-95"
                aria-label="Next verse"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleLoop}
                className={`p-2 rounded-full hover:bg-gray-800 transition-all active:scale-95 ${
                  isLooping ? 'text-emerald-500' : 'text-gray-400 hover:text-white'
                }`}
                aria-label={isLooping ? 'Disable loop' : 'Enable loop'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>

              <select
                value={backgroundMusic}
                onChange={(e) => setBackgroundMusic(e.target.value as any)}
                className="px-3 py-1.5 rounded-full bg-gray-800 text-gray-300 border-none focus:ring-2 focus:ring-emerald-500 text-sm transition-all cursor-pointer hover:bg-gray-700"
              >
                <option value="">Arkaplan Müziği</option>
                <option value="kus">Kuş</option>
                <option value="Orman">Orman</option>
                <option value="yagmur">Yağmur</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-400">{currentVerse}. Ayet</span>
          </div>
        </div>
      </div>
    </div>
  );
}