import React from 'react';
import { Surah, Language } from '../types';

interface Props {
  surah: Surah;
  lang: Language;
}

export default function SurahHeader({ surah, lang }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
        {surah.name[lang]} ({surah.name.ar})
      </h2>
      <span className="text-emerald-600 text-base sm:text-lg font-semibold">#{surah.id}</span>
    </div>
  );
}