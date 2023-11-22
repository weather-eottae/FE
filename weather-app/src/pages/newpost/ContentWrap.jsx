import React, { useState } from 'react';
import styled from 'styled-components';

const ContentWrap = ({ onContentChange }) => {
	const [content, setContent] = useState(''); // 초기 상태 설정

	const handleContentChange = (event) => {
		setContent(event.target.value); // 입력 값으로 상태 업데이트
		onContentChange(event.target.value);
	};

	return (
		<Container>
			<label htmlFor="contentField"></label>
			<textarea
				id="contentField"
				value={content}
				onChange={handleContentChange}
				maxLength={'500'}
				placeholder=" 내용을 입력하세요."
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

	textarea {
		width: 100%;
		height: 10vh;
		margin: 0 auto;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid #000;
		border-radius: 10px;
		font-family: 'jua', sans-serif;
	}
`;
