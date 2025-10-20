<script>
  import Keyboard from '$lib/components/Keyboard.svelte';
</script>

<svelte:head>
  <title>Indigo Chord</title>
  <meta name="description" content="Indigo Chord" />
</svelte:head>

<section class="stack">
    <div class="tutorial stack">
        <h1>Hey, this is the tutorial</h1>
        <p>This interactive guide is meant to walk you through what chords are and how you can name them</p>
        <p>Currently, though, it's under construction.</p>
        <div class="tutorial__buttons">
          <a href="./"><button class="button--flat">back</button></a>
        </div>
    </div>
    <Keyboard />
</section>

<style>
    .tutorial {
        view-transition-name: tutorial;
        background-color: var(--contrast);
        color: var(--contrast-foreground);
        padding: 1rem;
        border-radius: 10px;
        border: 1px solid var(--almost-black);
    }

    .tutorial__buttons {
        display: flex;
        justify-content: space-between;
    }
</style>