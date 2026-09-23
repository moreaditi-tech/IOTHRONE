import React from 'react';
import { PowerStone3D } from '../components/PowerStone3D';
import { ChevronDown, Calendar } from 'lucide-react';

interface HeroProps {
  onOpenRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister }) => {
  const scrollToTimeline = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('timeline');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Atmosphere Elements */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium tracking-widest uppercase shadow-[0_0_15px_rgba(157,78,221,0.2)]">
            <span>IOTHRONE 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-purple-400">IOT COMPETITION</span>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h1 className="font-heading font-black text-6xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-none text-white drop-shadow-[0_0_35px_rgba(157,78,221,0.4)]">
              IO<span className="text-gradient-purple">THRONE</span>
            </h1>
            <p className="font-heading font-medium text-lg sm:text-xl lg:text-2xl text-purple-200/90 tracking-wide pt-1">
              Where Innovation Meets Intelligent Connectivity.
            </p>
          </div>

          {/* Tagline */}
          <div className="flex items-center gap-3 py-1">
            <span className="h-[2px] w-12 bg-gradient-to-r from-purple-500 to-transparent" />
            <p className="font-mono text-xs sm:text-sm tracking-widest text-purple-300 uppercase">
              Build. Integrate. Innovate.
            </p>
          </div>

          {/* Short Narrative */}
          <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
            Build an IoT solution, test it with real hardware, and take it through three rounds of evaluation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto">
            {/* Enter Challenge CTA */}
            <button
              onClick={onOpenRegister}
              className="relative group overflow-hidden rounded-xl p-[1.5px] font-heading text-sm font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-[0_0_30px_rgba(157,78,221,0.35)] hover:shadow-[0_0_45px_rgba(199,125,255,0.6)] transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-400 to-indigo-600 rounded-xl group-hover:scale-105 transition-transform" />
              <span className="relative flex items-center justify-center gap-2.5 px-7 py-4 rounded-[10px] bg-[#0d051a] text-white group-hover:bg-opacity-80 transition-all duration-300">
                ENTER THE CHALLENGE
              </span>
            </button>

            {/* Explore Timeline CTA */}
            <a
              href="#timeline"
              onClick={scrollToTimeline}
              className="glass-panel glass-panel-hover flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-heading text-sm font-semibold tracking-widest text-purple-200 hover:text-white transition-all text-center"
            >
              <Calendar className="w-4 h-4 text-purple-400" />
              EXPLORE TIMELINE
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-purple-900/30 w-full max-w-lg">
            <div>
              <span className="block font-heading font-bold text-2xl text-white">03</span>
              <span className="block font-mono text-[10px] text-purple-300/70 tracking-wider">COMPETITION STAGES</span>
            </div>
            <div>
              <span className="block font-heading font-bold text-2xl text-white">100%</span>
              <span className="block font-mono text-[10px] text-purple-300/70 tracking-wider">HARDWARE DEMO</span>
            </div>
            <div>
              <span className="block font-heading font-bold text-2xl text-white">2026</span>
              <span className="block font-mono text-[10px] text-purple-300/70 tracking-wider">OFFICIAL EDITION</span>
            </div>
          </div>
        </div>

        {/* Right Column: Animated Power Core Video Centerpiece */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <PowerStone3D size="w-72 h-72 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px]" videoSrc="/Images/Home2.mp4" />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 focus:outline-none"
        >
          <span className="font-mono text-[10px] text-purple-300 tracking-widest uppercase">
            SCROLL TO DISCOVER
          </span>
          <ChevronDown className="w-4 h-4 text-purple-400 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
