/**
 * Procedural Audio Synthesizer utilizing the Web Audio API
 * Generates dynamic paper rustles, zero-gravity whooshes, and vintage ink clicks
 * without relying on external .mp3/.wav assets.
 */

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private noiseBuffer: AudioBuffer | null = null;

  constructor() {
    // AudioContext is created lazily on first user interaction to satisfy browser policies
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.createNoiseBuffer();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private createNoiseBuffer() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2; // 2 seconds of pink/white noise
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate soft brownian/pink noise blend for realistic fibrous paper friction
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Gain compensation
    }
    this.noiseBuffer = buffer;
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      // Short affirmative chime
      this.playAffirmativeChime();
    }
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    if (!muted) this.initContext();
    this.isMuted = muted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Procedural Paper Rustle:
   * Bandpassed noise modulated with short envelope simulating paper rubbing
   */
  public playRustle(intensity: number = 0.3) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.noiseBuffer) return;

    try {
      const now = this.ctx.currentTime;
      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = this.noiseBuffer;
      noiseSource.loop = true;

      // Bandpass filter centered around 1800Hz for high-frequency paper fiber texture
      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1400 + Math.random() * 800, now);
      bandpass.Q.setValueAtTime(2.2, now);

      // Lowpass to shave harsh digital frequencies
      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(4500, now);

      // Volume envelope
      const gainNode = this.ctx.createGain();
      const peakGain = Math.min(0.18, 0.08 * intensity);
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(peakGain, now + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      noiseSource.connect(bandpass);
      bandpass.connect(lowpass);
      lowpass.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      noiseSource.start(now);
      noiseSource.stop(now + 0.25);
    } catch {
      // Graceful fallback if audio context fails
    }
  }

  /**
   * Procedural Airy Whoosh:
   * Smooth sweeping filter on noise + crisp high-end presence for tactile paper flip/unroll
   */
  public playWhoosh(speed: number = 1.0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.noiseBuffer) return;

    try {
      const now = this.ctx.currentTime;
      const duration = 0.45 / speed;

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = this.noiseBuffer;

      // Enhanced filter frequency sweep (400Hz -> 3200Hz -> 450Hz) for crisp tactile flip presence
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + duration * 0.45);
      filter.frequency.exponentialRampToValueAtTime(450, now + duration);
      filter.Q.setValueAtTime(1.5, now);

      // Boosted master GainNode peak value (0.52) with clean headroom
      const gain = this.ctx.createGain();
      const peakGain = 0.52;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(peakGain, now + duration * 0.35);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noiseSource.start(now);
      noiseSource.stop(now + duration + 0.05);
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Procedural Vintage Ink Stamp / Click:
   * Crisp mechanical click simulating broadsheet press stamping
   */
  public playStampClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Procedural Telegram Morse Beep:
   * Used when typing in the telegram contact form
   */
  public playMorsePip() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800 + Math.random() * 40, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Graceful fallback
    }
  }

  private playAffirmativeChime() {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Silently continue
    }
  }
}

export const soundFx = new SoundSynthesizer();
