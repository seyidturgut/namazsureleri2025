import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface Props {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function TopBar({ currentLang, onLanguageChange }: Props) {
  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">
          {currentLang === 'tr' ? 'Namaz Sureleri' : 'Prayer Surahs'}
        </h1>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-gray-600" />
          <select
            value={currentLang}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="text-sm bg-transparent border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  );
}