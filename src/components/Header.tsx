import React from 'react';
import { Sparkles, Layers, Menu } from 'lucide-react';
import { AudioToggle } from './AudioToggle';
import { OWNER_DATA } from '../data/portfolioData';

interface HeaderProps {
  reducedMotion: boolean;
  onToggleMotion: () => void;
  onOpenDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  reducedMotion,
  onToggleMotion,
  onOpenDrawer,
}) => {
  return (
    <header className="relative w-full border-b-2 border-newsprint-ink bg-newsprint px-4 pt-3 pb-2 z-30 select-none">
      {/* Top Ear-Pieces & Meta Row */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-[11px] font-mono border-b border-newsprint-ink/30 pb-2 mb-2 gap-2 text-newsprint-faded">
        <div className="flex items-center gap-3">
          <span className="font-bold text-newsprint-ink uppercase tracking-wider">
            {OWNER_DATA.circulation}
          </span>
          <span className="hidden sm:inline text-newsprint-ink/40">•</span>
          <span className="hidden sm:inline italic font-serif">
            "Printing Truth in Code &amp; Systems"
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="tracking-wide font-medium">
            {OWNER_DATA.weatherNotice}
          </span>
          <span className="text-newsprint-ink/40">•</span>
          <span className="font-bold text-newsprint-ink">
            {OWNER_DATA.editionDate}
          </span>
        </div>
      </div>

      {/* Primary Newspaper Masthead */}
      <div className="max-w-7xl mx-auto text-center py-2 relative">
        {/* Decorative corner ear pieces */}
        <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 text-left">
          <div className="text-[10px] font-mono uppercase tracking-widest text-newsprint-faded font-bold">
            SPECIAL EDITION
          </div>
          <div className="text-xs font-serif italic text-newsprint-ink">
            {OWNER_DATA.title}
          </div>
        </div>

        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 text-right">
          <div className="text-[10px] font-mono uppercase tracking-widest text-stamp-red font-bold">
            AVAILABLE FOR HIRE
          </div>
          <div className="text-xs font-serif italic text-newsprint-ink">
            Global &amp; Remote Inquiries
          </div>
        </div>

        <h1 className="font-masthead text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-newsprint-ink uppercase leading-none drop-shadow-xs">
          The Mihir Pratap Dispatch
        </h1>

        <p className="mt-2 text-xs sm:text-sm md:text-base font-serif italic text-newsprint-faded font-semibold max-w-3xl mx-auto">
          {OWNER_DATA.tagline}
        </p>
      </div>

      {/* Lower Navigation & Controls Bar */}
      <div className="max-w-7xl mx-auto mt-2 pt-2 border-t-2 border-b border-newsprint-ink flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Quick section badges */}
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Quick Edition Links">
          <button
            onClick={onOpenDrawer}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[11px] font-bold text-newsprint-ink bg-newsprint-aged border border-newsprint-ink/50 hover:bg-newsprint-light transition-colors rounded shadow-xs"
            aria-label="Open Broadsheet Index"
          >
            <Menu className="w-3.5 h-3.5" />
            <span>INDEX / ARCHIVES</span>
          </button>

          <span className="text-newsprint-ink/30 hidden sm:inline">|</span>

          <span className="hidden md:inline font-mono text-[11px] text-newsprint-faded">
            DRAG &amp; TOSS PAPERS • CLICK TO UNROLL BROADSHEET
          </span>
        </nav>

        {/* Right: Sound & Mode Controls */}
        <div className="flex items-center gap-2">
          {/* Motion Mode Toggle */}
          <button
            onClick={onToggleMotion}
            aria-label={reducedMotion ? "Switch to 3D Antigravity Floating Mode" : "Switch to Static Newspaper Grid"}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono tracking-wider border border-newsprint-ink/40 hover:border-newsprint-ink bg-newsprint-aged/60 hover:bg-newsprint-light transition-all rounded shadow-sm focus:ring-2 focus:ring-stamp-blue text-newsprint-ink"
            title="Toggle between 3D Antigravity Drift and Flat Newspaper Grid"
          >
            {reducedMotion ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-vintage-gold" />
                <span className="font-bold">MODE: STATIC GRID</span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5 text-stamp-blue" />
                <span className="font-bold">MODE: 3D ANTIGRAVITY</span>
              </>
            )}
          </button>

          {/* Procedural Web Audio Switch */}
          <AudioToggle />
        </div>
      </div>
    </header>
  );
};
