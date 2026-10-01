import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, AlertCircle } from 'lucide-react';

/**
 * Centralized Configuration for Website Background Music
 */
const MUSIC_CONFIG = {
  // Audio file path relative to public directory
  AUDIO_SRC: '/audio/all-the-stars-instrumental.mp3',
  TITLE: 'All The Stars',
  ARTIST: 'Kendrick Lamar & SZA (Instrumental)',
  DEFAULT_VOLUME: 0.35, // 35% moderate volume
};

export const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize single Audio object instance
    const audio = new Audio(MUSIC_CONFIG.AUDIO_SRC);
    audio.loop = true;
    audio.volume = MUSIC_CONFIG.DEFAULT_VOLUME;
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
      setErrorMessage('Audio file unavailable or failed to load.');
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      setHasError(false);
      setErrorMessage(null);
      try {
        await audioRef.current.play();
      } catch (err) {
        console.error('Audio playback failed:', err);
        setHasError(true);
        setIsPlaying(false);
        setErrorMessage('Playback prevented by browser or file missing.');
      }
    }
  };

  const accessibleLabel = `Play/Pause ${MUSIC_CONFIG.TITLE} — ${MUSIC_CONFIG.ARTIST}`;

  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-center gap-3">
      {/* Floating Music Toggle Button */}
      <button
        onClick={togglePlayback}
        aria-label={accessibleLabel}
        title={accessibleLabel}
        className={`relative group flex items-center justify-center p-3 sm:p-3.5 rounded-full backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
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

        {/* Floating Tooltip Pill (Shows track details on hover) */}
        <div className="absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-[#0d051a]/95 border border-purple-500/30 text-xs font-mono text-purple-200 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-lg flex items-center gap-2">
          <Music className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span>
            {isPlaying ? 'NOW PLAYING: ' : 'PLAY: '}
            <strong className="text-white">{MUSIC_CONFIG.TITLE}</strong> — {MUSIC_CONFIG.ARTIST}
          </span>
        </div>
      </button>

      {/* Animated Equalizer Waveform Indicator when playing */}
      {isPlaying && (
        <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[10px] font-mono tracking-wider backdrop-blur-md animate-fadeIn">
          <span className="w-1 h-3 bg-purple-400 rounded-full animate-[bounce_1s_infinite_100ms]" />
          <span className="w-1 h-4 bg-fuchsia-400 rounded-full animate-[bounce_1s_infinite_300ms]" />
          <span className="w-1 h-2 bg-indigo-400 rounded-full animate-[bounce_1s_infinite_200ms]" />
          <span className="w-1 h-3.5 bg-purple-300 rounded-full animate-[bounce_1s_infinite_400ms]" />
          <span className="ml-1 text-[9px] uppercase tracking-widest text-purple-200/90 font-semibold">
            BACKGROUND MUSIC
          </span>
        </div>
      )}

      {/* Error Notice */}
      {hasError && (
        <div className="px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-200 text-xs font-mono flex items-center gap-2 animate-fadeIn shadow-lg">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{errorMessage || 'Audio file unavailable'}</span>
        </div>
      )}
    </div>
  );
};
