import React, { useState } from 'react';
import { PROCESS_NODES } from '../data/competitionData';

export const CompetitionFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white">
          HOW IT <span className="text-gradient-purple">WORKS</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          A step-by-step roadmap from initial team registration to the final offline hardware demo.
        </p>
      </div>

      {/* Process Pipeline Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
        {/* Horizontal Connecting Energy Line (Desktop) */}
        <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-[2px] bg-gradient-to-r from-purple-800 via-purple-400 to-indigo-800 -translate-y-1/2 pointer-events-none z-0 opacity-40" />

        {PROCESS_NODES.map((node, idx) => {
          const isActive = activeStep === idx;
          return (
            <div
              key={node.step}
              onClick={() => setActiveStep(idx)}
              onMouseEnter={() => setActiveStep(idx)}
              className={`relative z-10 cursor-pointer rounded-xl p-5 transition-all duration-300 flex flex-col items-center text-center ${
                isActive
                  ? 'bg-purple-900/80 border-2 border-purple-400 shadow-[0_0_25px_rgba(199,125,255,0.4)] scale-105'
                  : 'glass-panel hover:bg-purple-950/40 border-purple-500/20'
              }`}
            >
              {/* Circular Node Number */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-heading font-bold text-sm mb-4 transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-[0_0_15px_rgba(224,170,255,0.8)] scale-110'
                    : 'bg-purple-950 border border-purple-500/30 text-purple-300'
                }`}
              >
                {node.step}
              </div>

              {/* Title */}
              <h3 className="font-heading font-bold text-sm tracking-wider text-white mb-2">
                {node.title}
              </h3>

              {/* Description */}
              <p className="text-slate-300 text-xs leading-relaxed">
                {node.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
