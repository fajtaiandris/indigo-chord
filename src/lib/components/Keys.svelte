<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let startMidi: number = 60;
  export let octaves: number = 3;

  const dispatch = createEventDispatcher();
  let activeNotes: number[] = [];

  const semitones = Array.from({ length: 12 }, (_, i) => i);

  function midiFor(octaveIdx: number, s: number) {
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

<div class="keys u-unselectable" style="--octaves:{octaves}">
  <div class="keys__rail c-stack" style="--stack-gap: 0;">
    {#each Array.from({ length: octaves }) as _, o}
      <div class="keys__octave" aria-label={`Octave ${o}`}>
        {#each semitones as s}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-interactive-supports-focus -->
          <div
            class="keys__key"
            role="button"
            aria-pressed={activeNotes.includes(midiFor(o, s))}
            data-active={activeNotes.includes(midiFor(o, s))}
            title={'MIDI ' + midiFor(o, s)}
            on:click={() => toggle(midiFor(o, s))}
            on:mousedown|preventDefault
          />
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .c-stack {
    display: flex;
    gap: var(--stack-gap, 0);
  }

  .u-unselectable {
    user-select: none;
  }

  .keys {
    --octaves: 1; /* will be overridden inline */
    position: relative;
    inline-size: calc(var(--white-w) * 7 * var(--octaves));
  }

  .keys__rail {
    position: relative;
    inline-size: 100%;
    block-size: var(--white-h);
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
    box-sizing: border-box;
    cursor: pointer;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    transition:
      transform 60ms ease,
      box-shadow 120ms ease;
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

  .keys__key:active {
    transform: translateY(1px);
  }

  .keys__rail .keys__octave {
    display: inline-block;
  }
</style>
