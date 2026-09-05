import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionId } from '../types';
import { NEWSPAPER_SECTIONS, OWNER_DATA } from '../data/portfolioData';
import { soundFx } from '../audio/soundSynthesizer';
import { useNewspaperDate } from '../utils/dateFormatter';

interface ReducedMotionViewProps {
  onOpenSection: (id: SectionId) => void;
}

export const ReducedMotionView: React.FC<ReducedMotionViewProps> = ({ onOpenSection }) => {
  const currentDateTitle = useNewspaperDate('title');
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
              className="bg-[#FCFBF9] text-[#121212] border border-[#121212] p-5 relative flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-nyt-hover shadow-nyt-paper"
            >
              {/* Header Block */}
              <div className="w-full flex flex-col">
                {/* Header Ear Pieces */}
                <div className="flex items-center justify-between text-[10px] font-sans font-medium text-neutral-500 pb-1 uppercase tracking-wider">
                  <span>{section.earPieceLeft}</span>
                  <span>{section.earPieceRight}</span>
                </div>

                {/* Section Kicker & Title */}
                <div className="border-b-2 border-black pb-1.5 mb-2">
                  <span className="text-[9px] font-bold tracking-widest uppercase font-sans text-neutral-600 block">
                    {section.kicker}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#121212] tracking-nyt-headline leading-tight mt-0.5">
                    {section.title}
                  </h3>
                  <div className="flex justify-between items-baseline text-[11px] font-serif italic text-neutral-500 mt-0.5">
                    <span>{section.subtitle}</span>
                    <span className="text-[8.5px] font-sans font-semibold uppercase not-italic text-neutral-400 tracking-wider">
                      {currentDateTitle}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle Body Block */}
              <div className="flex-1 flex flex-col justify-start py-2">
                <h4 className="font-serif text-sm font-bold text-[#121212] tracking-nyt-headline leading-snug mb-2">
                  {section.leadHeadline}
                </h4>

                {/* Hairline separator */}
                <div className="w-full border-t border-neutral-300 my-2" />

                {/* Content Deck / Photo */}
                <div className="py-1">
                  {isBio && (
                    <div className="nyt-photo-frame w-32 mx-auto my-2 p-1 bg-white">
                      <img
                        src={OWNER_DATA.photoUrl}
                        alt="Mihir Pratap Singh"
                        className="aspect-[4/5] object-cover object-top w-full filter contrast-105"
                      />
                      <p className="text-[9px] text-neutral-500 font-sans text-left mt-1 leading-tight">
                        Mihir Pratap Singh, Lucknow.
                      </p>
                    </div>
                  )}

                  <p className="font-serif text-xs leading-relaxed text-neutral-600 mb-2 text-center italic">
                    "{section.frontDeck}"
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-2 border-t border-black flex items-center justify-between font-sans text-xs">
                <span className="text-[10px] uppercase font-bold tracking-wider">
                  {section.sectionNumber}
                </span>
                <span className="inline-flex items-center gap-1 font-bold hover:underline cursor-pointer">
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
