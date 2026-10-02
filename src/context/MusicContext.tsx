import React, { useState, useEffect, useRef } from 'react';
import { MUSIC_CONFIG, MusicContext } from './musicConfig';

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create a single Audio instance for the ENTIRE website session
    const audio = new Audio(MUSIC_CONFIG.AUDIO_SRC);
    audio.loop = true;
    audio.volume = MUSIC_CONFIG.DEFAULT_VOLUME;
    // Preload the track so it's ready to play immediately
    audio.preload = 'auto';
    audioRef.current = audio;

    const handlePlay = () => {
      setIsPlaying(true);
      setAutoplayBlocked(false);
    };
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
      setErrorMessage('Audio file unavailable or failed to load.');
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    // ── Attempt playback at 0:00 of page load ──────────────────────────────
    audio
      .play()
      .then(() => {
        // Autoplay succeeded — music is on from second 0
        setIsPlaying(true);
        setAutoplayBlocked(false);
      })
      .catch(() => {
        // Browser requires user interaction before audio can play.
        // Register a single one-time handler that covers all interaction types.
        // This fires during the intro if the visitor taps/clicks anywhere.
        setAutoplayBlocked(true);
        setIsPlaying(false);

        const resume = () => {
          if (audioRef.current && audioRef.current.paused) {
            audioRef.current
              .play()
              .then(() => {
                setIsPlaying(true);
                setAutoplayBlocked(false);
              })
              .catch(() => {
                // Silently ignore second block
              });
          }
        };

        // Use capture:true so the event is caught even during the intro overlay
        document.addEventListener('click', resume, { once: true, capture: true });
        document.addEventListener('touchstart', resume, { once: true, capture: true });
        document.addEventListener('keydown', resume, { once: true, capture: true });
      });

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Called by CosmicIntro on mount as a belt-and-suspenders fallback
  const startMusicAttempt = async (): Promise<boolean> => {
    if (!audioRef.current || !audioRef.current.paused) return !audioRef.current?.paused;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setAutoplayBlocked(false);
      return true;
    } catch {
      setAutoplayBlocked(true);
      setIsPlaying(false);
      return false;
    }
  };

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setAutoplayBlocked(false);
    } else {
      try {
        setHasError(false);
        setErrorMessage(null);
        await audioRef.current.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch {
        setAutoplayBlocked(true);
        setIsPlaying(false);
      }
    }
  };

  return (
    <MusicContext.Provider
      value={{ isPlaying, hasError, errorMessage, autoplayBlocked, togglePlayback, startMusicAttempt }}
    >
      {children}
    </MusicContext.Provider>
  );
};
