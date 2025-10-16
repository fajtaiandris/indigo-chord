<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { pitchNameWithOctave } from '$lib/logic/namer';

  export let startMidi: number = 60;
  export let octaves: number = 3;

  const dispatch = createEventDispatcher();
  let activeNotes: number[] = [];

  const semitones = Array.from({ length: 12 }, (_, i) => i);

  function midiNumber(octaveIdx: number, s: number) {
    return startMidi + octaveIdx * 12 + s;
  }

  function toggle(midi: number) {
    if (activeNotes.includes(midi)) {
      activeNotes = activeNotes.filter((n) => n !== midi);
    } else {
      activeNotes = [...activeNotes, midi];
    }
  }

  $: dispatch('change', { notes: [...activeNotes].sort((a, b) => a - b) });
</script>

<div class="keys" style="--octaves:{octaves}">
  <div class="keys__rail">
    {#each Array.from({ length: octaves }) as _, o}
      <div class="keys__octave" aria-label={`Octave ${o}`}>
        {#each semitones as s}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-interactive-supports-focus -->
          <div
            class="keys__key"
            role="button"
            aria-pressed={activeNotes.includes(midiNumber(o, s))}
            data-active={activeNotes.includes(midiNumber(o, s))}
            title={pitchNameWithOctave(midiNumber(o, s))}
            on:click={() => toggle(midiNumber(o, s))}
            on:mousedown|preventDefault
          />
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .keys {
    --octaves: 1; /* will be overridden inline */
    --white-w: 34px;
    --white-h: 160px;
    --black-w: 22px;
    --black-h: 100px;
    position: relative;
    inline-size: calc(var(--white-w) * 7 * var(--octaves));
    user-select: none;
    
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      box-shadow: inset 0 6px 8px var(--black);
      border-top: 2px solid var(--black);
      border-left: 2px solid var(--black);
      border-right: 2px solid var(--black);
      z-index: 2;
      pointer-events: none;
    }
  }

  .keys__rail {
    position: relative;
    inline-size: 100%;
    block-size: var(--white-h);
    display: flex;
  }

  /* One group per octave; each group positions its 12 children with nth-child */
  .keys__octave {
    position: relative;
    inline-size: calc(var(--white-w) * 7);
    block-size: var(--white-h);
  }

  .keys__key {
    position: absolute;
    inset-block-start: 0;
    cursor: pointer;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    transition:
      transform 100ms ease,
      box-shadow 120ms ease,
      border-color 500ms ease;
    outline: none;
  }

  .keys__key {
    z-index: 1;
    inline-size: var(--white-w);
    block-size: var(--white-h);
    background: var(--keys-white);
    border: 1px solid var(--keys-border-white);
  }

  .keys__octave > .keys__key:nth-child(2),
  .keys__octave > .keys__key:nth-child(4),
  .keys__octave > .keys__key:nth-child(7),
  .keys__octave > .keys__key:nth-child(9),
  .keys__octave > .keys__key:nth-child(11) {
    z-index: 2;
    inline-size: var(--black-w);
    block-size: var(--black-h);
    background: var(--keys-black);
    border: 1px solid var(--keys-border-black);
  }

  /* Left offsets per semitone (whites use white-index mapping: [0,0,1,1,2,3,3,4,4,5,5,6]) */
  /* Whites */
  .keys__octave > .keys__key:nth-child(1) {
    inset-inline-start: calc(0 * var(--white-w));
  } /* s=0  */
  .keys__octave > .keys__key:nth-child(3) {
    inset-inline-start: calc(1 * var(--white-w));
  } /* s=2  */
  .keys__octave > .keys__key:nth-child(5) {
    inset-inline-start: calc(2 * var(--white-w));
  } /* s=4  */
  .keys__octave > .keys__key:nth-child(6) {
    inset-inline-start: calc(3 * var(--white-w));
  } /* s=5  */
  .keys__octave > .keys__key:nth-child(8) {
    inset-inline-start: calc(4 * var(--white-w));
  } /* s=7  */
  .keys__octave > .keys__key:nth-child(10) {
    inset-inline-start: calc(5 * var(--white-w));
  } /* s=9  */
  .keys__octave > .keys__key:nth-child(12) {
    inset-inline-start: calc(6 * var(--white-w));
  } /* s=11 */

  /* Blacks centered between adjacent whites:
     s=1 above between white indices 0 and 1, etc. */
  .keys__octave > .keys__key:nth-child(2) {
    inset-inline-start: calc(1 * var(--white-w) - var(--black-w) / 2);
  } /* s=1  */
  .keys__octave > .keys__key:nth-child(4) {
    inset-inline-start: calc(2 * var(--white-w) - var(--black-w) / 2);
  } /* s=3  */
  .keys__octave > .keys__key:nth-child(7) {
    inset-inline-start: calc(4 * var(--white-w) - var(--black-w) / 2);
  } /* s=6  */
  .keys__octave > .keys__key:nth-child(9) {
    inset-inline-start: calc(5 * var(--white-w) - var(--black-w) / 2);
  } /* s=8  */
  .keys__octave > .keys__key:nth-child(11) {
    inset-inline-start: calc(6 * var(--white-w) - var(--black-w) / 2);
  } /* s=10 */

  .keys__key[data-active='true'] {
    /* white active */
    background: var(--keys-active-white);
    box-shadow: 0 0 0 2px var(--keys-active-white) inset;
  }
  /* more specific for blacks so they keep dark tone but show ring */
  .keys__octave > .keys__key:nth-child(2)[data-active='true'],
  .keys__octave > .keys__key:nth-child(4)[data-active='true'],
  .keys__octave > .keys__key:nth-child(7)[data-active='true'],
  .keys__octave > .keys__key:nth-child(9)[data-active='true'],
  .keys__octave > .keys__key:nth-child(11)[data-active='true'] {
    background: var(--keys-active-black);
    box-shadow: 0 0 0 2px var(--keys-active-black) inset;
  }

  .keys__key:hover {
    transform: translateY(-3px);
  }

  .keys__key:active {
    border-color: var(--primary);
  }

  .keys__rail .keys__octave {
    display: inline-block;
  }
</style>
