<script>
	import { fade } from 'svelte/transition';
	import { draggable } from '../utils';

	export let images;

	let innerWidth, innerHeight;
	let containers = [];
	let captions = [];
	let imgs = [];

	let z_counter = 0;

	const handle_z = (i) => {
		z_counter++;
		// console.log(i);

		imgs[i].style.boxShadow = 'none';
		containers[i].style.zIndex = z_counter;
		containers[i].style.animation = 'none';
		imgs[i].style.cursor = 'grabbing';
		imgs[i].style.transform = 'scale(1.1)';
		imgs[i].style.transition = 'all 0.2s';
		captions[i].style.fontSize = '1.3em';
		captions[i].style.marginTop = '1em';
		captions[i].style.transition = 'all 0.2s';
	};
	const handle_z_mouseup = (i) => {
		imgs[i].style.cursor = 'grab';
		containers[i].style.animation = 'float 5s infinite';
		imgs[i].style.transform = 'scale(1)';
		imgs[i].style.transition = 'all 0.2s';
		captions[i].style.color = '#2111fd';
		captions[i].style.fontSize = '1em';
		captions[i].style.marginTop = '5px';
		captions[i].style.transition = 'all 0.2s';
		captions[i].style.textAlign = 'left';
	};
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if images}
	<div>
		{#each images as item, i}
			{#if item.url}
				<div
					use:draggable
					on:mousedown={() => handle_z(i)}
					on:mouseup={() => handle_z_mouseup(i)}
					transition:fade={{ duration: 1000 }}
					bind:this={containers[i]}
					class="container"
					style={`animation: float 3s infinite; animation-delay: ${i * 100}ms; left: ${
						(Math.random() * innerWidth) / 1.2
					}px; top: ${Math.random() * innerHeight * 1.2}px`}
				>
					<img bind:this={imgs[i]} draggable="false" src={item.url} alt={item.caption} />
					<p bind:this={captions[i]}>{item.caption}</p>
				</div>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.container {
		position: absolute;
		max-width: 250px;
		display: flex;
		flex-direction: column;
		gap: 0;
		z-index: 0;
		background-color: #fff;
		box-shadow: #2111fd 10px 0px 100px 10px;
		padding: 1em;
	}
	.container img {
		cursor: grab;

		width: 250px;
		height: 250px;
		object-fit: cover;
	}

	.container p {
		margin-top: 5px;
		font-size: 1em;
		max-width: fit-content;
	}
</style>
