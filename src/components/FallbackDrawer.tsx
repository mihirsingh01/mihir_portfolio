import React, { useEffect } from 'react';
import { X, ArrowRight, User, FolderGit2, Send, Newspaper } from 'lucide-react';
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
    { id: 'dispatch', icon: <Newspaper className="w-5 h-5 text-stamp-red" /> },
    { id: 'biography', icon: <User className="w-5 h-5 text-stamp-blue" /> },
    { id: 'gazette', icon: <FolderGit2 className="w-5 h-5 text-stamp-red" /> },
    { id: 'classifieds', icon: <Send className="w-5 h-5 text-stamp-blue" /> },
  ];

  const handleSelect = (id: SectionId) => {
    soundFx.playWhoosh(1.2);
    onSelectSection(id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-newsprint-ink/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Broadsheet Edition Index Drawer"
    >
      <div className="w-full max-w-md bg-newsprint-aged border-l-4 border-newsprint-ink h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-newsprint-ink pb-4 mb-6">
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-stamp-red">
                EDITORIAL ARCHIVES
              </span>
              <h2 className="font-masthead text-2xl font-bold uppercase text-newsprint-ink">
                Broadsheet Index
              </h2>
            </div>
            <button
              onClick={() => {
                soundFx.playStampClick();
                onClose();
              }}
              aria-label="Close Index Drawer"
              className="p-1.5 rounded hover:bg-newsprint-dark text-newsprint-ink transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="font-serif text-xs text-newsprint-faded italic mb-6">
            Select an edition to unroll the full broadsheet view or explore specific sections directly.
          </p>

          {/* Section Navigation List */}
          <nav className="space-y-3" aria-label="Newspaper Sections">
            {sections.map(({ id, icon }) => {
              const meta = NEWSPAPER_SECTIONS[id];
              return (
                <button
                  key={id}
                  onClick={() => handleSelect(id)}
                  className="w-full text-left bg-newsprint-light border-2 border-newsprint-ink/30 hover:border-newsprint-ink p-4 rounded-xs transition-all group shadow-xs hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-newsprint-ink">
                      {icon}
                      <span className="uppercase">{meta.title}</span>
                    </div>
                    <span
                      className={
                        meta.stampColor === 'red'
                          ? 'ink-stamp-red text-[9px]'
                          : 'ink-stamp-blue text-[9px]'
                      }
                    >
                      {meta.editionRoman}
                    </span>
                  </div>

                  <p className="font-serif text-xs text-newsprint-faded line-clamp-2 my-2">
                    {meta.frontDeck}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-dashed border-newsprint-ink/20 font-mono text-[11px]">
                    <span className="text-newsprint-faded">{meta.editionName}</span>
                    <span className="flex items-center gap-1 font-bold text-stamp-red group-hover:translate-x-1 transition-transform">
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
        <div className="border-t-2 border-newsprint-ink pt-4 mt-6 font-mono text-xs text-newsprint-faded space-y-1">
          <div className="font-bold text-newsprint-ink">
            {OWNER_DATA.name}
          </div>
          <div>{OWNER_DATA.title}</div>
          <div className="text-[10px] text-newsprint-faded/70">
            {OWNER_DATA.location} • {OWNER_DATA.phone}
          </div>
        </div>
      </div>
    </div>
  );
};
