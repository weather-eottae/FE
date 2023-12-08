import React from 'react';
import styled from 'styled-components';

import 해 from '../../assets/img/main/weatherIcon/해쨍쨍icon.png';
import 눈 from '../../assets/img/main/눈icon.png';
import 번개 from '../../assets/img/main/weatherIcon/번개icon.png';
import 비내림 from '../../assets/img/main/weatherIcon/비icon.png';
import 약간흐림 from '../../assets/img/main/weatherIcon/약간흐림icon.png';
import 흐림 from '../../assets/img/main/weatherIcon/흐림icon.png';

const WeatherDaysCard = (props) => {
	const weatherDescription = props.weatherDescription;

	const weatherDesIcon = () => {
		if (weatherDescription && weatherDescription.includes('sky')) {
			return <img src={해} />;
		} else if (weatherDescription && weatherDescription.includes('few')) {
			return <img src={약간흐림} />;
		} else if (weatherDescription && weatherDescription.includes('clouds')) {
			return <img src={흐림} />;
		} else if (weatherDescription && weatherDescription.includes('rain')) {
			return <img src={비내림} />;
		} else if (
			weatherDescription &&
			weatherDescription.includes('thunderstorm')
		) {
			return <img src={번개} />;
		} else if (weatherDescription && weatherDescription.includes('snow')) {
			return <img src={눈} />;
		} else {
			return <img src={해} />;
		}
	};
	return (
		<WeatherIconWrap>
			<div className="forecast-data">
				{props.date && <p>{props.date.substr(5, 8)}</p>}
				<div className="weather-icon">{weatherDesIcon()}</div>
				<DaysTemperatures>
					<div className="high">{props.minTemp.toFixed()}°C </div>
					<div className="low">{props.maxTemp.toFixed()}°C</div>
				</DaysTemperatures>
			</div>
		</WeatherIconWrap>
	);
};

export default WeatherDaysCard;

const WeatherIconWrap = styled.div`
	width: 13%;
	border-radius: 20px;
	padding-bottom: 20px;

	&:hover {
		box-shadow: rgba(100, 100, 111, 0.2) 0px 6px 3px 0px;
	}
`;

const DaysTemperatures = styled.div`
	display: flex;
	justify-content: center;
	gap: 5px;

	.high {
		color: #ff0000;
		padding-right: 5px;
		/* border-right: 1px solid #d3d3d3; */
	}
	.low {
		color: #5d6dbe;
		padding-left: 5px;
	}
`;
