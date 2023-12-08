import axios from 'axios';

const BASE_URL = 'http://43.200.188.52:8080';

const createPostAPI = async (
	content,
	temperature, // 기본값 설정
	location, // 기본값 설정
	mediaFiles,
	hashtags,
	access_token
) => {
	const formData = new FormData();
	formData.append('content', content);

	// 온도와 위치 데이터가 제공되었을 때만 formData에 추가
	if (temperature) formData.append('temperature', temperature);
	if (location) formData.append('location', location);

	// mediaFiles 배열의 각 파일을 formData에 추가
	if (Array.isArray(mediaFiles)) {
		mediaFiles.forEach((file) => {
			if (file && file instanceof File) {
				formData.append('mediaFiles', file);
			}
		});
	}

	if (hashtags && typeof hashtags === 'string') {
		// 해시태그를 정규 표현식을 사용하여 추출
		const hashtagsArray = hashtags.match(/#[\p{L}]+/gu);
		if (hashtagsArray) {
			// 각 해시태그에서 '#'을 제거하고 공백으로 구분된 하나의 문자열로 합침
			const hashtagsStr = hashtagsArray.map((tag) => tag.slice(1));
			formData.append('hashtags', hashtagsStr);
		}
	}

	try {
		const response = await axios.post(`${BASE_URL}/api/post`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: access_token,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error in createPostAPI:', error);
		throw error;
	}
};

export default createPostAPI;
