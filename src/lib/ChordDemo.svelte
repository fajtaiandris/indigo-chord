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

<div class="keyboard">
  <div class="keyboard__top">{name || 'Select keys'}</div>
  <div class="keyboard__bottom">
    <div class="settings">
      <button>Mute</button>
      <button>Play</button>
      <button>Random</button>
    </div>
    <div class="keys-wrapper">
      <Piano
        startMidi={36}
        octaves={3}
        on:change={(e) => (notes = e.detail.notes)}
      />
    </div>
  </div>
</div>



<style>
  .keyboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    width: fit-content;
    max-width: 100%;
    background-color: var(--inverse);
    border:1px solid #333;
    border-radius:6px;
  }

  .keyboard__top {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--inverse-foreground);
    padding: 0.5rem;
  }

  .keyboard__bottom {
    display: flex;
    gap: 1rem;
    align-items: start;
    width: fit-content;
    max-width: 100%;
  }

  .settings {
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
  }

  .keys-wrapper {
    overflow-x: scroll;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 750px) {
    .keys-wrapper {
      justify-content: start;
    }
  }
</style>