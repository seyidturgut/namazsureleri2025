import React, { useEffect, useRef } from 'react';
import { Surah } from '../../types';

interface Props {
  surah: Surah;
  arabicFontSize: number;
  translationFontSize: number;
  currentVerse: number;
}

export default function SurahContent({
  surah,
  arabicFontSize,
  translationFontSize,
  currentVerse
}: Props) {
  const verseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (currentVerse > 0 && currentVerse <= verseRefs.current.length) {
      verseRefs.current[currentVerse - 1]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentVerse]);

  return (
    <div className="space-y-8">
      {surah.verses.map((verse, index) => (
        <div 
          key={index + 1}
          ref={el => verseRefs.current[index] = el}
          className={`p-4 -mx-4 rounded-lg transition-colors ${
            currentVerse === index + 1 ? 'bg-emerald-50' : 'hover:bg-gray-50'
          }`}
        >
          <p
            className="font-arabic text-right mb-2 leading-loose"
            style={{ fontSize: `${arabicFontSize}px` }}
          >
            {verse.ar}
          </p>
          <p
            className="text-gray-600"
            style={{ fontSize: `${translationFontSize}px` }}
          >
            {verse.tr}
          </p>
          <div className="flex justify-end mt-2">
            <span className="text-sm text-gray-400">
              {index + 1}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}