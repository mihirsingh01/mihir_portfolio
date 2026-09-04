import React from 'react';
import { Sparkles, ArrowRight, User, FolderGit2, Send } from 'lucide-react';
import { SectionId } from '../../types';
import { soundFx } from '../../audio/soundSynthesizer';

interface DispatchOverviewProps {
  onNavigate: (id: SectionId) => void;
}

export const DispatchOverview: React.FC<DispatchOverviewProps> = ({ onNavigate }) => {
  return (
    <article className="space-y-12">
      {/* Editorial Header */}
      <div className="border-b-2 border-newsprint-ink pb-4 text-center">
        <div className="inline-block border-y border-newsprint-ink py-1 px-4 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-stamp-red">
            ✦ LEAD BROADSHEET DISPATCH ✦
          </span>
        </div>
        <h2 className="font-masthead text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-newsprint-ink">
          Engineering Robust Digital Experiences
        </h2>
        <p className="mt-2 text-sm font-serif italic text-newsprint-faded max-w-2xl mx-auto">
          Dispatches from the software workbench of Mihir Pratap Singh — Full-Stack Web Developer &amp; Software Engineer based in Lucknow, India.
        </p>
      </div>

      {/* Highlights Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-newsprint-aged border border-newsprint-ink/40 p-4 text-center">
          <div className="font-mono text-[10px] uppercase font-bold text-newsprint-faded">
            ACADEMIC CGPA
          </div>
          <div className="font-masthead text-2xl sm:text-3xl font-black text-newsprint-ink my-1">
            8.0 / 10
          </div>
          <div className="font-serif text-[10px] text-newsprint-faded italic">
            B.Tech CSE (2023–2027)
          </div>
        </div>

        <div className="bg-newsprint-aged border border-newsprint-ink/40 p-4 text-center">
          <div className="font-mono text-[10px] uppercase font-bold text-stamp-red">
            HACKATHON GLORY
          </div>
          <div className="font-masthead text-2xl sm:text-3xl font-black text-stamp-red my-1">
            1ST PRIZE
          </div>
          <div className="font-serif text-[10px] text-newsprint-faded italic">
            F.I.F.T Competition (36-hr Sprint)
          </div>
        </div>

        <div className="bg-newsprint-aged border border-newsprint-ink/40 p-4 text-center">
          <div className="font-mono text-[10px] uppercase font-bold text-stamp-blue">
            API ARCHITECTURES
          </div>
          <div className="font-masthead text-2xl sm:text-3xl font-black text-stamp-blue my-1">
            8+ ENDPOINTS
          </div>
          <div className="font-serif text-[10px] text-newsprint-faded italic">
            JWT Auth &amp; Role-Based Access
          </div>
        </div>

        <div className="bg-newsprint-aged border border-newsprint-ink/40 p-4 text-center">
          <div className="font-mono text-[10px] uppercase font-bold text-newsprint-faded">
            PROBLEM SOLVING
          </div>
          <div className="font-masthead text-2xl sm:text-3xl font-black text-newsprint-ink my-1">
            50+ SOLVED
          </div>
          <div className="font-serif text-[10px] text-newsprint-faded italic">
            LeetCode DS&amp;A Algorithms
          </div>
        </div>
      </div>

      {/* Two-Column Broadsheet Story */}
      <div className="newspaper-cols-2 gap-8 font-serif text-sm leading-relaxed text-newsprint-ink">
        <p className="drop-cap">
          Welcome to the Antigravity Newspaper Rack. This portfolio represents an intersection of classical broadsheet print aesthetics with modern, production-grade web technologies. As a Full-Stack Web Developer, I combine rigorous theoretical foundations from Computer Science Engineering with pragmatic craftsmanship in React.js, Node.js, Express.js, and relational database systems.
        </p>

        <p>
          Every project featured within this rack is built from first principles: clean component hierarchies, robust API contracts, cryptographic security, and automated verification through unit testing. Whether architecting task analytics platforms or environmental footprint monitors, my goal is to produce software that is intuitive, performant, and resilient.
        </p>

        <p>
          Explore each edition of this broadsheet to examine my full academic credentials, detailed production system case studies, and a functional telegraphic classifieds wire for professional collaboration.
        </p>
      </div>

      {/* Directory Index Cards */}
      <div className="border-t-2 border-newsprint-ink pt-8 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-vintage-gold" />
          <h3 className="font-masthead text-xl sm:text-2xl font-bold uppercase text-newsprint-ink">
            Index of Broadsheet Editions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Edition II: Biography */}
          <button
            onClick={() => {
              soundFx.playWhoosh(1.0);
              onNavigate('biography');
            }}
            className="text-left bg-newsprint-light border-2 border-newsprint-ink p-5 rounded-xs hover:bg-newsprint-aged transition-all shadow-sm group"
          >
            <div className="flex items-center justify-between border-b border-newsprint-ink/20 pb-2 mb-3">
              <span className="font-mono text-xs font-bold uppercase text-stamp-blue">
                EDITION II
              </span>
              <User className="w-4 h-4 text-stamp-blue" />
            </div>
            <h4 className="font-masthead text-lg font-bold uppercase text-newsprint-ink group-hover:text-stamp-blue transition-colors">
              The Biography
            </h4>
            <p className="font-serif text-xs text-newsprint-faded my-2 line-clamp-3">
              Mihir's profile, B.Tech CSE education at BBDU, 50+ LeetCode track record, and categorized technical skills.
            </p>
            <div className="pt-2 flex items-center gap-1 font-mono text-xs font-bold text-stamp-blue">
              <span>READ PROFILE</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Edition III: Gazette Projects */}
          <button
            onClick={() => {
              soundFx.playWhoosh(1.0);
              onNavigate('gazette');
            }}
            className="text-left bg-newsprint-light border-2 border-newsprint-ink p-5 rounded-xs hover:bg-newsprint-aged transition-all shadow-sm group"
          >
            <div className="flex items-center justify-between border-b border-newsprint-ink/20 pb-2 mb-3">
              <span className="font-mono text-xs font-bold uppercase text-stamp-red">
                EDITION III
              </span>
              <FolderGit2 className="w-4 h-4 text-stamp-red" />
            </div>
            <h4 className="font-masthead text-lg font-bold uppercase text-newsprint-ink group-hover:text-stamp-red transition-colors">
              The Gazette Works
            </h4>
            <p className="font-serif text-xs text-newsprint-faded my-2 line-clamp-3">
              Full-Stack Task Manager with Analytics Dashboard and EcoPulse Carbon Monitoring platform deep-dives.
            </p>
            <div className="pt-2 flex items-center gap-1 font-mono text-xs font-bold text-stamp-red">
              <span>EXPLORE PROJECTS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Edition IV: Classifieds */}
          <button
            onClick={() => {
              soundFx.playWhoosh(1.0);
              onNavigate('classifieds');
            }}
            className="text-left bg-newsprint-light border-2 border-newsprint-ink p-5 rounded-xs hover:bg-newsprint-aged transition-all shadow-sm group"
          >
            <div className="flex items-center justify-between border-b border-newsprint-ink/20 pb-2 mb-3">
              <span className="font-mono text-xs font-bold uppercase text-stamp-blue">
                EDITION IV
              </span>
              <Send className="w-4 h-4 text-stamp-blue" />
            </div>
            <h4 className="font-masthead text-lg font-bold uppercase text-newsprint-ink group-hover:text-stamp-blue transition-colors">
              The Classifieds
            </h4>
            <p className="font-serif text-xs text-newsprint-faded my-2 line-clamp-3">
              Send a vintage telegram, download resume (PDF), or connect on LinkedIn (+91-9643476007, mihirprsingh@gmail.com).
            </p>
            <div className="pt-2 flex items-center gap-1 font-mono text-xs font-bold text-stamp-blue">
              <span>TRANSMIT WIRE</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </article>
  );
};
