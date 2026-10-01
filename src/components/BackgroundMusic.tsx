import React from 'react';
import { Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { useMusic } from '../context/useMusic';

export const BackgroundMusic: React.FC = () => {
  const { isPlaying, hasError, errorMessage, togglePlayback } = useMusic();

  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-center gap-3">
      {/* Floating Minimal Music Toggle Button */}
      <button
        onClick={togglePlayback}
        aria-label="Toggle background music"
        className={`relative flex items-center justify-center p-3 sm:p-3.5 rounded-full backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer ${
          isPlaying
            ? 'bg-purple-900/80 border-purple-400/80 text-purple-200 shadow-[0_0_25px_rgba(199,125,255,0.6)] hover:shadow-[0_0_35px_rgba(199,125,255,0.9)]'
            : 'bg-[#0d051a]/90 border-purple-500/30 text-purple-400/80 hover:text-white hover:border-purple-400/60 shadow-[0_0_15px_rgba(157,78,221,0.2)]'
        }`}
      >
        {/* Pulsing ring indicator when active */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping pointer-events-none" />
        )}

        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-purple-200 animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </div>
      </button>

      {/* Error Notice if audio fails to load */}
      {hasError && (
        <div className="px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-200 text-xs font-mono flex items-center gap-2 animate-fadeIn shadow-lg">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{errorMessage || 'Audio file unavailable'}</span>
        </div>
      )}
    </div>
  );
};
