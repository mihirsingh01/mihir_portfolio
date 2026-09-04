import React, { useRef, useState } from 'react';
import { ArrowUpRight, Move, Globe, FolderGit2, Send } from 'lucide-react';
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
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[460px] bg-white border border-[#121212] p-4 select-none transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-[#121212] group flex flex-col justify-between ${
        physics.isDragging
          ? 'shadow-nyt-lifted ring-1 ring-[#121212]'
          : physics.isHovered
          ? 'shadow-nyt-hover ring-1 ring-[#121212]'
          : 'shadow-nyt-paper'
      }`}
    >
      {/* Newspaper subtle fold crease */}
      <div className="nyt-paper-crease" />

      {/* TOP: NYT Ear-Pieces, Kicker & Header */}
      <div>
        {/* Ear-Pieces / Dateline */}
        <div className="flex items-center justify-between text-[9px] font-sans font-medium text-[#727272] border-b border-[#E2E2E2] pb-1 mb-1.5 uppercase tracking-wider">
          <span>{section.earPieceLeft}</span>
          <span>{section.earPieceRight}</span>
        </div>

        {/* NYT Kicker Tag */}
        <div className="text-[10px] font-sans font-bold text-[#121212] uppercase tracking-nyt-kicker mb-0.5">
          {section.kicker}
        </div>

        {/* NYT Section Title */}
        <div className="border-b-2 border-[#121212] pb-1.5 mb-2">
          <h2 className="font-serif text-2xl font-bold text-[#121212] tracking-nyt-headline leading-tight">
            {section.title}
          </h2>
          <div className="text-[10px] font-serif italic text-[#727272] mt-0.5">
            {section.subtitle}
          </div>
        </div>

        {/* Lead Headline */}
        <div className="border-b border-[#E2E2E2] pb-1.5 mb-2">
          <h3 className="font-serif text-[1.05rem] font-bold text-[#121212] tracking-nyt-headline leading-snug">
            {section.leadHeadline}
          </h3>
        </div>
      </div>

      {/* MIDDLE: Clean Front Cover Visuals (Fitted cleanly inside 460px height) */}
      <div className="flex-1 flex flex-col justify-center my-0.5 overflow-hidden">
        {/* SECTION 2: Profiles & Sunday Review (With Mihir's Portrait & NYT Caption) */}
        {physics.id === 'profiles' && (
          <div className="space-y-1.5">
            <div className="nyt-photo-frame w-[145px] mx-auto p-1 bg-white">
              <div className="relative overflow-hidden aspect-[4/5] w-full bg-[#F5F5F5]">
                <img
                  src={OWNER_DATA.photoUrl}
                  alt="Mihir Pratap Singh — Full-Stack Web Developer"
                  className="w-full h-full object-cover object-top filter contrast-105"
                  loading="eager"
                />
              </div>
              <p className="text-[9px] text-[#727272] font-sans text-left mt-1 leading-tight px-0.5">
                {OWNER_DATA.photoCaption}
              </p>
            </div>

            <p className="font-serif text-[11px] text-center text-[#2F2F2F] italic px-1 line-clamp-2">
              "{section.frontDeck}"
            </p>
          </div>
        )}

        {/* SECTION 1: Front Page (Executive Overview) */}
        {physics.id === 'frontpage' && (
          <div className="space-y-2.5 px-1 text-center">
            <div className="border border-[#E2E2E2] bg-[#FCFBF9] p-3 relative">
              <div className="w-7 h-7 rounded-full border border-[#121212] mx-auto flex items-center justify-center text-[#121212] mb-1.5">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <p className="font-serif text-xs text-[#2F2F2F] leading-relaxed">
                {section.frontDeck}
              </p>
            </div>

            <div className="flex items-center justify-center gap-1.5 pt-0.5 font-sans text-[9px] text-[#121212] font-semibold uppercase tracking-wider">
              <span className="px-2 py-0.5 border border-[#121212]/30 bg-white">
                B.TECH CSE (8.0 CGPA)
              </span>
              <span className="px-2 py-0.5 border border-[#121212]/30 bg-white">
                HACKATHON WINNER
              </span>
            </div>
          </div>
        )}

        {/* SECTION 3: Business & Technology (Featured Works) */}
        {physics.id === 'business' && (
          <div className="space-y-2 px-1">
            <div className="border border-[#E2E2E2] bg-[#FCFBF9] p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 font-sans text-[10px] font-bold text-[#121212] uppercase tracking-wider">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>FEATURED PRODUCTION PLATFORMS</span>
              </div>
              
              <div className="space-y-1.5 font-serif text-[11px] text-[#2F2F2F]">
                <div className="border-l-2 border-[#121212] pl-2">
                  <span className="font-bold text-[#121212]">Task Manager Analytics:</span> 8+ REST APIs, JWT, MySQL & Chart.js dashboard.
                </div>
                <div className="border-l-2 border-[#121212] pl-2">
                  <span className="font-bold text-[#121212]">EcoPulse Sustainability:</span> Carbon monitoring, unit testing & 99% uptime.
                </div>
              </div>
            </div>

            <p className="font-serif text-[11px] text-center text-[#727272] italic line-clamp-2">
              {section.frontDeck}
            </p>
          </div>
        )}

        {/* SECTION 4: Inquiries & The Directory (Contact & Connect) */}
        {physics.id === 'directory' && (
          <div className="space-y-2.5 px-1 text-center">
            <div className="border border-[#E2E2E2] bg-[#FCFBF9] p-3 relative">
              <div className="w-7 h-7 rounded-full border border-[#121212] mx-auto flex items-center justify-center text-[#121212] mb-1.5">
                <Send className="w-3.5 h-3.5" />
              </div>
              <div className="font-serif text-[11px] font-bold text-[#121212] uppercase tracking-wider mb-0.5">
                EDITORIAL CONTACT DESK
              </div>
              <p className="font-serif text-[11px] text-[#727272] italic">
                {section.frontDeck}
              </p>
            </div>

            <div className="font-sans text-[9px] font-semibold text-[#121212] space-y-0.5 tracking-wider uppercase">
              <div>PHONE: {OWNER_DATA.phone}</div>
              <div>EMAIL: {OWNER_DATA.email}</div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM: Clean NYT Editorial Callout */}
      <div className="pt-2 border-t border-[#121212] flex items-center justify-between font-sans text-xs">
        <div className="flex items-center gap-1 text-[#727272] group-hover:text-[#121212] transition-colors">
          <Move className="w-3 h-3 opacity-70" />
          <span className="text-[9px] uppercase font-semibold tracking-wider">DRAG TO TOSS</span>
        </div>

        <div className="flex items-center gap-1 text-[#121212] font-bold group-hover:translate-x-0.5 transition-transform">
          <span className="text-[10px] uppercase tracking-wider">READ EDITION</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};
