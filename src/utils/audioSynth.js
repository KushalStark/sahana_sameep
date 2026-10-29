/**
 * Ambient Wedding Harp / Chimes Synthesizer
 * Provides an elegant, soothing acoustic chord progression via the standard Web Audio API
 * when no external MP3 is supplied, or as a zero-dependency fallback.
 */

class WeddingAudioPlayer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.audioElement = null;
    this.mode = 'synth'; // 'synth' or 'audio'
  }

  init(audioSrc) {
    if (audioSrc) {
      try {
        this.audioElement = new Audio(audioSrc);
        this.audioElement.loop = true;
        this.audioElement.volume = 0.4;
        this.mode = 'audio';

        // If audio source fails to load (e.g. 404 or missing file), fallback to synthesizer
        this.audioElement.addEventListener('error', () => {
          console.info('Audio file not found or failed, falling back to ambient harp synthesizer.');
          this.mode = 'synth';
        });
      } catch (e) {
        this.mode = 'synth';
      }
    }
  }

  ensureContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playNote(freq, time, duration = 3.0, gainVal = 0.08) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Warm tone using soft harmonics
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      // Subtle detune for shimmer warmth
      osc.detune.setValueAtTime(Math.random() * 6 - 3, time);

      // Envelope: gentle attack, long romantic release
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(gainVal, time + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + duration);
    } catch (e) {
      // Ignore audio glitches
    }
  }

  startSynthArpeggio() {
    if (!this.ctx) return;
    // Romantic warm pentatonic scale chords (F# major / D# minor warm wedding aesthetic)
    // Notes: C#4, F4, G#4, C5, D#5, F5
    const notes = [277.18, 349.23, 415.30, 523.25, 622.25, 698.46, 830.61];
    let noteIndex = 0;

    const playNext = () => {
      if (!this.isPlaying || this.mode !== 'synth') return;
      const now = this.ctx.currentTime;
      const baseFreq = notes[noteIndex % notes.length];
      
      // Play root and fifth
      this.playNote(baseFreq, now, 3.5, 0.06);
      if (Math.random() > 0.4) {
        this.playNote(baseFreq * 1.5, now + 0.35, 2.5, 0.03);
      }

      noteIndex = (noteIndex + 1) % notes.length;
      // Stagger notes organically (every 1.8 to 2.4 seconds)
      const nextDelay = 1800 + Math.random() * 800;
      this.timer = setTimeout(playNext, nextDelay);
    };

    playNext();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      return this.play();
    }
  }

  play() {
    this.ensureContext();
    this.isPlaying = true;

    if (this.mode === 'audio' && this.audioElement) {
      this.audioElement.play().catch(() => {
        // If external audio play fails, run synth
        this.mode = 'synth';
        this.startSynthArpeggio();
      });
    } else {
      this.startSynthArpeggio();
    }
    return true;
  }

  pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.audioElement) {
      try {
        this.audioElement.pause();
      } catch (e) {}
    }
  }
}

export const weddingAudio = new WeddingAudioPlayer();
