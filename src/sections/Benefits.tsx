import React from 'react';
import { BENEFITS_LIST } from '../data/competitionData';
import { Layers, Target, Zap, Award } from 'lucide-react';

export const Benefits: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-7 h-7 text-purple-300" />;
      case 'Target': return <Target className="w-7 h-7 text-purple-300" />;
      case 'Zap': return <Zap className="w-7 h-7 text-purple-300" />;
      case 'Award': return <Award className="w-7 h-7 text-purple-300" />;
      default: return <Zap className="w-7 h-7 text-purple-300" />;
    }
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/25 text-purple-300 text-xs font-mono tracking-widest uppercase">
          // COMPETITION VALUE
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
          UNLOCK YOUR <span className="text-gradient-purple">POTENTIAL</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Gain invaluable hands-on hardware engineering experience and prove your system integration capabilities.
        </p>
      </div>

      {/* 4 Glass Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {BENEFITS_LIST.map((benefit, idx) => (
          <div
            key={idx}
            className="group relative glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between overflow-hidden"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(199,125,255,0.6)] transition-all duration-300">
                {getIcon(benefit.icon)}
              </div>

              <h3 className="font-heading font-bold text-lg text-white tracking-wide group-hover:text-purple-200 transition-colors">
                {benefit.title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                {benefit.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-900/30 flex items-center justify-between text-xs font-mono text-purple-300/70">
              <span>BENEFIT // 0{idx + 1}</span>
              <span className="w-2 h-2 rounded-full bg-purple-500/40 group-hover:bg-purple-400 group-hover:animate-ping" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
