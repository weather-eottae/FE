// import axios from 'axios';

// const BASE_URL = 'http://43.200.188.52';

// const createPost = async ({
// 	content,
// 	accountNonExpired,
// 	accountNonLocked,
// 	authorities,
// 	credentialsNonExpired,
// 	enabled,
// 	hashtags,
// 	location,
// 	mediaFiles,
// 	password,
// 	temperature,
// 	username,
// }) => {
// 	try {
// 		const response = await axios.post(
// 			`${BASE_URL}/api/post`,
// 			{
// 				content,
// 				accountNonExpired,
// 				accountNonLocked,
// 				authorities,
// 				credentialsNonExpired,
// 				enabled,
// 				hashtags,
// 				location,
// 				mediaFiles,
// 				password,
// 				temperature,
// 				username,
// 			},
// 			{
// 				headers: {
// 					Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDA1NzY0OTEsImV4cCI6MTcwMDU4MDA5MSwic3ViIjoidGVzdEBlbWFpbC5jb20iLCJpZCI6NX0.kaUn6n0lwNDANmZXXDVSoKbnnnnAGfHDlt17TCJIWbQ`,
// 				},
// 			}
// 		);
// 		console.log('Post created:', response.data);
// 		// 성공적으로 게시물을 생성한 경우 실행할 코드를 여기에 추가
// 		return response.data;
// 	} catch (error) {
// 		console.error('Failed to create post:', error);
// 		// 오류 처리
// 		throw new Error(
// 			error.response ? error.response.data : 'Failed to create post'
// 		);
// 	}
// };

// export default createPost;
