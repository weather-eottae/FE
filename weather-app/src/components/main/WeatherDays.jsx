import React from 'react';

import styled from 'styled-components';
import 해 from '../../assets/img/main/weatherIcon/해쨍쨍icon.png';
import 눈 from '../../assets/img/main/눈icon.png';
import 번개 from '../../assets/img/main/weatherIcon/번개icon.png';
import 비내림 from '../../assets/img/main/weatherIcon/비icon.png';
import 약간흐림 from '../../assets/img/main/weatherIcon/약간흐림icon.png';
import 흐림 from '../../assets/img/main/weatherIcon/흐림icon.png';
import WeatherDaysCard from './WeatherDaysCard';

const WeatherDays = (props) => {
	// console.log(props);

	return (
		<WeatherDaysWrap>
			{props.forecastData &&
				props.forecastData.map((item) => <WeatherDaysCard {...item} />)}
		</WeatherDaysWrap>
	);
};
export default WeatherDays;

const WeatherDaysWrap = styled.div`
	width: 1000px;
	height: 250px;
	background-color: white;
	margin: auto;
	margin-top: 40px;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 2px 4px 10px 0 #dcdbdb;
	display: flex;
	justify-content: space-around;
	text-align: center;
	align-items: center;
	font-size: 20px;
	p {
		margin: 10px;
		font-size: 1.4rem;
		color: #363535;
	}
	img {
		width: 100px;
		margin: 10px 0;
	}
	.forecast-data {
	}
`;
