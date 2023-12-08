import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ButtonWrap from '../newpost/ButtonWrap';
import Modal from '../newpost/Modal';
import fetchPost from '../../api/fetchPostApi';
import updatePost from '../../api/updatePostApi';
import { deletePost } from '../../api/deletePostApi';

import ImageBox from './ImageBox';
import TopBox from './TopBox';

const MAX_FILES = 3;

const EditPost = () => {
	const { postId } = useParams();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
	const [isDelete, setIsDelete] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [date, setDate] = useState('');
	const [content, setContent] = useState('');
	const [temperature, setTemperature] = useState('');
	const [location, setLocation] = useState('');
	const [mediaFiles, setMediaFiles] = useState([]); // 통합된 상태
	const [hashtags, setHashtags] = useState('');

	useEffect(() => {
		const loadPost = async () => {
			try {
				const postData = await fetchPost(postId);
				setContent(postData.content);
				const formattedHashtags = postData.hashtagNames
					.map((tag, index) => (index === 0 ? `#${tag}` : tag))
					.join('#');
				setHashtags(formattedHashtags);
				setTemperature(postData.temperature || '');
				setLocation(postData.location || '');
				setDate(postData.date || ''); // 날짜 설정
				setMediaFiles(postData.mediaUrls || []);
			} catch (error) {
				console.error('Failed to fetch post:', error);
			} finally {
				setIsLoading(false); // 로딩 완료
			}
		};
		loadPost();
	}, [postId]);

	const getTokenFromLocalStorage = () => {
		return localStorage.getItem('access_token');
	};

	const handleSaveDelete = async (isDelete) => {
		try {
			if (isDelete) {
				// 게시물 삭제
				await deletePost(postId);
				navigate('/user');
			} else {
				// 게시물 업데이트
				const token = getTokenFromLocalStorage();
				await updatePost(
					content,
					temperature,
					location,
					postId,
					mediaFiles,
					hashtags,
					date,
					token
				);
			}
			// 처리 완료 후 피드 페이지로 이동
			navigate('/user');
		} catch (error) {
			console.error(`Failed to ${isDelete ? 'delete' : 'update'} post:`, error);
		} finally {
			// 모달 닫기
			setShowModal(false);
		}
	};

	const handleModalOpen = (deleteMode) => {
		setIsDelete(deleteMode);
		setShowModal(true);
	};

	const handleContentChange = (e) => {
		setContent(e.target.value);
	};

	const handleHashtagsChange = (e) => {
		let inputHashtags = e.target.value;

		// 첫 번째 문자가 '#'이 아니라면 '#'을 앞에 추가
		if (inputHashtags && inputHashtags.charAt(0) !== '#') {
			inputHashtags = '#' + inputHashtags;
		}

		setHashtags(inputHashtags);
	};

	const handleFileChange = (event) => {
		setMediaFiles([...event.target.files]);
	};

	const handleCancel = () => {
		// Redirect the user to the desired route, e.g., '/feed'
		navigate('/feed');
	};

	if (isLoading) {
		return <p>Loading...</p>; // 로딩 중 표시
	}

	return (
		<Container>
			<TopBox
				temperature={temperature} // 초기 온도값 전달
				location={location}
				date={date}
			/>
			<ImageBox
				onChange={handleFileChange}
				mediaFiles={mediaFiles}
				setMediaFiles={setMediaFiles}
				MAX_FILES={MAX_FILES}
			/>
			<ContentWrap>
				<label htmlFor="contentField">내용</label>
				<ContentTextarea
					id="contentField"
					type="text"
					value={content}
					onChange={handleContentChange}
					maxLength={'300'}
					placeholder=" 내용을 입력하세요."
				/>
				<label htmlFor="hashtagsField">해시태그</label>
				<HashtagTextarea
					id="hashtagsField"
					type="text"
					value={hashtags}
					onChange={handleHashtagsChange}
					maxLength={'200'}
					placeholder=" #해시태그를 입력하세요."
				/>
			</ContentWrap>
			<ButtonWrap
				onSave={() => handleModalOpen(false)} // 수정을 저장하기 위한 모달
				onDelete={() => handleModalOpen(true)} // 삭제하기 위한 모달
				onCancel={handleCancel}
				isEditing={true} // 이 부분이 중요합니다
			/>
			{showModal && (
				<Modal
					message={isDelete ? '삭제하시겠습니까?' : '수정을 저장하시겠습니까?'}
					onConfirm={() => handleSaveDelete(isDelete)}
					onCancel={() => setShowModal(false)}
				/>
			)}
		</Container>
	);
};

export default EditPost;

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

const ContentWrap = styled.div`
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
