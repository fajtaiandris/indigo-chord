<script>
  import Piano from './Piano.svelte';
  import { chordName } from './namer'; // your existing TS module

  let notes = [];
  $: name = notes.length ? chordName(notes) : '';
</script>

<p style="font-size:1.25rem; font-weight:600;">{name || 'Select keys'}</p>

<Piano
  startMidi={60}
  octaves={3}
  on:change={(e) => (notes = e.detail.notes)}
/>