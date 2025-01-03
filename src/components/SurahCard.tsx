import { Link } from 'react-router-dom';
import { Surah } from '../types';

interface Props {
  surah: Surah;
}

export default function SurahCard({ surah }: Props) {
  return (
    <Link
      to={`/surah/${surah.id}`}
      className="block p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-accent-light dark:bg-accent-dark text-white font-medium">
            {surah.id}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-secondary-light dark:text-secondary-dark">
              {surah.name.tr}
            </h2>
            <p className="text-sm text-primary-light dark:text-primary-dark">
              {surah.name.en}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-arabic text-secondary-light dark:text-secondary-dark">
            {surah.name.ar}
          </p>
        </div>
      </div>
    </Link>
  );
}