import React from 'react';
import { PowerStone3D } from '../components/PowerStone3D';
import { Rocket, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onOpenRegister: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenRegister }) => {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden flex flex-col items-center text-center">
      {/* Background Energy Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40 z-0">
        <PowerStone3D size="w-[500px] h-[500px] sm:w-[700px] sm:h-[700px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(157,78,221,0.3)]">
          <Sparkles className="w-4 h-4 text-purple-300 animate-spin-slow" />
          FINAL CALL TO INNOVATORS
        </div>

        {/* Heading */}
        <h2 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-tight drop-shadow-[0_0_40px_rgba(157,78,221,0.5)]">
          ARE YOU READY TO UNLEASH THE <span className="text-gradient-purple">CORE?</span>
        </h2>

        {/* Subtitles */}
        <div className="space-y-2 text-slate-200 text-base sm:text-xl font-heading font-medium tracking-wide">
          <p className="text-purple-200">Build something intelligent.</p>
          <p className="text-purple-300">Connect something meaningful.</p>
          <p className="text-white font-semibold">Create something extraordinary.</p>
        </div>

        {/* Large CTA Button */}
        <div className="pt-6">
          <button
            onClick={onOpenRegister}
            className="relative group overflow-hidden rounded-2xl p-[2px] font-heading text-base font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-[0_0_50px_rgba(157,78,221,0.5)] hover:shadow-[0_0_80px_rgba(199,125,255,0.9)] transition-all duration-500 transform hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-400 to-indigo-600 rounded-2xl animate-pulse" />
            <span className="relative flex items-center justify-center gap-3 px-10 py-5 rounded-[14px] bg-[#0d051a] text-white group-hover:bg-opacity-80 transition-all duration-300">
              <Rocket className="w-5 h-5 text-purple-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              ENTER IOTHRONE
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
