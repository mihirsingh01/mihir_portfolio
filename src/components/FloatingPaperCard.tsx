import React, { useRef, useState } from 'react';
import { ArrowUpRight, Move, FolderGit2, Send } from 'lucide-react';
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
        soundFx.playRustle(0.5);
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
        soundFx.playWhoosh(1.3);
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

  // Programmatically set z-index: 50 when hovered or dragged, 10 otherwise
  const isElevated = physics.isHovered || physics.isDragging;
  const currentZIndex = isElevated ? 50 : 10;

  // 3D transform matrix with backface-visibility: hidden
  const transformStyle: React.CSSProperties = {
    transform: `translate3d(${physics.x}px, ${physics.y}px, ${physics.z}px) rotateX(${physics.rotationX}deg) rotateY(${physics.rotationY}deg) rotateZ(${physics.rotationZ}deg) scale(${physics.scale})`,
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    willChange: 'transform',
    zIndex: currentZIndex,
    cursor: physics.isDragging ? 'grabbing' : 'grab',
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`Unroll ${section.title} - ${section.subtitle}`}
      style={transformStyle}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[330px] h-[470px] bg-[#FCFBF9] text-[#121212] border border-[#121212] p-4 select-none transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-[#121212] group flex flex-col justify-between ${
        physics.isDragging
          ? 'shadow-nyt-lifted ring-1 ring-[#121212]'
          : physics.isHovered
          ? 'shadow-nyt-hover ring-1 ring-[#121212]'
          : 'shadow-nyt-paper'
      }`}
    >
      {/* 1. Header Block (Ear-pieces, Section Name, Date) */}
      <div className="w-full flex flex-col">
        <div className="flex justify-between items-center text-[10px] uppercase font-sans text-neutral-500 pb-1">
          <span>{section.earPieceLeft}</span>
          <span>{section.earPieceRight}</span>
        </div>

        <div className="border-b-2 border-black pb-1.5 mb-2">
          <span className="text-[9px] font-bold tracking-widest uppercase font-sans text-neutral-600 block">
            {section.kicker}
          </span>
          <h2 className="font-serif font-bold text-2xl leading-none mt-1">
            {section.title}
          </h2>
          <span className="text-[11px] font-serif italic text-neutral-500 block mt-0.5">
            {section.subtitle}
          </span>
        </div>
      </div>

      {/* 2. Middle Body Block (Headline, Image/Deck) - In Normal Flow */}
      <div className="flex-1 flex flex-col justify-start py-2 min-h-0">
        <h3 className="font-serif font-bold text-base leading-snug mb-3">
          {section.leadHeadline}
        </h3>

        {/* Hairline separator with explicit vertical margin in normal document flow */}
        <div className="w-full border-t border-neutral-300 my-2" />

        {/* Content / Image / Quote Deck with ample padding */}
        <div className="py-1 flex-1 flex flex-col justify-center">
          {/* SECTION 1: Front Page (Executive Overview) */}
          {physics.id === 'frontpage' && (
            <div className="space-y-3 text-center">
              <p className="font-serif italic text-xs text-neutral-600 leading-relaxed text-center">
                "{section.frontDeck}"
              </p>
              <div className="flex items-center justify-center gap-1.5 pt-1 font-sans text-[9px] text-[#121212] font-semibold uppercase tracking-wider">
                <span className="px-2 py-0.5 border border-[#121212]/30 bg-white">
                  B.TECH CSE (8.0 CGPA)
                </span>
                <span className="px-2 py-0.5 border border-[#121212]/30 bg-white">
                  HACKATHON WINNER
                </span>
              </div>
            </div>
          )}

          {/* SECTION 2: Profiles & Sunday Review (With Mihir's Portrait & NYT Caption) */}
          {physics.id === 'profiles' && (
            <div className="space-y-2">
              <div className="nyt-photo-frame w-[125px] mx-auto p-1 bg-white">
                <div className="relative overflow-hidden aspect-[4/5] w-full bg-[#F5F5F5]">
                  <img
                    src={OWNER_DATA.photoUrl}
                    alt="Mihir Pratap Singh — Full-Stack Web Developer"
                    className="w-full h-full object-cover object-top filter contrast-105"
                    loading="eager"
                  />
                </div>
                <p className="text-[8.5px] text-neutral-500 font-sans text-left mt-1 leading-tight px-0.5">
                  {OWNER_DATA.photoCaption}
                </p>
              </div>

              <p className="font-serif italic text-[11px] text-center text-neutral-600 leading-relaxed px-1 line-clamp-2">
                "{section.frontDeck}"
              </p>
            </div>
          )}

          {/* SECTION 3: Business & Technology (Featured Works) */}
          {physics.id === 'business' && (
            <div className="space-y-2">
              <div className="border border-[#E2E2E2] bg-white p-2.5 space-y-1.5">
                <div className="flex items-center gap-1.5 font-sans text-[10px] font-bold text-[#121212] uppercase tracking-wider">
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>FEATURED PRODUCTION PLATFORMS</span>
                </div>
                
                <div className="space-y-1 font-serif text-[11px] text-[#2F2F2F]">
                  <div className="border-l-2 border-[#121212] pl-2">
                    <span className="font-bold text-[#121212]">Task Manager Analytics:</span> 8+ REST APIs, JWT & MySQL.
                  </div>
                  <div className="border-l-2 border-[#121212] pl-2">
                    <span className="font-bold text-[#121212]">EcoPulse Sustainability:</span> Carbon monitoring & 99% uptime.
                  </div>
                </div>
              </div>

              <p className="font-serif italic text-xs text-neutral-600 leading-relaxed text-center line-clamp-2">
                "{section.frontDeck}"
              </p>
            </div>
          )}

          {/* SECTION 4: Inquiries & The Directory (Contact & Connect) */}
          {physics.id === 'directory' && (
            <div className="space-y-2.5 text-center">
              <div className="border border-[#E2E2E2] bg-white p-2.5 relative">
                <div className="w-6 h-6 rounded-full border border-[#121212] mx-auto flex items-center justify-center text-[#121212] mb-1">
                  <Send className="w-3 h-3" />
                </div>
                <div className="font-serif text-[11px] font-bold text-[#121212] uppercase tracking-wider mb-0.5">
                  EDITORIAL CONTACT DESK
                </div>
                <p className="font-serif italic text-xs text-neutral-600 leading-relaxed">
                  "{section.frontDeck}"
                </p>
              </div>

              <div className="font-sans text-[9px] font-semibold text-[#121212] space-y-0.5 tracking-wider uppercase">
                <div>PHONE: {OWNER_DATA.phone}</div>
                <div>EMAIL: {OWNER_DATA.email}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Bottom Footer Block (Pinned cleanly to bottom) */}
      <div className="w-full pt-2 border-t border-black flex justify-between items-center text-[10px] font-sans font-bold uppercase tracking-wider">
        <div className="flex items-center gap-1.5 text-neutral-600 group-hover:text-black transition-colors">
          <span>{section.sectionNumber}</span>
          <span className="text-neutral-300">•</span>
          <Move className="w-3 h-3 opacity-70" />
          <span className="text-[9px] font-medium">DRAG TO TOSS</span>
        </div>

        <span className="flex items-center gap-1 hover:underline cursor-pointer text-black">
          <span>READ EDITION</span>
          <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
