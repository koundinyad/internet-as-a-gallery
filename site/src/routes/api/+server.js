export async function GET({ url }) {
	const param = url.searchParams.get('page');

	const u = `https://api.are.na/v2/channels/${param}?per=20`;
	console.log(u);
	const response = await fetch(u);
	const data = await response.json();

	return new Response(JSON.stringify(data));
}
