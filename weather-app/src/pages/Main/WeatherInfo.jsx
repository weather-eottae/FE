import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo = () => {
	const [weatherData, setWeatherData] = useState({
		locationName: '',
		currentTemp: null,
		weatherDescription: '',
		minTemp: null,
		maxTemp: null,
		precipitation: null,
		uvIndex: null,
	});
	const [isLoading, setIsLoading] = useState(true);

	const OPEN_WEATHER_MAP_API_KEY = 'dc8279082d6f0784f2c760463fcb7f60';
	const WEATHER_API_ENDPOINT =
		'https://api.openweathermap.org/data/2.5/weather';
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

	const fetchWeatherData = async (lat, lon) => {
		setIsLoading(true);
		try {
			const response = await axios.get(WEATHER_API_ENDPOINT, {
				params: {
					lat: lat,
					lon: lon,
					appid: OPEN_WEATHER_MAP_API_KEY,
					units: 'metric',
					lang: 'kr',
				},
			});

			const locationName = response.data.name;
			const currentTemp = response.data.main.temp;
			const weatherDescription = response.data.weather[0].description;

			const oneCallResponse = await axios.get(ONE_CALL_API_ENDPOINT, {
				params: {
					lat: lat,
					lon: lon,
					exclude: 'current,minutely,hourly,alerts',
					appid: OPEN_WEATHER_MAP_API_KEY,
					units: 'metric',
					lang: 'Kr',
				},
			});

			const dailyData = oneCallResponse.data.daily[0];

			setWeatherData({
				locationName,
				currentTemp,
				weatherDescription,
				minTemp: dailyData.temp.min,
				maxTemp: dailyData.temp.max,
				precipitation: dailyData.rain ? dailyData.rain['1h'] : 0,
				uvIndex: dailyData.uvi,
			});
		} catch (error) {
			console.error('Error fetching weather data:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const loadWeatherData = async () => {
			try {
				const { lat, lon } = await getCurrentLocation();
				await fetchWeatherData(lat, lon);
			} catch (error) {
				console.error('Error getting user location:', error);
				setIsLoading(false);
			}
		};

		loadWeatherData();
	}, []);

	if (isLoading) {
		return <div>날씨 데이터를 불러오는 중입니다...</div>;
	}

	return (
		<div>
			<h2>오늘의 날씨 정보</h2>
			{weatherData.locationName && <p>위치: {weatherData.locationName}</p>}
			<p>
				현재 기온:{' '}
				{weatherData.currentTemp ? weatherData.currentTemp.toFixed(1) : 'N/A'}°C
			</p>
			<p>날씨 상태: {weatherData.weatherDescription}</p>
			<p>
				최저 기온:{' '}
				{weatherData.minTemp ? weatherData.minTemp.toFixed(1) : 'N/A'}°C
			</p>
			<p>
				최고 기온:{' '}
				{weatherData.maxTemp ? weatherData.maxTemp.toFixed(1) : 'N/A'}°C
			</p>
			<p>강수량: {weatherData.precipitation}mm</p>
			<p>자외선 지수: {weatherData.uvIndex}</p>
		</div>
	);
};

export default WeatherInfo;
