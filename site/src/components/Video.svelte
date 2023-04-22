<!-- svelte-ignore a11y-media-has-caption -->

<script>
	let video;

	function handlePlay() {
		if (video.paused) {
			video.loop = true;
			video.play();
		} else {
			video.pause();
		}
	}
</script>

<section>
	<video
		width="80%"
		bind:this={video}
		on:mouseover={handlePlay}
		on:focus={handlePlay}
		on:mouseout={handlePlay}
		on:blur={handlePlay}
	>
		<source src="/trimmed.mov" type="video/mp4" />
		<caption>Firefox Add-on Demo</caption>
	</video>
</section>

<style>
	section {
		display: flex;
		width: 100%;
		justify-content: center;
	}
</style>
