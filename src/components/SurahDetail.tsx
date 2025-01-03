import { useParams } from 'react-router-dom';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { Surah } from '../types';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import SurahContent from './surah/SurahContent';
import FontSettings from './surah/FontSettings';

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

  if (!surah) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-primary-light dark:text-primary-dark">Sure bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <FontSettings
        arabicFontSize={arabicFontSize}
        translationFontSize={translationFontSize}
        onArabicFontSizeChange={setArabicFontSize}
        onTranslationFontSizeChange={setTranslationFontSize}
      />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-secondary-light dark:text-secondary-dark">
            {surah.name.tr}
          </h1>
          <p className="text-3xl font-arabic text-secondary-light dark:text-secondary-dark">
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

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={previousVerse}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-primary-light dark:text-primary-dark"
              aria-label="Previous verse"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-accent-light dark:bg-accent-dark text-white hover:opacity-90 transition-opacity"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>

            <button
              onClick={nextVerse}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-primary-light dark:text-primary-dark"
              aria-label="Next verse"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLoop}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isLooping ? 'text-accent-light dark:text-accent-dark' : 'text-primary-light dark:text-primary-dark'
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
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-primary-light dark:text-primary-dark border-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark"
            >
              <option value="">Arkaplan Müziği</option>
              <option value="kus">Kuş</option>
              <option value="orman">Orman</option>
              <option value="yagmur">Yağmur</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}