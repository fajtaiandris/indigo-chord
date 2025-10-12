import { isPlaying } from "$lib/store";

// TYPES
export type Instrument = 'sine' | 'strings' | 'brass' | 'organ';

export type InstrumentPreset = {
  multipliers: number[];
  waveform: OscillatorType;
  partialGain: (mult: number) => number;
};

export type PlayOptions = {
  bpm?: number;
  noteLengthBeats?: number;
  gapBeats?: number;
  instrument?: Instrument;
  noteGain?: number;
};

// CONSTS
export type ADSR = { attack: number; decay: number; sustain: number; release: number };

export const defaultPartialGain = (mult: number) => 0.2 / (1 + Math.log2(mult));

export const instrumentPresets: Record<Instrument, InstrumentPreset> = {
  sine: { multipliers: [3], waveform: "sine", partialGain: defaultPartialGain },
  strings: { multipliers: [3, 2, 1], waveform: "sine", partialGain: defaultPartialGain },
  brass: { multipliers: [3, 5, 7, 9], waveform: "sine", partialGain: defaultPartialGain },
  organ: { multipliers: [1, 2, 4, 8], waveform: "sine", partialGain: defaultPartialGain },
};


// SERVICE
let ctx: AudioContext | null = null;

const ensureCtx = (): AudioContext => {
  if (!ctx) {
    const Ctx =
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext ?? window.AudioContext;
    ctx = new Ctx();
  }
  return ctx!;
};

const midiToFreq = (m: number): number =>
  440 * Math.pow(2, (m - 69) / 12);

const applyADSR = (
  gain: GainNode,
  t0: number,
  dur: number,
  adsr: ADSR
): number => {
  const { attack, decay, sustain, release } = adsr;
  gain.gain.cancelScheduledValues(t0);
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(1, t0 + attack);
  gain.gain.linearRampToValueAtTime(sustain, t0 + attack + decay);
  gain.gain.setValueAtTime(sustain, t0 + dur);
  gain.gain.linearRampToValueAtTime(0, t0 + dur + release);
  return dur + release;
};

export const playMidi = (
  notes: number[],
  opts: PlayOptions = {}
): { stop: () => void } | void => {
  if (!notes.length) return;

  const audio = ensureCtx();
  if (audio.state !== "running") {
    void audio.resume().catch(() => {});
  }

  const {
    bpm = 300,
    noteLengthBeats = 0.25,
    gapBeats = 0,
    instrument = "organ",
    noteGain = 1.0,
  } = opts;

  const adsr: ADSR = { attack: 0.02, decay: 0.05, sustain: 0.8, release: 0.9 };

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

    const noteGainNode = audio.createGain();
    noteGainNode.gain.setValueAtTime(noteGain, t);
    noteGainNode.connect(audio.destination);
    allNoteGains.push(noteGainNode);

    const preset = instrumentPresets[instrument];
    if (!preset) {
      t += noteDurSec + gapSec;
      continue;
    }

    const { multipliers, waveform: presetWave, partialGain } = preset;

    const tail = applyADSR(noteGainNode, t, noteDurSec, adsr);

    for (const mult of multipliers) {
      const osc = audio.createOscillator();
      const g = audio.createGain();

      osc.type = presetWave;
      osc.frequency.setValueAtTime(baseFreq * mult, t);
      g.gain.setValueAtTime(partialGain(mult), t);

      osc.connect(g).connect(noteGainNode);

      osc.start(t);
      // Stop after the release to avoid clicks
      osc.stop(t + tail + 0.01);

      allOscillators.push(osc);
      allPartialGains.push(g);
    }

    t += noteDurSec + gapSec;
  }

  let stopped = false;

  isPlaying.set(true);

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
      isPlaying.set(false);

      const now = audio.currentTime;

      // Smoothly ramp everything down
      for (const g of allPartialGains) {
        try {
          g.gain.cancelScheduledValues(now);
          g.gain.setTargetAtTime(0, now, 0.01);
        } catch {}
      }
      for (const ng of allNoteGains) {
        try {
          ng.gain.cancelScheduledValues(now);
          ng.gain.setTargetAtTime(0, now, 0.01);
        } catch {}
      }
      for (const o of allOscillators) {
        try {
          o.stop(now + 0.02);
        } catch {}
      }
    },
  };
};
