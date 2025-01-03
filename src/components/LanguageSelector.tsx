import { Globe } from 'lucide-react';
import { Language } from '../types';

interface Props {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageSelector({ currentLang, onLanguageChange }: Props) {
  return (
    <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
      <Globe className="w-4 h-4 text-primary-light dark:text-primary-dark" />
      <select
        value={currentLang}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="text-sm bg-transparent border-none focus:outline-none focus:ring-0 text-primary-light dark:text-primary-dark"
      >
        <option value="tr">Türkçe</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}