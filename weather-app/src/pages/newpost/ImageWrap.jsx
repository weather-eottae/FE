import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const MAX_FILES = 3;

const isVideo = (file) => {
	return file && file.type && file.type.split('/')[0] === 'video'; // 파일 유형이 정의되어 있는지 확인
};

const ImageWrap = ({ initialFiles, onFilesChange }) => {
	const [files, setFiles] = useState(initialFiles || []);
	const [currentFileIndex, setCurrentFileIndex] = useState(0);

	const handleFileDeletion = (index) => {
		const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);
		setFiles(updatedFiles);
		setCurrentFileIndex(0); // Reset to the first slide after deletion
	};

	const handleFileChange = (event) => {
		if (event.target.files) {
			const filesArray = Array.from(event.target.files).slice(
				0,
				MAX_FILES - files.length
			);
			setFiles((prevFiles) => {
				const updatedFiles = [...prevFiles, ...filesArray];
				setCurrentFileIndex(prevFiles.length > 0 ? currentFileIndex : 0);
				onFilesChange(updatedFiles); // 상위 컴포넌트에 파일 목록 전달

				return updatedFiles;
			});
		}
	};

	const handlePrev = () => {
		setCurrentFileIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
	};

	const handleNext = () => {
		setCurrentFileIndex((prevIndex) =>
			prevIndex < files.length - 1 ? prevIndex + 1 : prevIndex
		);
	};

	// Clean up object URLs
	useEffect(() => {
		return () => {
			files.forEach((file) => {
				if (file instanceof File) {
					URL.revokeObjectURL(file); // URL 해제
				}
			});
		};
	}, [files]);

	return (
		<Container>
			<ImageUploadWrap>
				<ImageUploader>
					<input
						type="file"
						multiple
						accept="image/*,video/*"
						onChange={handleFileChange}
						id="image-upload"
						hidden
						disabled={files.length >= MAX_FILES}
					/>
				</ImageUploader>
				{files.length > 0 && (
					<ImagePreviewContainer>
						<PrevButton onClick={handlePrev} disabled={currentFileIndex === 0}>
							<IoIosArrowBack />
						</PrevButton>
						{isVideo(files[currentFileIndex]) ? (
							<VideoPreview controls>
								<source
									src={URL.createObjectURL(files[currentFileIndex])}
									type={files[currentFileIndex].type}
								/>
								Your browser does not support the video tag.
							</VideoPreview>
						) : (
							<ImagePreview
								src={URL.createObjectURL(files[currentFileIndex])}
								alt="Uploaded content"
							/>
						)}
						<NextButton
							onClick={handleNext}
							disabled={currentFileIndex === files.length - 1}
						>
							<IoIosArrowForward />
						</NextButton>
					</ImagePreviewContainer>
				)}
			</ImageUploadWrap>
			<UploadWrap>
				<UploadButton
					htmlFor="image-upload"
					disabled={files.length >= MAX_FILES}
				>
					{files.length < MAX_FILES
						? '사진/동영상 추가하기'
						: '업로드 제한 도달'}
				</UploadButton>
				<UploadText>업로드된 파일 수: {files.length}</UploadText>
				<DeleteButton onClick={() => handleFileDeletion(currentFileIndex)}>
					Delete
				</DeleteButton>
			</UploadWrap>
		</Container>
	);
};

export default ImageWrap;

const Container = styled.div`
	max-width: 600px;
	margin: 20px auto;
	border-radius: 15px;
`;

const ImageUploadWrap = styled.div`
	max-width: 600px;
	width: 100%;
	height: 40vh;
	margin: 20px auto;

	position: relative;
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

const ImagePreviewContainer = styled.div`
	width: 600px;
	height: 100%;
	margin: 0 auto;
	position: absolute;
	top: 0;
	display: flex;
	justify-content: center;
`;

const ImagePreview = styled.img`
	max-width: 100%;
	max-height: 100%;
	display: block;
	object-fit: contain;
`;

const VideoPreview = styled.video`
	max-width: 100%;
	max-height: 100%;
	display: block;
	object-fit: contain;
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
