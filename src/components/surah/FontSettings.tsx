import React from 'react';
import { Minus, Plus, Type } from 'lucide-react';

interface FontSettingsProps {
  arabicFontSize: number;
  translationFontSize: number;
  onArabicFontSizeChange: (size: number) => void;
  onTranslationFontSizeChange: (size: number) => void;
}

export default function FontSettings({
  arabicFontSize,
  translationFontSize,
  onArabicFontSizeChange,
  onTranslationFontSizeChange
}: FontSettingsProps) {
  const adjustSize = (current: number, change: number, min: number, max: number) => {
    return Math.min(Math.max(current + change, min), max);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-4">
      {/* Arapça Font Ayarı */}
      <div className="flex-1 bg-white rounded-lg shadow-sm p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-emerald-50 flex items-center justify-center">
            <Type className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <span className="text-sm font-medium text-gray-900">Arapça</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onArabicFontSizeChange(adjustSize(arabicFontSize, -2, 16, 48))}
            className="w-7 h-7 rounded hover:bg-gray-100 active:bg-gray-200 text-gray-600 touch-manipulation flex items-center justify-center"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-sm font-medium text-gray-900 w-6 text-center">{arabicFontSize}</span>
          <button
            onClick={() => onArabicFontSizeChange(adjustSize(arabicFontSize, 2, 16, 48))}
            className="w-7 h-7 rounded hover:bg-gray-100 active:bg-gray-200 text-gray-600 touch-manipulation flex items-center justify-center"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Meal Font Ayarı */}
      <div className="flex-1 bg-white rounded-lg shadow-sm p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-blue-50 flex items-center justify-center">
            <Type className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-900">Meal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onTranslationFontSizeChange(adjustSize(translationFontSize, -1, 12, 24))}
            className="w-7 h-7 rounded hover:bg-gray-100 active:bg-gray-200 text-gray-600 touch-manipulation flex items-center justify-center"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-sm font-medium text-gray-900 w-6 text-center">{translationFontSize}</span>
          <button
            onClick={() => onTranslationFontSizeChange(adjustSize(translationFontSize, 1, 12, 24))}
            className="w-7 h-7 rounded hover:bg-gray-100 active:bg-gray-200 text-gray-600 touch-manipulation flex items-center justify-center"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}