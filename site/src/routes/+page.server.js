export async function load({ params, fetch }) {
	const slugs = [
		'0-0-2',
		'inspiration-pkg3x0zmngw',
		'a-library-of-gestures',
		'gazing-elsewhere',
		'posters-aoxsu7b9gho',
		'why-haven-t-we-seen-a-photograph-of-the-whole-earth-yet'
	];

	const random = Math.floor(Math.random() * slugs.length);

	const channel = slugs[random];

	const url = `https://api.are.na/v2/channels/${channel}?per=15`;
	const getData = async (url) => {
		const response = await fetch(url);
		const data = await response.json();

		const contents =  data.contents.map(item => {
            if (item.class == "Image") {
                return {
                    url: item.image.display.url,
                    caption: item.description ? item.description : "Unknown artwork",
                }
        }})

        return contents


	};

	const data = getData(url);

	return {
		data
	};
}
