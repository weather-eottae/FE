import axios from 'axios';

const BASE_URL = 'http://43.200.188.52:8080';

const fetchPost = async (postId) => {
	try {
		// localStorage에서 토큰을 가져옵니다.
		const token = localStorage.getItem('access_token');

		// 게시물을 불러오기 위한 HTTP GET 요청을 보냅니다.
		const response = await axios.get(`${BASE_URL}/api/post/${postId}`, {
			headers: {
				Authorization: ` ${token}`,
			},
		});

		// 요청이 성공하면 서버에서 반환한 데이터를 반환합니다.
		const postData = response.data;
		const { temperature, location, date } = postData;
		// 이미지 URL을 가져옵니다.
		const imageUrls = postData.mediaUrls || [];

		// 이미지를 표시하려면 <img> 엘리먼트를 사용하면 됩니다.
		return {
			...postData,
			temperature,
			location,
			date,
			imageUrls,
		};
	} catch (error) {
		console.error('Error in fetchPost:', error);
		throw error;
	}
};

export default fetchPost;
