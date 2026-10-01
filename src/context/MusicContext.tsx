import React, { useState, useEffect, useRef } from 'react';
import { MUSIC_CONFIG, MusicContext } from './musicConfig';

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create a single Audio instance for the entire website session
    const audio = new Audio(MUSIC_CONFIG.AUDIO_SRC);
    audio.loop = true;
    audio.volume = MUSIC_CONFIG.DEFAULT_VOLUME;
    audioRef.current = audio;

    const handlePlay = () => {
      setIsPlaying(true);
      setAutoplayBlocked(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
      setErrorMessage('Audio file unavailable or failed to load.');
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    // Attempt playback immediately on fresh page load (default ON)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch(() => {
          // Autoplay blocked by browser policy
          setAutoplayBlocked(true);
          setIsPlaying(false);

          // One-time interaction fallback to start audio on first permitted user interaction
          const handleFirstInteraction = () => {
            if (audioRef.current && audioRef.current.paused) {
              audioRef.current
                .play()
                .then(() => {
                  setIsPlaying(true);
                  setAutoplayBlocked(false);
                })
                .catch(() => {
                  // Silently ignore
                });
            }
            window.removeEventListener('pointerdown', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
          };

          window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
          window.addEventListener('keydown', handleFirstInteraction, { once: true });
        });
    }

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const startMusicAttempt = async (): Promise<boolean> => {
    if (!audioRef.current) return false;
    try {
      setHasError(false);
      setErrorMessage(null);
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
      } catch (err) {
        console.error('Playback attempt failed:', err);
        setAutoplayBlocked(true);
        setIsPlaying(false);
      }
    }
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        hasError,
        errorMessage,
        autoplayBlocked,
        togglePlayback,
        startMusicAttempt,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
