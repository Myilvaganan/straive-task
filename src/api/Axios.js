import axios from 'axios';

export async function getData(url, title) {
	var doi = '';

	const BASE_URL = 'https://api.crossref.org/works?sort=score&order=desc&rows=20&query.bibliographic=';
	try {
		const response = await axios.get(`${BASE_URL}${url}`);

		const items = response.data.message.items;

		items.forEach((item) => {
			if (item.title && item.title[0].toLowerCase() === title.toLowerCase()) {
				doi = doi + item.DOI;
			}
		});

		return doi;
	} catch (error) {
		return error;
	}
}
