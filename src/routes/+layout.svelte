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
    })
  }
</script>

<header>
  <span class="brand | font-pixel">indigo_chord</span>
  <a href="https://github.com/fajtaiandris/indigo-chord"><button>Github</button></a>
</header>
<main>
	<slot />
</main>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}
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
