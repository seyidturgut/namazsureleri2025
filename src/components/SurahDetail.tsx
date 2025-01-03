import React, { useState } from 'react';
import { ArrowLeft, Play, Pause, Volume2, ChevronLeft, ChevronRight, Music2, Repeat } from 'lucide-react';
import { Surah } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAudioPlayer, BackgroundMusicType } from '../hooks/useAudioPlayer';
import FontSettings from './surah/FontSettings';
import SurahContent from './surah/SurahContent';

interface Props {
  surah: Surah;
  onBack: () => void;
}

export default function SurahDetail({ surah, onBack }: Props) {
  const [arabicFontSize, setArabicFontSize] = useLocalStorage('arabicFontSize', 32);
  const [translationFontSize, setTranslationFontSize] = useLocalStorage('translationFontSize', 16);
  const { 
    isPlaying, 
    hasAudio, 
    currentVerse, 
    togglePlay, 
    goToVerse, 
    backgroundMusic, 
    setBackgroundMusic,
    isLooping,
    setIsLooping 
  } = useAudioPlayer(surah);
  const [showBgMusicMenu, setShowBgMusicMenu] = useState(false);

  // Eğer sure verisi henüz yüklenmediyse veya hatalıysa
  if (!surah?.verses?.length) {
    return (
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Geri Dön</span>
        </button>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600">
            Sure yüklenirken bir hata oluştu.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-24 sm:pb-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Geri Dön</span>
        </button>

        <FontSettings
          arabicFontSize={arabicFontSize}
          translationFontSize={translationFontSize}
          onArabicFontSizeChange={setArabicFontSize}
          onTranslationFontSizeChange={setTranslationFontSize}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{surah.name.tr}</h2>
            <p className="text-lg font-arabic text-gray-600">{surah.name.ar}</p>
          </div>
          <span className="text-2xl font-bold text-emerald-600">#{surah.id}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <SurahContent
          surah={surah}
          arabicFontSize={arabicFontSize}
          translationFontSize={translationFontSize}
          currentVerse={currentVerse}
        />
      </div>

      {/* Mobil Audio Player */}
      {hasAudio && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-all"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </button>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {surah.name.tr}
              </span>
              <span className="text-sm text-gray-500">
                {currentVerse}. Ayet
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isLooping ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Repeat size={20} />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowBgMusicMenu(!showBgMusicMenu)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  backgroundMusic ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Music2 size={20} />
              </button>
              {showBgMusicMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[160px]">
                  <button
                    onClick={() => {
                      setBackgroundMusic(null);
                      setShowBgMusicMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${!backgroundMusic ? 'text-emerald-600' : 'text-gray-700'}`}
                  >
                    Kapalı
                  </button>
                  <button
                    onClick={() => {
                      setBackgroundMusic('kus');
                      setShowBgMusicMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${backgroundMusic === 'kus' ? 'text-emerald-600' : 'text-gray-700'}`}
                  >
                    Kuş Sesi
                  </button>
                  <button
                    onClick={() => {
                      setBackgroundMusic('orman');
                      setShowBgMusicMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${backgroundMusic === 'orman' ? 'text-emerald-600' : 'text-gray-700'}`}
                  >
                    Orman Sesi
                  </button>
                  <button
                    onClick={() => {
                      setBackgroundMusic('yagmur');
                      setShowBgMusicMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${backgroundMusic === 'yagmur' ? 'text-emerald-600' : 'text-gray-700'}`}
                  >
                    Yağmur Sesi
                  </button>
                </div>
              )}
            </div>
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              onClick={() => goToVerse(Math.max(1, currentVerse - 1))}
              disabled={currentVerse === 1}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              onClick={() => goToVerse(Math.min(surah?.verses?.length || 1, currentVerse + 1))}
              disabled={currentVerse === surah?.verses?.length}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}