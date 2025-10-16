<script>
  import { webVitals } from '$lib/vitals';
  import { browser } from '$app/env';
  import { page } from '$app/stores';
  import '../styles/app.css';

  let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

  $: if (browser && analyticsId) {
    webVitals({
      path: $page.url.pathname,
      params: $page.params,
      analyticsId
    });
  }
</script>

<header>
  <span class="brand | font-pixel">indigo_chord</span>
  <a href="https://github.com/fajtaiandris/indigo-chord"><button class="button--white">github</button></a>
</header>
<main>
  <slot />
</main>

<style>
  header {
    background-color: var(--contrast);
    border-bottom: 1px solid var(--default-foreground);
    color: var(--default-foreground);
    padding: 0.75rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .brand {
    font-weight: bold;
    font-size: 1.25rem;
  }
</style>
