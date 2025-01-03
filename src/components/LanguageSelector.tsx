import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface Props {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageSelector({ currentLang, onLanguageChange }: Props) {
  return (
    <div className="fixed top-4 right-4 flex items-center gap-2">
      <Globe className="w-5 h-5 text-gray-600" />
      <select
        value={currentLang}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="tr">Türkçe</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}