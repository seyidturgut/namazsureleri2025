import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Surah, Language } from '../types';

interface Props {
  surahs: Surah[];
  lang: Language;
  onSelect: (id: number) => void;
}

export default function SurahList({ surahs, lang, onSelect }: Props) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {surahs.map((surah) => (
        <button
          key={surah.id}
          onClick={() => onSelect(surah.id)}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium">
              {surah.id}
            </span>
            <div className="text-left">
              <div className="font-medium text-gray-900">{surah.name[lang]}</div>
              <div className="text-sm text-gray-500 font-arabic">{surah.name.ar}</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
        </button>
      ))}
    </div>
  );
}