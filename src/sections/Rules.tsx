import React, { useState } from 'react';
import { RULES_DATA } from '../data/competitionData';
import { ChevronDown, ShieldCheck, AlertCircle } from 'lucide-react';

export const Rules: React.FC = () => {
  const [openId, setOpenId] = useState<string>('general');

  return (
    <section id="rules" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/25 text-purple-300 text-xs font-mono tracking-widest uppercase">
          // COMPETITION GUIDELINES
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
          THE CODE OF THE <span className="text-gradient-purple">CORE</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Official competition regulations, prototype standards, hardware compliance, and integrity rules.
        </p>
      </div>

      {/* Accordions Stack */}
      <div className="max-w-4xl mx-auto space-y-4">
        {RULES_DATA.map((cat) => {
          const isOpen = openId === cat.id;
          return (
            <div
              key={cat.id}
              className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-purple-950/70 border-2 border-purple-400 shadow-[0_0_25px_rgba(157,78,221,0.3)]'
                  : 'glass-panel hover:bg-purple-900/30 border-purple-500/20'
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? '' : cat.id)}
                aria-expanded={isOpen}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className={`w-5 h-5 ${isOpen ? 'text-purple-300' : 'text-purple-500'}`} />
                  <span className="font-heading font-bold text-lg text-white tracking-wide">
                    {cat.title}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${
                    isOpen ? 'transform rotate-180 text-purple-300' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-purple-900/40 space-y-3 animate-fadeIn">
                  {cat.rules.map((rule, rIdx) => {
                    const isPlaceholder = rule.includes('[ADD OFFICIAL');
                    return (
                      <div
                        key={rIdx}
                        className={`flex items-start gap-3 p-3.5 rounded-xl ${
                          isPlaceholder
                            ? 'bg-purple-900/40 border border-dashed border-purple-400/50 text-purple-200'
                            : 'bg-purple-950/30 text-slate-300'
                        }`}
                      >
                        {isPlaceholder ? (
                          <AlertCircle className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                        )}
                        <span className={`text-sm leading-relaxed ${isPlaceholder ? 'font-mono text-xs font-semibold tracking-wider text-purple-300' : ''}`}>
                          {rule}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
