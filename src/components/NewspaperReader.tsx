import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Calendar, BookmarkCheck } from 'lucide-react';
import { SectionId } from '../types';
import { NEWSPAPER_SECTIONS, OWNER_DATA } from '../data/portfolioData';
import { DispatchOverview } from './sections/DispatchOverview';
import { Biography } from './sections/Biography';
import { DailyGazette } from './sections/DailyGazette';
import { Classifieds } from './sections/Classifieds';
import { soundFx } from '../audio/soundSynthesizer';

interface NewspaperReaderProps {
  activeSection: SectionId | null;
  onClose: () => void;
  onSelectSection: (id: SectionId) => void;
}

export const NewspaperReader: React.FC<NewspaperReaderProps> = ({
  activeSection,
  onClose,
  onSelectSection,
}) => {
  // ESC key listener to fold paper back to rack
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFx.playWhoosh(1.2);
        onClose();
      }
    };
    if (activeSection) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeSection, onClose]);

  if (!activeSection) return null;

  const currentMeta = NEWSPAPER_SECTIONS[activeSection];
  const sectionIds: SectionId[] = ['dispatch', 'biography', 'gazette', 'classifieds'];

  const handleFold = () => {
    soundFx.playWhoosh(1.3);
    onClose();
  };

  const handleTabSwitch = (id: SectionId) => {
    soundFx.playRustle(0.4);
    onSelectSection(id);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-newsprint-ink/75 backdrop-blur-xs overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={`${currentMeta.title} - Broadsheet Reader View`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl min-h-screen sm:min-h-0 sm:max-h-[92vh] bg-newsprint-light border-x-0 sm:border-2 border-newsprint-ink shadow-2xl flex flex-col overflow-hidden my-auto"
        >
          {/* Reader Sticky Header Bar */}
          <div className="sticky top-0 z-30 bg-newsprint-aged border-b-2 border-newsprint-ink px-4 py-2.5 flex items-center justify-between shadow-xs">
            {/* Left: Breadcrumbs / Back button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleFold}
                aria-label="Fold Paper and Return to Rack"
                className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-xs font-bold text-newsprint-ink bg-newsprint hover:bg-newsprint-dark border border-newsprint-ink rounded transition-colors shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>FOLD PAPER (ESC)</span>
              </button>

              <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-newsprint-faded">
                <Calendar className="w-3.5 h-3.5" />
                <span>{OWNER_DATA.editionDate}</span>
                <span>•</span>
                <span className="font-bold text-newsprint-ink uppercase">
                  {currentMeta.editionRoman} • {currentMeta.title}
                </span>
              </div>
            </div>

            {/* Center / Right: Section tabs */}
            <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto" aria-label="Newspaper Editions">
              {sectionIds.map((id) => {
                const sec = NEWSPAPER_SECTIONS[id];
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => handleTabSwitch(id)}
                    className={`px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs font-mono font-bold uppercase transition-all rounded ${
                      isActive
                        ? 'bg-newsprint-ink text-newsprint-light shadow-xs'
                        : 'text-newsprint-faded hover:text-newsprint-ink hover:bg-newsprint'
                    }`}
                  >
                    {sec.id === 'dispatch' && 'OVERVIEW'}
                    {sec.id === 'biography' && 'BIOGRAPHY'}
                    {sec.id === 'gazette' && 'PROJECTS'}
                    {sec.id === 'classifieds' && 'CONTACT'}
                  </button>
                );
              })}

              <button
                onClick={handleFold}
                aria-label="Close reader"
                className="ml-2 p-1.5 rounded text-newsprint-ink hover:bg-newsprint-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </nav>
          </div>

          {/* Reader Scrollable Broadsheet Content Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 bg-newsprint relative">
            {/* Top Broadsheet Masthead Ear-Pieces */}
            <div className="flex items-center justify-between text-[10px] font-mono border-b border-newsprint-ink/30 pb-2 mb-4 text-newsprint-faded">
              <span className="font-bold text-newsprint-ink uppercase">
                {currentMeta.earPieceLeft}
              </span>
              <div className="flex items-center gap-1.5 text-stamp-red font-bold">
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>OFFICIAL BROADSHEET • MIHIR PRATAP SINGH</span>
              </div>
              <span className="font-bold text-newsprint-ink uppercase">
                {currentMeta.earPieceRight}
              </span>
            </div>

            {/* Dynamic Section Renderer */}
            <div className="max-w-4xl mx-auto">
              {activeSection === 'dispatch' && <DispatchOverview onNavigate={onSelectSection} />}
              {activeSection === 'biography' && <Biography />}
              {activeSection === 'gazette' && <DailyGazette />}
              {activeSection === 'classifieds' && <Classifieds />}
            </div>

            {/* Broadsheet Bottom Folio */}
            <div className="max-w-4xl mx-auto mt-16 pt-6 border-t-2 border-newsprint-ink flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-newsprint-faded">
              <div>
                PAGE RECORD • VOL. XXIV • ISSUED IN LUCKNOW, INDIA
              </div>

              <button
                onClick={handleFold}
                className="inline-flex items-center gap-2 px-4 py-2 font-bold text-newsprint-ink bg-newsprint-aged border border-newsprint-ink hover:bg-newsprint-dark transition-colors rounded shadow-xs"
              >
                <span>FOLD PAPER &amp; RETURN TO ANTIGRAVITY RACK</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
