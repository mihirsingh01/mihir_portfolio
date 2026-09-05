import React from 'react';
import { GraduationCap, Trophy, Award, Code2, Terminal, Database, Wrench } from 'lucide-react';
import { OWNER_DATA, EDUCATION_DATA, ACHIEVEMENTS_DATA, TECHNICAL_SKILLS } from '../../data/portfolioData';
import { useNewspaperDate } from '../../utils/dateFormatter';

export const Biography: React.FC = () => {
  const datelineDate = useNewspaperDate('title');
  return (
    <article className="space-y-10">
      {/* NYT Editorial Header */}
      <div className="border-b border-[#121212] pb-4 text-center">
        <div className="font-sans text-[11px] font-bold uppercase tracking-nyt-kicker text-[#103B75] mb-1">
          THE PROFILE • SUNDAY REVIEW
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-nyt-headline text-[#121212] leading-tight max-w-4xl mx-auto">
          Mihir Pratap Singh: The Engineer Behind the Interface
        </h2>
        <p className="mt-3 text-base sm:text-lg font-serif italic text-[#727272] max-w-2xl mx-auto">
          Computer Science scholar, hackathon winner, and builder of accessible, high-performance web architectures.
        </p>
      </div>

      {/* Hero Portrait & Biographical Feature */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Clean NYT Portrait Frame */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="nyt-photo-frame w-full max-w-[280px] p-1.5 bg-white shadow-sm">
            <div className="relative overflow-hidden aspect-[4/5] w-full border border-[#E2E2E2]">
              <img
                src={OWNER_DATA.photoUrl}
                alt="Mihir Pratap Singh — Full-Stack Web Developer"
                className="w-full h-full object-cover object-top filter contrast-105"
              />
            </div>
            {/* NYT Caption */}
            <div className="mt-2 px-1 text-left">
              <p className="font-sans text-[11px] text-[#727272] leading-tight">
                {OWNER_DATA.photoCaption}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: In-depth Biography Story */}
        <div className="md:col-span-7 space-y-4 font-serif text-[15px] leading-relaxed text-[#2F2F2F]">
          <p className="nyt-drop-cap">
            <strong className="font-sans text-xs tracking-wider text-[#121212] font-bold uppercase mr-1">
              LUCKNOW — {datelineDate} —
            </strong>
            At the intersection of computational engineering and product design, Mihir Pratap Singh is crafting digital systems designed to endure. Currently pursuing his Bachelor of Technology in Computer Science and Engineering at Babu Banarasi Das University, his work prioritizes structural discipline, responsive design patterns, and cryptographic security across full-stack web platforms.
          </p>

          <p>
            With active hands-on proficiencies in modern JavaScript, React.js, Node.js, Express.js, and relational database management with MySQL, Singh approaches web development with an engineering rigor that treats frontend micro-interactions and backend endpoint latency as two halves of a single cohesive user experience.
          </p>

          <p>
            Algorithmic problem-solving forms the foundation of his technical discipline. Having solved more than 50 challenges across Data Structures &amp; Algorithms in Java and C++, he approaches system bottlenecks with asymptotic efficiency. In February 2026, he captained frontend development during the 36-hour F.I.F.T Hackathon sprint, orchestrating a real-time platform that secured 1st prize among more than 40 competing university teams.
          </p>

          <blockquote className="border-l-2 border-[#121212] pl-4 py-1 italic font-serif text-[#121212] font-medium my-4">
            “Writing clean code is fundamentally an act of communication: with the compiler, with future maintainers, and with the human being on the other side of the browser.”
          </blockquote>
        </div>
      </div>

      {/* Education & Academic Credentials */}
      <div className="border-t border-[#121212] pt-8">
        <div className="border border-[#E2E2E2] bg-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#121212] flex items-center justify-center text-[#121212] shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#103B75]">
                ACADEMIC CREDENTIALS
              </div>
              <div className="font-serif text-lg font-bold text-[#121212]">
                {EDUCATION_DATA.institution}
              </div>
              <div className="font-serif text-sm text-[#727272]">
                {EDUCATION_DATA.degree} • {EDUCATION_DATA.period}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:items-end font-sans">
            <div className="font-bold text-[#121212] text-lg">
              {EDUCATION_DATA.score}
            </div>
            <div className="text-[11px] text-[#727272] uppercase">
              {EDUCATION_DATA.location}
            </div>
          </div>
        </div>
      </div>

      {/* Honors & Recognition */}
      <div className="border-t border-[#E2E2E2] pt-8">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-[#121212]" />
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#121212]">
            HONORS &amp; ALGORITHMIC RECOGNITION
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ACHIEVEMENTS_DATA.map((ach) => (
            <div
              key={ach.title}
              className="bg-white border border-[#E2E2E2] p-4 space-y-2"
            >
              <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-1.5 font-sans">
                <span className="text-[10px] font-bold text-[#A31D1D] uppercase tracking-wider">
                  {ach.kicker}
                </span>
                <span className="text-[10px] text-[#727272]">
                  {ach.date}
                </span>
              </div>
              <h4 className="font-serif text-base font-bold text-[#121212]">
                {ach.title}
              </h4>
              <div className="font-sans text-[11px] text-[#727272] uppercase">
                {ach.organization}
              </div>
              <p className="font-serif text-xs text-[#2F2F2F] leading-relaxed">
                {ach.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Skills: Multi-Column Typography Layout */}
      <div className="border-t border-[#121212] pt-8">
        <div className="flex items-center justify-between mb-6 border-b border-[#E2E2E2] pb-2">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#121212]" />
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#121212]">
              TECHNICAL SKILLS &amp; PROFICIENCIES
            </h3>
          </div>
          <span className="font-serif italic text-xs text-[#727272] hidden sm:inline">
            Classified Engineering Repertoire
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECHNICAL_SKILLS.map((grp) => (
            <div
              key={grp.category}
              className="bg-white border border-[#E2E2E2] p-4 space-y-3"
            >
              <div className="border-b border-[#E2E2E2] pb-1.5">
                <h4 className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#121212] flex items-center gap-1.5">
                  {grp.category.includes('Frontend') && <Code2 className="w-3.5 h-3.5 text-[#121212]" />}
                  {grp.category.includes('Backend') && <Terminal className="w-3.5 h-3.5 text-[#121212]" />}
                  {grp.category.includes('Databases') && <Database className="w-3.5 h-3.5 text-[#121212]" />}
                  {grp.category.includes('Core') && <Award className="w-3.5 h-3.5 text-[#121212]" />}
                  {grp.category.includes('Tools') && <Wrench className="w-3.5 h-3.5 text-[#121212]" />}
                  <span>{grp.category}</span>
                </h4>
              </div>

              <p className="font-serif text-xs text-[#727272] italic">
                {grp.description}
              </p>

              <div className="flex flex-wrap gap-1.5 font-sans">
                {grp.skills.map((sk) => (
                  <span
                    key={sk.name}
                    className={`inline-flex items-center px-2 py-0.5 text-[10px] tracking-wide rounded-xs cursor-default ${
                      sk.isHighlight
                        ? 'bg-[#121212] text-white font-semibold'
                        : 'bg-[#F7F6F3] text-[#121212] border border-[#E2E2E2]'
                    }`}
                  >
                    {sk.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
