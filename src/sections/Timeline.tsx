import React from 'react';
import { COMPETITION_TIMELINE } from '../data/competitionData';
import { Clock, CheckCircle2, Zap } from 'lucide-react';

export const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/25 text-purple-300 text-xs font-mono tracking-widest uppercase">
          // SECTION 03
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
          THE POWER <span className="text-gradient-purple">TRIALS</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Three stages. One challenge. Unleash the potential.
        </p>
      </div>

      {/* Vertical Futuristic Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Glowing Central Energy Beam */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-purple-600 via-fuchsia-500 to-indigo-600 -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(157,78,221,0.8)] z-0">
          <div className="w-full h-24 bg-purple-200 blur-sm animate-pulse" />
        </div>

        {/* Timeline Items */}
        <div className="space-y-16 relative z-10">
          {COMPETITION_TIMELINE.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={item.id}
                className={`flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-8 group`}
              >
                {/* Content Card (Desktop half width, Mobile full width) */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden">
                    {/* Top Status Header */}
                    <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
                      <span className="font-mono text-xs text-purple-400 font-semibold tracking-widest uppercase flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-purple-300" />
                        {item.badge}
                      </span>
                      <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-200">
                        {item.date}
                      </span>
                    </div>

                    {/* Stage Title */}
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-wide group-hover:text-purple-200 transition-colors">
                      {item.title}
                    </h3>

                    {/* Time & Activity Details (if present) */}
                    {(item.time || item.activity) && (
                      <div className="space-y-1.5 py-2 px-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20 font-mono text-xs">
                        {item.time && (
                          <div className="flex items-center gap-2 text-purple-300">
                            <Clock className="w-3.5 h-3.5 text-purple-400" />
                            <span>Time: {item.time}</span>
                          </div>
                        )}
                        {item.activity && (
                          <div className="flex items-start gap-2 text-slate-300 pt-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                            <span>Activity: {item.activity}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {item.description}
                    </p>

                    {/* Glowing Edge highlight */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Central Glowing Node Marker */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-[#0d051a] border-2 border-purple-400 shadow-[0_0_20px_rgba(199,125,255,0.7)] group-hover:scale-125 transition-transform z-20">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-400 animate-pulse" />
                  <span className="absolute font-mono text-[10px] font-bold text-white">
                    {item.number}
                  </span>
                </div>

                {/* Spacer for desktop alignment */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
