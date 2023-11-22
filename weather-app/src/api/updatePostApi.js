const BASE_URL = 'http://43.200.188.52';

export const updatePost = async (id, content) => {
	try {
		const response = await fetch(`${BASE_URL}/posts/${id}`, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ content }),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return await response.json();
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};
