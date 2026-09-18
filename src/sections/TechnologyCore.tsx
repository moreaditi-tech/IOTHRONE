import React, { useState } from 'react';
import { TECH_NODES, type TechnologyNode } from '../data/competitionData';
import { Radio, Cpu, Activity, Bot, Brain, LineChart, Cloud, Workflow, Network } from 'lucide-react';

export const TechnologyCore: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<TechnologyNode>(TECH_NODES[0]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radio': return <Radio className="w-5 h-5 text-purple-300" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-300" />;
      case 'Activity': return <Activity className="w-5 h-5 text-purple-300" />;
      case 'Bot': return <Bot className="w-5 h-5 text-purple-300" />;
      case 'Brain': return <Brain className="w-5 h-5 text-purple-300" />;
      case 'LineChart': return <LineChart className="w-5 h-5 text-purple-300" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-purple-300" />;
      case 'Workflow': return <Workflow className="w-5 h-5 text-purple-300" />;
      case 'Network': return <Network className="w-5 h-5 text-purple-300" />;
      default: return <Cpu className="w-5 h-5 text-purple-300" />;
    }
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/25 text-purple-300 text-xs font-mono tracking-widest uppercase">
          // NETWORK MESH ARCHITECTURE
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
          THE TECHNOLOGY <span className="text-gradient-purple">CORE</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Explore the interconnected network of hardware, edge compute, and intelligent software layers driving IOTHRONE prototypes.
        </p>
      </div>

      {/* Network Container */}
      <div className="relative glass-panel rounded-3xl p-6 sm:p-10 border-purple-500/20 overflow-hidden">
        {/* Background Network SVG Data Stream Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <line x1="20%" y1="30%" x2="50%" y2="25%" stroke="#c77dff" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="50%" y1="25%" x2="82%" y2="48%" stroke="#c77dff" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="35%" y1="65%" x2="15%" y2="75%" stroke="#9d4edd" strokeWidth="1.5" />
          <line x1="35%" y1="65%" x2="55%" y2="52%" stroke="#9d4edd" strokeWidth="1.5" />
          <line x1="55%" y1="52%" x2="75%" y2="70%" stroke="#e0aaff" strokeWidth="1.5" strokeDasharray="6 3" />
          <line x1="50%" y1="25%" x2="70%" y2="30%" stroke="#c77dff" strokeWidth="1.5" />
          <line x1="45%" y1="80%" x2="75%" y2="70%" stroke="#9d4edd" strokeWidth="1.5" />
        </svg>

        {/* Tech Nodes Floating Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 relative z-10">
          {TECH_NODES.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                  isSelected
                    ? 'bg-purple-900/90 border-2 border-purple-400 shadow-[0_0_30px_rgba(157,78,221,0.4)] scale-102'
                    : 'bg-purple-950/40 hover:bg-purple-900/40 border border-purple-500/20'
                }`}
              >
                <div
                  className={`p-3 rounded-xl shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(224,170,255,0.8)]'
                      : 'bg-purple-900/50 border border-purple-500/30'
                  }`}
                >
                  {getIcon(node.iconName)}
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-base text-white tracking-wide">
                    {node.name}
                  </span>
                  <span className="font-mono text-[11px] text-purple-300/80">
                    {node.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Node Detail Inspector Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-purple-950/80 border border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-600 text-white shadow-[0_0_15px_rgba(199,125,255,0.5)]">
              {getIcon(selectedNode.iconName)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-heading font-bold text-lg text-white">
                  {selectedNode.name}
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-purple-900/60 border border-purple-500/30 text-[10px] font-mono text-purple-300">
                  {selectedNode.category}
                </span>
              </div>
              <p className="text-slate-300 text-sm mt-1 max-w-2xl">
                {selectedNode.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-purple-300 shrink-0">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            TELEMETRY NODE ACTIVE
          </div>
        </div>
      </div>
    </section>
  );
};
