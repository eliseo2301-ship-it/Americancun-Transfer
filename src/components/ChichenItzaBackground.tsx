'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Sparkles, Sun, Moon } from 'lucide-react';

export const ChichenItzaBackground: React.FC = () => {
  const [ambientMode, setAmbientMode] = useState<'golden' | 'night'>('golden');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Track mouse for subtle parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xOffset = (e.clientX / innerWidth - 0.5) * 15;
      const yOffset = (e.clientY / innerHeight - 0.5) * 15;
      setMousePos({ x: xOffset, y: yOffset });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas golden dust particle simulation (Kukulkan Equinox particles)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2, // drifting upwards like sacred incense/stardust
      opacity: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.pulseSpeed;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity = (Math.sin(p.angle) * 0.3 + 0.6) * p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = ambientMode === 'golden' 
          ? `rgba(245, 183, 49, ${currentOpacity})` // Mayan gold
          : `rgba(130, 200, 255, ${currentOpacity * 0.8})`; // Mystic moon blue
        ctx.shadowBlur = ambientMode === 'golden' ? 8 : 12;
        ctx.shadowColor = ambientMode === 'golden' ? '#e5a93b' : '#38bdf8';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [ambientMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Base High-Definition Chichén Itzá Pyramid Layer with subtle mouse parallax */}
      <div 
        className="absolute inset-0 transition-transform duration-1000 ease-out will-change-transform"
        style={{
          transform: `scale(1.04) translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          opacity: ambientMode === 'golden' ? 0.35 : 0.22
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=2400&q=85"
          alt="Pirámide de Chichén Itzá El Castillo - Americancun Transfer"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter saturate-125 contrast-110"
        />
      </div>

      {/* 2. Solar Equinox Mayan Aura Overlay (Sun rays and divine glow behind pyramid) */}
      <div 
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[750px] rounded-full blur-[140px] transition-all duration-1000 ${
          ambientMode === 'golden' 
            ? 'bg-gradient-to-b from-gold-500/25 via-gold-600/15 to-transparent' 
            : 'bg-gradient-to-b from-blue-600/20 via-indigo-900/15 to-transparent'
        }`}
      />

      {/* 3. Deep Cinematic Vignet & Gradient Overlays ensuring crisp readable text */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/75 to-navy-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-navy-950/60 to-navy-950/95" />

      {/* 4. Canvas with interactive glowing golden Mayan stardust */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* 5. Interactive Ambient Controller Badge (Clickable) */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-auto hidden md:block">
        <button
          onClick={() => setAmbientMode(ambientMode === 'golden' ? 'night' : 'golden')}
          title="Alternar atmósfera mística maya"
          className="group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy-950/80 hover:bg-navy-900/90 border border-gold-500/30 hover:border-gold-400 backdrop-blur-md text-[11px] font-semibold text-gray-300 hover:text-white shadow-xl shadow-navy-950/60 transition-all hover:scale-105"
        >
          <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
            {ambientMode === 'golden' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </div>
          <span>
            {ambientMode === 'golden' 
              ? 'Chichén Itzá: Sol Dorado' 
              : 'Chichén Itzá: Noche Sagrada'}
          </span>
          <Sparkles className="w-3 h-3 text-gold-400 animate-pulse" />
        </button>
      </div>
    </div>
  );
};
