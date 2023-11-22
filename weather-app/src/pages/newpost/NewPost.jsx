import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../../components/main/MainLayout';
import styled from 'styled-components';
import TopWrap from './TopWrap';
import ImageWrap from './ImageWrap';
import ContentWrap from './ContentWrap';
import ButtonWrap from './ButtonWrap';
import Modal from './Modal';
import axios from 'axios';

const BASE_URL = 'http://43.200.188.52';

const NewPost = () => {
	const [content, setContent] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const navigate = useNavigate();

	// 로컬 스토리지에서 토큰을 가져오는 함수
	const getTokenFromLocalStorage = () => {
		return localStorage.getItem('token');
	};

	const handleContentChange = (newContent) => {
		setContent(newContent);
		setIsEditing(true);
	};

	const handleSave = () => {
		setShowModal(true);
	};

	const createPost = async () => {
		try {
			// 로컬 스토리지에서 토큰을 가져옴
			const token = getTokenFromLocalStorage();

			// 아래에 필요한 변수들을 선언하고 값을 지정해주세요.
			const accountNonExpired = '';
			const accountNonLocked = '';
			const authorities = '';
			const credentialsNonExpired = '';
			const enabled = true;
			const hashtags = ''; // 해시태그
			const location = ''; // 위치 정보
			const mediaFiles = []; // 미디어 파일 목록
			const password = ''; // 비밀번호
			const temperature = ''; // 온도
			const username = ''; // 사용자명

			await axios.post(
				`${BASE_URL}/api/post`,
				{
					content,
					accountNonExpired,
					accountNonLocked,
					authorities,
					credentialsNonExpired,
					enabled,
					hashtags,
					location,
					mediaFiles,
					password,
					temperature,
					username,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			navigate('/feed');
		} catch (error) {
			console.error('Failed to save post:', error);
		}
	};

	const handleConfirmSave = () => {
		// createPost 함수를 호출하고 토큰을 전달
		createPost();
	};

	const handleCancelSave = () => {
		setShowModal(false);
	};

	const handleCancelDelete = () => {
		setShowDeleteModal(false);
	};

	useEffect(() => {
		// 컴포넌트가 마운트될 때 한 번만 실행
		// 토큰을 로컬 스토리지에 저장
		localStorage.setItem(
			'token',
			'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDA1NzY0OTEsImV4cCI6MTcwMDU4MDA5MSwic3ViIjoidGVzdEBlbWFpbC5jb20iLCJpZCI6NX0.kaUn6n0lwNDANmZXXDVSoKbnnnnAGfHDlt17TCJIWbQ'
		);

		createPost(); // 컴포넌트가 마운트될 때 createPost 함수 호출
	}, []);

	return (
		<Main>
			<Container>
				<TopWrap />
				<ImageWrap />
				<ContentWrap content={content} onContentChange={handleContentChange} />
				<ButtonWrap onSave={handleSave} isEditing={isEditing} />
				{showModal && (
					<Modal
						message="저장하시겠습니까?"
						onConfirm={handleConfirmSave}
						onCancel={handleCancelSave}
					/>
				)}
				{showDeleteModal && (
					<Modal
						message="정말로 삭제하시겠습니까?"
						onCancel={handleCancelDelete}
					/>
				)}
			</Container>
		</Main>
	);
};

export default NewPost;

const Container = styled.div`
	width: 100%;
	height: 100%;
	max-width: 700px;
	margin: 30px auto;
	padding: 30px 0;
	background: #fff;
	border-radius: 10px;
	box-shadow: 2px 4px 10px 0 #dcdbdb;
`;
