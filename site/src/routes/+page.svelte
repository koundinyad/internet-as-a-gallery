<script>
	import '../globals.css';

	import Gallery from '../components/Gallery.svelte';
	import Splash from '../components/Splash.svelte';
	import About from '../components/About.svelte';
	import Footer from '../components/Footer.svelte';
	import { fade } from 'svelte/transition';

	export let data;

	let contents = data.data;

	let proceed = false;
</script>

<svelte:head>
	<title>internet-as-a-gallery</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="gazing elsewhere" />
	<meta name="author" content="koundinya dhulipalla" />
	<link rel="icon" type="image/png" href="/favicon.png" />
</svelte:head>

{#if !proceed}
	<section on:click={() => (proceed = true)} on:keypress={() => (proceed = true)} class="splash">
		<Splash on:click={() => (proceed = true)} />
	</section>
{:else}
	<div class="gallery" in:fade={{ duration: 4500 }}>
		<Gallery {contents} />
	</div>

	<About />

	<Footer />
{/if}
