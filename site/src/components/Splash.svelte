<script>
	import { draw, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let showLine = false;

	onMount(() => (showLine = true));
</script>

<section>
	<div>
		{#if showLine}
			<p>internet-as-a-gallery<sup>.space</sup></p>

			<svg width="45%" height="6" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					in:draw={{ duration: 4500, easing: quintOut }}
					d="M 10 1 L 600 1 "
					stroke="black"
					stroke-width="3"
				/>
			</svg>
		{/if}
	</div>
</section>

<style>
	section {
		height: 100vh;
	}
	section div {
		/* padding: 10em; */
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	section p {
		font-size: 3em;
	}
	section sup {
		font-size: 0.4em;
		font-style: italic;
		font-weight: 100;
		margin-left: 0.5em;
		margin-bottom: 1em;
	}

	@media (max-width: 768px) {
		section div {
			flex-direction: column;
		}

		section p {
			font-size: 2em;
		}
		section p > sup {
			font-size: 0.4em;
		}
	}
</style>
