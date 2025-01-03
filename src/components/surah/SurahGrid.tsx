import React from 'react';
import { Surah, Language } from '../../types';
import { BookOpen } from 'lucide-react';

interface Props {
  surahs: Surah[];
  lang: Language;
  onSelect: (id: number) => void;
}

export default function SurahGrid({ surahs, lang, onSelect }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {surahs.map((surah) => (
        <button
          key={surah.id}
          onClick={() => onSelect(surah.id)}
          className="group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6"
        >
          <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-emerald-50 rounded-full transition-transform group-hover:scale-150" />
          
          <div className="relative flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            
            <div className="flex-1 text-left">
              <h3 className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
                {surah.name[lang]}
              </h3>
              <p className="text-sm text-gray-500 mt-1 font-arabic">
                {surah.name.ar}
              </p>
              <div className="mt-2 inline-flex items-center text-xs text-gray-400">
                #{surah.id}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}