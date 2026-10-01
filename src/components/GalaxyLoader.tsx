import React, { useState, useEffect } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { useMusic } from '../context/useMusic';
import { MUSIC_CONFIG } from '../context/musicConfig';

interface GalaxyLoaderProps {
  onComplete: () => void;
}

export const GalaxyLoader: React.FC<GalaxyLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const { isPlaying, autoplayBlocked, startMusicAttempt, togglePlayback } = useMusic();

  // Attempt music autoplay at the very start of galaxy initialization
  useEffect(() => {
    startMusicAttempt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Smooth loading animation from 0% to 100% (independent of music status)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stepDuration = prefersReducedMotion ? 10 : 20;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Smooth logarithmic step speed
        const increment = prev < 70 ? Math.floor(Math.random() * 5) + 3 : 2;
        return Math.min(100, prev + increment);
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  // When progress hits 100%, smoothly fade out and notify parent
  useEffect(() => {
    if (progress === 100) {
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 200);

      const finishTimer = setTimeout(() => {
        onComplete();
      }, 800);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(finishTimer);
      };
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#05020a] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Ambient Cosmic Glows */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute w-[350px] h-[350px] bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Central Galaxy Loader Container */}
      <div className="relative z-10 flex flex-col items-center space-y-7 max-w-md w-full">
        {/* Pulsing Core Energy Orb */}
        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-purple-500/40 bg-purple-950/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(157,78,221,0.4)] animate-spin-slow">
            <div className="w-12 h-12 rounded-full border border-dashed border-purple-300/60 animate-spin-reverse" />
          </div>
          <span className="absolute font-mono font-bold text-sm text-purple-200 tracking-wider">
            {progress}%
          </span>
        </div>

        {/* Branding & Title */}
        <div className="space-y-1.5">
          <h1 className="font-heading font-black text-3xl sm:text-4xl tracking-widest text-white drop-shadow-[0_0_25px_rgba(157,78,221,0.5)]">
            IO<span className="text-gradient-purple">THRONE</span>
          </h1>
          <p className="font-mono text-[11px] text-purple-300/80 tracking-widest uppercase">
            INITIALIZING GALAXY CORE 2026
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 sm:w-80 space-y-2">
          <div className="h-1.5 w-full rounded-full bg-purple-950/80 border border-purple-500/30 overflow-hidden p-[1px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-400 to-indigo-500 shadow-[0_0_15px_rgba(199,125,255,0.8)] transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-purple-400/70 tracking-widest">
            <span>SYSTEM_READY</span>
            <span>{progress === 100 ? 'COMPLETE' : 'LOADING...'}</span>
          </div>
        </div>

        {/* Autoplay Music Fallback / Enable Control */}
        <div className="pt-2">
          {isPlaying ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-mono tracking-wider backdrop-blur-md animate-fadeIn">
              <Volume2 className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
              <span>
                MUSIC: <strong className="text-white">{MUSIC_CONFIG.TITLE}</strong>
              </span>
            </div>
          ) : autoplayBlocked ? (
            <button
              type="button"
              onClick={() => togglePlayback()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/50 hover:bg-purple-800/80 border border-purple-400/50 text-white text-xs font-mono tracking-wider shadow-[0_0_20px_rgba(157,78,221,0.4)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Music className="w-3.5 h-3.5 text-purple-300 animate-bounce" />
              <span>ENABLE BACKGROUND MUSIC</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/20 border border-purple-500/20 text-purple-400/70 text-[11px] font-mono tracking-wider">
              <VolumeX className="w-3.5 h-3.5" />
              <span>AUDIO INITIALIZING</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
