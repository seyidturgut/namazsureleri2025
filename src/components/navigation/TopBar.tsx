import React from 'react';
import { Language } from '../../types';
import { Globe, Book } from 'lucide-react';

interface Props {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function TopBar({ currentLang, onLanguageChange }: Props) {
  return (
    <div className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-2">
          <Book className="w-6 h-6 text-emerald-600" />
          <h1 className="text-xl font-semibold text-gray-800">
            {currentLang === 'tr' ? 'Namaz Sureleri' : 'Prayer Surahs'}
          </h1>
        </div>
        
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full">
          <Globe className="w-4 h-4 text-gray-500" />
          <select
            value={currentLang}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="text-sm bg-transparent border-none focus:outline-none focus:ring-0 text-gray-600"
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  );
}