<script lang="ts">
  import Piano from './Piano.svelte';
  import { chordName, getHarmonyType } from './namer';
  import { playMidiSequence } from './playMidiSequence';

  let notes: number[] = [];
  $: name = notes.length ? chordName(notes) : '';
  $: type = getHarmonyType(notes);

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
  <div class="keyboard__display font-pixel">
    <div class="keyboard__display__name">
      {name || 'Select keys'}
    </div>
    <ul class="keyboard__display__legend">
      <li data-state={type === 'note' && "on"}>note</li>
      <li data-state={type === 'interval' && "on"}>interval</li>
      <li data-state={type === 'triad' && "on"}>triad</li>
      <li data-state={type === 'complex' && "on"}>complex</li>
    </ul>
  </div>
  <div class="keyboard__bottom">
    <div class="settings">
      <button>Mute</button>
      <button class="play-button">▶</button>
      <button>⚂</button>
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
    border: 1px solid black;
  }

  .keyboard__display {
    color: lightblue;
    background-color: var(--primary);
    width: 100%;
    max-width: 300px;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .keyboard__display__name {
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
  }

  .keyboard__display__legend {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 0.7rem;
    list-style: none;
    padding: 0.2rem 0.5rem;
    margin: 0;
    color: var(--primary-highlight);
  }

  .keyboard__display__legend li[data-state='on'] {
    color: lightblue;
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

  .play-button {
    color: lawngreen;
    border-color: var(--default);
  }

  @media (max-width: 700px) {
    .keyboard__bottom {
      flex-direction: column;
    }

    .settings {
      flex-direction: row;
    }

    .keys-wrapper {
      justify-content: start;
    }
  }
</style>