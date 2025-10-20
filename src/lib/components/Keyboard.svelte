<script lang="ts">
  import Keys from './Keys.svelte';
  import { chordName, getHarmonyType } from '$lib/logic/namer';
  import { playMidi } from '$lib/logic/audio';
  import Display from './Display.svelte';
  import ConfigButtons from './ConfigButtons.svelte';

  export let showTutorialTrigger: boolean = false;
  let notes: number[] = [];
  let isMuted = false;
  let current: ReturnType<typeof playMidi> | null = null;

  function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
      current?.stop();
      current = null;
    } else if (notes.length) {
      current = playMidi(notes, { instrument: 'organ' });
    }
  }

  function play() {
    if (isMuted) {
      isMuted = false;
    }
    current?.stop();
    current = playMidi(notes, { instrument: 'organ'});
  }

  $: name = notes.length ? chordName(notes) : '';
  $: type = getHarmonyType(notes);

  $: if (notes.length && !isMuted) {
    current?.stop();
    current = playMidi(notes, { instrument: 'organ'});
  }
</script>

<div class="keyboard">
  <div class="keyboard__top">
    {#if showTutorialTrigger}
      <a href="./tutorial" class="tutorial-button"><button class="button--white">teach me</button></a>
    {/if}
    <Display {name} {type} />
  </div>
  <div class="keyboard__bottom">
    <ConfigButtons {isMuted} {toggleMute} {play} />
    <div class="keys-wrapper">
      <Keys startMidi={36} octaves={3} on:change={(e) => (notes = e.detail.notes)} />
    </div>
  </div>
</div>

<style>
  .keyboard {
    view-transition-name: keyboard;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    width: fit-content;
    max-width: 100%;
    background-color: var(--almost-black);
    border: 6px outset black;
    border-radius: 4px;
  }

  .keyboard__top {
    display: grid;
    grid-template-areas: "button display";
    grid-template-columns: 1fr 2fr;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    gap: 1rem;
    align-items: top;
    width: 100%;
    max-width: 100%;
    overflow: scroll;
  }

  @media (max-width: 700px) {
     
  }

  .keyboard__bottom {
    display: flex;
    gap: 1rem;
    align-items: start;
    width: fit-content;
    max-width: 100%;
  }

  .keys-wrapper {
    overflow-x: scroll;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .tutorial-button {
    grid-area: button;
    width: fit-content;
  }

  @media (max-width: 700px) {
    .keyboard__top{
      grid-template-areas: "display button";
      grid-template-columns: auto fit-content(20px);
    }

    .keyboard__bottom {
      flex-direction: column;
    }

    .keys-wrapper {
      justify-content: start;
    }
  }
</style>
