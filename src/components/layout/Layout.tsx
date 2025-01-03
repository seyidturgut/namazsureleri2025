import React from 'react';
import TopBar from '../navigation/TopBar';
import { Language } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Layout({ children, currentLang, onLanguageChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <TopBar currentLang={currentLang} onLanguageChange={onLanguageChange} />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {children}
      </main>
    </div>
  );
}