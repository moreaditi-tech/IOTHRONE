import { createContext } from 'react';

export const MUSIC_CONFIG = {
  AUDIO_SRC: '/audio/all-the-stars-instrumental.mp3',
  TITLE: 'All The Stars',
  ARTIST: 'Kendrick Lamar & SZA (Instrumental)',
  DEFAULT_VOLUME: 0.35, // Moderate volume
};

export interface MusicContextType {
  isPlaying: boolean;
  hasError: boolean;
  errorMessage: string | null;
  autoplayBlocked: boolean;
  togglePlayback: () => Promise<void>;
  startMusicAttempt: () => Promise<boolean>;
}

export const MusicContext = createContext<MusicContextType | null>(null);
