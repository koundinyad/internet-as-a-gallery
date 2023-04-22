export async function load({ params, fetch }) {
	const url = 'https://api.are.na/v2/channels/gazing-elsewhere?per=10';
	const getData = async (url) => {
		const response = await fetch(url);
		const data = await response.json();

		return data;
	};

	const data = getData(url);

	return {
		contents: data
	};
}
