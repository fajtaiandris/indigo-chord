// harmonyTable is a 3D array: [row][column][variation]
const harmonyTable: string[][][] = [
    [
      [
        'maj7',
        'maj11(b9,b13)',
        'maj13(#11)',
        'maj7(#9,#13)',
        'maj7(b13)',
        'maj7(11,13)',
        'maj7(#9,#11,#13)',
        'maj9',
        'maj7(#9,b13)',
        'maj7(b9,13)',
        'maj11(#13)',
        'maj7(#9,#11)',
      ],
      [
        'maj7(#9)',
        'maj7(b9,b13)',
        'maj13',
        'maj7(#9,#11,#13)',
        'maj7',
        'maj7(11,b13)',
        'maj7(b9,#11,13)',
        'maj9(#13)',
        'maj7(#9,b13)',
        'maj7(13)',
        'maj7(b9,11,#13)',
        'maj9(#11)',
      ],
      [
        'maj7(#9,#11)',
        'maj7(b9)',
        'maj11(b13)',
        'maj13(#9,#11)',
        'maj7(#13)',
        'maj7(11,b13)',
        'maj7(#11,13)',
        'maj7(b9,#13)',
        'maj9(b13)',
        'maj7(b13)',
        'maj7(b9,#13)',
        'maj11',
      ],
      [
        'maj7(b13)',
        'maj13(b9)',
        'maj9(#11,#13)',
        'maj7(#9)',
        'maj7(b13)',
        'maj7(b9,11,13)',
        'maj9(#11,#13)',
        'maj7(#9)',
        'maj7(b13)',
        'maj13(b9)',
        'maj9(#11,#13)',
        'maj7(#9)',
      ],
      [
        'maj7(11)',
        'maj7(b9,#11,b13)',
        'maj9(13)',
        'maj7(#5,#9,#13)',
        'maj7(13)',
        'maj7(11,#13)',
        'maj7(#9,#11)',
        'maj9',
        'maj7(b9,#9,b13)',
        'maj9(13)',
        'maj11(#9,#13)',
        'maj7(#11)',
      ],
    ],
    [
      [
        '7',
        '11(b9,b13)',
        '13(#11)',
        '7(#9)',
        '?',
        '7(11,13)',
        '7(b9,#11)',
        '?',
        '7(#9,b13)',
        '7(b9,13)',
        '11',
        '?',
      ],
      [
        '7(#9)',
        '7(b9,b13)',
        '13',
        '7(#9,#11)',
        '?',
        '7(11,b13)',
        '13(b9,#11)',
        '9',
        '?',
        '7(13)',
        '11(b9)',
        '?',
      ],
      [
        '7(#9,#11)',
        '7(b9)',
        '11(b13)',
        '13(#9,#11)',
        '7',
        '?',
        '7(13,#11)',
        '7(b9)',
        '?',
        '7(#9,13)',
        '7(b9)',
        '?',
      ],
      [
        '7(b13)',
        '13(b9)',
        '9(#11)',
        '?',
        '7(b13)',
        '13(b9)',
        '9(#11)',
        '?',
        '7(b13)',
        '13(b9',
        '9(#11)',
        '?',
      ],
      [
        '7(11)',
        '7(#9,#11,b13)',
        '9(13)',
        '7(#9,b13)',
        '?',
        '7(11)',
        '7(b9,#11)',
        '9',
        '7(b9,#9,b13)',
        '9(13)',
        '11(#9)',
        '?',
      ],
    ],
    [
      [
        '?',
        '-11(b9,b13)',
        '-9(b5,13)',
        '-7',
        '?',
        '-7(11,13)',
        '-7(b5,b9)',
        '?',
        '-7(b13)',
        '?',
        '-11',
        '?',
      ],
      [
        '-7',
        '?',
        '-13',
        '-7(b5)',
        '?',
        '-7(11,b13)',
        '-7(b5,b9,13)',
        '-9',
        '?',
        '?',
        '-11(b9)',
        '?',
      ],
      [
        '-7(b5)',
        '?',
        '-11(b13)',
        '-7(b5,13)',
        '?',
        '?',
        '-7(b5,13)',
        '-7(b9)',
        '?',
        '-7(13)',
        '?',
        '?',
      ],
      [
        '?',
        '-13(b9)',
        '-9(b5)',
        '?',
        '?',
        '-13(b9)',
        '-9(b5)',
        '?',
        '?',
        '-13(b9)',
        '-9(b5)',
        '?',
      ],
      [
        '-7(11)',
        '-7(b5,b9,b13)',
        '-9(13)',
        '-7(b13)',
        '?',
        '-7(11)',
        '?',
        '-9',
        '-7(b9,b13)',
        '?',
        '-7(11)',
        '?',
      ],
    ],
    [
      [
        '?',
        'dim11(b9,b13)',
        'dim9',
        '?',
        '?',
        'dim7(11)',
        '?',
        '?',
        'dim7(b13)',
        '?',
        '?',
        '?',
      ],
      [
        'dim7(b13)',
        '?',
        'dim11',
        '?',
        '?',
        'dim7(11,b13)',
        'dim7(b9)',
        '?',
        '?',
        '?',
        '?',
        '?',
      ],
      [
        'dim7',
        '?',
        'dim11(b13)',
        'dim7',
        '?',
        '?',
        'dim7',
        '?',
        '?',
        'dim7',
        '?',
        '?',
      ],
      [
        '?',
        'dim11(b9)',
        '?',
        '?',
        '?',
        'dim11(b9)',
        '?',
        '?',
        '?',
        'dim11(b9)',
        '?',
        '?',
      ],
      [
        '?',
        'dim7(b9,b13)',
        '?',
        '?',
        '?',
        '?',
        '?',
        '?',
        'dim7(b9,b13)',
        '?',
        '?',
        '?',
      ],
    ],
    [
      [
        '?',
        'mMaj11(b9,b13)',
        '?',
        '?',
        '?',
        'mMaj7(11,13)',
        '?',
        'mMaj9',
        'mMaj7(b13)',
        '?',
        '?',
        '?',
      ],
      [
        'mMaj7',
        '?',
        'mMaj13',
        '?',
        '?',
        'mMaj7(11,b13)',
        '?',
        '?',
        'mMaj7(b13)',
        '?',
        '?',
        '?',
      ],
      [
        '?',
        '?',
        'mMaj11(b13)',
        '?',
        '?',
        'mMaj7(11,b13)',
        '?',
        '?',
        'mMaj9(b13)',
        'mMaj7(13)',
        '?',
        'mMaj11',
      ],
      [
        '?',
        'mMaj13(b9)',
        '?',
        'mMaj7',
        '?',
        'mMaj13(b9)',
        '?',
        'mMaj7',
        '?',
        'mMaj13(b9)',
        '?',
        'mMaj7',
      ],
      [
        'mMaj7(11)',
        '?',
        'mMaj9(13)',
        '?',
        '?',
        'mMaj7(11)',
        '?',
        'mMaj9',
        'mMaj7(b9,b13)',
        '?',
        '?',
        '?',
      ],
    ],
    [
      ['', '?', '?', '?', '?', '?', '?', 'add9', '?', '?', '?', '?'],
      ['add#9', '?', '?', '?', 'maj7', '?', '?', '?', '?', 'add13', '?', '?'],
      ['?', 'addb9', '?', '?', '7', '?', '?', '?', '?', '?', '?', '?'],
      ['addb13', '?', '?', '?', 'addb13', '?', '?', '?', 'addb13', '?', '?', '?'],
      ['add11', '?', '?', '?', '?', '?', '?', 'add9', '?', '?', '?', '?'],
    ],
    [
      ['?', '?', '?', '-7', '?', '?', '?', '-add9', '-addb13', '?', '?', '?'],
      ['-', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?'],
      ['-add#11', '?', '?', '?', '?', '?', '?', '?', '?', '-add13', '?', '?'],
      ['?', '?', '?', 'mMaj7', '?', '?', '?', 'mMaj7', '?', '?', '?', 'mMaj7'],
      ['-add11', '?', '?', '?', '?', '?', '?', '-add9', '?', '?', '?', '?'],
    ],
    [
      ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?'],
      ['?', '?', '?', '-7(b5)', '?', '?', '?', '?', '?', '?', '?', '?'],
      ['dim', '?', '?', 'dim7', '?', '?', 'dim7', '?', '?', 'dim7', '?', '?'],
      ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?'],
      ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?'],
    ],
    [
      ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?'],
      ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?'],
      ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?'],
      ['aug', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?'],
      ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?'],
    ],
    [
      ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?'],
      ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?'],
      ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?'],
      ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?'],
      ['sus4', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?'],
    ],
  ];
  
  const pitchNames = [
    'A',
    'A#',
    'B',
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
  ] as const; // TODO correct pitch name abstraction
  type PitchName = (typeof pitchNames)[number];
  
  type ShellName =
    | 'maj7Shell'
    | 'dom7Shell'
    | 'min7Shell'
    | 'dim7Shell'
    | 'minMaj7Shell';
  type TriadName = 'maj' | 'min' | 'dim' | 'aug' | 'sus4';
  
  const intervals = [
    '1',
    'b2',
    '2',
    'b3',
    '3',
    '4',
    'b5',
    '5',
    'b6',
    '6',
    'b7',
    '7',
  ] as const; // TODO correct interval name abstraction
  type Interval = (typeof intervals)[number];
  type HarmonicStructure = Interval[];
  
  const triadStructures: Record<TriadName, HarmonicStructure> = {
    maj: ['1', '3', '5'],
    min: ['1', 'b3', '5'],
    dim: ['1', 'b3', 'b5'],
    aug: ['1', '3', 'b6'],
    sus4: ['1', '4', '5'],
  };
  const triadOrder: readonly TriadName[] = [
    'maj',
    'min',
    'dim',
    'aug',
    'sus4',
  ] as const;
  
  const shellStructures: Record<ShellName, HarmonicStructure> = {
    maj7Shell: ['1', '3', '7'],
    dom7Shell: ['1', '3', 'b7'],
    min7Shell: ['1', 'b3', 'b7'],
    dim7Shell: ['1', 'b3', '6'],
    minMaj7Shell: ['1', 'b3', '7'],
  };
  
  type BaseHarmonyName = ShellName | TriadName;
  const baseHarmonyStructures: Record<BaseHarmonyName, HarmonicStructure> = {
    ...shellStructures,
    ...triadStructures,
  };
  // IMPORTANT: must match the layout of harmonyTable
  const baseHarmonyOrder: readonly BaseHarmonyName[] = [
    'maj7Shell',
    'dom7Shell',
    'min7Shell',
    'dim7Shell',
    'minMaj7Shell',
    'maj',
    'min',
    'dim',
    'aug',
    'sus4',
  ] as const;
  
  const intervalToNumber: (interval: Interval) => number = (interval) => {
    return intervals.findIndex((i) => i === interval);
  };
  
  // helper to handle negative values and wrap to [0..11]
  const mod12 = (n: number) => ((n % 12) + 12) % 12;
  
  const numberToInterval = (n: number): Interval => {
    const idx = mod12(n);
    return intervals[idx];
  };
  
  const harmonyName = (
    lowStructType: BaseHarmonyName,
    upStructInterval: Interval,
    upStructType: TriadName
  ): string => {
    const upStructIntervalNumber = mod12(intervalToNumber(upStructInterval));
    const upStructTypeIndex = triadOrder.indexOf(upStructType);
    const lowStructTypeIndex = baseHarmonyOrder.indexOf(lowStructType);
  
    if (upStructTypeIndex < 0)
      throw new Error(`Unknown upStructType: ${upStructType}`);
    if (lowStructTypeIndex < 0)
      throw new Error(`Unknown lowStructType: ${lowStructType}`);
  
    // Fallback to "?" if any slot is missing
    return (
      harmonyTable[lowStructTypeIndex]?.[upStructTypeIndex]?.[
        upStructIntervalNumber
      ] ?? '?'
    );
  };
  
  const pitchName = (midiNote: number): PitchName => {
    // +3 aligns MIDI 0 → "C"; wrap to [0..11]
    return pitchNames[mod12(midiNote + 3)];
  };
  
  export const pitchNameWithOctave = (midiNote: number): string => {
    // Standard MIDI octave formula: floor(n/12) - 1
    return `${pitchName(midiNote)}${Math.floor(midiNote / 12) - 1}`;
  };
  
  const chordToMidiPattern = (structure: ReadonlyArray<Interval>): number[] =>
    structure.map(intervalToNumber);
  
  const getIntervalName = (midiNotes: [number, number] | number[]): string => {
    const [n0, n1] = midiNotes;
    return `${pitchName(n0)} - ${pitchName(n1)} (${numberToInterval(n1 - n0)})`;
  };
  
  // Removes the earlier note of any adjacent pair that share the same pitch class (mod 12).
  const removeDuplicatesNextToEachOther = (midiNotes: number[]): void => {
    const toRemoveIdxs: number[] = [];
  
    for (let i = 1; i < midiNotes.length; i++) {
      if (mod12(midiNotes[i]) === mod12(midiNotes[i - 1])) {
        toRemoveIdxs.push(i - 1); // mark the previous (earlier) note for removal
      }
    }
  
    // Remove from the end to avoid index shifting
    for (let j = toRemoveIdxs.length - 1; j >= 0; j--) {
      midiNotes.splice(toRemoveIdxs[j], 1);
    }
  };
  
  // Pull each note down by octaves so it's within one octave (≤ +12 semitones) of the previous note.
  // Mutates the array in place, matching the Java behavior.
  const removeSpacing = (midiNotes: number[]): void => {
    for (let i = 1; i < midiNotes.length; i++) {
      while (midiNotes[i] - 12 > midiNotes[i - 1]) {
        midiNotes[i] -= 12;
      }
    }
  };
  
  const baseHarmonyPatterns = Object.entries(baseHarmonyStructures).map(
    ([name, intervals]) => [name, chordToMidiPattern(intervals)]
  );
  
  const triadPatterns = Object.entries(triadStructures).map(
    ([name, intervals]) => [name, chordToMidiPattern(intervals)]
  );
  
  // Returns a new array of MIDI notes by transposing the pattern up from the base.
  const generatePattern = (
    base: number,
    pattern: ReadonlyArray<number>
  ): number[] => pattern.map((offset) => base + offset);
  
  // Returns true if midiNotes contains all notes of the pattern transposed from its bass (first note).
  const isMatching = (
    pattern: ReadonlyArray<number>,
    midiNotes: ReadonlyArray<number>
  ): boolean => {
    if (midiNotes.length === 0) return false;
    const base = midiNotes[0];
    const needed = generatePattern(base, pattern);
    const noteSet = new Set(midiNotes); // faster membership checks
    return needed.every((n) => noteSet.has(n));
  };
  
  // Raises the bass (first note) by an octave, then either removes it if it duplicates
  // another note, or re-sorts the notes. Mutates the array in place (like the Java version).
  const shiftBassNote = (midiNotes: number[]): void => {
    if (midiNotes.length === 0) return;
  
    // raise bass by an octave
    midiNotes[0] = midiNotes[0] + 12;
  
    // if new bass already exists among the rest, drop it; else sort ascending
    if (midiNotes.slice(1).includes(midiNotes[0])) {
      midiNotes.splice(0, 1);
    } else {
      midiNotes.sort((a, b) => a - b);
    }
  };
  
  type FoundBaseHarmony = {
    bass: number;
    originalBass: number;
    name: BaseHarmonyName;
  };
  
  const getLowestBaseHarmony = (midiNotes: number[]): FoundBaseHarmony | null => {
    if (midiNotes.length === 0) return null;
  
    const notes = [...midiNotes]; // don't mutate caller
    const originalBass = notes[0];
  
    // your baseHarmonyPatterns is built via Object.entries(...).map(([name, intervals]) => [name, chordToMidiPattern(intervals)])
    const patterns = baseHarmonyPatterns as [BaseHarmonyName, number[]][];
  
    for (let i = 0; i < notes.length; i++) {
      for (const [name, pattern] of patterns) {
        if (isMatching(pattern, notes)) {
          return { bass: notes[0], originalBass, name };
        }
      }
      shiftBassNote(notes); // invert: raise bass an octave, then dedupe/sort per your helper
    }
    return null;
  };
  
  // ----- types used below -----
  type FoundTriad = { rootMidiNote: number; type: TriadName };
  type AnyChord = { rootMidiNote: number; type: BaseHarmonyName | TriadName };
  
  // ----- helpers -----
  const uniqueInOrder = (xs: number[]) => {
    const seen = new Set<number>();
    const out: number[] = [];
    for (const x of xs)
      if (!seen.has(x)) {
        seen.add(x);
        out.push(x);
      }
    return out;
  };
  
  // Pitch-class membership check for a triad pattern at a given base PC
  const triadPresentAtPc = (
    pattern: readonly number[],
    basePc: number,
    pcSet: Set<number>
  ) => pattern.every((off) => pcSet.has(mod12(basePc + off)));
  
  // Convert a chord (root + type) into its contained pitch classes (0..11)
  const getContainingNotes = (chord: AnyChord): number[] => {
    const structure =
      baseHarmonyStructures[chord.type as BaseHarmonyName] ??
      triadStructures[chord.type as TriadName];
  
    if (!structure) return [];
  
    const offsets = chordToMidiPattern(structure);
    const notes = generatePattern(chord.rootMidiNote, offsets).map((n) =>
      mod12(n)
    );
    return uniqueInOrder(notes);
  };
  
  // Pick the triad with the most notes not already in the base harmony
  const triadWithMostDifferentNotes = (
    comparingHarmony: FoundBaseHarmony,
    triads: FoundTriad[]
  ): FoundTriad => {
    const baseNotes = new Set(
      getContainingNotes({
        rootMidiNote: comparingHarmony.bass,
        type: comparingHarmony.name,
      })
    );
    if (comparingHarmony.name === 'dom7Shell') {
      // TODO add back the fifths for other shells to, so that the diff won't consider that an upper structure note
      baseNotes.add(mod12(comparingHarmony.bass + intervalToNumber("5")))
    }
    let best = triads[0];
    let bestScore = -1;
  
    for (const triad of triads) {
      const triadNotes = getContainingNotes(triad);
      const diff = triadNotes.reduce(
        (acc, n) => acc + (baseNotes.has(n) ? 0 : 1),
        0
      );
      if (diff > bestScore) {
        bestScore = diff;
        best = triad;
      }
    }
    return best;
  };
  
  // Find all upper-structure triads present over the given collection of notes (by pitch class)
  const getAllTriadsPresent = (inputNotes: number[]): FoundTriad[] => {
    // reduce to pitch classes and dedupe (order-preserving)
    const pcs = uniqueInOrder(inputNotes.map((n) => mod12(n)));
    const pcSet = new Set(pcs);
  
    // triadPatterns is [name, patternOffsets][]
    const triads: FoundTriad[] = [];
    const patterns = triadPatterns as [TriadName, number[]][];
  
    for (const basePc of pcs) {
      for (const [name, pattern] of patterns) {
        if (triadPresentAtPc(pattern, basePc, pcSet)) {
          triads.push({ rootMidiNote: basePc, type: name });
        }
      }
    }
    return triads;
  };
  
  // Java: getUpperStructureTriad(lowerStructure, midiNotes)
  const getUpperStructureTriad = (
    lowerStructure: FoundBaseHarmony,
    midiNotes: number[]
  ): FoundTriad | null => {
    const possibleTriads = getAllTriadsPresent(midiNotes);
    if (possibleTriads.length > 0) {
      return triadWithMostDifferentNotes(lowerStructure, possibleTriads);
    }
    return null;
  };
  
  // --- helpers for the full name ---
  const getInversionSuffix = (lower: FoundBaseHarmony): string => {
    const rootPc = mod12(lower.bass); // here "bass" holds the matched root
    const origBassPc = mod12(lower.originalBass);
    return rootPc === origBassPc ? '' : `/${pitchName(lower.originalBass)}`;
  };
  
  const getFullHarmonyName = (
    lower: FoundBaseHarmony,
    midiNotes: number[]
  ): string => {
    const upper = getUpperStructureTriad(lower, midiNotes);
    if (!upper) throw new Error('No upper-structure triad found');
  
    const interval: Interval = numberToInterval(
      upper.rootMidiNote - mod12(lower.bass)
    );
    const harmony = harmonyName(lower.name, interval, upper.type);
  
    if (harmony !== '?') {
      return `${pitchName(lower.bass)}${harmony}${getInversionSuffix(lower)}`;
    } else {
      // fallback similar to the Java toString() combo
      return `${pitchName(lower.bass)}${lower.name}${getInversionSuffix(
        lower
      )} and ${pitchName(upper.rootMidiNote)}${upper.type}`;
    }
  };
  
  export const chordName = (midiNotes: number[]): string => {
    if (midiNotes.length === 0) {
      return '';
    } else if (midiNotes.length === 1) {
      return pitchName(midiNotes[0]);
    } else if (midiNotes.length === 2) {
      return getIntervalName(midiNotes);
    } else {
      const notes = [...midiNotes];
      removeDuplicatesNextToEachOther(notes);
      removeSpacing(notes);
  
      const lower = getLowestBaseHarmony(notes);
      if (lower) {
        try {
          return getFullHarmonyName(lower, notes);
        } catch {
          // simple fallback if something goes wrong while composing the full name
          return `${pitchName(lower.bass)}${lower.name}${getInversionSuffix(
            lower
          )}`;
        }
      } else {
        return '?';
      }
    }
  };
  
  export const getHarmonyType = (midiNotes: number[]): 'note' | 'interval' | 'triad' | 'complex' | undefined => {
    if (midiNotes.length === 0) {
      return undefined;
    } else if (midiNotes.length === 1) {
      return 'note';
    } else if (midiNotes.length === 2) {
      return 'interval';
    } else if (midiNotes.length === 3) {
      return 'triad';
    } else {
     return 'complex'
    }
  }