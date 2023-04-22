export async function load({ params, fetch }) {
	const slugs = [
		'0-0-2',
		'inspiration-pkg3x0zmngw',
		'body-ody-ody',
		'a-library-of-gestures',
		'gazing-elsewhere',
		'human-body-gestures',
		'posters-aoxsu7b9gho',
		'god-i-m-sorry-i-m-dizzy-after-all-the-sex-i-had',
		'1-bit-animations'
	];

	const random = Math.floor(Math.random() * slugs.length);

	const channel = slugs[random];

	const url = `https://api.are.na/v2/channels/${channel}?per=18`;
	const getData = async (url) => {
		const response = await fetch(url);
		const data = await response.json();

		return data.contents;
	};

	const data = getData(url);

	return {
		data
	};
}
