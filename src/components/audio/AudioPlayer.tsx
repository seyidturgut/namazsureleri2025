import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Language } from '../../types';

interface AudioPlayerProps {
  surahId: number;
  lang: Language;
}

export default function AudioPlayer({ surahId, lang }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Temporary audio URL - replace with actual surah audio files later
  const audioUrl = `/audio/surah-${surahId}.mp3`;

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-3xl">
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          onError={(e) => console.log('Audio error:', e)}
        />
        
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          
          <button
            onClick={toggleMute}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        <div className="text-sm text-gray-600">
          {lang === 'tr' ? 'Sesli Dinle' : 'Listen'}
        </div>
      </div>
    </div>
  );
}