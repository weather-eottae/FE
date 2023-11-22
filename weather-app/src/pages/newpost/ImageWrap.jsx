import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const MAX_FILES = 3;

// Helper function to check if the file is a video
const isVideo = (file) => {
	return file && file.type.split('/')[0] === 'video';
};

const ImageWrap = () => {
	const [files, setFiles] = useState([]);
	const [currentFileIndex, setCurrentFileIndex] = useState(0);

	const handleFileChange = (event) => {
		if (event.target.files) {
			const filesArray = Array.from(event.target.files);
			const remainingSlots = MAX_FILES - files.length;
			const newFiles = filesArray.slice(0, remainingSlots);
			const newFilesURLs = newFiles.map((file) => ({
				url: URL.createObjectURL(file),
				type: file.type,
			}));

			setFiles((prevFiles) => [...prevFiles, ...newFilesURLs]);
			setCurrentFileIndex(files.length > 0 ? currentFileIndex : 0);
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
									src={files[currentFileIndex].url}
									type={files[currentFileIndex].type}
								/>
								Your browser does not support the video tag.
							</VideoPreview>
						) : (
							<ImagePreview
								src={files[currentFileIndex].url}
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
