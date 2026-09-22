import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  color: string;
}

export const EnergyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Detect mobile or reduced motion
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particleCount = isMobile ? 25 : (prefersReducedMotion ? 15 : 55);

    const colors = ['#9d4edd', '#c77dff', '#e0aaff', '#7209b7', '#3c096c'];

    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const maxAlpha = Math.random() * 0.5 + 0.2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.3),
        speedY: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.3),
        alpha: Math.random() * maxAlpha,
        maxAlpha,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particles over background
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.speedX;
          p.y += p.speedY;

          // Wrap edges
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Alpha pulsing
          p.alpha += p.pulseSpeed;
          if (p.alpha > p.maxAlpha || p.alpha < 0.1) {
            p.pulseSpeed = -p.pulseSpeed;
          }
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Global Cosmic Background Image Asset */}
      <img
        src="/Images/Background.png"
        alt="IOTHRONE Cosmic Environment"
        className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 opacity-60"
        loading="eager"
      />

      {/* 2. Atmospheric Translucent Dark Purple Readability Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05020a]/75 via-[#080314]/65 to-[#05020a]/85" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#05020a]/40 to-[#05020a]/90" />

      {/* 3. Interactive Floating Cosmic Energy Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

      {/* 4. Subtle Ambient Rotating Depth Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] rounded-full border border-purple-500/10 pointer-events-none animate-spin-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full border border-dashed border-purple-400/10 pointer-events-none animate-spin-reverse" />
    </div>
  );
};
