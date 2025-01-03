export type Language = 'tr' | 'en';

interface LanguageText {
  tr: string;
  en: string;
  ar?: string;
}

export interface Verse {
  ar: string;
  tr: string;
  en: string;
}

export interface Surah {
  id: number;
  name: {
    ar: string;
    tr: string;
    en: string;
  };
  verses: Verse[];
}