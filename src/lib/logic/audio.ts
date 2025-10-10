import { isPlaying } from "../store";

export type InstrumentPreset = {
  multipliers: number[];
  waveform?: OscillatorType;
  partialGain?: (mult: number) => number;
};

export type Instrument = 'sine' | 'strings' | 'brass' | 'organ';

const defaultPartialGain = (mult: number) => 0.2 / (1 + Math.log2(mult));

export const instrumentPresets: Record<Instrument, InstrumentPreset> = {
  sine: { multipliers: [3], waveform: "sine", partialGain: defaultPartialGain },
  strings: { multipliers: [3, 2, 1], waveform: "sine", partialGain: defaultPartialGain },
  brass: { multipliers: [3, 5, 7, 9], waveform: "sine", partialGain: defaultPartialGain },
  organ: { multipliers: [1, 2, 4, 8], waveform: "sine", partialGain: defaultPartialGain },
};

export type PlayOptions = {
  bpm?: number;
  noteLengthBeats?: number;
  gapBeats?: number;
  instrument?: InstrumentPreset;
  noteGain?: number;
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
  adsr: { attack: number; decay: number; sustain: number; release: number }
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

export function playMidi(
  notes: number[],
  opts: PlayOptions = {}
): { stop: () => void } | void {
  if (!Array.isArray(notes) || notes.length === 0) return;

  const audio = ensureCtx();
  if (audio.state !== "running") {
    void audio.resume().catch(() => { });
  }

  const {
    bpm = 300,
    noteLengthBeats = 0.25,
    gapBeats = 0,
    instrument = instrumentPresets.organ,
    noteGain = 1.0,
  } = opts;

  const adsr = { attack: 0.02, decay: 0.05, sustain: 0.8, release: 0.9 };

  const secPerBeat = 60 / bpm;
  const noteDurSec = Math.max(0.02, noteLengthBeats * secPerBeat);
  const gapSec = Math.max(0, gapBeats * secPerBeat);

  let t = audio.currentTime + 0.02;

  // Keep handles so we can stop early.
  const allOscillators: OscillatorNode[] = [];
  const allPartialGains: GainNode[] = [];
  const allNoteGains: GainNode[] = [];

  for (const m of notes) {
    if (!Number.isFinite(m)) {
      t += noteDurSec + gapSec;
      continue;
    }

    const baseFreq = midiToFreq(m);

    // Per-note gain (ADSR applied here)
    const noteGainNode = audio.createGain();
    noteGainNode.gain.value = noteGain;
    noteGainNode.connect(audio.destination);
    allNoteGains.push(noteGainNode);

    // Multi-partial (preset) path — mirrors the original approach
    const {
      multipliers,
      waveform: presetWave = "sine",
      partialGain = defaultPartialGain,
    } = instrument;

    // Mix partials into the per-note gain
    for (const mult of multipliers) {
      const osc = audio.createOscillator();
      const g = audio.createGain();

      osc.type = presetWave;        // original used sine everywhere
      osc.frequency.value = baseFreq * mult;
      g.gain.value = partialGain(mult);

      osc.connect(g).connect(noteGainNode);

      const tail = applyADSR(noteGainNode, t, noteDurSec, adsr);
      osc.start(t);
      // We stop the oscillator after the note’s release to avoid clicks
      osc.stop(t + tail + 0.01);

      allOscillators.push(osc);
      allPartialGains.push(g);
    }


    t += noteDurSec + gapSec;
  }

  let stopped = false;

  // mark active immediately
  isPlaying.set(true);

  // when all oscillators have ended, flip the flag
  let remaining = allOscillators.length;
  for (const o of allOscillators) {
    o.addEventListener("ended", () => {
      remaining--;
      if (remaining === 0 && !stopped) {
        isPlaying.set(false);
      }
    });
  }

  return {
    stop: () => {
      if (stopped) return;
      stopped = true;
      isPlaying.set(false); // immediate UI feedback

      const now = audio.currentTime;

      // Smoothly ramp everything down
      for (const g of allPartialGains) {
        try {
          g.gain.cancelScheduledValues(now);
          g.gain.setTargetAtTime(0, now, 0.01);
        } catch { }
      }
      for (const ng of allNoteGains) {
        try {
          ng.gain.cancelScheduledValues(now);
          ng.gain.setTargetAtTime(0, now, 0.01);
        } catch { }
      }
      for (const o of allOscillators) {
        try { o.stop(now + 0.02); } catch { }
      }
    }
  };
}
