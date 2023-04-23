<section>
	<div>
		<h1>internet-as-a-gallery<sup>.space</sup></h1>
	</div>
	<aside>
		<p>
			internet-as-a-gallery is an exploration of alternate ways to browse the internet.

			<br />
			What does an alternate internet full of images look like and how do we navigate it? <br />
			The project seeks to explore this and reimagine webpages as gallery spaces.
			<br /><br />

			internet-as-a-gallery is &nbsp
			<a
				href="https://addons.mozilla.org/en-GB/firefox/addon/internet-as-a-gallery/"
				target="_blank"
			>
				available as a Firefox Add-on</a
			>
		</p>
	</aside>
</section>

<style>
	section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: end;
		height: 70%;
		padding: 4em;
		gap: 10em;
	}
	section h1 {
		font-size: 3em;
		font-weight: normal;
		text-align: right;
	}
	section h1 > sup {
		font-size: 0.5em;
		font-style: italic;
		margin-left: 0.5em;
		margin-bottom: 1em;
	}
	@media (max-width: 768px) {
		section {
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 0;
			padding: 1em;
		}
		section h1 {
			font-size: 2em;
			text-align: left;
		}
		section p {
			font-size: 1.2em;
		}
	}
</style>
