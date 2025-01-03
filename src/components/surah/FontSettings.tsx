import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface FontSettingsProps {
  arabicFontSize: number;
  translationFontSize: number;
  setArabicFontSize: (size: number) => void;
  setTranslationFontSize: (size: number) => void;
}

const FontSettings: React.FC<FontSettingsProps> = ({
  arabicFontSize,
  translationFontSize,
  setArabicFontSize,
  setTranslationFontSize,
}) => {
  return (
    <div className="fixed inset-x-0 bottom-24 mx-auto max-w-sm bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-medium text-white">Arapça</span>
            <span className="text-sm text-gray-400">{arabicFontSize}px</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setArabicFontSize(Math.max(arabicFontSize - 2, 24))}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white active:scale-95 transition-all"
            >
              <Minus size={20} />
            </button>
            <button
              onClick={() => setArabicFontSize(Math.min(arabicFontSize + 2, 72))}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white active:scale-95 transition-all"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-medium text-white">Çeviri</span>
            <span className="text-sm text-gray-400">{translationFontSize}px</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTranslationFontSize(Math.max(translationFontSize - 1, 12))}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white active:scale-95 transition-all"
            >
              <Minus size={20} />
            </button>
            <button
              onClick={() => setTranslationFontSize(Math.min(translationFontSize + 1, 32))}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white active:scale-95 transition-all"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontSettings;