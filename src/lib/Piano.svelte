<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let startMidi = 60; // C4
  export let octaves = 3;

  const WHITE_WIDTH = 34;
  const WHITE_HEIGHT = 160;
  const BLACK_WIDTH = 22;
  const BLACK_HEIGHT = 100;

  const semitoneToWhiteIndex = (s: number) =>
    [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6][s];

  let activeNotes: number[] = [];
  const dispatch = createEventDispatcher();

  // recompute layout when props change
  $: keys = (() => {
    const all = [];
    for (let o = 0; o < octaves; o++) {
      const octaveOffsetWhites = o * 7;
      // whites
      for (const s of [0, 2, 4, 5, 7, 9, 11]) {
        const midi = startMidi + o * 12 + s;
        const wIndex = semitoneToWhiteIndex(s);
        const left = (octaveOffsetWhites + wIndex) * WHITE_WIDTH;
        all.push({
          midi,
          isBlack: false,
          left,
          width: WHITE_WIDTH,
          height: WHITE_HEIGHT,
          zIndex: 1
        });
      }
      // blacks
      for (const s of [1, 3, 6, 8, 10]) {
        const midi = startMidi + o * 12 + s;
        const wIndex = semitoneToWhiteIndex(s);
        const left =
          (octaveOffsetWhites + (wIndex + 1)) * WHITE_WIDTH - BLACK_WIDTH / 2;
        all.push({
          midi,
          isBlack: true,
          left,
          width: BLACK_WIDTH,
          height: BLACK_HEIGHT,
          zIndex: 2
        });
      }
    }
    return all.sort((a, b) => a.zIndex - b.zIndex);
  })();

  $: totalWidth = 7 * octaves * WHITE_WIDTH;

  function toggle(midi: number) {
    if (activeNotes.includes(midi)) {
      activeNotes = activeNotes.filter((n) => n !== midi);
    } else {
      activeNotes = [...activeNotes, midi];
    }
  }

  // notify parent whenever notes change
  $: dispatch('change', { notes: [...activeNotes].sort((a, b) => a - b) });
</script>

<div style="user-select: none;">
  <div
    style="position: relative; width: {totalWidth}px; height: {WHITE_HEIGHT}px;"
  >
    {#each keys as k}
      {#if k.isBlack}
        <div
          role="button"
          aria-pressed={activeNotes.includes(k.midi)}
          title={"MIDI " + k.midi}
          on:click={() => toggle(k.midi)}
          on:mousedown|preventDefault
          style="
            position:absolute;
            left:{k.left}px;
            top:0;
            width:{k.width}px;
            height:{k.height}px;
            box-sizing:border-box;
            cursor:pointer;
            z-index:{k.zIndex};
            border:1px solid #111;
            border-bottom-left-radius:4px;
            border-bottom-right-radius:4px;
            transition:transform 60ms ease, box-shadow 120ms ease;
            background:{activeNotes.includes(k.midi) ? 'var(--primary)' : '#111'};
            box-shadow:{activeNotes.includes(k.midi) ? '0 0 0 2px var(--primary) inset' : 'none'};
          "
        />
      {:else}
        <div
          role="button"
          aria-pressed={activeNotes.includes(k.midi)}
          title={"MIDI " + k.midi}
          on:click={() => toggle(k.midi)}
          on:mousedown|preventDefault
          style="
            position:absolute;
            left:{k.left}px;
            top:0;
            width:{k.width}px;
            height:{k.height}px;
            box-sizing:border-box;
            cursor:pointer;
            z-index:{k.zIndex};
            border:1px solid #333;
            border-bottom-left-radius:4px;
            border-bottom-right-radius:4px;
            transition:transform 60ms ease, box-shadow 120ms ease;
            background:{activeNotes.includes(k.midi) ? 'var(--primary-highlight)' : '#fff'};
            box-shadow:{activeNotes.includes(k.midi) ? '0 0 0 2px var(--primary) inset' : 'inset 0 -2px 0 #ddd'};
          "
        />
      {/if}
    {/each}
  </div>
</div>
