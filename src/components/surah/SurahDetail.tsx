import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Surah, Language } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import FontSettings from './FontSettings';
import SurahContent from './SurahContent';
import AudioPlayer from '../audio/AudioPlayer';

interface Props {
  surah: Surah;
  lang: Language;
  onBack: () => void;
}

export default function SurahDetail({ surah, lang, onBack }: Props) {
  const [arabicFontSize, setArabicFontSize] = useLocalStorage('arabicFontSize', 32);
  const [translationFontSize, setTranslationFontSize] = useLocalStorage('translationFontSize', 16);

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{lang === 'tr' ? 'Geri Dön' : 'Go Back'}</span>
      </button>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{surah.name[lang]}</h2>
            <p className="text-lg font-arabic text-gray-600">{surah.name.ar}</p>
          </div>
          <span className="text-2xl font-bold text-emerald-600">#{surah.id}</span>
        </div>
      </div>

      <FontSettings
        arabicFontSize={arabicFontSize}
        translationFontSize={translationFontSize}
        onArabicFontSizeChange={setArabicFontSize}
        onTranslationFontSizeChange={setTranslationFontSize}
        lang={lang}
      />

      <div className="bg-white rounded-lg shadow-sm p-6">
        <SurahContent
          surah={surah}
          lang={lang}
          arabicFontSize={arabicFontSize}
          translationFontSize={translationFontSize}
        />
      </div>

      <AudioPlayer surahId={surah.id} lang={lang} />
    </div>
  );
}