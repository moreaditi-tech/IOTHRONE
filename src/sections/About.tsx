import React from 'react';
import { ABOUT_CARDS } from '../data/competitionData';
import { Lightbulb, Cpu, Zap, Activity } from 'lucide-react';

export const About: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Lightbulb':
        return <Lightbulb className="w-6 h-6 text-purple-300" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-purple-300" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-purple-300" />;
      default:
        return <Activity className="w-6 h-6 text-purple-300" />;
    }
  };

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Energy Lines */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white">
          WHAT IS <span className="text-gradient-purple">IOTHRONE?</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Bring your idea, your hardware, and your team to design, build, and demonstrate real-world IoT systems.
        </p>
      </div>

      {/* 3 Premium Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ABOUT_CARDS.map((card) => (
          <div
            key={card.number}
            className="group relative glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Card Decor */}
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-3xl font-black text-purple-500/40 group-hover:text-purple-400 transition-colors">
                {card.number}
              </span>
              <div className="p-3 rounded-xl bg-purple-900/40 border border-purple-500/30 group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(199,125,255,0.4)] transition-all">
                {getIcon(card.icon)}
              </div>
            </div>

            {/* Card Content */}
            <div className="space-y-3 relative z-10">
              <h3 className="font-heading font-bold text-xl text-white tracking-wider group-hover:text-purple-200 transition-colors">
                {card.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Bottom Glow Bar */}
            <div className="mt-8 h-1 w-full bg-gradient-to-r from-purple-900/40 via-purple-500/40 to-indigo-900/40 rounded-full group-hover:from-purple-500 group-hover:to-indigo-500 transition-all duration-500" />
            
            {/* Ambient Corner Flare */}
            <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/25 transition-all" />
          </div>
        ))}
      </div>
    </section>
  );
};
