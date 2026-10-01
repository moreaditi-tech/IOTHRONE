import React, { useState, useEffect } from 'react';
import { Music, Volume2 } from 'lucide-react';
import { useMusic } from '../context/useMusic';

interface CosmicIntroProps {
  onComplete: () => void;
}

export const CosmicIntro: React.FC<CosmicIntroProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(1);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const { isPlaying, startMusicAttempt, togglePlayback } = useMusic();

  // 1. Attempt background music playback immediately when intro initializes
  useEffect(() => {
    startMusicAttempt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. 10-second smooth counter from 1% to 100%
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Total duration ~10,000ms (10 seconds), 100 steps -> 100ms per step
    const stepDuration = prefersReducedMotion ? 40 : 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  // 3. At 100%, trigger smooth 700ms fade-out and complete intro
  useEffect(() => {
    if (progress === 100) {
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 200);

      const finishTimer = setTimeout(() => {
        onComplete();
      }, 900);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(finishTimer);
      };
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#05020a] flex items-center justify-center select-none overflow-hidden transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* FULL-SCREEN GALAXY VIDEO BACKGROUND */}
      {!videoError ? (
        <video
          src="/Intro.mp4"
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />
      ) : (
        /* Fallback cosmic image background if video fails */
        <img
          src="/Images/Background.png"
          alt="Cosmic Environment"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70 pointer-events-none"
        />
      )}

      {/* Atmospheric Translucent Dark Overlay */}
      <div className="absolute inset-0 bg-[#05020a]/50 backdrop-blur-[1px] pointer-events-none" />

      {/* CENTERED CONTENT CONTAINER */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 space-y-6 max-w-3xl w-full animate-fadeIn">
        {/* LARGE CENTERED IOTHRONE TITLE */}
        <div className="space-y-2 transform transition-transform duration-1000 scale-100">
          <h1 className="font-heading font-black text-6xl sm:text-8xl md:text-9xl tracking-widest text-white drop-shadow-[0_0_50px_rgba(199,125,255,0.8)] leading-none uppercase">
            IO<span className="text-gradient-purple">THRONE</span>
          </h1>
          <p className="font-mono text-xs sm:text-sm text-purple-300/80 tracking-widest uppercase">
            2026 OFFICIAL EDITION
          </p>
        </div>

        {/* LOADING COUNTER & PROGRESS BAR */}
        <div className="w-64 sm:w-96 space-y-3 pt-4">
          <div className="flex items-center justify-between font-mono text-sm sm:text-base text-purple-200">
            <span className="text-xs text-purple-400/80 uppercase tracking-widest">INITIALIZING</span>
            <span className="font-bold text-white text-base sm:text-lg">{progress}%</span>
          </div>

          {/* Thin Glowing Purple Progress Bar */}
          <div className="h-1.5 w-full rounded-full bg-purple-950/80 border border-purple-500/30 overflow-hidden p-[1px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-400 to-indigo-500 shadow-[0_0_15px_rgba(199,125,255,0.9)] transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* AUTOPLAY MUSIC FALLBACK / ENABLE CONTROL */}
        <div className="pt-3">
          {isPlaying ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-mono tracking-wider backdrop-blur-md animate-fadeIn">
              <Volume2 className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
              <span>BACKGROUND MUSIC ACTIVE</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => togglePlayback()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/60 hover:bg-purple-800/90 border border-purple-400/50 text-white text-xs font-mono tracking-wider shadow-[0_0_20px_rgba(157,78,221,0.5)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Music className="w-3.5 h-3.5 text-purple-300 animate-bounce" />
              <span>TAP TO ENABLE MUSIC</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
