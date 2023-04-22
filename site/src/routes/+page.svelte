<script>
	import '../globals.css';

	import { swr, clear } from '@svelte-drama/swr';

	import Gallery from '../components/Gallery.svelte';
	import Splash from '../components/Splash.svelte';
	import About from '../components/About.svelte';
	import Footer from '../components/Footer.svelte';
	import { fade } from 'svelte/transition';

	export let data;

	// let key = 'gazing-elsewhere';
	let choice;

	// let url = `https://api.are.na/v2/channels/${choice}?per=10`;
	// const options = {
	// 	fetcher: (url) => fetch(url).then((r) => r.json())
	// };
	// const { data, error, refresh, update } = swr(url, options); // or "swr(key, options.fetcher)"

	// import Video from '../components/Video.svelte';

	let proceed = false;

	async function handleChange(e) {}
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
		<Splash content="svg" on:click={() => (proceed = true)} />
	</section>
{:else}
	<section class="gallery" in:fade={{ duration: 4500 }}>
		<Gallery contents={data.contents.contents} />
	</section>

	<About />
	<!-- <Video /> -->
	<div class="form">
		<!-- Create select box -->
		<select name="channel" id="channel" on:change={handleChange} bind:value={choice}>
			<option value="gazing-elsewhere">Gazing Elsewhere</option>
			<option value="garden-garden-garden">Gazing Elsewhere 2</option>
			<option value="a-library-of-gestures">Gazing Elsewhere 3</option>
			<option value="hands-hold-the-world">Gazing Elsewhere 4</option>
		</select>
	</div>
	<Footer />
{/if}
