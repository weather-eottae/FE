import axios from 'axios';

const BASE_URL = 'http://43.200.188.52:8080';

const updatePost = async (
	content,
	temperature,
	location,
	postId,
	mediaFiles,
	hashtags,
	token
) => {
	try {
		const token = localStorage.getItem('access_token');
		const formData = new FormData();

		// 기본적인 필드를 FormData에 추가
		formData.append('content', content);
		formData.append('location', location);
		formData.append('temperature', temperature);

		// 해시태그 처리

		if (hashtags && typeof hashtags === 'string') {
			// 해시태그를 정규 표현식을 사용하여 추출
			const hashtagsArray = hashtags.match(/#[\p{L}]+/gu);
			if (hashtagsArray) {
				// 각 해시태그에서 '#'을 제거하고 공백으로 구분된 하나의 문자열로 합침
				const hashtagsStr = hashtagsArray.map((tag) => tag.slice(1));
				formData.append('hashtags', hashtagsStr);
			}
		}

		mediaFiles.forEach((file) => {
			if (file instanceof File) {
				// 새로운 이미지 파일이라고 가정
				formData.append('newPostImages', file);
			} else if (typeof file === 'string') {
				// 기존 이미지 URL이라고 가정
				formData.append('originalImages', file);
			}
		});

		const response = await axios.put(
			`${BASE_URL}/api/post/${postId}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: ` ${token}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error('Error in updatePost:', error);
		throw error;
	}
};

export default updatePost;
