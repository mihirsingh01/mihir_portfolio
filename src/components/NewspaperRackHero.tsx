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

  // Animation Loop targeting silky 60fps
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

  // Track cursor position for aerodynamic air disturbance
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !engineRef.current || isModalOpen) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left - rect.width / 2;
    const relativeY = e.clientY - rect.top - rect.height / 2;
    engineRef.current.updateMouse(relativeX, relativeY);
  }, [isModalOpen]);

  // Card interaction callbacks
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
      className="relative w-full h-[calc(100vh-140px)] min-h-[640px] max-h-[960px] overflow-hidden select-none bg-newsprint-grain"
      style={{ perspective: '1200px' }}
      aria-label="Zero-gravity interactive newspaper rack"
    >
      {/* Background Subtle Editorial Grid Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <div className="font-masthead text-[14vw] font-black uppercase tracking-tighter text-newsprint-ink select-none leading-none">
          DISPATCH
        </div>
      </div>

      {/* Floating Broadsheet Papers in 3D Space */}
      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
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

      {/* Bottom Floating Legend / Tip */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="bg-newsprint-aged/90 border border-newsprint-ink/40 px-3.5 py-1.5 rounded text-[11px] font-mono font-bold text-newsprint-ink tracking-wide shadow-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-stamp-red animate-ping" />
          <span>ZERO-GRAVITY AIRFIELD ACTIVE • DRAG TO TOSS • CLICK TO READ</span>
        </div>
      </div>
    </div>
  );
};
