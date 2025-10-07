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

<p class="chord-name">{name || 'Select keys'}</p>

<Piano
  startMidi={36}
  octaves={3}
  on:change={(e) => (notes = e.detail.notes)}
/>

<style>
  .chord-name {
    font-size: 1.5rem;
    font-weight: bold;
  }
</style>