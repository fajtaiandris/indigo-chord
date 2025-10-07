// Play an array of MIDI notes as a timed sequence using the Web Audio API.
// Non-blocking: returns immediately with a { stop } handle.
//
// Example:
// const handle = playMidiSequence([60, 62, 64, 65, 67], { bpm: 120, waveform: 'sine' });
// handle.stop(); // optional, to cut it short

export type PlayOptions = {
  bpm?: number;                // beats per minute (default 120)
  noteLengthBeats?: number;    // length of each note in beats (default 0.9)
  gapBeats?: number;           // gap between notes in beats (default 0.1)
  waveform?: OscillatorType;   // 'sine' | 'square' | 'sawtooth' | 'triangle'
  adsr?: { attack: number; decay: number; sustain: number; release: number }; // seconds
};

let ctx: AudioContext | null = null;

function ensureCtx(): AudioContext {
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return ctx!;
}

function midiToFreq(m: number): number {
  // A4 (MIDI 69) = 440 Hz
  return 440 * Math.pow(2, (m - 69) / 12);
}

function applyADSR(
  gain: GainNode,
  t0: number,
  dur: number,
  adsr: Required<PlayOptions>['adsr']
) {
  const { attack, decay, sustain, release } = adsr;
  gain.gain.cancelScheduledValues(t0);
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(1, t0 + attack);
  gain.gain.linearRampToValueAtTime(sustain, t0 + attack + decay);
  gain.gain.setValueAtTime(sustain, t0 + dur);
  gain.gain.linearRampToValueAtTime(0, t0 + dur + release);
  return dur + release;
}

/**
 * Plays the given MIDI notes sequentially.
 * Returns immediately with a handle you can use to stop playback.
 */
export function playMidiSequence(
  notes: number[],
  opts: PlayOptions = {}
): { stop: () => void } | void {
  if (!Array.isArray(notes) || notes.length === 0) return;

  const audio = ensureCtx();
  // Try to unlock audio context if possible (should be from a user gesture)
  if (audio.state !== 'running') {
    // don't await — keep this non-blocking
    void audio.resume().catch(() => {});
  }

  const {
    bpm = 120,
    noteLengthBeats = 0.9, // slightly shorter than a full beat to leave space
    gapBeats = 0.1,
    waveform = 'sine',
    adsr = { attack: 0.005, decay: 0.05, sustain: 1, release: 0.92 }
  } = opts;

  const secPerBeat = 60 / bpm;
  const noteDurSec = Math.max(0.02, noteLengthBeats * secPerBeat);
  const gapSec = Math.max(0, gapBeats * secPerBeat);

  let t = audio.currentTime + 0.02;
  const oscillators: OscillatorNode[] = [];
  const gains: GainNode[] = [];

  for (const m of notes) {
    if (!Number.isFinite(m)) {
      t += noteDurSec + gapSec;
      continue;
    }

    const osc = audio.createOscillator();
    const gain = audio.createGain();

    osc.type = waveform;
    osc.frequency.value = midiToFreq(m);
    osc.connect(gain).connect(audio.destination);

    const tail = applyADSR(gain, t, noteDurSec, adsr);
    osc.start(t);
    osc.stop(t + tail + 0.01);

    oscillators.push(osc);
    gains.push(gain);

    t += noteDurSec + gapSec;
  }

  let stopped = false;
  return {
    stop: () => {
      if (stopped) return;
      stopped = true;
      // Fade out quickly, then stop oscillators
      const now = audio.currentTime;
      for (const g of gains) {
        try {
          g.gain.cancelScheduledValues(now);
          g.gain.setTargetAtTime(0, now, 0.01);
        } catch {}
      }
      for (const o of oscillators) {
        try { o.stop(now + 0.02); } catch {}
      }
    }
  };
}
