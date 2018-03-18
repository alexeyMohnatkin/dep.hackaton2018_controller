import fetch from 'node-fetch';

export default async (url, body) => {
	try {
		console.log(body);
		const res = await fetch(url, {
			headers: {
				'Content-type': 'application/json',
			},
			method: 'post',
			body: JSON.stringify(body),
		});
		console.log(res.status);
		console.log(`server says: ${await res.text()}`);
	} catch (error) {
		console.error(error);
	}
};

