import { Minus, Plus } from 'lucide-react';

interface Props {
  arabicFontSize: number;
  translationFontSize: number;
  onArabicFontSizeChange: (size: number) => void;
  onTranslationFontSizeChange: (size: number) => void;
}

export default function FontSettings({
  arabicFontSize,
  translationFontSize,
  onArabicFontSizeChange,
  onTranslationFontSizeChange,
}: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-secondary-light dark:text-secondary-dark mb-2">
            Arapça Font Boyutu
          </h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onArabicFontSizeChange(Math.max(16, arabicFontSize - 2))}
              className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-primary-light dark:text-primary-dark hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm text-primary-light dark:text-primary-dark">
              {arabicFontSize}px
            </span>
            <button
              onClick={() => onArabicFontSizeChange(Math.min(48, arabicFontSize + 2))}
              className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-primary-light dark:text-primary-dark hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-secondary-light dark:text-secondary-dark mb-2">
            Çeviri Font Boyutu
          </h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onTranslationFontSizeChange(Math.max(12, translationFontSize - 1))}
              className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-primary-light dark:text-primary-dark hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm text-primary-light dark:text-primary-dark">
              {translationFontSize}px
            </span>
            <button
              onClick={() => onTranslationFontSizeChange(Math.min(24, translationFontSize + 1))}
              className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-primary-light dark:text-primary-dark hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}