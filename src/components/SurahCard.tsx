import React from 'react';
import { Surah, Language } from '../types';
import SurahHeader from './SurahHeader';
import SurahContent from './SurahContent';

interface Props {
  surah: Surah;
  lang: Language;
}

export default function SurahCard({ surah, lang }: Props) {
  return (
    <div id={`surah-${surah.id}`} className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4">
      <SurahHeader surah={surah} lang={lang} />
      <SurahContent surah={surah} lang={lang} />
    </div>
  );
}