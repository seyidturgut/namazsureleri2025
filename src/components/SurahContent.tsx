import React from 'react';
import { Surah, Language } from '../types';

interface Props {
  surah: Surah;
  lang: Language;
}

export default function SurahContent({ surah, lang }: Props) {
  return (
    <div className="space-y-3">
      <div className="text-right bg-gray-50 rounded-lg p-3">
        <p className="text-xl sm:text-2xl leading-loose font-arabic text-gray-800" dir="rtl">
          {surah.arabic}
        </p>
      </div>
      
      <div className="border-t border-gray-100 pt-3">
        <h3 className="text-base font-semibold text-gray-700 mb-2">
          {lang === 'tr' ? 'Okunuşu' : 'Transliteration'}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {surah.transliteration[lang]}
        </p>
      </div>
      
      <div className="border-t border-gray-100 pt-3">
        <h3 className="text-base font-semibold text-gray-700 mb-2">
          {lang === 'tr' ? 'Meali' : 'Translation'}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {surah.translation[lang]}
        </p>
      </div>
    </div>
  );
}