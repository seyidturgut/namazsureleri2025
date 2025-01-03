import React from 'react';
import { surahs } from '../data/surahs';
import { Language } from '../types';
import { ScrollText } from 'lucide-react';

interface Props {
  lang: Language;
  onSelect: (id: number) => void;
}

export default function QuickNav({ lang, onSelect }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <ScrollText className="w-5 h-5 text-emerald-600" />
        <h2 className="text-lg font-semibold text-gray-800">
          {lang === 'tr' ? 'Hızlı Erişim' : 'Quick Access'}
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {surahs.map((surah) => (
          <button
            key={surah.id}
            onClick={() => onSelect(surah.id)}
            className="flex items-center justify-between px-3 py-2 text-sm bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 rounded-lg transition-colors group"
          >
            <span>{surah.name[lang]}</span>
            <span className="text-gray-400 group-hover:text-emerald-500 text-xs">
              {surah.name.ar}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}