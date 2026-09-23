import React, { useState } from 'react';
import { FAQ_DATA } from '../data/competitionData';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string>('faq-1');

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white">
          FREQUENTLY ASKED <span className="text-gradient-purple">QUESTIONS</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Everything you need to know about competition rounds, hardware guidelines, and registration.
        </p>
      </div>

      {/* Accordion List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {FAQ_DATA.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-purple-900/80 border-2 border-purple-400 shadow-[0_0_25px_rgba(199,125,255,0.4)]'
                  : 'glass-panel glass-panel-hover border-purple-500/20'
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? '' : item.id)}
                aria-expanded={isOpen}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-2xl"
              >
                <div className="flex items-center gap-3.5 pr-4">
                  <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-purple-300' : 'text-purple-500'}`} />
                  <span className="font-heading font-bold text-base sm:text-lg text-white tracking-wide">
                    {item.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-purple-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'transform rotate-180 text-purple-300' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-purple-900/40 text-slate-300 text-sm leading-relaxed animate-fadeIn">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
