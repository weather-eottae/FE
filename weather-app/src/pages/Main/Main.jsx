import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import DayWaether from '../../components/main/DayWeather';
import DayClothes from '../../components/main/DayClothes';
import WeatherDays from '../../components/main/WeatherDays';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { coordinates } from '../../api/coordinatesApi';
import axios from 'axios';
import Loading from '../../components/loading/Loading';
import SevenWeatherForecast from './SevenWeatherForecast';

const Main = () => {
	const [weatherData, setWeatherData] = useState({
		locationName: '',
		currentTemp: null,
		weatherDescription: '',
		minTemp: null,
		maxTemp: null,
		precipitation: null,
		uvIndex: null,
	});
	// const [forecastData, setForecastData] = useState([]);

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
					lang: 'En',
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
					lang: 'kr',
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
		return <Loading />;
	}

	return (
		<>
			<Header />
			<StMain>
				<div className="daywaether">
					<DayWaether weatherData={weatherData} />
					<DayClothes weatherData={weatherData} />
				</div>
				<SevenWeatherForecast />
				<WeatherDays />
			</StMain>
		</>
	);
};

export default Main;

const StMain = styled.div`
	width: 100%;
	margin: 0 auto;
	height: 830px;
	overflow-y: hidden;
	.daywaether {
		display: flex;
		justify-content: center;
		gap: 4%;
	}
`;
