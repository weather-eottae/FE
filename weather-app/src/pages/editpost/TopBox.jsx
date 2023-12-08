import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiArrowLeft } from 'react-icons/hi';
import { MdPlace } from 'react-icons/md';

const TopBox = ({ temperature, location, date, token }) => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1); // 이전 페이지로 이동
	};

	return (
		<Wrap>
			<Top>
				<BackButton>
					<HiArrowLeft onClick={handleBack} />
				</BackButton>
				<Title>게시물 수정</Title>
			</Top>
			<Bottom>
				<Place>
					<MdPlace color="#5d6dbe" />
					<p>{location}</p>
					&nbsp;
					<p>{temperature}</p>
				</Place>
				{/* <Temperature>19°C</Temperature> */}
				<DateInfo>
					<span>{date}</span>
				</DateInfo>
			</Bottom>
		</Wrap>
	);
};

export default TopBox;

const Wrap = styled.div`
	max-width: 600px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Top = styled.div`
	width: 600px;
	margin: 0 auto;
	text-align: center;
	border-bottom: 2px solid #000;
`;

const BackButton = styled.button`
	position: absolute;
	border: none;
	background-color: transparent;
	display: flex;
	justify-content: left;
	align-items: center;
`;

const Title = styled.div`
	font-size: 1.2rem;
	font-weight: bold;
	margin-bottom: 10px;
`;

const Bottom = styled.div`
	width: 600px;
	height: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	border-bottom: 2px solid #000;
`;

const Place = styled.div`
	display: flex;

	align-items: center;
	width: 50%;
`;
const DateInfo = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 30%;
`;
