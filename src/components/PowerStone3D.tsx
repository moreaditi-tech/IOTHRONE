import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';

// 3D Crystal Inner Mesh Component
const CrystalMesh: React.FC = () => {
  const outerRef = useRef<Mesh>(null!);
  const innerRef = useRef<Mesh>(null!);
  const ring1Ref = useRef<Group>(null!);
  const ring2Ref = useRef<Group>(null!);
  const particlesGroupRef = useRef<Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Slow rotation
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.35;
      outerRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
      outerRef.current.position.y = Math.sin(t * 1.2) * 0.18;
    }

    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.5;
      const pulseScale = 1 + Math.sin(t * 2.5) * 0.08;
      innerRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }

    // Rings rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.4;
      ring1Ref.current.rotation.x = Math.sin(t * 0.3) * 0.2 + 0.8;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.3;
      ring2Ref.current.rotation.y = t * 0.5;
    }

    // Orbital particles rotation
    if (particlesGroupRef.current) {
      particlesGroupRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group scale={1.3}>
      {/* Ambient & Point Lights inside Crystal */}
      <pointLight position={[0, 0, 0]} intensity={8} color="#c77dff" distance={6} />
      <pointLight position={[2, 3, 2]} intensity={4} color="#e0aaff" />
      <directionalLight position={[-3, 4, 3]} intensity={2} color="#9d4edd" />

      {/* Outer Faceted Translucent Crystal */}
      <mesh ref={outerRef}>
        <octahedronGeometry args={[1.35, 1]} />
        <meshPhysicalMaterial
          color="#c77dff"
          emissive="#5a189a"
          emissiveIntensity={0.6}
          roughness={0.08}
          metalness={0.15}
          transmission={0.88}
          ior={1.65}
          thickness={1.8}
          transparent={true}
          opacity={0.92}
          wireframe={false}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#e0aaff"
          emissiveIntensity={2.5}
          roughness={0.1}
        />
      </mesh>

      {/* Orbital Energy Ring 1 */}
      <group ref={ring1Ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.02, 16, 100]} />
          <meshBasicMaterial color="#e0aaff" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Orbital Energy Ring 2 */}
      <group ref={ring2Ref}>
        <mesh rotation={[0, Math.PI / 3, Math.PI / 4]}>
          <torusGeometry args={[2.6, 0.015, 16, 100]} />
          <meshBasicMaterial color="#c77dff" transparent opacity={0.45} />
        </mesh>
      </group>

      {/* Orbiting Crystal Shards */}
      <group ref={particlesGroupRef}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 2.4 + (i % 2) * 0.4;
          const yOffset = (i % 3 - 1) * 0.6;
          return (
            <mesh key={i} position={[Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius]} scale={0.12}>
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial color="#e0aaff" emissive="#9d4edd" emissiveIntensity={1.2} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

// 2D High-Quality CSS/Canvas Fallback Component
export const PowerStone2DFallback: React.FC<{ size?: string }> = ({ size = 'w-72 h-72 md:w-96 md:h-96' }) => {
  return (
    <div className={`relative ${size} flex items-center justify-center pointer-events-none select-none`}>
      {/* Outer Volumetric Atmospheric Glow */}
      <div className="absolute inset-0 rounded-full bg-radial from-purple-500/40 via-purple-900/20 to-transparent blur-3xl animate-pulse-glow" />

      {/* Rotating Energy Ring 1 */}
      <div className="absolute inset-4 rounded-full border border-purple-300/30 border-dashed animate-spin-slow" />
      
      {/* Rotating Energy Ring 2 */}
      <div className="absolute inset-10 rounded-full border border-purple-400/40 transform rotate-45 animate-spin-reverse" />

      {/* Central Faceted Crystal Shape */}
      <div className="relative w-2/3 h-2/3 animate-float flex items-center justify-center">
        {/* Crystal Glow Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-fuchsia-400 to-indigo-300 rounded-3xl rotate-45 blur-lg opacity-80 animate-pulse" />
        
        {/* Main Faceted Octahedron SVG */}
        <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-[0_0_35px_rgba(199,125,255,0.85)] filter">
          <defs>
            <linearGradient id="facetGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#e0aaff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#7209b7" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="facetGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c77dff" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#9d4edd" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#240046" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="innerGlow" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e0aaff" />
            </linearGradient>
          </defs>

          {/* Top Facets */}
          <polygon points="100,15 155,80 100,120" fill="url(#facetGrad1)" />
          <polygon points="100,15 45,80 100,120" fill="url(#facetGrad2)" />
          <polygon points="100,15 100,120 155,80" fill="url(#innerGlow)" opacity="0.4" />

          {/* Bottom Facets */}
          <polygon points="100,120 155,80 135,175 100,225" fill="url(#facetGrad2)" />
          <polygon points="100,120 45,80 65,175 100,225" fill="url(#facetGrad1)" />
          <polygon points="100,120 100,225 135,175" fill="url(#facetGrad1)" opacity="0.8" />

          {/* Highlight Rays */}
          <line x1="100" y1="15" x2="100" y2="225" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
          <line x1="45" y1="80" x2="155" y2="80" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
        </svg>

        {/* Orbiting Sparkles */}
        <div className="absolute -top-4 left-1/4 w-3 h-3 bg-purple-200 rounded-full blur-[1px] animate-ping" />
        <div className="absolute -bottom-2 right-1/4 w-2 h-2 bg-fuchsia-300 rounded-full blur-[1px] animate-pulse" />
      </div>
    </div>
  );
};

// Main PowerStone3D Wrapper with Fallback Support
export const PowerStone3D: React.FC<{ size?: string }> = ({ size }) => {
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGLError(true);
      }
    } catch {
      setHasWebGLError(true);
    }

    // Check low-power / mobile preference
    if (window.innerWidth < 640 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsLowPowerMode(true);
    }
  }, []);

  if (hasWebGLError || isLowPowerMode) {
    return <PowerStone2DFallback size={size} />;
  }

  return (
    <div className={`relative ${size || 'w-80 h-80 md:w-[480px] md:h-[480px]'} flex items-center justify-center`}>
      {/* Radial Glow Underlay */}
      <div className="absolute inset-0 rounded-full bg-radial from-purple-600/35 via-purple-900/15 to-transparent blur-3xl pointer-events-none" />
      
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
        onError={() => setHasWebGLError(true)}
      >
        <CrystalMesh />
      </Canvas>
    </div>
  );
};
