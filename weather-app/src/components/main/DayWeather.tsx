import React, { useState } from 'react';
import styled from 'styled-components';
import 비 from '../../assets/img/main/비.png';
import 평균기온 from '../../assets/img/main/온도.png';
import 자외선 from '../../assets/img/main/자외선.png';
import 강수확률 from '../../assets/img/main/강수.png';
import axios from 'axios';
import 해 from '../../assets/img/main/해icon.png';
import 눈 from '../../assets/img/main/눈icon.png';
import 번개 from '../../assets/img/main/weatherIcon/번개icon.png';
import 비내림 from '../../assets/img/main/weatherIcon/비icon.png';
import 약간흐림 from '../../assets/img/main/weatherIcon/약간흐림icon.png';
import 흐림 from '../../assets/img/main/weatherIcon/흐림icon.png';

interface WeatherData {
	locationName: string;
	currentTemp: number | null;
	weatherDescription: string;
	minTemp: number | null;
	maxTemp: number | null;
	precipitation: number;
	uvIndex: number;
}

interface DayWeatherProps {
	weatherData: WeatherData;
}

const DayWaether: React.FC<DayWeatherProps> = ({ weatherData }) => {
	const minTemp =
		weatherData.minTemp !== null && !isNaN(weatherData.minTemp)
			? weatherData.minTemp
			: -9999.0;
	const maxTemp =
		weatherData.maxTemp !== null && !isNaN(weatherData.maxTemp)
			? weatherData.maxTemp
			: -9999.0;
	const currentTemp =
		weatherData.currentTemp !== null && !isNaN(weatherData.currentTemp)
			? weatherData.currentTemp
			: -9999.0;
	const averageTemp = (minTemp + maxTemp) / 2;

	const weatherDescription = weatherData.weatherDescription;

	const weatherIcon = () => {
		if (weatherDescription.includes('sky')) {
			return <img src={해} />;
		} else if (weatherDescription.includes('few')) {
			return <img src={약간흐림} />;
		} else if (weatherDescription.includes('clouds')) {
			return <img src={흐림} />;
		} else if (weatherDescription.includes('rain')) {
			return <img src={비내림} />;
		} else if (weatherDescription.includes('thunderstorm')) {
			return <img src={번개} />;
		} else if (weatherDescription.includes('snow')) {
			return <img src={눈} />;
		} else {
			return <img src={해} />;
		}
	};

	return (
		<DayWaetherWarp>
			<h2 className="title">오늘의 날씨</h2>
			<TodayWrap>
				<div className="weather-icon">{weatherIcon()}</div>
				<HighLowTemperatures>
					<div id="high">
						{maxTemp !== -9999.0 ? maxTemp.toFixed() : 'N/A'}°
					</div>
					<div>━</div>
					<div id="low">{minTemp !== -9999.0 ? minTemp.toFixed() : 'N/A'}°</div>
				</HighLowTemperatures>
				<div className="today-weather">
					{currentTemp !== -9999.0 ? currentTemp.toFixed() : 'N/A'}°
				</div>
			</TodayWrap>
			<div className="weather__infos">
				<div className="weather__info--box">
					<p className="weather__info--title">평균기온</p>
					<img src={평균기온} />
					<p className="weather__info--value">
						{averageTemp !== -9999.0 ? averageTemp.toFixed() : 'N/A'}°C
					</p>
				</div>
				<div className="weather__info--box">
					<p className="weather__info--title">자외선</p>
					<img src={자외선} alt="자외선" />
					<p className="weather__info--value">{weatherData.uvIndex}</p>
				</div>
				<div className="weather__info--box">
					<p className="weather__info--title">강수량</p>
					<img src={강수확률} alt="강수량" />
					<p className="weather__info--value">{weatherData.precipitation}mm</p>
				</div>
			</div>
		</DayWaetherWarp>
	);
};

export default DayWaether;

const DayWaetherWarp = styled.div`
	width: 470px;
	height: 500px;
	border-radius: 10px;
	box-shadow: 2px 4px 10px 0 #dcdbdb;
	background-color: white;
	text-align: center;
	.weather__info--title {
		font-size: large;

		margin: 10px 0 5px 0;
	}
	.weather__infos {
		display: flex;
		justify-content: space-around;
		align-items: center;
		img {
			width: 4.8rem;
			height: 4.6rem;
			margin: 10px 0 7px;
		}
	}
	.title {
		text-align: center;
		font-size: 24px;
		padding-top: 20px;
		padding-bottom: 20px;
	}
	.weather__info--box {
		width: 115px;
		height: 160px;
		box-shadow: 2px 4px 10px 0 #dcdbdb;
		border-radius: 10px;

		&:hover {
			background-color: #5d6dbe;
			color: white;
		}
	}
	.weather__info--value {
		margin: 5px;
	}
`;

const TodayWrap = styled.div`
	.weather-icon {
		margin-left: 20px;
		width: 240px;
		height: 170px;
	}
	display: flex;

	height: 230px;

	.today-weather {
		line-height: 150px;
		font-size: 64px;
		margin-left: 50px;
		padding-top: 5%;
	}
`;

const HighLowTemperatures = styled.div`
	height: 230px;
	padding-top: 15%;
	font-size: 10px;

	#high {
		color: #ff0000;
		font-size: 25px;
		/* border-bottom: 1px solid #dbdada; */
		padding-bottom: 5px;
	}
	#low {
		color: #5d6dbe;
		font-size: 25px;
		padding-top: 10px;
	}
`;
