import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationInfo = ({ onLocationUpdate }) => {
	const [location, setLocation] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const OPEN_WEATHER_MAP_API_KEY = 'd1aaa3d185e5c01495cec131c6f5c82c';
	const WEATHER_API_ENDPOINT =
		'https://api.openweathermap.org/data/2.5/weather';

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

	const fetchLocationName = async (lat, lon) => {
		setIsLoading(true);
		try {
			const response = await axios.get(WEATHER_API_ENDPOINT, {
				params: {
					lat: lat,
					lon: lon,
					appid: OPEN_WEATHER_MAP_API_KEY,
				},
			});

			const locationName = response.data.name;
			setLocation(locationName);

			// 부모 컴포넌트에 위치 정보 업데이트
			if (onLocationUpdate) {
				onLocationUpdate(locationName);
			}
		} catch (error) {
			console.error('Error fetching location name:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const loadLocationData = async () => {
			try {
				const { lat, lon } = await getCurrentLocation();
				await fetchLocationName(lat, lon);
			} catch (error) {
				console.error('Error getting user location:', error);
				setIsLoading(false);
			}
		};

		loadLocationData();
	}, []);

	if (isLoading) {
		return <div>위치 정보를 불러오는 중입니다...</div>;
	}

	return <div>{location && <p>{location}</p>}</div>;
};

export default LocationInfo;
