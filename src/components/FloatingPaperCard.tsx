import React, { useRef, useState } from 'react';
import { ArrowUpRight, Move, Sparkles, FolderGit2, Send, CheckCircle2 } from 'lucide-react';
import { SectionId, PaperPhysicsState } from '../types';
import { NEWSPAPER_SECTIONS, OWNER_DATA } from '../data/portfolioData';
import { soundFx } from '../audio/soundSynthesizer';

interface FloatingPaperCardProps {
  physics: PaperPhysicsState;
  onOpen: (id: SectionId) => void;
  onHover: (id: SectionId, hovered: boolean) => void;
  onDragStart: (id: SectionId, startX: number, startY: number) => void;
  onDragMove: (id: SectionId, dx: number, dy: number) => void;
  onDragEnd: (id: SectionId, vx: number, vy: number) => void;
}

export const FloatingPaperCard: React.FC<FloatingPaperCardProps> = ({
  physics,
  onOpen,
  onHover,
  onDragStart,
  onDragMove,
  onDragEnd,
}) => {
  const section = NEWSPAPER_SECTIONS[physics.id];
  const cardRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastPosRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isDraggingInternal = useRef(false);
  const [hasMovedSignificantly, setHasMovedSignificantly] = useState(false);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    dragStartRef.current = { x: e.clientX, y: e.clientY, time: performance.now() };
    lastPosRef.current = { x: e.clientX, y: e.clientY, time: performance.now() };
    isDraggingInternal.current = false;
    setHasMovedSignificantly(false);

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!dragStartRef.current) return;
      const totalDx = moveEvent.clientX - dragStartRef.current.x;
      const totalDy = moveEvent.clientY - dragStartRef.current.y;

      if (!isDraggingInternal.current && (Math.abs(totalDx) > 5 || Math.abs(totalDy) > 5)) {
        isDraggingInternal.current = true;
        setHasMovedSignificantly(true);
        onDragStart(physics.id, dragStartRef.current.x, dragStartRef.current.y);
        soundFx.playRustle(0.6);
      }

      if (isDraggingInternal.current && lastPosRef.current) {
        const dx = moveEvent.clientX - lastPosRef.current.x;
        const dy = moveEvent.clientY - lastPosRef.current.y;
        onDragMove(physics.id, dx, dy);
        lastPosRef.current = { x: moveEvent.clientX, y: moveEvent.clientY, time: performance.now() };
      }
    };

    const onMouseUp = (upEvent: MouseEvent) => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      if (isDraggingInternal.current && lastPosRef.current) {
        const dt = Math.max(16, performance.now() - lastPosRef.current.time);
        const vx = ((upEvent.clientX - lastPosRef.current.x) / dt) * 16;
        const vy = ((upEvent.clientY - lastPosRef.current.y) / dt) * 16;
        onDragEnd(physics.id, vx, vy);
        soundFx.playWhoosh(1.4);
      }

      dragStartRef.current = null;
      lastPosRef.current = null;
      isDraggingInternal.current = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleMouseEnter = () => {
    onHover(physics.id, true);
    soundFx.playRustle(0.35);
  };

  const handleMouseLeave = () => {
    onHover(physics.id, false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (hasMovedSignificantly) {
      e.stopPropagation();
      return;
    }
    soundFx.playWhoosh(1.0);
    onOpen(physics.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      soundFx.playWhoosh(1.0);
      onOpen(physics.id);
    }
  };

  // Compute 3D transform matrix style
  const transformStyle: React.CSSProperties = {
    transform: `translate3d(${physics.x}px, ${physics.y}px, ${physics.z}px) rotateX(${physics.rotationX}deg) rotateY(${physics.rotationY}deg) rotateZ(${physics.rotationZ}deg) scale(${physics.scale})`,
    transformStyle: 'preserve-3d',
    willChange: 'transform',
    zIndex: physics.isDragging ? 50 : physics.isHovered ? 40 : Math.round(physics.z + 100),
    cursor: physics.isDragging ? 'grabbing' : 'grab',
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`Unroll ${section.title} - ${section.editionName}`}
      style={transformStyle}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[350px] md:w-[375px] h-[480px] sm:h-[510px] bg-aged-paper border-2 border-newsprint-ink rounded-xs p-5 select-none transition-shadow duration-300 focus:outline-none focus:ring-4 focus:ring-stamp-red/70 group flex flex-col justify-between ${
        physics.isDragging
          ? 'shadow-paper-lifted'
          : physics.isHovered
          ? 'shadow-paper-hover ring-2 ring-newsprint-ink/40'
          : 'shadow-paper-float'
      }`}
    >
      {/* Newspaper Center Fold Crease */}
      <div className="paper-crease-horizontal" />

      {/* Halftone subtle texture overlay */}
      <div className="absolute inset-0 halftone-overlay pointer-events-none rounded-xs" />

      {/* TOP SECTION: Ear-pieces & Masthead */}
      <div>
        {/* Broadsheet Top Ear-Pieces */}
        <div className="flex items-center justify-between text-[9px] font-mono border-b border-newsprint-ink/30 pb-1 mb-2 text-newsprint-faded">
          <span className="truncate max-w-[140px] uppercase font-bold text-newsprint-ink">
            {section.earPieceLeft}
          </span>
          <span className="truncate max-w-[140px] uppercase text-right">
            {section.dateStr}
          </span>
        </div>

        {/* Edition Roman & Stamped Badge */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[10px] font-extrabold tracking-widest text-newsprint-ink uppercase">
            {section.editionRoman} • {section.issueNo}
          </span>

          <span
            className={
              section.stampColor === 'red'
                ? 'ink-stamp-red text-[9px]'
                : 'ink-stamp-blue text-[9px]'
            }
          >
            {section.stampText}
          </span>
        </div>

        {/* Broadsheet Masthead Title */}
        <div className="border-b-2 border-newsprint-ink pb-2 mb-2.5 text-center">
          <h2 className="font-masthead text-[1.35rem] sm:text-[1.55rem] font-black tracking-tight text-newsprint-ink uppercase leading-none">
            {section.title}
          </h2>
          <div className="text-[10px] font-serif italic text-newsprint-faded mt-0.5 font-medium">
            {section.editionName}
          </div>
        </div>

        {/* Lead Headline - Re-balanced & Clamped to fit without collision */}
        <div className="border-b border-newsprint-ink/30 pb-2 mb-3 text-center">
          <h3 className="font-masthead text-[1.1rem] sm:text-[1.25rem] font-bold text-newsprint-ink uppercase tracking-tight leading-snug">
            {section.leadHeadline}
          </h3>
        </div>
      </div>

      {/* MIDDLE SECTION: Authentic Front Cover Art & Summary Deck (NO long body text dumps) */}
      <div className="flex-1 flex flex-col justify-center my-1">
        {/* EDITION II: Dedicated Biography with Mihir's actual photo */}
        {physics.id === 'biography' && (
          <div className="space-y-2.5">
            <div className="vintage-photo-frame w-full max-w-[170px] sm:max-w-[190px] mx-auto p-1.5 bg-newsprint-light relative">
              <div className="relative overflow-hidden aspect-[4/5] w-full border border-newsprint-ink/40">
                <img
                  src={OWNER_DATA.photoUrl}
                  alt="Mihir Pratap Singh — Full-Stack Web Developer"
                  className="vintage-halftone-photo w-full h-full object-cover object-top"
                  loading="eager"
                />
                <div className="absolute inset-0 halftone-overlay pointer-events-none" />
              </div>
              <div className="text-[9px] font-mono text-center font-bold text-newsprint-ink uppercase tracking-wider pt-1">
                MIHIR PRATAP SINGH
              </div>
            </div>

            <p className="font-serif text-[11px] sm:text-xs text-center font-semibold text-newsprint-faded italic px-2">
              "{section.frontDeck}"
            </p>
          </div>
        )}

        {/* EDITION I: The Dispatch Overview */}
        {physics.id === 'dispatch' && (
          <div className="space-y-3 px-1 text-center">
            <div className="border-2 border-double-vintage p-3 bg-newsprint-light/70 relative">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-newsprint-ink text-newsprint-light mb-1.5">
                <Sparkles className="w-4 h-4 text-vintage-gold" />
              </div>
              <p className="font-serif text-xs font-semibold text-newsprint-ink leading-relaxed">
                {section.frontDeck}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1 font-mono text-[10px] text-newsprint-ink font-bold">
              <span className="px-2 py-0.5 border border-dashed border-newsprint-ink/40 bg-newsprint-aged rounded">
                B.TECH CSE (8.0 CGPA)
              </span>
              <span className="px-2 py-0.5 border border-dashed border-stamp-red/50 text-stamp-red bg-newsprint-aged rounded">
                HACKATHON WINNER
              </span>
            </div>
          </div>
        )}

        {/* EDITION III: The Gazette Projects */}
        {physics.id === 'gazette' && (
          <div className="space-y-2.5 px-1">
            <div className="border border-newsprint-ink/40 p-3 bg-newsprint-light/60 space-y-2">
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-stamp-red uppercase">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>FEATURED PRODUCTION BUILDS</span>
              </div>
              
              <div className="space-y-1.5 font-serif text-xs text-newsprint-ink">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-stamp-blue shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Full-Stack Task Manager:</span> 8+ REST APIs, JWT, MySQL & Chart.js dashboard.
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-stamp-red shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">EcoPulse Sustainability:</span> Carbon tracking, unit testing & 99% uptime.
                  </div>
                </div>
              </div>
            </div>

            <p className="font-serif text-[11px] text-center font-medium text-newsprint-faded italic">
              {section.frontDeck}
            </p>
          </div>
        )}

        {/* EDITION IV: The Classifieds & Post */}
        {physics.id === 'classifieds' && (
          <div className="space-y-3 px-1 text-center">
            <div className="border-2 border-dashed border-newsprint-ink/40 p-3 bg-newsprint-light/60 relative">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-stamp-red text-newsprint-light mb-1.5">
                <Send className="w-4 h-4" />
              </div>
              <div className="font-masthead text-xs uppercase font-bold text-newsprint-ink mb-1">
                WESTERN & EASTERN TELEGRAPH
              </div>
              <p className="font-serif text-[11px] text-newsprint-faded italic">
                {section.frontDeck}
              </p>
            </div>

            <div className="font-mono text-[10px] text-newsprint-ink font-bold space-y-1">
              <div>PHONE: {OWNER_DATA.phone}</div>
              <div>EMAIL: {OWNER_DATA.email}</div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM SECTION: Authentic Callout Bar */}
      <div className="pt-2.5 border-t-2 border-double-vintage flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-1 text-newsprint-faded group-hover:text-newsprint-ink transition-colors">
          <Move className="w-3 h-3 opacity-60" />
          <span className="text-[9px] uppercase font-bold">DRAG TO TOSS</span>
        </div>

        <div className="flex items-center gap-1 text-stamp-red font-bold group-hover:translate-x-0.5 transition-transform">
          <span className="text-[10px] uppercase tracking-wider font-extrabold">UNROLL BROADSHEET</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
