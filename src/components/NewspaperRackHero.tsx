import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SectionId, PaperPhysicsState } from '../types';
import { AntigravityEngine } from '../physics/AntigravityEngine';
import { FloatingPaperCard } from './FloatingPaperCard';

interface NewspaperRackHeroProps {
  onOpenSection: (id: SectionId) => void;
  isModalOpen: boolean;
}

export const NewspaperRackHero: React.FC<NewspaperRackHeroProps> = ({
  onOpenSection,
  isModalOpen,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<AntigravityEngine | null>(null);
  const [paperStates, setPaperStates] = useState<PaperPhysicsState[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Initialize engine once
  if (!engineRef.current) {
    engineRef.current = new AntigravityEngine();
  }

  // Sync container dimensions with physics engine
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current || !engineRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      engineRef.current.setViewportSize(rect.width, rect.height);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // 60fps Animation Loop
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    engine.setPaused(isModalOpen);

    const loop = (time: number) => {
      const delta = Math.min(32, time - lastTimeRef.current);
      lastTimeRef.current = time;

      if (!isModalOpen) {
        const updated = engine.step(delta);
        setPaperStates(Array.from(updated.values()));
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isModalOpen]);

  // Cursor Aerodynamic Disturbance
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !engineRef.current || isModalOpen) return;
    const rect = containerRef.current.getBoundingClientRect();
    // (0, 0) is dead center of the available canvas
    const relativeX = e.clientX - rect.left - rect.width / 2;
    const relativeY = e.clientY - rect.top - rect.height / 2;
    engineRef.current.updateMouse(relativeX, relativeY);
  }, [isModalOpen]);

  const handleHover = useCallback((id: SectionId, hovered: boolean) => {
    engineRef.current?.setCardHover(id, hovered);
  }, []);

  const handleDragStart = useCallback((id: SectionId) => {
    engineRef.current?.setCardDragging(id, true);
  }, []);

  const handleDragMove = useCallback((id: SectionId, dx: number, dy: number) => {
    engineRef.current?.dragMoveCard(id, dx, dy);
  }, []);

  const handleDragEnd = useCallback((id: SectionId, vx: number, vy: number) => {
    engineRef.current?.tossCard(id, vx, vy);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        height: 'calc(100vh - 170px)',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1400px',
      }}
      aria-label="New York Times zero-gravity interactive rack"
    >
      {/* Background Subtle NYT Heraldic Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
        <div className="font-masthead text-[18vw] text-[#121212] select-none leading-none">
          Times
        </div>
      </div>

      {/* Floating Broadsheet Papers in 3D Space (Dead-center coordinate origin) */}
      <div
        className="relative w-full h-full flex items-center justify-center pointer-events-auto"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {paperStates.map((paper) => (
          <FloatingPaperCard
            key={paper.id}
            physics={paper}
            onOpen={onOpenSection}
            onHover={handleHover}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>

      {/* Bottom Floating Info Pill - Fixed non-interfering at very bottom center */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 30,
          pointerEvents: 'none',
        }}
      >
        <div className="bg-white/90 backdrop-blur-sm border border-neutral-300 px-3.5 py-1 text-[10px] tracking-widest text-neutral-600 font-sans uppercase font-medium flex items-center gap-2 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#121212] animate-pulse" />
          <span>ZERO-GRAVITY AIRFIELD ACTIVE • DRAG TO TOSS • CLICK TO UNROLL</span>
        </div>
      </div>
    </div>
  );
};
