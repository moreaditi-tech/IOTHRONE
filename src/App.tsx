import { useState } from 'react';
import { EnergyBackground } from './components/EnergyBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Challenge } from './sections/Challenge';
import { Timeline } from './sections/Timeline';
import { CompetitionFlow } from './sections/CompetitionFlow';
import { TechnologyCore } from './sections/TechnologyCore';
import { Benefits } from './sections/Benefits';
import { Rules } from './sections/Rules';
import { FAQ } from './sections/FAQ';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';

export function App() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleOpenRegister = () => setIsRegisterModalOpen(true);
  const handleCloseRegister = () => setIsRegisterModalOpen(false);

  return (
    <div className="relative min-h-screen bg-[#05020a] text-slate-100 selection:bg-purple-600 selection:text-white antialiased overflow-x-hidden">
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
        <TechnologyCore />
        <Benefits />
        <Rules />
        <FAQ />
        <FinalCTA onOpenRegister={handleOpenRegister} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Registration Modal & Digital Pass Generator */}
      <RegistrationModal isOpen={isRegisterModalOpen} onClose={handleCloseRegister} />
    </div>
  );
}

export default App;
