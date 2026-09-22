import React from 'react';

interface PowerStoneProps {
  size?: string;
  videoSrc?: string;
}

export const PowerStone3D: React.FC<PowerStoneProps> = ({
  size = 'w-72 h-72 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px]',
  videoSrc
}) => {
  return (
    <div className={`relative ${size} flex items-center justify-center select-none group`}>
      {/* 1. Ambient Volumetric Background Energy Glow */}
      <div className="absolute inset-0 rounded-full bg-radial from-purple-600/40 via-purple-900/20 to-transparent blur-3xl pointer-events-none animate-pulse-glow" />

      {/* 2. Rotating Orbital Energy Rings (Depth Layer) */}
      <div className="absolute inset-2 sm:inset-6 rounded-full border border-purple-400/20 border-dashed animate-spin-slow pointer-events-none" />
      <div className="absolute inset-8 sm:inset-14 rounded-full border border-purple-300/25 transform rotate-45 animate-spin-reverse pointer-events-none" />
      <div className="absolute inset-14 sm:inset-20 rounded-full border border-fuchsia-400/15 transform -rotate-12 animate-pulse pointer-events-none" />

      {/* 3. Floating Cosmic Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-6 w-2 h-2 rounded-full bg-purple-300 shadow-[0_0_10px_#e0aaff] animate-ping" />
        <div className="absolute bottom-1/3 right-8 w-2.5 h-2.5 rounded-full bg-fuchsia-400 shadow-[0_0_12px_#c77dff] animate-pulse" />
        <div className="absolute top-10 right-1/3 w-1.5 h-1.5 rounded-full bg-indigo-300 shadow-[0_0_8px_#ffffff] animate-float" />
        <div className="absolute bottom-12 left-1/4 w-2 h-2 rounded-full bg-purple-200 blur-[0.5px] animate-pulse" />
      </div>

      {/* 4. Core Container — Feathered Circular Portal Video (Zero Rectangular Edges) */}
      <div className="relative z-10 w-full h-full flex items-center justify-center animate-float pointer-events-none">
        {/* Soft Circular Radial Purple Backlight Bloom */}
        <div className="absolute inset-8 rounded-full bg-purple-600/35 blur-3xl animate-pulse pointer-events-none" />

        {videoSrc ? (
          <div className="relative w-full h-full aspect-square rounded-full flex items-center justify-center overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="w-full h-full object-cover rounded-full pointer-events-none filter drop-shadow-[0_0_40px_rgba(157,78,221,0.6)]"
              style={{
                WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 68%)',
                maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 68%)'
              }}
            >
              <source src={videoSrc} type="video/mp4" />
              <img
                src="/Images/Power_Stone.png"
                alt="IOTHRONE Power Stone Core"
                className="w-full h-full object-contain rounded-full"
              />
            </video>
            {/* Soft Purple Ambient Overlay */}
            <div className="absolute inset-0 rounded-full bg-purple-900/10 mix-blend-color-dodge pointer-events-none" />
          </div>
        ) : (
          <img
            src="/Images/Power_Stone.png"
            alt="IOTHRONE Power Stone Core"
            className="w-full h-full object-contain drop-shadow-[0_0_35px_rgba(199,125,255,0.75)] hover:drop-shadow-[0_0_55px_rgba(224,170,255,0.95)] transition-all duration-700 transform hover:scale-105"
            loading="eager"
          />
        )}
      </div>

      {/* 5. Ambient Energy Core Shimmer */}
      <div className="absolute inset-0 pointer-events-none rounded-full bg-gradient-to-t from-purple-950/30 via-transparent to-purple-500/10 opacity-70" />
    </div>
  );
};
