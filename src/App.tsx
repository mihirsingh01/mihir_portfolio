import { useState, useEffect } from 'react';
import { SectionId } from './types';
import { Header } from './components/Header';
import { NewspaperRackHero } from './components/NewspaperRackHero';
import { ReducedMotionView } from './components/ReducedMotionView';
import { NewspaperReader } from './components/NewspaperReader';
import { FallbackDrawer } from './components/FallbackDrawer';
import { soundFx } from './audio/soundSynthesizer';

export function App() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Detect prefers-reduced-motion or mobile viewport
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = window.innerWidth < 768;
    return mediaQuery.matches || isMobile;
  });

  // Handle global keyboard shortcuts
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.key === 'm' || e.key === 'M') && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        soundFx.toggleMute();
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  const handleOpenSection = (id: SectionId) => {
    setActiveSection(id);
  };

  const handleCloseReader = () => {
    setActiveSection(null);
  };

  const handleToggleMotion = () => {
    soundFx.playStampClick();
    setReducedMotion((prev) => !prev);
  };

  return (
    <div
      className={`bg-[#FCFBF9] flex flex-col justify-between select-none font-serif text-[#121212] ${
        reducedMotion ? 'min-h-screen overflow-y-auto' : 'h-screen max-h-screen overflow-hidden'
      }`}
    >
      {/* Top NYT Broadsheet Masthead */}
      <Header
        reducedMotion={reducedMotion}
        onToggleMotion={handleToggleMotion}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onSelectSection={handleOpenSection}
      />

      {/* Main Newspaper Rack Hero (Coordinate origin is dead-center between header & footer) */}
      <main className="flex-1 relative flex items-center justify-center w-full overflow-hidden">
        {reducedMotion ? (
          <ReducedMotionView onOpenSection={handleOpenSection} />
        ) : (
          <NewspaperRackHero
            onOpenSection={handleOpenSection}
            isModalOpen={activeSection !== null}
          />
        )}
      </main>

      {/* Footer Colophon */}
      <footer className="border-t border-[#121212] bg-[#FCFBF9] px-4 py-2 text-[11px] font-sans text-[#727272] shrink-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div>
            <span className="font-semibold text-[#121212]">The Mihir Pratap Times</span>
            <span className="mx-2">•</span>
            <span>All the Code That's Fit to Ship</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-medium text-[#121212]">PRESS [M] TO TOGGLE AUDIO</span>
            <span>•</span>
            <span className="font-semibold text-[#121212]">© 2026 MIHIR PRATAP SINGH</span>
          </div>
        </div>
      </footer>

      {/* Unrolled Broadsheet Reader Modal */}
      <NewspaperReader
        activeSection={activeSection}
        onClose={handleCloseReader}
        onSelectSection={handleOpenSection}
      />

      {/* Accessible Table of Contents Drawer */}
      <FallbackDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectSection={handleOpenSection}
      />
    </div>
  );
}

export default App;
