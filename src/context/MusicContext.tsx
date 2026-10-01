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
      // Browser blocked autoplay or failed silently
      setAutoplayBlocked(true);
      setIsPlaying(false);
      return false;
    }
  };

  const togglePlayback = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      await startMusicAttempt();
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
