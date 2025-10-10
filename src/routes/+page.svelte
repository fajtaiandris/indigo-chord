<script>
  import Keyboard from '$lib/components/Keyboard.svelte';
</script>

<svelte:head>
  <title>Indigo Chord</title>
  <meta name="description" content="Indigo Chord" />
</svelte:head>

<section>
  <aside role="note" data-variant="warning">
    This project is under developmnet. Expect bugs and missing features.
  </aside>
  <aside role="note" class="visible-on-mobile-portrait">
    Rotate your device to landscape mode for a better experience.
  </aside>
  <Keyboard />
</section>
