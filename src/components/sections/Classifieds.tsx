import React, { useState } from 'react';
import { Send, Github, Linkedin, Mail, FileDown, Radio, Stamp, Phone, MapPin } from 'lucide-react';
import { OWNER_DATA } from '../../data/portfolioData';
import { soundFx } from '../../audio/soundSynthesizer';

export const Classifieds: React.FC = () => {
  const [formState, setFormState] = useState({
    sender: '',
    wireContact: '',
    inquiryType: 'Full-Stack Software Engineering Opportunity',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    soundFx.playMorsePip();
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playStampClick();
    setIsTransmitting(true);

    setTimeout(() => {
      setIsTransmitting(false);
      setSubmitted(true);
      soundFx.playWhoosh(1.2);
    }, 700);
  };

  const handleReset = () => {
    soundFx.playStampClick();
    setSubmitted(false);
    setFormState({
      sender: '',
      wireContact: '',
      inquiryType: 'Full-Stack Software Engineering Opportunity',
      message: '',
    });
  };

  return (
    <article className="space-y-12">
      {/* Classifieds Masthead */}
      <div className="border-b-2 border-newsprint-ink pb-4 text-center">
        <div className="inline-block border-y border-newsprint-ink py-1 px-4 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-stamp-blue">
            ✦ TELEGRAPHIC WIRE &amp; DISPATCH BUREAU ✦
          </span>
        </div>
        <h2 className="font-masthead text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-newsprint-ink">
          The Post &amp; Classifieds
        </h2>
        <p className="mt-2 text-sm font-serif italic text-newsprint-faded max-w-2xl mx-auto">
          Direct communication lines to Mihir Pratap Singh. Open for full-time engineering roles, technical consultations, and software collaborations.
        </p>
      </div>

      {/* Quick Channels Strip (Updated with real phone, email, github, linkedin) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Email */}
        <a
          href={`mailto:${OWNER_DATA.email}`}
          onClick={() => soundFx.playStampClick()}
          className="bg-newsprint-aged border border-newsprint-ink/40 p-4 rounded hover:border-newsprint-ink hover:bg-newsprint-light transition-all flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded bg-newsprint-ink text-newsprint-light flex items-center justify-center group-hover:bg-stamp-red transition-colors shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <div className="font-mono text-[10px] uppercase font-bold text-newsprint-faded">
              ELECTRONIC WIRE
            </div>
            <div className="font-mono text-xs font-bold text-newsprint-ink truncate">
              {OWNER_DATA.email}
            </div>
          </div>
        </a>

        {/* Phone */}
        <a
          href={`tel:${OWNER_DATA.phone}`}
          onClick={() => soundFx.playStampClick()}
          className="bg-newsprint-aged border border-newsprint-ink/40 p-4 rounded hover:border-newsprint-ink hover:bg-newsprint-light transition-all flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded bg-newsprint-ink text-newsprint-light flex items-center justify-center group-hover:bg-stamp-blue transition-colors shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <div className="font-mono text-[10px] uppercase font-bold text-newsprint-faded">
              TELEPHONE LINE
            </div>
            <div className="font-mono text-xs font-bold text-newsprint-ink truncate">
              {OWNER_DATA.phone}
            </div>
          </div>
        </a>

        {/* LinkedIn */}
        <a
          href={OWNER_DATA.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFx.playStampClick()}
          className="bg-newsprint-aged border border-newsprint-ink/40 p-4 rounded hover:border-newsprint-ink hover:bg-newsprint-light transition-all flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded bg-newsprint-ink text-newsprint-light flex items-center justify-center group-hover:bg-stamp-blue transition-colors shrink-0">
            <Linkedin className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <div className="font-mono text-[10px] uppercase font-bold text-newsprint-faded">
              PROFESSIONAL GUILD
            </div>
            <div className="font-mono text-xs font-bold text-newsprint-ink truncate">
              {OWNER_DATA.linkedinHandle}
            </div>
          </div>
        </a>

        {/* GitHub */}
        <a
          href={OWNER_DATA.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFx.playStampClick()}
          className="bg-newsprint-aged border border-newsprint-ink/40 p-4 rounded hover:border-newsprint-ink hover:bg-newsprint-light transition-all flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded bg-newsprint-ink text-newsprint-light flex items-center justify-center group-hover:bg-stamp-red transition-colors shrink-0">
            <Github className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <div className="font-mono text-[10px] uppercase font-bold text-newsprint-faded">
              CODE REPOSITORY
            </div>
            <div className="font-mono text-xs font-bold text-newsprint-ink truncate">
              {OWNER_DATA.githubHandle}
            </div>
          </div>
        </a>
      </div>

      {/* Resume Download Action Banner */}
      <div className="bg-newsprint-light border-2 border-double-vintage p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded bg-stamp-red text-newsprint-light flex items-center justify-center shrink-0">
            <FileDown className="w-6 h-6" />
          </div>
          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-stamp-red">
              CURRICULUM VITAE &amp; CREDENTIALS
            </div>
            <div className="font-masthead text-base sm:text-lg font-bold text-newsprint-ink">
              Official Resume of Mihir Pratap Singh (PDF)
            </div>
            <div className="font-serif text-xs text-newsprint-faded">
              B.Tech Computer Science &amp; Engineering • Full-Stack Web Developer
            </div>
          </div>
        </div>

        <a
          href={`mailto:${OWNER_DATA.email}?subject=Requesting%20Resume%20-%20Mihir%20Pratap%20Singh`}
          onClick={() => soundFx.playStampClick()}
          className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-newsprint-light bg-newsprint-ink hover:bg-stamp-red transition-all rounded shadow-sm focus:ring-2 focus:ring-stamp-red"
        >
          <FileDown className="w-4 h-4" />
          <span>REQUEST / DOWNLOAD RESUME</span>
        </a>
      </div>

      {/* The Vintage Telegram Form Container */}
      <div className="border-4 border-double-vintage p-6 sm:p-8 bg-newsprint-light relative overflow-hidden shadow-paper-lifted">
        {/* Telegram Header Marks */}
        <div className="border-b-2 border-newsprint-ink pb-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-stamp-red animate-pulse" />
            <span className="font-masthead text-lg sm:text-xl font-bold uppercase tracking-wider text-newsprint-ink">
              WESTERN &amp; EASTERN TELEGRAPH COMPANY
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-newsprint-faded">
            <span className="ink-stamp-blue text-[10px]">PRIORITY DISPATCH</span>
            <span>TARIFF: 0.00 FREE</span>
          </div>
        </div>

        {submitted ? (
          /* Stamped Telegram Confirmation Receipt */
          <div className="py-12 text-center space-y-6 relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stamp-red/10 border-2 border-stamp-red text-stamp-red mb-2">
              <Stamp className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-masthead text-2xl sm:text-3xl font-bold uppercase text-newsprint-ink">
                TELEGRAM TRANSMITTED ACROSS THE WIRE
              </h3>
              <p className="font-serif text-sm text-newsprint-faded max-w-md mx-auto">
                Your dispatch has been successfully recorded in the newsroom log. Mihir Pratap Singh will transmit a reply to <span className="font-bold text-newsprint-ink font-mono">{formState.wireContact || 'your wire address'}</span> with high priority.
              </p>
            </div>

            {/* Telegram Content Summary Box */}
            <div className="max-w-md mx-auto bg-newsprint-aged border-2 border-dashed border-newsprint-ink/40 p-4 font-mono text-xs text-left space-y-2 text-newsprint-ink">
              <div><strong>SENDER:</strong> {formState.sender || 'ANONYMOUS'}</div>
              <div><strong>INQUIRY:</strong> {formState.inquiryType}</div>
              <div><strong>MESSAGE:</strong> {formState.message}</div>
              <div className="text-[10px] text-newsprint-faded border-t border-newsprint-ink/20 pt-2 flex items-center justify-between">
                <span>TIMESTAMP: {new Date().toLocaleTimeString()}</span>
                <span className="text-stamp-red font-bold">STATUS: FILED IN LUCKNOW</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2 font-mono text-xs font-bold text-newsprint-ink bg-newsprint-aged border border-newsprint-ink hover:bg-newsprint-dark transition-colors rounded shadow-xs"
            >
              <span>SEND ANOTHER DISPATCH</span>
            </button>
          </div>
        ) : (
          /* Input Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Sender Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="sender"
                  className="block font-mono text-xs font-bold uppercase tracking-wider text-newsprint-ink"
                >
                  1. Sender Name / Organization <span className="text-stamp-red">*</span>
                </label>
                <input
                  id="sender"
                  name="sender"
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance / Tech Innovations"
                  value={formState.sender}
                  onChange={handleInputChange}
                  className="w-full bg-newsprint-aged/80 border-2 border-newsprint-ink/40 focus:border-newsprint-ink focus:bg-newsprint-light px-3.5 py-2 font-mono text-xs text-newsprint-ink placeholder:text-newsprint-faded/60 outline-none rounded-xs transition-colors"
                />
              </div>

              {/* Contact Wire */}
              <div className="space-y-1.5">
                <label
                  htmlFor="wireContact"
                  className="block font-mono text-xs font-bold uppercase tracking-wider text-newsprint-ink"
                >
                  2. Return Wire Address (Email or Phone) <span className="text-stamp-red">*</span>
                </label>
                <input
                  id="wireContact"
                  name="wireContact"
                  type="text"
                  required
                  placeholder="e.g. eleanor@vance.com or +91-9876543210"
                  value={formState.wireContact}
                  onChange={handleInputChange}
                  className="w-full bg-newsprint-aged/80 border-2 border-newsprint-ink/40 focus:border-newsprint-ink focus:bg-newsprint-light px-3.5 py-2 font-mono text-xs text-newsprint-ink placeholder:text-newsprint-faded/60 outline-none rounded-xs transition-colors"
                />
              </div>
            </div>

            {/* Inquiry Category */}
            <div className="space-y-1.5">
              <label
                htmlFor="inquiryType"
                className="block font-mono text-xs font-bold uppercase tracking-wider text-newsprint-ink"
              >
                3. Telegraphic Subject Classification
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={formState.inquiryType}
                onChange={handleInputChange}
                className="w-full bg-newsprint-aged/80 border-2 border-newsprint-ink/40 focus:border-newsprint-ink focus:bg-newsprint-light px-3.5 py-2 font-mono text-xs text-newsprint-ink outline-none rounded-xs transition-colors"
              >
                <option value="Full-Stack Software Engineering Opportunity">Full-Time Software Engineering Opportunity</option>
                <option value="Frontend Architecture & React Role">Frontend / React Engineering Role</option>
                <option value="Backend API & Node.js System">Backend / Node.js & Database System</option>
                <option value="Technical Collaboration & Projects">General Engineering Collaboration</option>
              </select>
            </div>

            {/* Message Body */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="message"
                  className="block font-mono text-xs font-bold uppercase tracking-wider text-newsprint-ink"
                >
                  4. Telegram Body <span className="text-stamp-red">*</span>
                </label>
                <span className="font-mono text-[10px] text-newsprint-faded">
                  {formState.message.length} CHARS TYPED
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="TRANSMIT YOUR DISPATCH HERE. WE ARE PREPARED TO BUILD SCALABLE SOFTWARE ARCHITECTURES. STOP."
                value={formState.message}
                onChange={handleInputChange}
                className="w-full bg-newsprint-aged/80 border-2 border-newsprint-ink/40 focus:border-newsprint-ink focus:bg-newsprint-light p-3.5 font-mono text-xs text-newsprint-ink placeholder:text-newsprint-faded/60 outline-none rounded-xs transition-colors leading-relaxed uppercase"
              />
            </div>

            {/* Submit Bar */}
            <div className="border-t border-newsprint-ink/30 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 font-mono text-[11px] text-newsprint-faded">
                <MapPin className="w-4 h-4 text-stamp-red" />
                <span>DESK: LUCKNOW, UTTAR PRADESH, INDIA</span>
              </div>

              <button
                type="submit"
                disabled={isTransmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-newsprint-light bg-newsprint-ink hover:bg-stamp-red transition-all rounded shadow-paper-float focus:ring-2 focus:ring-stamp-red disabled:opacity-50 cursor-pointer"
              >
                {isTransmitting ? (
                  <>
                    <span className="animate-spin">⚙</span>
                    <span>TRANSMITTING WIRE...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT TELEGRAM</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </article>
  );
};
