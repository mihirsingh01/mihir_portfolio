import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundFx } from '../audio/soundSynthesizer';

interface AudioToggleProps {
  onToggle?: (isMuted: boolean) => void;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({ onToggle }) => {
  const [isMuted, setIsMuted] = useState(soundFx.getIsMuted());

  const handleToggle = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
    if (onToggle) onToggle(nextMuted);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isMuted ? "Enable procedural audio (paper rustle and sound effects)" : "Mute audio"}
      className="group relative inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono tracking-wider border border-newsprint-ink/40 hover:border-newsprint-ink bg-newsprint-aged/60 hover:bg-newsprint-light transition-all rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-stamp-red"
      title="Toggle Procedural Web Audio"
    >
      <div className="relative flex items-center justify-center text-newsprint-ink">
        {isMuted ? (
          <VolumeX className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="flex items-center gap-1">
            <Volume2 className="w-4 h-4 text-stamp-red" />
            <span className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 h-1.5 bg-stamp-red animate-pulse" />
              <span className="w-0.5 h-3 bg-stamp-red animate-pulse delay-75" />
              <span className="w-0.5 h-2 bg-stamp-red animate-pulse delay-150" />
            </span>
          </div>
        )}
      </div>
      <span className="font-bold text-[11px] uppercase text-newsprint-ink">
        {isMuted ? 'AUDIO: MUTED' : 'AUDIO: LIVE'}
      </span>
    </button>
  );
};
