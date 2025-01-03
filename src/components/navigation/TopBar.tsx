import { Moon, Sun } from 'lucide-react';
import LanguageSelector from '../LanguageSelector';
import { Language } from '../../types';

interface Props {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function TopBar({ currentLang, onLanguageChange, darkMode, setDarkMode }: Props) {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-primary-light dark:text-primary-dark">
            Namaz Sureleri
          </h1>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-primary-dark" />
              ) : (
                <Moon className="w-5 h-5 text-primary-light" />
              )}
            </button>
            
            <LanguageSelector currentLang={currentLang} onLanguageChange={onLanguageChange} />
          </div>
        </div>
      </div>
    </header>
  );
}