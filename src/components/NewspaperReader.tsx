import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Calendar } from 'lucide-react';
import { SectionId } from '../types';
import { NEWSPAPER_SECTIONS } from '../data/portfolioData';
import { DispatchOverview } from './sections/DispatchOverview';
import { Biography } from './sections/Biography';
import { DailyGazette } from './sections/DailyGazette';
import { Classifieds } from './sections/Classifieds';
import { soundFx } from '../audio/soundSynthesizer';
import { useNewspaperDate } from '../utils/dateFormatter';

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
  const readerDateTitle = useNewspaperDate('title');
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
  const sectionIds: SectionId[] = ['frontpage', 'profiles', 'business', 'directory'];

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
        className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-[#121212]/80 backdrop-blur-xs overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={`${currentMeta.title} - Broadsheet Reader View`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl min-h-screen sm:min-h-0 sm:max-h-[92vh] bg-white border border-[#121212] shadow-2xl flex flex-col overflow-hidden my-auto"
        >
          {/* Reader Sticky Header Bar */}
          <div className="sticky top-0 z-30 bg-[#FCFBF9] border-b border-[#121212] px-4 py-2.5 flex items-center justify-between shadow-xs">
            {/* Left: Fold Paper button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleFold}
                aria-label="Fold Paper and Return to Rack"
                className="inline-flex items-center gap-1.5 px-3 py-1 font-sans text-xs font-bold text-[#121212] bg-white hover:bg-[#F7F6F3] border border-[#121212] rounded-xs transition-colors shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>← FOLD PAPER [ESC]</span>
              </button>

              <div className="hidden md:flex items-center gap-2 font-sans text-xs text-[#727272]">
                <Calendar className="w-3.5 h-3.5" />
                <span>{readerDateTitle}</span>
                <span>•</span>
                <span className="font-semibold text-[#121212] uppercase">
                  {currentMeta.title}
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
                    className={`px-2.5 py-1 text-[11px] font-sans font-bold uppercase transition-all rounded-xs ${
                      isActive
                        ? 'bg-[#121212] text-white'
                        : 'text-[#727272] hover:text-[#121212] hover:bg-[#F7F6F3]'
                    }`}
                  >
                    {sec.id === 'frontpage' && 'FRONTPAGE'}
                    {sec.id === 'profiles' && 'PROFILES'}
                    {sec.id === 'business' && 'BUSINESS'}
                    {sec.id === 'directory' && 'DIRECTORY'}
                  </button>
                );
              })}

              <button
                onClick={handleFold}
                aria-label="Close reader"
                className="ml-2 p-1.5 text-[#121212] hover:bg-[#F7F6F3] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </nav>
          </div>

          {/* Reader Scrollable Broadsheet Content Container */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 md:p-12 bg-white relative">
            {/* Top Broadsheet Ear-Pieces */}
            <div className="flex items-center justify-between text-[10px] font-sans font-medium text-[#727272] border-b border-[#E2E2E2] pb-2 mb-6 uppercase tracking-wider">
              <span>{currentMeta.earPieceLeft}</span>
              <span className="font-serif italic font-normal text-[#121212]">
                The Mihir Pratap Times Broadsheet Edition
              </span>
              <span>{currentMeta.earPieceRight}</span>
            </div>

            {/* Dynamic Section Content */}
            <div className="max-w-4xl mx-auto">
              {activeSection === 'frontpage' && <DispatchOverview onNavigate={onSelectSection} />}
              {activeSection === 'profiles' && <Biography />}
              {activeSection === 'business' && <DailyGazette />}
              {activeSection === 'directory' && <Classifieds />}
            </div>

            {/* Bottom Folio */}
            <div className="max-w-4xl mx-auto mt-16 pt-6 border-t border-[#121212] flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-[#727272]">
              <div>
                PAGE RECORD • VOL. CLXXV • ISSUED IN LUCKNOW, INDIA
              </div>

              <button
                onClick={handleFold}
                className="inline-flex items-center gap-2 px-4 py-2 font-bold text-[#121212] bg-[#FCFBF9] border border-[#121212] hover:bg-[#F7F6F3] transition-colors rounded-xs shadow-xs"
              >
                <span>FOLD PAPER &amp; RETURN TO RACK</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
