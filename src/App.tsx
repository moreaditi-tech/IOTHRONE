import { useState } from 'react';
import { MusicProvider } from './context/MusicContext';
import { CosmicIntro } from './components/CosmicIntro';
import { EnergyBackground } from './components/EnergyBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Challenge } from './sections/Challenge';
import { Timeline } from './sections/Timeline';
import { CompetitionFlow } from './sections/CompetitionFlow';
import { PrizeDistribution } from './sections/PrizeDistribution';
import { Rules } from './sections/Rules';
import { FAQ } from './sections/FAQ';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { BackgroundMusic } from './components/BackgroundMusic';
import { PurpleGlitterCursor } from './components/PurpleGlitterCursor';

const INTRO_SESSION_KEY = 'iothrone_intro_seen';

function AppContent() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(() => {
    return sessionStorage.getItem(INTRO_SESSION_KEY) !== 'true';
  });

  const handleOpenRegister = () => setIsRegisterModalOpen(true);
  const handleCloseRegister = () => setIsRegisterModalOpen(false);

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    setShowIntro(false);
  };

  return (
    <div className="relative min-h-screen bg-[#05020a] text-slate-100 selection:bg-purple-600 selection:text-white antialiased overflow-x-hidden">
      {/* 10-Second Cinematic Cosmic Video Intro */}
      {showIntro && <CosmicIntro onComplete={handleIntroComplete} />}

      {/* Premium Purple Glitter Cursor Effect for Desktop */}
      <PurpleGlitterCursor />

      {/* Background Energy Cosmic Particles */}
      <EnergyBackground />

      {/* Sticky Glass Navbar */}
      <Navbar onOpenRegister={handleOpenRegister} />

      {/* Main Website Sections */}
      <main className="relative z-10">
        <Hero onOpenRegister={handleOpenRegister} />
        <About />
        <Challenge />
        <Timeline />
        <CompetitionFlow />
        <PrizeDistribution />
        <Rules />
        <FAQ />
        <FinalCTA onOpenRegister={handleOpenRegister} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Background Music Player */}
      <BackgroundMusic />

      {/* Interactive Registration Modal */}
      <RegistrationModal isOpen={isRegisterModalOpen} onClose={handleCloseRegister} />
    </div>
  );
}

export function App() {
  return (
    <MusicProvider>
      <AppContent />
    </MusicProvider>
  );
}

export default App;
