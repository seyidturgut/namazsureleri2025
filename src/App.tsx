import React, { useState } from 'react';
import { Language } from './types';
import { surahs } from './data/surahs';
import Layout from './components/layout/Layout';
import SurahGrid from './components/surah/SurahGrid';
import SurahDetail from './components/SurahDetail';

export default function App() {
  const [lang, setLang] = useState<Language>('tr');
  const [selectedSurahId, setSelectedSurahId] = useState<number | null>(null);

  const selectedSurah = selectedSurahId 
    ? surahs.find(s => s.id === selectedSurahId)
    : null;

  return (
    <Layout currentLang={lang} onLanguageChange={setLang}>
      {selectedSurah ? (
        <SurahDetail 
          surah={selectedSurah}
          lang={lang}
          onBack={() => setSelectedSurahId(null)}
        />
      ) : (
        <SurahGrid 
          surahs={surahs}
          lang={lang}
          onSelect={setSelectedSurahId}
        />
      )}
    </Layout>
  );
}