import React, { useState } from 'react';
import { Send, Github, Linkedin, Mail, FileDown, Radio, CheckCircle, Phone, MapPin } from 'lucide-react';
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
    <article className="space-y-10">
      {/* NYT Editorial Header */}
      <div className="border-b border-[#121212] pb-4 text-center">
        <div className="font-sans text-[11px] font-bold uppercase tracking-nyt-kicker text-[#121212] mb-1">
          THE DIRECTORY • REACH OUT
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-nyt-headline text-[#121212] leading-tight max-w-4xl mx-auto">
          Open for Software Engineering Inquiries and Collaborations
        </h2>
        <p className="mt-3 text-base sm:text-lg font-serif italic text-[#727272] max-w-2xl mx-auto">
          Direct communications, official curriculum vitae, and professional networks for Mihir Pratap Singh.
        </p>
      </div>

      {/* Direct Contact Channels Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
        {/* Email */}
        <a
          href={`mailto:${OWNER_DATA.email}`}
          onClick={() => soundFx.playStampClick()}
          className="bg-white border border-[#E2E2E2] p-4 hover:border-[#121212] transition-colors flex items-center gap-3 group shadow-xs"
        >
          <div className="w-10 h-10 rounded-full border border-[#121212] flex items-center justify-center text-[#121212] group-hover:bg-[#121212] group-hover:text-white transition-colors shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <div className="text-[10px] uppercase font-bold text-[#727272] tracking-wider">
              ELECTRONIC WIRE
            </div>
            <div className="text-xs font-semibold text-[#121212] truncate">
              {OWNER_DATA.email}
            </div>
          </div>
        </a>

        {/* Telephone */}
        <a
          href={`tel:${OWNER_DATA.phone}`}
          onClick={() => soundFx.playStampClick()}
          className="bg-white border border-[#E2E2E2] p-4 hover:border-[#121212] transition-colors flex items-center gap-3 group shadow-xs"
        >
          <div className="w-10 h-10 rounded-full border border-[#121212] flex items-center justify-center text-[#121212] group-hover:bg-[#121212] group-hover:text-white transition-colors shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <div className="text-[10px] uppercase font-bold text-[#727272] tracking-wider">
              TELEPHONE LINE
            </div>
            <div className="text-xs font-semibold text-[#121212] truncate">
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
          className="bg-white border border-[#E2E2E2] p-4 hover:border-[#121212] transition-colors flex items-center gap-3 group shadow-xs"
        >
          <div className="w-10 h-10 rounded-full border border-[#121212] flex items-center justify-center text-[#121212] group-hover:bg-[#121212] group-hover:text-white transition-colors shrink-0">
            <Linkedin className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <div className="text-[10px] uppercase font-bold text-[#727272] tracking-wider">
              LINKEDIN NETWORK
            </div>
            <div className="text-xs font-semibold text-[#121212] truncate">
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
          className="bg-white border border-[#E2E2E2] p-4 hover:border-[#121212] transition-colors flex items-center gap-3 group shadow-xs"
        >
          <div className="w-10 h-10 rounded-full border border-[#121212] flex items-center justify-center text-[#121212] group-hover:bg-[#121212] group-hover:text-white transition-colors shrink-0">
            <Github className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <div className="text-[10px] uppercase font-bold text-[#727272] tracking-wider">
              GITHUB ARCHIVE
            </div>
            <div className="text-xs font-semibold text-[#121212] truncate">
              {OWNER_DATA.githubHandle}
            </div>
          </div>
        </a>
      </div>

      {/* Official Curriculum Vitae Banner */}
      <div className="bg-white border border-[#121212] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#121212] text-white flex items-center justify-center shrink-0">
            <FileDown className="w-6 h-6" />
          </div>
          <div>
            <div className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#A31D1D]">
              OFFICIAL CURRICULUM VITAE
            </div>
            <div className="font-serif text-lg font-bold text-[#121212]">
              Dossier of Mihir Pratap Singh (PDF)
            </div>
            <div className="font-serif text-xs text-[#727272]">
              B.Tech Computer Science and Engineering • Full-Stack Web Developer
            </div>
          </div>
        </div>

        <a
          href={`mailto:${OWNER_DATA.email}?subject=Requesting%20CV%20-%20Mihir%20Pratap%20Singh`}
          onClick={() => soundFx.playStampClick()}
          className="inline-flex items-center gap-2 px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-white bg-[#121212] hover:bg-[#2F2F2F] transition-colors shadow-xs"
        >
          <FileDown className="w-4 h-4" />
          <span>DOWNLOAD CURRICULUM VITAE</span>
        </a>
      </div>

      {/* Editorial Contact Wire Form */}
      <div className="border border-[#121212] p-6 sm:p-8 bg-white shadow-xs">
        <div className="border-b border-[#121212] pb-3 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#A31D1D] animate-pulse" />
            <span className="font-serif text-base font-bold uppercase tracking-wider text-[#121212]">
              EDITORIAL PRESS WIRE
            </span>
          </div>
          <span className="font-sans text-[10px] font-bold text-[#727272] uppercase tracking-widest">
            OFFICIAL TRANSMISSION
          </span>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#121212] flex items-center justify-center text-[#121212] mx-auto mb-2">
              <CheckCircle className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#121212]">
              DISPATCH TRANSMITTED SUCCESSFULLY
            </h3>
            <p className="font-serif text-sm text-[#727272] max-w-md mx-auto">
              Your communication has been filed with the newsroom. Mihir Pratap Singh will respond to <span className="font-bold text-[#121212] font-mono">{formState.wireContact || 'your address'}</span> with high priority.
            </p>

            <button
              onClick={handleReset}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2 font-sans text-xs font-bold text-[#121212] border border-[#121212] hover:bg-[#F7F6F3] transition-colors"
            >
              <span>SEND ANOTHER COMMUNICATION</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label
                  htmlFor="sender"
                  className="block text-xs font-bold uppercase tracking-wider text-[#121212]"
                >
                  1. Sender Name / Organization <span className="text-[#A31D1D]">*</span>
                </label>
                <input
                  id="sender"
                  name="sender"
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance / Organization"
                  value={formState.sender}
                  onChange={handleInputChange}
                  className="w-full bg-[#FCFBF9] border border-[#E2E2E2] focus:border-[#121212] px-3.5 py-2 text-xs text-[#121212] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="wireContact"
                  className="block text-xs font-bold uppercase tracking-wider text-[#121212]"
                >
                  2. Return Address (Email or Phone) <span className="text-[#A31D1D]">*</span>
                </label>
                <input
                  id="wireContact"
                  name="wireContact"
                  type="text"
                  required
                  placeholder="e.g. eleanor@vance.com or +91-9876543210"
                  value={formState.wireContact}
                  onChange={handleInputChange}
                  className="w-full bg-[#FCFBF9] border border-[#E2E2E2] focus:border-[#121212] px-3.5 py-2 text-xs text-[#121212] outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="inquiryType"
                className="block text-xs font-bold uppercase tracking-wider text-[#121212]"
              >
                3. Subject Classification
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={formState.inquiryType}
                onChange={handleInputChange}
                className="w-full bg-[#FCFBF9] border border-[#E2E2E2] focus:border-[#121212] px-3.5 py-2 text-xs text-[#121212] outline-none transition-colors"
              >
                <option value="Full-Stack Software Engineering Opportunity">Full-Time Software Engineering Opportunity</option>
                <option value="Frontend Architecture & React Role">Frontend / React Engineering Role</option>
                <option value="Backend API & Database System">Backend API &amp; Database Architecture</option>
                <option value="General Consultation & Collaboration">General Technical Inquiry</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="message"
                  className="block text-xs font-bold uppercase tracking-wider text-[#121212]"
                >
                  4. Communication Text <span className="text-[#A31D1D]">*</span>
                </label>
                <span className="text-[10px] text-[#727272]">
                  {formState.message.length} CHARS TYPED
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="TRANSMIT YOUR MESSAGE OR INQUIRY HERE. STOP."
                value={formState.message}
                onChange={handleInputChange}
                className="w-full bg-[#FCFBF9] border border-[#E2E2E2] focus:border-[#121212] p-3.5 font-mono text-xs text-[#121212] outline-none transition-colors leading-relaxed"
              />
            </div>

            <div className="border-t border-[#E2E2E2] pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#727272]">
                <MapPin className="w-4 h-4 text-[#121212]" />
                <span>BUREAU: LUCKNOW, UTTAR PRADESH, INDIA</span>
              </div>

              <button
                type="submit"
                disabled={isTransmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-bold uppercase tracking-widest text-white bg-[#121212] hover:bg-[#2F2F2F] transition-colors cursor-pointer disabled:opacity-50"
              >
                {isTransmitting ? (
                  <>
                    <span className="animate-spin">⚙</span>
                    <span>TRANSMITTING WIRE...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT DISPATCH</span>
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
