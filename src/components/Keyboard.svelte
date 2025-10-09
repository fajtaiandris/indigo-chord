<script lang="ts">
  import Keys from './Keys.svelte';
  import { chordName, getHarmonyType } from '../lib/namer';
  import { playMidiSequence } from '../lib/playMidiSequence';
  import Display from './Display.svelte';
  import { isPlaying } from '../lib/store';

  let notes: number[] = [];
  let isMuted = false;
  let current: ReturnType<typeof playMidiSequence> | null = null;

  function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
      current?.stop();
      current = null;
    } else if (notes.length) {
      current = playMidiSequence(notes);
    }
  }

  function play() {
    if (isMuted) {
      isMuted = false;
    }
    current?.stop();
    current = playMidiSequence(notes);
  }

  $: name = notes.length ? chordName(notes) : '';
  $: type = getHarmonyType(notes);

  $: if (notes.length && !isMuted) {
    current?.stop();
    current = playMidiSequence(notes);
  }

</script>

<div class="keyboard">
  <Display {name} {type} />
  <div class="keyboard__bottom">
    <div class="settings">
      <button on:click={toggleMute} data-state={isMuted && "on"}>Mute</button>
      <button on:click={play} data-state={$isPlaying && "playing"} class="play-button | color-neon-green">▶</button>
    </div>
    <div class="keys-wrapper">
      <Keys
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
    border: 6px outset black;
    border-radius: 4px;
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

  .play-button[data-state="playing"] {
    animation: pulse 0.3s infinite;
  }

  @keyframes pulse {
    0% { color: var(--inverse); }
    50% { color: var(--neon-green); }
    100% { color: var(--inverse); }
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