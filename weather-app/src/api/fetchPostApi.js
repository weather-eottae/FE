import axios from 'axios';

const BASE_URL = 'http://43.200.188.52';

export const fetchPost = async (id) => {
	try {
		const response = await axios.get(`${BASE_URL}/posts/${id}`);
		return response.data; // 게시물 데이터 반환
	} catch (error) {
		console.error('Error fetching post:', error);
		throw error; // 오류를 호출자에게 전파
	}
};
