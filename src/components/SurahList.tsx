import { Surah } from '../types';
import SurahCard from './SurahCard';

interface Props {
  surahs: Surah[];
}

export default function SurahList({ surahs }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {surahs.map((surah) => (
        <SurahCard key={surah.id} surah={surah} />
      ))}
    </div>
  );
}