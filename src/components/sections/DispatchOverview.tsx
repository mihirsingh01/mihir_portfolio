import React from 'react';
import { ArrowRight, User, FolderGit2, Send } from 'lucide-react';
import { SectionId } from '../../types';
import { soundFx } from '../../audio/soundSynthesizer';

interface DispatchOverviewProps {
  onNavigate: (id: SectionId) => void;
}

export const DispatchOverview: React.FC<DispatchOverviewProps> = ({ onNavigate }) => {
  return (
    <article className="space-y-10">
      {/* NYT Editorial Header */}
      <div className="border-b border-[#121212] pb-4 text-center">
        <div className="font-sans text-[11px] font-bold uppercase tracking-nyt-kicker text-[#121212] mb-1">
          VOL. CLXXV... No. 60,842 • NATIONAL EDITION
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-nyt-headline text-[#121212] leading-tight max-w-4xl mx-auto">
          Architecting Resilient Web Systems for the Modern Internet
        </h2>
        <p className="mt-3 text-base sm:text-lg font-serif italic text-[#727272] max-w-2xl mx-auto">
          A curated index of production applications, technical case studies, and engineering philosophy from Mihir Pratap Singh.
        </p>
      </div>

      {/* NYT Key Benchmarks Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-y border-[#121212] divide-x divide-[#E2E2E2] bg-white">
        <div className="p-4 text-center">
          <div className="font-sans text-[10px] uppercase font-bold text-[#727272] tracking-wider">
            ACADEMIC CGPA
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#121212] my-1">
            8.0 / 10
          </div>
          <div className="font-serif text-[11px] text-[#727272] italic">
            B.Tech CSE (2023–2027)
          </div>
        </div>

        <div className="p-4 text-center">
          <div className="font-sans text-[10px] uppercase font-bold text-[#A31D1D] tracking-wider">
            HACKATHON VICTORY
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#A31D1D] my-1">
            1ST PRIZE
          </div>
          <div className="font-serif text-[11px] text-[#727272] italic">
            F.I.F.T Competition (36-hr Sprint)
          </div>
        </div>

        <div className="p-4 text-center">
          <div className="font-sans text-[10px] uppercase font-bold text-[#103B75] tracking-wider">
            API ARCHITECTURE
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#103B75] my-1">
            8+ ENDPOINTS
          </div>
          <div className="font-serif text-[11px] text-[#727272] italic">
            REST &amp; JWT Security
          </div>
        </div>

        <div className="p-4 text-center">
          <div className="font-sans text-[10px] uppercase font-bold text-[#727272] tracking-wider">
            PROBLEM SOLVING
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#121212] my-1">
            50+ SOLVED
          </div>
          <div className="font-serif text-[11px] text-[#727272] italic">
            LeetCode DS&amp;A Algorithms
          </div>
        </div>
      </div>

      {/* Broadsheet Columns */}
      <div className="nyt-columns-2 gap-8 font-serif text-[15px] leading-relaxed text-[#2F2F2F]">
        <p className="nyt-drop-cap">
          <strong className="font-sans text-xs tracking-wider text-[#121212] font-bold uppercase mr-1">
            LUCKNOW, India —
          </strong>
          In an era where digital systems demand both instant responsiveness and unwavering structural stability, engineering software requires an unrelenting commitment to clarity. As a Full-Stack Web Developer and Computer Science scholar at Babu Banarasi Das University, I approach software engineering as an exacting discipline where architecture, security, and tactile frontend fidelity must operate in perfect unison.
        </p>

        <p>
          Every system detailed within this publication is architected from fundamental computer science principles: modular React component hierarchies, cryptographically verified JWT authentication, efficient relational database schemas in MySQL, and high-coverage automated unit testing. By maintaining rigorous separation of concerns, our systems achieve sub-100ms API response latencies and 99% operational uptime.
        </p>

        <p>
          Readers are invited to explore the four dedicated broadsheet sections: examine the comprehensive academic and algorithmic dossier in <em>Profiles &amp; Sunday Review</em>, investigate live production platforms in <em>Business &amp; Technology</em>, or transmit a direct communication via <em>Inquiries &amp; The Directory</em>.
        </p>
      </div>

      {/* NYT Section Directory Cards */}
      <div className="border-t border-[#121212] pt-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-2">
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#121212]">
            INDEX OF EDITIONS
          </h3>
          <span className="font-serif italic text-xs text-[#727272]">
            Select an edition to unroll
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Section 2: Profiles */}
          <button
            onClick={() => {
              soundFx.playWhoosh(1.0);
              onNavigate('profiles');
            }}
            className="text-left bg-white border border-[#E2E2E2] p-5 hover:border-[#121212] transition-colors group shadow-xs"
          >
            <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-2 mb-3">
              <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#103B75]">
                SECTION 2
              </span>
              <User className="w-4 h-4 text-[#103B75]" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#121212] group-hover:text-[#103B75] transition-colors leading-snug">
              Profiles &amp; Sunday Review
            </h4>
            <p className="font-serif text-xs text-[#727272] my-2 line-clamp-3">
              Biographical profile, BBDU (8.0 CGPA) education, 50+ LeetCode track record, and multi-column technical skills.
            </p>
            <div className="pt-2 flex items-center gap-1 font-sans text-[11px] font-semibold text-[#103B75]">
              <span>READ PROFILE</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Section 3: Business & Technology */}
          <button
            onClick={() => {
              soundFx.playWhoosh(1.0);
              onNavigate('business');
            }}
            className="text-left bg-white border border-[#E2E2E2] p-5 hover:border-[#121212] transition-colors group shadow-xs"
          >
            <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-2 mb-3">
              <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#A31D1D]">
                SECTION 3
              </span>
              <FolderGit2 className="w-4 h-4 text-[#A31D1D]" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#121212] group-hover:text-[#A31D1D] transition-colors leading-snug">
              Business &amp; Technology
            </h4>
            <p className="font-serif text-xs text-[#727272] my-2 line-clamp-3">
              Case studies on the Full-Stack Task Manager Analytics suite and EcoPulse carbon monitoring platform.
            </p>
            <div className="pt-2 flex items-center gap-1 font-sans text-[11px] font-semibold text-[#A31D1D]">
              <span>EXPLORE PLATFORMS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Section 4: Inquiries & Directory */}
          <button
            onClick={() => {
              soundFx.playWhoosh(1.0);
              onNavigate('directory');
            }}
            className="text-left bg-white border border-[#E2E2E2] p-5 hover:border-[#121212] transition-colors group shadow-xs"
          >
            <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-2 mb-3">
              <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#121212]">
                SECTION 4
              </span>
              <Send className="w-4 h-4 text-[#121212]" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#121212] group-hover:text-[#103B75] transition-colors leading-snug">
              Inquiries &amp; The Directory
            </h4>
            <p className="font-serif text-xs text-[#727272] my-2 line-clamp-3">
              Direct telephone (+91-9643476007), email, press wire message form, and official resume download.
            </p>
            <div className="pt-2 flex items-center gap-1 font-sans text-[11px] font-semibold text-[#121212]">
              <span>OPEN DIRECTORY</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </article>
  );
};
