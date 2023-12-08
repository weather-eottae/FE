import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Main from '../../components/main/MainLayout';
import TopWrap from './TopWrap';
import ImageWrap from './ImageWrap';
import ContentWrap from './ContentWrap';
import ButtonWrap from './ButtonWrap';
import Modal from './Modal';
import createPostAPI from '../../api/createPostApi';

const NewPost = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const [content, setContent] = useState('');
	const [files, setFiles] = useState([]); // 이미지 파일들

	const [hashtags, setHashtags] = useState('');
	const [temperature, setTemperature] = useState(''); // 온도를 저장할 상태 변수
	const [location, setLocation] = useState(''); // 위치를 저장할 상태 변수
	const [showAlertModal, setShowAlertModal] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showCancelModal, setShowCancelModal] = useState(false);
	const navigate = useNavigate();

	const getTokenFromLocalStorage = () => {
		return localStorage.getItem('access_token');
	};

	const handleContentChange = (newContent) => {
		setContent(newContent);
	};

	const handleHashtagsChange = (newHashtags) => {
		setHashtags(newHashtags);
	};
	const handleFilesChange = (newFiles) => {
		setFiles(newFiles);
	};

	const handleLocationChange = (newLocation) => {
		setLocation(newLocation); // 위치 상태 업데이트
	};

	const handleTemperatureChange = (newTemperature) => {
		setTemperature(newTemperature);
	};

	const handleSave = () => {
		// 내용과 이미지가 모두 입력되었는지 검사
		if (!content.trim() || files.length === 0) {
			setAlertMessage('내용과 이미지를 모두 입력해주세요.');
			setShowAlertModal(true);
			return;
		}
		setShowModal(true); // 모든 조건이 충족됐을 때만 저장 확인 모달 표시
	};

	const handleCancel = () => {
		setShowCancelModal(true); // 취소 모달 표시
	};

	const handleConfirmCancel = () => {
		navigate('/'); // 메인 페이지로 리디렉션
	};

	const handleConfirmSave = async () => {
		try {
			const safeFiles = files || [];
			const token = getTokenFromLocalStorage();

			await createPostAPI(
				content, // 분리되지 않은 내용 사용
				temperature,
				location,
				safeFiles,
				hashtags,
				token
			);
			setShowModal(false);
			navigate('/feed');
		} catch (error) {
			console.error('Failed to create post:', error);
		}
	};

	const handleCancelSave = () => {
		navigate('/feed');
		setShowModal(false);
	};

	useEffect(() => {
		const token = getTokenFromLocalStorage();
		if (!token) {
			setShowLoginModal(true); // 로그인 모달 표시
		} else {
			setIsAuthenticated(true);
		}
	}, [navigate]);

	const handleConfirmLogin = () => {
		navigate('/login'); // 로그인 페이지로 이동
	};

	if (showLoginModal) {
		return (
			<Modal message="로그인이 필요합니다." onConfirm={handleConfirmLogin} />
		);
	}

	if (!isAuthenticated) {
		return null;
	}

	return (
		<Main>
			<Container>
				<TopWrap
					onLocationUpdate={handleLocationChange}
					onTemperatureChange={handleTemperatureChange}
				/>
				<ImageWrap onFilesChange={handleFilesChange} />
				<ContentWrap
					content={content}
					hashtags={hashtags}
					onContentChange={handleContentChange}
					onHashtagsChange={handleHashtagsChange}
				/>
				<ButtonWrap onSave={handleSave} onCancel={handleCancel} />
				{showModal && (
					<Modal
						message="저장하시겠습니까?"
						onConfirm={handleConfirmSave}
						onCancel={handleCancelSave}
					/>
				)}
				{showAlertModal && (
					<Modal
						message={alertMessage}
						onConfirm={() => setShowAlertModal(false)}
						// 취소 버튼 없이 '확인' 버튼만 표시
					/>
				)}
				{showCancelModal && (
					<Modal
						message="작성을 취소하시겠습니까?"
						onConfirm={handleConfirmCancel}
						onCancel={() => setShowCancelModal(false)}
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
