import React, { useEffect } from 'react';
import { X, ArrowRight, User, FolderGit2, Send, Globe } from 'lucide-react';
import { SectionId } from '../types';
import { NEWSPAPER_SECTIONS, OWNER_DATA } from '../data/portfolioData';
import { soundFx } from '../audio/soundSynthesizer';

interface FallbackDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (id: SectionId) => void;
}

export const FallbackDrawer: React.FC<FallbackDrawerProps> = ({
  isOpen,
  onClose,
  onSelectSection,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        soundFx.playStampClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sections: { id: SectionId; icon: React.ReactNode }[] = [
    { id: 'frontpage', icon: <Globe className="w-4 h-4 text-[#121212]" /> },
    { id: 'profiles', icon: <User className="w-4 h-4 text-[#103B75]" /> },
    { id: 'business', icon: <FolderGit2 className="w-4 h-4 text-[#A31D1D]" /> },
    { id: 'directory', icon: <Send className="w-4 h-4 text-[#121212]" /> },
  ];

  const handleSelect = (id: SectionId) => {
    soundFx.playWhoosh(1.2);
    onSelectSection(id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#121212]/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="New York Times Sections Drawer"
    >
      <div className="w-full max-w-md bg-[#FCFBF9] border-l border-[#121212] h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#121212] pb-4 mb-6">
            <div>
              <span className="font-sans text-[10px] uppercase font-bold text-[#A31D1D] tracking-widest">
                EDITORIAL DIRECTORY
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#121212]">
                Sections &amp; Editions
              </h2>
            </div>
            <button
              onClick={() => {
                soundFx.playStampClick();
                onClose();
              }}
              aria-label="Close Drawer"
              className="p-1.5 rounded-xs hover:bg-[#F7F6F3] text-[#121212] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="font-serif text-xs text-[#727272] italic mb-6">
            Select an edition to unroll the full broadsheet view or jump to specific case studies.
          </p>

          {/* Section Navigation List */}
          <nav className="space-y-3" aria-label="NYT Sections">
            {sections.map(({ id, icon }) => {
              const meta = NEWSPAPER_SECTIONS[id];
              return (
                <button
                  key={id}
                  onClick={() => handleSelect(id)}
                  className="w-full text-left bg-white border border-[#E2E2E2] hover:border-[#121212] p-4 rounded-xs transition-colors group shadow-xs"
                >
                  <div className="flex items-center justify-between mb-1 font-sans">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#121212]">
                      {icon}
                      <span>{meta.title}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-[#727272] uppercase tracking-wider">
                      {meta.sectionNumber}
                    </span>
                  </div>

                  <p className="font-serif text-xs text-[#727272] line-clamp-2 my-2">
                    {meta.frontDeck}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#E2E2E2] font-sans text-[11px]">
                    <span className="text-[#727272]">{meta.subtitle}</span>
                    <span className="flex items-center gap-1 font-bold text-[#121212] group-hover:translate-x-1 transition-transform">
                      <span>OPEN</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Info */}
        <div className="border-t border-[#121212] pt-4 mt-6 font-sans text-xs text-[#727272] space-y-1">
          <div className="font-bold text-[#121212]">
            {OWNER_DATA.name}
          </div>
          <div>{OWNER_DATA.title}</div>
          <div className="text-[11px]">
            {OWNER_DATA.location} • {OWNER_DATA.phone}
          </div>
        </div>
      </div>
    </div>
  );
};
