import React, { useState } from 'react';
import { CHALLENGE_STAGES } from '../data/competitionData';
import { Sparkles, Wrench, Share2, ArrowRight } from 'lucide-react';

export const Challenge: React.FC = () => {
  const [activeStage, setActiveStage] = useState('build');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-300" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-purple-300" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 text-purple-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-300" />;
    }
  };

  return (
    <section id="challenge" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Energy Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/25 text-purple-300 text-xs font-mono tracking-widest uppercase">
          // SECTION 02
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
          THE <span className="text-gradient-purple">CHALLENGE</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Participants must design, build, and demonstrate an IoT-based prototype capable of real-world intelligent data telemetry and live system adaptation.
        </p>
      </div>

      {/* Interactive 3-Stage Pipeline with SVG Circuit Energy Beam Lines */}
      <div className="relative mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* SVG Energy Line Connector across stages (Desktop) */}
        <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-1 bg-gradient-to-r from-purple-900/50 via-purple-500/40 to-indigo-900/50 -translate-y-1/2 z-0">
          <div className="w-full h-full bg-gradient-to-r from-purple-400 to-indigo-400 opacity-60 animate-pulse" />
        </div>

        {CHALLENGE_STAGES.map((stage, idx) => {
          const isSelected = activeStage === stage.id;
          return (
            <div
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`relative z-10 cursor-pointer rounded-2xl p-8 transition-all duration-500 flex flex-col justify-between ${
                isSelected
                  ? 'bg-purple-950/70 border-2 border-purple-400 shadow-[0_0_35px_rgba(157,78,221,0.35)] scale-105'
                  : 'glass-panel hover:bg-purple-900/30 border-purple-500/20'
              }`}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(224,170,255,0.8)]'
                        : 'bg-purple-900/40 text-purple-300 border border-purple-500/30'
                    }`}
                  >
                    {getIcon(stage.icon)}
                  </div>
                  <span className="font-mono text-xs text-purple-300 tracking-widest font-semibold uppercase">
                    STAGE {stage.step}
                  </span>
                </div>

                {/* Node Status Dot */}
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isSelected ? 'bg-purple-400 animate-ping' : 'bg-purple-800'
                    }`}
                  />
                  <span className="font-mono text-[10px] text-purple-300/80 uppercase">
                    {isSelected ? 'ACTIVE NODE' : `NODE 0${idx + 1}`}
                  </span>
                </div>
              </div>

              {/* Title & Content */}
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-2xl text-white tracking-wider">
                  {stage.title}
                </h3>
                <p className="font-mono text-xs text-purple-300/90 font-medium">
                  {stage.subtitle}
                </p>
                <p className="text-slate-300 text-sm leading-relaxed pt-2">
                  {stage.description}
                </p>
              </div>

              {/* Circuit Stream Graphic footer */}
              <div className="mt-8 pt-4 border-t border-purple-900/40 flex items-center justify-between text-xs text-purple-300 font-mono">
                <span className="flex items-center gap-1">
                  <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-purple-400' : 'text-purple-700'}`} />
                  TELEMETRY MATRIX
                </span>
                <span className="opacity-70">{isSelected ? 'CONNECTED' : 'STANDBY'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
