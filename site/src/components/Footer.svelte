<script>
	const handleClick = (e) => {
		MyWindow = window.open('/images', 'MyWindow', 'width=400,height=400');
		return false;
	};
</script>

<footer>
	<p>
		by <a href="https://koundinya.work" target="_blank">koundinya</a>
	</p>
	<p>
		<!-- svelte-ignore a11y-missing-attribute -->
		<a style="cursor:pointer" on:click={handleClick} on:keydown={handleClick}
			><sub>**</sub> images</a
		>
	</p>
</footer>

<style>
	footer p {
		text-align: center;
		font-size: 1em;
	}
</style>
