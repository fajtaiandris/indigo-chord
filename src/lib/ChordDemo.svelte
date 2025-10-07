<script lang="ts">
  import Piano from './Piano.svelte';
  import { chordName } from './namer';
  import { playMidiSequence } from './playMidiSequence';

  let notes: number[] = [];
  $: name = notes.length ? chordName(notes) : '';

  let current: ReturnType<typeof playMidiSequence> | null = null;
  $: if (notes.length) {
    current?.stop();
    current = playMidiSequence(notes, {
      bpm: 300,
      noteLengthBeats: 0.25,
      gapBeats: 0,
      waveform: 'triangle'
    });
  }

</script>

<p style="font-size:1.25rem; font-weight:600;">{name || 'Select keys'}</p>

<Piano
  startMidi={36}
  octaves={3}
  on:change={(e) => (notes = e.detail.notes)}
/>
