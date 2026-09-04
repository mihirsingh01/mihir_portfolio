import React from 'react';
import { ExternalLink, Github, CheckCircle2, Award, Zap, Calendar } from 'lucide-react';
import { PROJECTS_DATA, OWNER_DATA } from '../../data/portfolioData';
import { soundFx } from '../../audio/soundSynthesizer';

export const DailyGazette: React.FC = () => {
  return (
    <article className="space-y-12">
      {/* NYT Editorial Header */}
      <div className="border-b border-[#121212] pb-4 text-center">
        <div className="font-sans text-[11px] font-bold uppercase tracking-nyt-kicker text-[#A31D1D] mb-1">
          BUSINESS &amp; TECHNOLOGY • SELECTED WORKS
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-nyt-headline text-[#121212] leading-tight max-w-4xl mx-auto">
          Scalable Platforms: From Task Analytics to Carbon Metrics
        </h2>
        <p className="mt-3 text-base sm:text-lg font-serif italic text-[#727272] max-w-2xl mx-auto">
          Case studies on performance-critical web applications, secure APIs, and responsive UIs engineered by Mihir Pratap Singh.
        </p>
      </div>

      {/* Projects Stream */}
      <div className="space-y-16">
        {PROJECTS_DATA.map((project, idx) => (
          <section
            key={project.id}
            className="relative border-b border-[#121212] pb-12 last:border-b-0"
          >
            {/* Project Header Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E2E2] pb-2 mb-4 font-sans text-xs text-[#727272]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#121212] uppercase tracking-wider">
                  CASE STUDY #{idx + 1}
                </span>
                <span>•</span>
                <span className="uppercase text-[#A31D1D] font-semibold">
                  {project.kicker}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#121212]">
                  <Calendar className="w-3.5 h-3.5" />
                  {project.date}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 font-bold text-[#121212] bg-[#FCFBF9] border border-[#E2E2E2] px-2.5 py-0.5 rounded-xs">
                  <Zap className="w-3.5 h-3.5 text-[#121212]" />
                  <span>{project.stat}</span>
                  <span className="text-[10px] text-[#727272] font-normal">({project.statLabel})</span>
                </div>
              </div>
            </div>

            {/* Headline */}
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212] tracking-nyt-headline leading-tight mb-3">
              {project.leadHeadline}
            </h3>

            {/* Deck Subheading */}
            <p className="font-serif text-base font-semibold text-[#727272] border-l-2 border-[#121212] pl-3 mb-6">
              {project.deckSummary}
            </p>

            {/* Multi-Column Broadsheet Body */}
            <div className="nyt-columns-2 gap-8 text-[#2F2F2F] font-serif text-[15px] leading-relaxed mb-6">
              <p className="nyt-drop-cap mb-4">
                {project.detailedDescription}
              </p>

              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#121212] mb-3 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#121212]" />
                  Architectural Feats &amp; Benchmarks
                </h4>
                <ul className="space-y-2 font-serif text-xs text-[#2F2F2F]">
                  {project.architectureHighlights.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#121212] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Badges & Action Links */}
            <div className="pt-4 border-t border-[#E2E2E2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans">
              {/* Tech Stack Badges */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-[#727272] mr-1 tracking-wider">
                  TECHNOLOGIES:
                </span>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-2 py-0.5 text-[10px] border border-[#E2E2E2] bg-white text-[#121212] font-medium rounded-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons styled as clean NYT editorial pill-badges */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playStampClick()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#121212] bg-white border border-[#121212] hover:bg-[#F7F6F3] transition-colors rounded-xs shadow-xs"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>REPOSITORY</span>
                </a>

                <a
                  href={OWNER_DATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playStampClick()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#121212] hover:bg-[#2F2F2F] transition-colors rounded-xs shadow-xs"
                >
                  <span>LIVE PLATFORM</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </section>
        ))}
      </div>
    </article>
  );
};
