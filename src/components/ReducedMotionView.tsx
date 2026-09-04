import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionId } from '../types';
import { NEWSPAPER_SECTIONS, OWNER_DATA } from '../data/portfolioData';
import { soundFx } from '../audio/soundSynthesizer';

interface ReducedMotionViewProps {
  onOpenSection: (id: SectionId) => void;
}

export const ReducedMotionView: React.FC<ReducedMotionViewProps> = ({ onOpenSection }) => {
  const sections: SectionId[] = ['dispatch', 'biography', 'gazette', 'classifieds'];

  const handleClick = (id: SectionId) => {
    soundFx.playWhoosh(1.0);
    onOpenSection(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Notice Banner */}
      <div className="bg-newsprint-aged border-2 border-newsprint-ink p-3 mb-8 text-center font-mono text-xs text-newsprint-faded">
        <span className="font-bold text-newsprint-ink uppercase mr-2">
          [ STATIC BROADSHEET RACK ACTIVE ]
        </span>
        Reduced motion mode engaged. Select any newspaper below to unroll its complete editorial pages.
      </div>

      {/* Grid of Newspapers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((id) => {
          const section = NEWSPAPER_SECTIONS[id];
          const isBio = id === 'biography';

          return (
            <div
              key={id}
              onClick={() => handleClick(id)}
              onMouseEnter={() => soundFx.playRustle(0.2)}
              className={`bg-aged-paper border-2 border-newsprint-ink rounded-xs p-5 relative flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-paper-hover ${
                isBio ? 'ring-2 ring-stamp-blue/60 shadow-paper-hover' : 'shadow-paper-float'
              }`}
            >
              {/* Paper crease */}
              <div className="paper-crease-horizontal" />

              <div>
                {/* Header Ear Pieces */}
                <div className="flex items-center justify-between text-[9px] font-mono border-b border-newsprint-ink/30 pb-1.5 mb-2 text-newsprint-faded">
                  <span className="truncate max-w-[120px] uppercase font-bold text-newsprint-ink">
                    {section.earPieceLeft}
                  </span>
                  <span className="uppercase">{section.dateStr}</span>
                </div>

                {/* Stamp & Issue */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-extrabold text-newsprint-ink uppercase">
                    {section.editionRoman}
                  </span>
                  <span
                    className={
                      section.stampColor === 'red'
                        ? 'ink-stamp-red text-[9px]'
                        : 'ink-stamp-blue text-[9px]'
                    }
                  >
                    {section.stampText}
                  </span>
                </div>

                {/* Title */}
                <div className="border-b-2 border-newsprint-ink pb-2 mb-2.5 text-center">
                  <h3 className="font-masthead text-xl font-black uppercase text-newsprint-ink leading-tight">
                    {section.title}
                  </h3>
                  <div className="text-[10px] font-serif italic text-newsprint-faded">
                    {section.editionName}
                  </div>
                </div>

                {/* Lead Headline */}
                <div className="border-b border-newsprint-ink/30 pb-2 mb-3 text-center">
                  <h4 className="font-masthead text-xs sm:text-sm font-bold text-newsprint-ink uppercase tracking-tight leading-snug">
                    {section.leadHeadline}
                  </h4>
                </div>

                {/* Biography Photo Preview */}
                {isBio && (
                  <div className="vintage-photo-frame w-28 mx-auto my-2 p-1 bg-newsprint-light">
                    <img
                      src={OWNER_DATA.photoUrl}
                      alt="Mihir Pratap Singh"
                      className="vintage-halftone-photo aspect-[4/5] object-cover object-top w-full"
                    />
                  </div>
                )}

                {/* Front deck snippet */}
                <p className="font-serif text-xs leading-relaxed text-newsprint-faded mb-4 text-center italic">
                  "{section.frontDeck}"
                </p>
              </div>

              {/* Action */}
              <div className="pt-3 border-t-2 border-double-vintage flex items-center justify-between font-mono text-xs">
                <span className="text-[10px] uppercase text-newsprint-faded font-bold">
                  BROADSHEET
                </span>
                <span className="inline-flex items-center gap-1 text-stamp-red font-bold">
                  <span>READ EDITION</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
