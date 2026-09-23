import React from 'react';
import { PowerStone3D } from '../components/PowerStone3D';

interface FinalCTAProps {
  onOpenRegister: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenRegister }) => {
  return (
    <section className="relative py-28 sm:py-36 lg:py-44 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
      {/* Background Energy Core Glow / Large Circular Portal Video */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60 z-0 flex items-center justify-center">
        <PowerStone3D size="w-[300px] h-[300px] sm:w-[460px] sm:h-[460px] lg:w-[560px] lg:h-[560px]" videoSrc="/Images/Last.mp4" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Heading */}
        <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
          READY TO <span className="text-gradient-purple">BUILD?</span>
        </h2>

        {/* Subtitles */}
        <div className="space-y-1.5 text-slate-200 text-base sm:text-lg font-heading font-medium tracking-wide">
          <p className="text-purple-200 font-semibold">Build it. Test it. Show us what it can do.</p>
          <p className="text-slate-300">Bring your team, your hardware, and your ideas to IOTHRONE 2026.</p>
        </div>

        {/* Large CTA Button */}
        <div className="pt-6">
          <button
            onClick={onOpenRegister}
            className="relative group overflow-hidden rounded-2xl p-[2px] font-heading text-base font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-[0_0_50px_rgba(157,78,221,0.5)] hover:shadow-[0_0_80px_rgba(199,125,255,0.9)] transition-all duration-500 transform hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-400 to-indigo-600 rounded-2xl animate-pulse" />
            <span className="relative flex items-center justify-center px-10 py-5 rounded-[14px] bg-[#0d051a] text-white group-hover:bg-opacity-80 transition-all duration-300">
              ENTER IOTHRONE
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
