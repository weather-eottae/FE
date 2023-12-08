import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const ImageBox = ({ mediaFiles, setMediaFiles, MAX_FILES }) => {
	const [files, setFiles] = useState([]);
	const [currentSlide, setCurrentSlide] = useState(0);

	const handleFileAddition = (event) => {
		if (event.target.files) {
			const newFiles = Array.from(event.target.files);
			setMediaFiles(
				[...mediaFiles, ...newFiles].slice(0, MAX_FILES - files.length)
			);
		}
	};

	const handleFileDeletion = (index) => {
		const updatedFiles = mediaFiles.filter(
			(_, fileIndex) => fileIndex !== index
		);
		setMediaFiles(updatedFiles);
		setCurrentSlide(0); // Reset to the first slide after deletion
	};

	const handleFileChange = (event) => {
		setMediaFiles([...event.target.files]);
	};

	const createFileUrl = (file) => {
		if (file instanceof File) {
			try {
				return URL.createObjectURL(file);
			} catch (error) {
				console.error('Error creating object URL:', error);
				return '';
			}
		} else {
			return file;
		}
	};

	const isVideoFile = (file) => {
		return file && file.type && file.type.split('/')[0] === 'video';
	};

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % mediaFiles.length);
	};

	const prevSlide = () => {
		setCurrentSlide(
			(prev) => (prev - 1 + mediaFiles.length) % mediaFiles.length
		);
	};

	const renderMedia = (file) => {
		const url = createFileUrl(file);
		if (isVideoFile(file)) {
			return <video src={url} controls alt={`File ${currentSlide}`} />;
		} else {
			return <img src={url} alt={`File ${currentSlide}`} />;
		}
	};

	return (
		<Container>
			{mediaFiles.length > 0 && (
				<ImagePreviewContainer>
					{renderMedia(mediaFiles[currentSlide])}
					<ButtonGroup>
						<PrevButton onClick={prevSlide} disabled={mediaFiles.length <= 1}>
							<IoIosArrowBack />
						</PrevButton>
						<NextButton onClick={nextSlide} disabled={mediaFiles.length <= 1}>
							<IoIosArrowForward />
						</NextButton>
					</ButtonGroup>
				</ImagePreviewContainer>
			)}
			<ImageUploader>
				<input
					type="file"
					multiple
					accept="image/*,video/*"
					onChange={handleFileAddition}
					disabled={mediaFiles.length >= MAX_FILES}
					id="image-upload"
					hidden
				/>
			</ImageUploader>

			<UploadWrap>
				<UploadButton
					htmlFor="image-upload"
					disabled={mediaFiles.length >= MAX_FILES}
				>
					{mediaFiles.length < MAX_FILES
						? '사진/동영상 추가하기'
						: '업로드 제한 도달'}
				</UploadButton>
				<UploadText>업로드된 파일 수: {mediaFiles.length}</UploadText>
				<DeleteButton onClick={() => handleFileDeletion(currentSlide)}>
					Delete
				</DeleteButton>
			</UploadWrap>
		</Container>
	);
};

export default ImageBox;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ButtonGroup = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
	margin-bottom: 10px;

	button {
		padding: 10px 15px;
		border: none;
		background-color: #007bff;
		color: white;
		border-radius: 5px;
		cursor: pointer;
		&:disabled {
			background-color: #cccccc;
			cursor: default;
		}
	}
`;

const ImagePreviewContainer = styled.div`
	width: 600px;
	height: 40vh;
	margin: 20px auto;
	position: relative;

	text-align: center;

	background-color: #ededed;
	border-radius: 15px;
	img {
		width: 100%;
		height: 100%;

		object-fit: contain;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	video {
		width: 100%;
		height: 100%;

		object-fit: contain;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const ImageNavigationButton = styled.div`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	background-color: #fff;
	color: #000;
	border-radius: 50%;
	cursor: pointer;
	padding: 10px;
	z-index: 2;

	&:hover {
		background-color: #5d6dbe;
		color: #fff;
	}
`;

const PrevButton = styled(ImageNavigationButton)`
	left: 5%;
`;

const NextButton = styled(ImageNavigationButton)`
	right: 5%;
`;

const ImageUploader = styled.div`
	max-width: 600px;
	width: 100%;
	height: 100%;
	margin: 0 auto;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin: 0 auto;
	background-color: #ededed;
	border-radius: 15px;
`;

const UploadWrap = styled.div`
	max-width: 600px;
	width: 100%;
	margin: 10px auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2px solid #000;
	border-top: 2px solid #000;
	padding-top: 10px;
`;

const UploadButton = styled.label`
	width: 200px;
	display: flex;
	justify-content: center;
	padding: 10px 10px;
	background: #5d6dbe;
	color: #fff;
	border-radius: 5px;
	cursor: pointer;
	text-align: center;
	margin-bottom: 10px;

	&:hover {
		background: #0056b3;
	}
`;

const UploadText = styled.div`
	text-align: center;
`;

const DeleteButton = styled.button`
	width: 80px;
	border: none;
	padding: 8px;
	border-radius: 15px;
	margin-left: 10px;
	background-color: #adadad;
	color: #fff;
	font-family: 'jua', sans-serif;
	&:hover {
		background-color: #8c8c8c; // 호버 시 배경색 변경
	}
	&:last-child {
		background-color: #5d6dbe;
		&:hover {
			background-color: #4c5ca7; // 호버 시 배경색 변경
		}
	}
`;
