import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiArrowLeft } from 'react-icons/hi';
import { MdPlace } from 'react-icons/md';
import LocationComponent from '../../components/location/Location';
import WeatherComponent from '../../components/weather/Weather';
import CoordinatesComponent from '../../components/location/Coordinates';

const TopWrap = () => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1); // 이전 페이지로 이동
	};

	const date = new Date();
	const currentDateAndTime = `${date.getFullYear()}-${String(
		date.getMonth() + 1
	).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(
		date.getHours()
	).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

	return (
		<Wrap>
			<Top>
				<BackButton>
					<HiArrowLeft onClick={handleBack} />
				</BackButton>
				<Title>새 게시물</Title>
			</Top>
			<Bottom>
				<Place>
					<MdPlace color="#5d6dbe" />
					<LocationComponent />
					&nbsp;
					<WeatherComponent />
				</Place>
				{/* <Temperature>19°C</Temperature> */}
				<DateInfo>
					<span>{currentDateAndTime}</span>
				</DateInfo>
			</Bottom>
		</Wrap>
	);
};

export default TopWrap;

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
