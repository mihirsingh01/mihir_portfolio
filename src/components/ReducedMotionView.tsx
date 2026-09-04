import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionId } from '../types';
import { NEWSPAPER_SECTIONS, OWNER_DATA } from '../data/portfolioData';
import { soundFx } from '../audio/soundSynthesizer';

interface ReducedMotionViewProps {
  onOpenSection: (id: SectionId) => void;
}

export const ReducedMotionView: React.FC<ReducedMotionViewProps> = ({ onOpenSection }) => {
  const sections: SectionId[] = ['frontpage', 'profiles', 'business', 'directory'];

  const handleClick = (id: SectionId) => {
    soundFx.playWhoosh(1.0);
    onOpenSection(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Notice Banner */}
      <div className="bg-white border border-[#121212] p-3 mb-8 text-center font-sans text-xs text-[#727272]">
        <span className="font-bold text-[#121212] uppercase tracking-wider mr-2">
          [ STATIC BROADSHEET RACK ENGAGED ]
        </span>
        Reduced motion mode engaged. Select any newspaper edition below to unroll its complete editorial pages.
      </div>

      {/* Grid of Newspapers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((id) => {
          const section = NEWSPAPER_SECTIONS[id];
          const isBio = id === 'profiles';

          return (
            <div
              key={id}
              onClick={() => handleClick(id)}
              onMouseEnter={() => soundFx.playRustle(0.2)}
              className="bg-white border border-[#121212] p-5 relative flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-nyt-hover shadow-nyt-paper"
            >
              <div className="nyt-paper-crease" />

              <div>
                {/* Header Ear Pieces */}
                <div className="flex items-center justify-between text-[10px] font-sans font-medium text-[#727272] border-b border-[#E2E2E2] pb-1.5 mb-2 uppercase tracking-wider">
                  <span>{section.earPieceLeft}</span>
                  <span>{section.earPieceRight}</span>
                </div>

                {/* Section Number & Kicker */}
                <div className="text-[10px] font-sans font-bold text-[#121212] uppercase tracking-nyt-kicker mb-1">
                  {section.kicker}
                </div>

                {/* Title */}
                <div className="border-b-2 border-[#121212] pb-2 mb-2.5">
                  <h3 className="font-serif text-2xl font-bold text-[#121212] tracking-nyt-headline leading-tight">
                    {section.title}
                  </h3>
                  <div className="text-[11px] font-serif italic text-[#727272] mt-0.5">
                    {section.subtitle}
                  </div>
                </div>

                {/* Lead Headline */}
                <div className="border-b border-[#E2E2E2] pb-2 mb-3">
                  <h4 className="font-serif text-sm font-bold text-[#121212] tracking-nyt-headline leading-snug">
                    {section.leadHeadline}
                  </h4>
                </div>

                {/* Profiles Photo Preview */}
                {isBio && (
                  <div className="nyt-photo-frame w-32 mx-auto my-2 p-1 bg-white">
                    <img
                      src={OWNER_DATA.photoUrl}
                      alt="Mihir Pratap Singh"
                      className="aspect-[4/5] object-cover object-top w-full filter contrast-105"
                    />
                    <p className="text-[9px] text-[#727272] font-sans text-left mt-1 leading-tight">
                      Mihir Pratap Singh, Lucknow.
                    </p>
                  </div>
                )}

                {/* Front deck snippet */}
                <p className="font-serif text-xs leading-relaxed text-[#727272] mb-4 text-center italic">
                  "{section.frontDeck}"
                </p>
              </div>

              {/* Action Bar */}
              <div className="pt-2.5 border-t border-[#121212] flex items-center justify-between font-sans text-xs">
                <span className="text-[10px] uppercase text-[#727272] font-semibold tracking-wider">
                  {section.sectionNumber}
                </span>
                <span className="inline-flex items-center gap-1 text-[#121212] font-bold">
                  <span className="text-[11px] uppercase tracking-wider">READ EDITION</span>
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
