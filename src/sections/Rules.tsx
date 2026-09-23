import React, { useState } from 'react';
import { RULES_DATA } from '../data/competitionData';
import { ChevronDown, ShieldCheck, CheckCircle2, FileText, ExternalLink } from 'lucide-react';

export const Rules: React.FC = () => {
  const [openId, setOpenId] = useState<string>('general');

  return (
    <section id="rules" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white">
          RULES & <span className="text-gradient-purple">GUIDELINES</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Official guidelines, hardware requirements, and team evaluation criteria.
        </p>
        <div className="pt-2 flex justify-center">
          <a
            href="/IOTHRONE_Rulebook_2026_New.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-purple-900/40 border border-purple-500/40 hover:border-purple-400 text-purple-200 hover:text-white font-mono text-xs font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(157,78,221,0.2)] hover:shadow-[0_0_30px_rgba(199,125,255,0.4)] transition-all transform hover:scale-105"
          >
            <FileText className="w-4 h-4 text-purple-300" />
            <span>VIEW RULEBOOK</span>
            <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
          </a>
        </div>
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
                  ? 'bg-purple-900/80 border-2 border-purple-400 shadow-[0_0_25px_rgba(199,125,255,0.4)]'
                  : 'glass-panel glass-panel-hover border-purple-500/20'
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
                  {cat.rules.map((rule) => (
                    <div
                      key={rule.num}
                      className="flex items-start gap-3.5 p-4 rounded-xl bg-purple-950/40 border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <h4 className="font-mono text-xs font-bold text-purple-200 uppercase tracking-wider">
                            {rule.title}
                          </h4>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {rule.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
