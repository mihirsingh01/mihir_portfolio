import React from 'react';
import { Sparkles, Layers, Menu } from 'lucide-react';
import { AudioToggle } from './AudioToggle';
import { OWNER_DATA, NEWSPAPER_SECTIONS } from '../data/portfolioData';
import { SectionId } from '../types';
import { useNewspaperDate } from '../utils/dateFormatter';

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
  const mastheadDate = useNewspaperDate('uppercase');
  const sections: SectionId[] = ['frontpage', 'profiles', 'business', 'directory'];

  return (
    <header className="relative w-full bg-[#FCFBF9] px-4 pt-3 pb-2 z-30 select-none border-b border-[#E2E2E2]">
      {/* Top Meta Dateline Row */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-[11px] font-sans text-[#727272] border-b border-[#E2E2E2] pb-1.5 mb-2 gap-2">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#121212] uppercase tracking-wider">
            {mastheadDate}
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

      {/* Main NYT 3-Column Masthead Row */}
      <div className="w-full max-w-7xl mx-auto py-2.5 px-2 sm:px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_220px] items-center gap-4">
          
          {/* Left Ear-piece */}
          <div className="hidden md:flex text-left flex-col justify-center">
            <span className="text-[10px] font-sans font-bold tracking-widest text-neutral-500 uppercase">
              ENGINEERING BUREAU
            </span>
            <span className="text-xs font-serif italic text-neutral-800 leading-tight">
              {OWNER_DATA.title}
            </span>
          </div>

          {/* Center Masthead Title */}
          <div className="text-center px-2">
            <h1 className="font-['UnifrakturMaguntia'] font-masthead text-4xl md:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-none select-none">
              {OWNER_DATA.mastheadTitle}
            </h1>
          </div>

          {/* Right Ear-piece */}
          <div className="hidden md:flex text-right flex-col justify-center">
            <span className="text-[10px] font-sans font-bold tracking-widest text-[#8B0000] uppercase">
              AVAILABLE FOR HIRE
            </span>
            <span className="text-xs font-serif italic text-neutral-800 leading-tight">
              Full-Time &amp; Remote Roles
            </span>
          </div>

        </div>

        {/* Sub-masthead Line (Centered below the 3 columns) */}
        <div className="mt-2 text-center">
          <p className="font-serif italic text-xs md:text-sm text-neutral-700 tracking-normal">
            {OWNER_DATA.tagline}
          </p>
        </div>
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
            aria-label={reducedMotion ? "Switch to 3D Floating Mode" : "Switch to Static Newspaper Grid"}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-sans tracking-wider border border-[#E2E2E2] bg-white hover:bg-[#F7F6F3] transition-all rounded-xs text-[#121212] font-semibold"
            title="Toggle between 3D Drift and Flat Newspaper Grid"
          >
            {reducedMotion ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#121212]" />
                <span>GRID MODE</span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5 text-[#121212]" />
                <span>3D</span>
              </>
            )}
          </button>

          <AudioToggle />
        </div>
      </div>
    </header>
  );
};
