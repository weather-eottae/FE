import React from 'react';
import styled from 'styled-components';

const ContentWrap = ({
	content,
	hashtags,
	onContentChange,
	onHashtagsChange,
}) => {
	const handleContentChange = (event) => {
		// 상위 컴포넌트에 내용 전달
		onContentChange(event.target.value);
	};

	const handleHashtagsChange = (event) => {
		// 상위 컴포넌트에 해시태그 전달
		onHashtagsChange(event.target.value);
	};

	return (
		<Container>
			<ContentTextarea
				id="contentField"
				value={content}
				onChange={handleContentChange}
				maxLength={'300'}
				placeholder="내용을 입력하세요."
			/>
			<label htmlFor="hashtagsField">해시태그</label>
			<HashtagTextarea
				id="hashtagsField"
				value={hashtags}
				onChange={handleHashtagsChange}
				maxLength={'200'}
				placeholder="#해시태그를 입력하세요."
			/>
		</Container>
	);
};

export default ContentWrap;

const Container = styled.div`
	max-width: 600px;
	margin: 10px auto;
	padding-bottom: 20px;
	background-color: #fff;
	border-bottom: 2px solid #000;
`;

const ContentTextarea = styled.textarea`
	width: 100%;
	height: 7vh;
	margin: 5px auto 10px;
	padding: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2px solid #000;
	border-radius: 10px;
	font-family: 'jua', sans-serif;
`;

const HashtagTextarea = styled.textarea`
	width: 100%;
	height: 3vh;
	margin: 5px auto;
	padding: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2px solid #000;
	border-radius: 10px;
	font-family: 'jua', sans-serif;
`;
