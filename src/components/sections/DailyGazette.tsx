import React from 'react';
import { ExternalLink, Github, CheckCircle2, Award, Zap, Calendar } from 'lucide-react';
import { PROJECTS_DATA, OWNER_DATA } from '../../data/portfolioData';
import { soundFx } from '../../audio/soundSynthesizer';

export const DailyGazette: React.FC = () => {
  return (
    <article className="space-y-12">
      {/* Editorial Intro Banner */}
      <div className="border-b-2 border-newsprint-ink pb-4 text-center">
        <div className="inline-block border-y border-newsprint-ink py-1 px-4 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-stamp-red">
            ✦ SELECTED SOFTWARE SYSTEMS &amp; PRODUCTION WORKS ✦
          </span>
        </div>
        <h2 className="font-masthead text-2xl sm:text-4xl font-bold uppercase tracking-tight text-newsprint-ink">
          The Builder's Gazette: Verified Builds
        </h2>
        <p className="mt-2 text-sm font-serif italic text-newsprint-faded max-w-2xl mx-auto">
          Full-stack web applications, authenticated REST APIs, and database architectures engineered by Mihir Pratap Singh.
        </p>
      </div>

      {/* Projects Showcase */}
      <div className="space-y-16">
        {PROJECTS_DATA.map((project, idx) => (
          <section
            key={project.id}
            className="relative border-b-2 border-newsprint-ink/30 pb-12 last:border-b-0"
          >
            {/* Project Header Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-newsprint-ink/30 pb-2 mb-4 font-mono text-xs text-newsprint-faded">
              <div className="flex items-center gap-2">
                <span className="font-bold text-newsprint-ink uppercase">
                  PROJECT #{idx + 1}
                </span>
                <span>•</span>
                <span className="uppercase text-stamp-red font-bold">
                  {project.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-bold text-newsprint-ink">
                  <Calendar className="w-3.5 h-3.5" />
                  {project.date}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 font-bold text-newsprint-ink bg-newsprint-aged px-2.5 py-0.5 border border-newsprint-ink/30 rounded">
                  <Zap className="w-3.5 h-3.5 text-stamp-red" />
                  <span>{project.stat}</span>
                  <span className="text-[10px] text-newsprint-faded font-normal">({project.statLabel})</span>
                </div>
              </div>
            </div>

            {/* Main Broadsheet Headline */}
            <h3 className="font-masthead text-xl sm:text-2xl md:text-3xl font-extrabold text-newsprint-ink tracking-tight leading-tight uppercase mb-3">
              {project.leadHeadline}
            </h3>

            {/* Deck Subheading */}
            <p className="font-serif text-sm sm:text-base font-semibold text-newsprint-faded border-l-4 border-stamp-red pl-3 mb-6">
              {project.deckSummary}
            </p>

            {/* Two-Column Broadsheet Body */}
            <div className="newspaper-cols-2 gap-8 text-newsprint-ink font-serif text-sm leading-relaxed mb-6">
              <p className="drop-cap mb-4">
                {project.detailedDescription}
              </p>

              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-newsprint-ink mb-2 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-stamp-blue" />
                  Key Engineering Highlights
                </h4>
                <ul className="space-y-2 font-serif text-xs text-newsprint-ink">
                  {project.architectureHighlights.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-stamp-red shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Stamps & Action Links */}
            <div className="pt-4 border-t border-dashed border-newsprint-ink/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Tech Stack Ink Stamps */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-[10px] uppercase font-bold text-newsprint-faded mr-1">
                  STACK BADGES:
                </span>
                {project.techStack.map((tech, tIdx) => (
                  <span
                    key={tech}
                    className={
                      tIdx % 2 === 0
                        ? "ink-stamp-red text-[10px]"
                        : "ink-stamp-blue text-[10px]"
                    }
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playStampClick()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold text-newsprint-ink bg-newsprint-aged border border-newsprint-ink hover:bg-newsprint-dark transition-colors rounded shadow-sm focus:ring-2 focus:ring-stamp-blue"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>VIEW REPOSITORY</span>
                </a>

                <a
                  href={OWNER_DATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playStampClick()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold text-newsprint-light bg-newsprint-ink hover:bg-stamp-red transition-colors rounded shadow-sm focus:ring-2 focus:ring-stamp-red"
                >
                  <span>GITHUB ARCHIVE</span>
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
