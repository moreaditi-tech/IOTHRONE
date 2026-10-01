import React, { useState, useEffect, useRef } from 'react';
import { MUSIC_CONFIG, MusicContext } from './musicConfig';

const STORAGE_KEY = 'iothrone_music_enabled';

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

    // Attempt playback immediately on page open if not explicitly turned OFF
    const savedPref = localStorage.getItem(STORAGE_KEY);
    if (savedPref !== 'false') {
      audio.play().then(() => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
        localStorage.setItem(STORAGE_KEY, 'true');
      }).catch(() => {
        // Autoplay blocked by browser policy
        setAutoplayBlocked(true);
        setIsPlaying(false);
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

    // Respect stored user preference
    const savedPref = localStorage.getItem(STORAGE_KEY);
    if (savedPref === 'false') {
      setIsPlaying(false);
      setAutoplayBlocked(false);
      return false;
    }

    try {
      setHasError(false);
      setErrorMessage(null);
      await audioRef.current.play();
      setIsPlaying(true);
      setAutoplayBlocked(false);
      localStorage.setItem(STORAGE_KEY, 'true');
      return true;
    } catch {
      // Browser blocked autoplay or failed
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
      localStorage.setItem(STORAGE_KEY, 'false');
    } else {
      try {
        setHasError(false);
        setErrorMessage(null);
        await audioRef.current.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
        localStorage.setItem(STORAGE_KEY, 'true');
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
