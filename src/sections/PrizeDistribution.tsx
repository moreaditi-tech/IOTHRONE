import React from 'react';
import { Trophy, Award, Crown, Sparkles, Zap } from 'lucide-react';

export const PrizeDistribution: React.FC = () => {
  const prizes = [
    {
      id: 'prize-1',
      place: '1ST PRIZE',
      amount: '₹8,000',
      icon: Crown,
      emoji: '🥇',
      isPrimary: true,
    },
    {
      id: 'prize-2',
      place: '2ND PRIZE',
      amount: '₹5,000',
      icon: Trophy,
      emoji: '🥈',
      isPrimary: false,
    },
    {
      id: 'prize-3',
      place: '3RD PRIZE',
      amount: '₹2,000',
      icon: Award,
      emoji: '🥉',
      isPrimary: false,
    },
  ];

  return (
    <section id="prizes" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Atmosphere Energy Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-16 space-y-4">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium tracking-widest uppercase shadow-[0_0_15px_rgba(157,78,221,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
          <span>PRIZE DISTRIBUTION</span>
        </div>

        {/* Main Heading */}
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
          CLAIM THE <span className="text-gradient-purple">THRONE</span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          The most innovative and technically impressive solutions will rise to the top.
        </p>
      </div>

      {/* Prize Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
        {prizes.map((prize) => {
          const IconComponent = prize.icon;

          return (
            <div
              key={prize.id}
              className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer glass-panel-hover ${
                prize.isPrimary
                  ? 'bg-gradient-to-b from-purple-900/60 via-[#1e0a38]/80 to-[#0d051a]/90 border-2 border-purple-400/80 shadow-[0_0_40px_rgba(199,125,255,0.4)] md:-translate-y-4 scale-105 z-10'
                  : 'glass-panel border border-purple-500/30'
              }`}
            >
              {/* Glowing Top Highlight Edge */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${
                  prize.isPrimary
                    ? 'from-purple-400 via-fuchsia-400 to-indigo-400 opacity-100'
                    : 'from-purple-600 to-indigo-600 opacity-40 group-hover:opacity-100'
                } transition-opacity`}
              />

              <div className="space-y-6">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold flex items-center gap-1.5 bg-purple-900/40 border border-purple-500/30 text-purple-200">
                    <Zap className="w-3 h-3 text-purple-300" />
                    {prize.place}
                  </span>
                </div>

                {/* Prize Icon & Title */}
                <div className="flex flex-col items-center text-center space-y-3 pt-2">
                  <div
                    className={`p-4 rounded-2xl ${
                      prize.isPrimary
                        ? 'bg-purple-800/40 border border-purple-400/60 shadow-[0_0_20px_rgba(199,125,255,0.4)]'
                        : 'bg-purple-950/60 border border-purple-500/25'
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent
                      className={`w-10 h-10 ${
                        prize.isPrimary ? 'text-purple-200' : 'text-purple-400'
                      }`}
                    />
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white tracking-wide">
                    {prize.place}
                  </h3>
                </div>

                {/* Prize Amount */}
                <div className="text-center py-4 border-y border-purple-900/40 space-y-1">
                  <span className="block font-mono text-[11px] text-purple-300/70 tracking-widest uppercase">
                    PRIZE REWARD
                  </span>
                  <span
                    className={`block font-heading font-black tracking-tight ${
                      prize.isPrimary
                        ? 'text-4xl sm:text-5xl text-gradient-purple drop-shadow-[0_0_25px_rgba(199,125,255,0.6)]'
                        : 'text-3xl sm:text-4xl text-white'
                    }`}
                  >
                    {prize.amount}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-6 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-300/80 font-medium">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  Official Trophy & Certificate
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
