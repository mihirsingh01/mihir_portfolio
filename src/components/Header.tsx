import React from 'react';
import { Sparkles, Layers, Menu } from 'lucide-react';
import { AudioToggle } from './AudioToggle';
import { OWNER_DATA, NEWSPAPER_SECTIONS } from '../data/portfolioData';
import { SectionId } from '../types';

interface HeaderProps {
  reducedMotion: boolean;
  onToggleMotion: () => void;
  onOpenDrawer: () => void;
  onSelectSection?: (id: SectionId) => void;
}

export const Header: React.FC<HeaderProps> = ({
  reducedMotion,
  onToggleMotion,
  onOpenDrawer,
  onSelectSection,
}) => {
  const sections: SectionId[] = ['frontpage', 'profiles', 'business', 'directory'];

  return (
    <header className="relative w-full bg-[#FCFBF9] px-4 pt-3 pb-2 z-30 select-none border-b border-[#E2E2E2]">
      {/* Top Meta Dateline Row */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-[11px] font-sans text-[#727272] border-b border-[#E2E2E2] pb-1.5 mb-2 gap-2">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#121212] uppercase tracking-wider">
            {OWNER_DATA.editionDate}
          </span>
          <span className="hidden sm:inline text-[#E2E2E2]">•</span>
          <span className="hidden sm:inline">
            {OWNER_DATA.volumeNotice}
          </span>
          <span className="hidden sm:inline text-[#E2E2E2]">•</span>
          <span className="hidden sm:inline font-serif italic">
            "All the Code That's Fit to Ship"
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span>{OWNER_DATA.weatherNotice}</span>
          <span className="text-[#E2E2E2]">•</span>
          <span className="font-semibold text-[#121212]">{OWNER_DATA.priceNotice}</span>
        </div>
      </div>

      {/* Main NYT Gothic Masthead */}
      <div className="max-w-7xl mx-auto text-center py-1.5 relative">
        {/* Left Ear-Piece */}
        <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 text-left">
          <div className="text-[10px] font-sans uppercase tracking-widest text-[#727272] font-semibold">
            ENGINEERING BUREAU
          </div>
          <div className="text-xs font-serif italic text-[#121212]">
            {OWNER_DATA.title}
          </div>
        </div>

        {/* Right Ear-Piece */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 text-right">
          <div className="text-[10px] font-sans uppercase tracking-widest text-[#A31D1D] font-bold">
            AVAILABLE FOR HIRE
          </div>
          <div className="text-xs font-serif italic text-[#121212]">
            Full-Time &amp; Remote Roles
          </div>
        </div>

        {/* The Blackletter / Gothic Masthead */}
        <h1 className="font-masthead text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-[#121212] tracking-normal leading-none select-none">
          {OWNER_DATA.mastheadTitle}
        </h1>

        {/* NYT Sub-Masthead Line */}
        <p className="mt-2 text-xs sm:text-sm md:text-[15px] font-serif italic text-[#2F2F2F] font-normal max-w-3xl mx-auto">
          {OWNER_DATA.tagline}
        </p>
      </div>

      {/* NYT Double-Rule Divider Line */}
      <div className="max-w-7xl mx-auto my-1.5 nyt-double-rule" />

      {/* Lower Navigation & Controls Bar */}
      <div className="max-w-7xl mx-auto py-1 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Section Direct Navigation Bar */}
        <nav className="flex items-center gap-2 sm:gap-4 font-sans text-[11px] uppercase tracking-wider font-semibold text-[#121212]" aria-label="NYT Sections">
          <button
            onClick={onOpenDrawer}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-[#121212] bg-white border border-[#E2E2E2] hover:bg-[#F7F6F3] transition-colors rounded-xs shadow-xs"
            aria-label="Open Sections Drawer"
          >
            <Menu className="w-3.5 h-3.5" />
            <span>SECTIONS</span>
          </button>

          <span className="text-[#E2E2E2] hidden sm:inline">|</span>

          {sections.map((secId) => {
            const sec = NEWSPAPER_SECTIONS[secId];
            return (
              <button
                key={secId}
                onClick={() => onSelectSection?.(secId)}
                className="hover:text-[#A31D1D] transition-colors hidden md:inline"
              >
                {sec.title}
              </button>
            );
          })}
        </nav>

        {/* Sound & Physics Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMotion}
            aria-label={reducedMotion ? "Switch to 3D Antigravity Floating Mode" : "Switch to Static Newspaper Grid"}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-sans tracking-wider border border-[#E2E2E2] bg-white hover:bg-[#F7F6F3] transition-all rounded-xs text-[#121212] font-semibold"
            title="Toggle between 3D Antigravity Drift and Flat Newspaper Grid"
          >
            {reducedMotion ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#121212]" />
                <span>GRID MODE</span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5 text-[#121212]" />
                <span>3D ANTIGRAVITY</span>
              </>
            )}
          </button>

          <AudioToggle />
        </div>
      </div>
    </header>
  );
};
