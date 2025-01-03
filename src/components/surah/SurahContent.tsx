import { useRef, useEffect } from 'react';
import { Surah } from '../../types';

interface Props {
  surah: Surah;
  currentVerse: number;
}

export default function SurahContent({ surah, currentVerse }: Props) {
  const verseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (currentVerse > 0 && verseRefs.current[currentVerse - 1]) {
      verseRefs.current[currentVerse - 1]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentVerse]);

  return (
    <div className="space-y-8">
      {surah.verses.map((verse, index) => (
        <div
          key={index}
          ref={(el) => (verseRefs.current[index] = el)}
          className={`p-4 rounded-lg transition-colors duration-200 ${
            currentVerse === index + 1
              ? 'bg-accent-light/10 dark:bg-accent-dark/10'
              : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-2xl font-arabic leading-loose text-secondary-light dark:text-secondary-dark mb-4">
                {verse.ar}
              </p>
              <p className="text-base text-primary-light dark:text-primary-dark">
                {verse.tr}
              </p>
            </div>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-accent-light/10 dark:bg-accent-dark/10 text-accent-light dark:text-accent-dark font-medium">
              {index + 1}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}