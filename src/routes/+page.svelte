<script>
	import ChordDemo from '$lib/ChordDemo.svelte';
</script>

<svelte:head>
	<title>Indigo Chord</title>
	<meta name="description" content="Indigo Chord" />
</svelte:head>

<section>
	<ChordDemo/>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
