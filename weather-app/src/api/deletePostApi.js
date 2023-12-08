import axios from 'axios';

const BASE_URL = 'http://43.200.188.52:8080'; // 실제 API 서버 주소

export const deletePost = async (postId) => {
	const token = localStorage.getItem('access_token');
	try {
		const response = await axios.delete(`${BASE_URL}/api/post/${postId}`, {
			headers: {
				Authorization: ` ${token}`, // 인증 토큰을 헤더에 추가
			},
		});

		return response.data; // axios는 자동으로 응답 본문을 반환합니다.
	} catch (error) {
		if (error.response) {
			// 서버에서 응답을 받았으나 응답 상태 코드가 2xx 범위에 속하지 않음
			console.error('Error response:', error.response);
			throw new Error('Failed to delete post');
		} else if (error.request) {
			// 요청이 이루어졌으나 응답을 받지 못함
			console.error('Error request:', error.request);
			throw new Error('No response received');
		} else {
			// 요청 설정 중에 문제가 발생함
			console.error('Error setting up request:', error.message);
			throw new Error('Error setting up request');
		}
	}
};
