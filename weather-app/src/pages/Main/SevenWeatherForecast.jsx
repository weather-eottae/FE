import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherDays from '../../components/main/WeatherDays';

const SevenWeatherForecast = () => {
	const [forecastData, setForecastData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const OPEN_WEATHER_MAP_API_KEY = 'd1aaa3d185e5c01495cec131c6f5c82c'; // API 키로 대체
	const ONE_CALL_API_ENDPOINT =
		'https://api.openweathermap.org/data/2.5/onecall';

	const getCurrentLocation = () => {
		return new Promise((resolve, reject) => {
			if ('geolocation' in navigator) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						resolve({
							lat: position.coords.latitude,
							lon: position.coords.longitude,
						});
					},
					(error) => {
						reject(error);
					}
				);
			} else {
				reject(new Error('Geolocation is not supported by this browser.'));
			}
		});
	};

	const fetchForecastData = async (lat, lon) => {
		setIsLoading(true);
		try {
			const response = await axios.get(ONE_CALL_API_ENDPOINT, {
				params: {
					lat: lat,
					lon: lon,
					exclude: 'current,minutely,hourly,alerts',
					appid: OPEN_WEATHER_MAP_API_KEY,
					units: 'metric',
					lang: 'En',
				},
			});

			const dailyData = response.data.daily.slice(1, 7); // 7일간의 데이터
			setForecastData(
				dailyData.map((day) => ({
					date: new Date(day.dt * 1000).toLocaleDateString(), // 날짜
					weatherDescription: day.weather[0].description,

					minTemp: day.temp.min, // 최저 기온
					maxTemp: day.temp.max, // 최고 기온
				}))
			);
		} catch (error) {
			console.error('Error fetching forecast data:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const loadForecastData = async () => {
			try {
				const { lat, lon } = await getCurrentLocation();
				await fetchForecastData(lat, lon);
			} catch (error) {
				console.error('Error getting user location:', error);
				setIsLoading(false);
			}
		};

		loadForecastData();
	}, []);

	if (isLoading) {
		return <div> </div>;
	}

	return (
		<div>
			{/* <h2>7일간의 날씨 예보</h2> */}
			<ul>
				{/* {forecastData.map((day, index) => (
          <li key={index}>
            <p>날짜: {day.date}</p>
            <p>최저 기온: {day.minTemp.toFixed(1)}°C</p>
            <p>최고 기온: {day.maxTemp.toFixed(1)}°C</p>
          </li>
        ))} */}
			</ul>
			<WeatherDays forecastData={forecastData} />
		</div>
	);
};

export default SevenWeatherForecast;
