import React from 'react';
import { GraduationCap, Award, Trophy, Code2, Database, Terminal, Wrench } from 'lucide-react';
import { OWNER_DATA, EDUCATION_DATA, ACHIEVEMENTS_DATA, TECHNICAL_SKILLS } from '../../data/portfolioData';
import { soundFx } from '../../audio/soundSynthesizer';

export const Biography: React.FC = () => {
  return (
    <article className="space-y-12">
      {/* Editorial Top Masthead Bar */}
      <div className="border-b-2 border-newsprint-ink pb-4 text-center">
        <div className="inline-block border-y border-newsprint-ink py-1 px-4 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-stamp-blue">
            ✦ AUTOBIOGRAPHICAL SPECIAL DISPATCH ✦
          </span>
        </div>
        <h2 className="font-masthead text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-newsprint-ink">
          The Engineer Behind The Interface
        </h2>
        <p className="mt-2 text-sm font-serif italic text-newsprint-faded">
          An in-depth profile of Mihir Pratap Singh — Full-Stack Web Developer & Software Engineer based in Lucknow, India.
        </p>
      </div>

      {/* Hero Portrait & Biographical Dispatch Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Authentic Halftone Portrait */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="vintage-photo-frame w-full max-w-[280px] p-2 bg-newsprint-light shadow-paper-hover">
            <div className="relative overflow-hidden aspect-[4/5] w-full border-2 border-newsprint-ink">
              <img
                src={OWNER_DATA.photoUrl}
                alt="Mihir Pratap Singh — Professional Portrait"
                className="vintage-halftone-photo w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 halftone-overlay pointer-events-none" />
            </div>

            {/* Photo Caption */}
            <div className="mt-2 pt-2 border-t border-dashed border-newsprint-ink/40 text-center font-mono text-[11px] text-newsprint-ink">
              <div className="font-extrabold uppercase">MIHIR PRATAP SINGH</div>
              <div className="text-[10px] text-newsprint-faded italic">
                Full-Stack Web Developer • BBDU Lucknow
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <span className="ink-stamp-red text-[10px]">VERIFIED ENGINEER</span>
            <span className="ink-stamp-blue text-[10px]">HACKATHON WINNER</span>
          </div>
        </div>

        {/* Right Column: Narrative Bio */}
        <div className="md:col-span-7 space-y-4 font-serif text-sm leading-relaxed text-newsprint-ink">
          <p className="drop-cap">
            I am a results-oriented Full-Stack Web Developer and Software Engineer currently pursuing my Bachelor of Technology in Computer Science and Engineering at Babu Banarasi Das University, Lucknow. My engineering philosophy revolves around writing clean, modular code, building responsive interfaces, and developing scalable architectures that deliver tangible real-world utility.
          </p>

          <p>
            With hands-on experience spanning both client and server tiers, I specialize in building end-to-end applications using modern JavaScript/TypeScript, React.js, Node.js, Express.js, and relational SQL/MySQL databases. Whether orchestrating authenticated RESTful APIs with role-based access control or crafting 60fps dynamic UI components with Chart.js and Tailwind, I ensure every system is optimized for speed, accessibility, and maintainability.
          </p>

          <p>
            Beyond feature implementation, I place immense value on algorithmic rigor and quality assurance. Having solved 50+ Data Structures &amp; Algorithms problems across arrays, linked lists, trees, and dynamic programming, I approach system design with computational efficiency in mind. My collaborative drive was proven when leading frontend development during the 36-hour F.I.F.T Hackathon sprint, securing 1st prize among 40+ competing collegiate engineering teams.
          </p>

          <blockquote className="border-l-4 border-stamp-red pl-4 py-1 italic font-serif text-newsprint-faded font-medium bg-newsprint-aged/40">
            “Clean code is not simply aesthetic; it is an architectural contract that ensures software remains resilient, adaptable, and a joy to maintain.”
          </blockquote>
        </div>
      </div>

      {/* Education & Academic Credentials */}
      <div className="border-t-2 border-newsprint-ink pt-8">
        <div className="bg-newsprint-aged/80 border-2 border-double-vintage p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-newsprint-ink text-newsprint-light flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-stamp-blue">
                ACADEMIC DOSSIER &amp; CREDENTIALS
              </div>
              <div className="font-masthead text-base sm:text-lg font-bold text-newsprint-ink">
                {EDUCATION_DATA.institution}
              </div>
              <div className="font-serif text-xs text-newsprint-faded">
                {EDUCATION_DATA.degree} ({EDUCATION_DATA.period})
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:items-end font-mono text-xs">
            <div className="font-black text-stamp-red text-base">
              {EDUCATION_DATA.score}
            </div>
            <div className="text-[10px] text-newsprint-faded uppercase">
              {EDUCATION_DATA.location}
            </div>
          </div>
        </div>
      </div>

      {/* Honors & Achievements */}
      <div className="border-t border-newsprint-ink/30 pt-8">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-stamp-red" />
          <h3 className="font-masthead text-xl font-bold uppercase text-newsprint-ink">
            Honors, Hackathons &amp; Problem Solving
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ACHIEVEMENTS_DATA.map((ach) => (
            <div
              key={ach.title}
              className="bg-newsprint-light border border-newsprint-ink/40 p-4 rounded-xs shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between border-b border-newsprint-ink/20 pb-1.5">
                <span className="font-mono text-[10px] font-bold text-stamp-red uppercase">
                  {ach.badge}
                </span>
                <span className="font-mono text-[10px] text-newsprint-faded">
                  {ach.date}
                </span>
              </div>
              <h4 className="font-masthead text-sm font-bold text-newsprint-ink">
                {ach.title}
              </h4>
              <div className="font-mono text-[10px] text-newsprint-faded uppercase">
                {ach.organization}
              </div>
              <p className="font-serif text-xs text-newsprint-ink leading-relaxed">
                {ach.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Categorized Technical Skills (Vintage Typeset Grid) */}
      <div className="border-t-2 border-newsprint-ink pt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-stamp-blue" />
            <h3 className="font-masthead text-xl sm:text-2xl font-bold uppercase text-newsprint-ink">
              Technical Competencies &amp; Toolkit
            </h3>
          </div>
          <span className="font-mono text-[10px] uppercase font-bold text-newsprint-faded hidden sm:inline">
            AUTHENTIC TYPESET COLUMNS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECHNICAL_SKILLS.map((grp) => (
            <div
              key={grp.category}
              className="bg-newsprint-light border border-newsprint-ink/40 p-4 rounded-xs shadow-xs space-y-3"
            >
              <div className="border-b border-newsprint-ink/20 pb-1.5">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-newsprint-ink flex items-center gap-1.5">
                  {grp.category.includes('Frontend') && <Code2 className="w-3.5 h-3.5 text-stamp-red" />}
                  {grp.category.includes('Backend') && <Terminal className="w-3.5 h-3.5 text-stamp-blue" />}
                  {grp.category.includes('Databases') && <Database className="w-3.5 h-3.5 text-stamp-red" />}
                  {grp.category.includes('Programming') && <Award className="w-3.5 h-3.5 text-stamp-blue" />}
                  {grp.category.includes('Tools') && <Wrench className="w-3.5 h-3.5 text-stamp-red" />}
                  <span>{grp.category}</span>
                </h4>
              </div>

              <p className="font-serif text-[11px] text-newsprint-faded italic">
                {grp.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {grp.skills.map((sk) => (
                  <span
                    key={sk.name}
                    onMouseEnter={() => soundFx.playRustle(0.1)}
                    className={
                      sk.variant === 'red'
                        ? 'ink-stamp-red text-[10px] cursor-default'
                        : sk.variant === 'blue'
                        ? 'ink-stamp-blue text-[10px] cursor-default'
                        : 'inline-flex items-center px-2 py-0.5 border border-newsprint-ink/30 bg-newsprint-aged text-[10px] font-mono text-newsprint-ink rounded cursor-default'
                    }
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
