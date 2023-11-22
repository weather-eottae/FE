import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
	const [location, setLocation] = useState({
		loaded: false,
		coordinates: { lat: '', lng: '' },
		state: '',
		temperature: '',
	});

	const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Google Maps API 키
	const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY; // 한국 기상청 API 키

	const getState = async (latitude, longitude) => {
		try {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApiKey}`
			);
			const data = await response.json();

			// "시/도" 정보 추출
			const addressComponents = data.results[1].address_components;
			let state = '';

			for (const component of addressComponents) {
				if (component.types.includes('administrative_area_level_1')) {
					state = component.long_name;
				}
			}

			return state;
		} catch (error) {
			console.error('Error fetching state:', error);
			return '시/도를 불러오는데 실패했습니다';
		}
	};

	const getWeatherInfo = async (latitude, longitude) => {
		try {
			// 현재 날짜와 시간 구하기
			const today = new Date();
			const year = today.getFullYear();
			const month = (today.getMonth() + 1).toString().padStart(2, '0');
			const day = today.getDate().toString().padStart(2, '0');

			// API 요청을 위한 시간 설정 (현재 시간보다 이전 시간을 기준으로 설정)
			let hour = today.getHours();
			if (hour < 2) {
				// 00시 기준으로 데이터 요청
				hour = '00';
			} else {
				// 이전 시간으로 조정 (예: 11시일 경우 10시 데이터 요청)
				hour = (Math.floor(hour / 3) * 3 - 3).toString().padStart(2, '0');
			}

			// API 요청을 보내기 위한 URL 생성
			const apiUrl = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${weatherApiKey}&numOfRows=10&pageNo=1&dataType=JSON&base_date=${year}${month}${day}&base_time=${hour}00&nx=${latitude}&ny=${longitude}`;

			// API 요청 보내기
			const response = await axios.get(apiUrl);

			// API 응답에서 온도 정보 추출
			const items = response.data.response.body.items.item;
			const temperatureItem = items.find((item) => item.category === 'T1H'); // 온도 정보 카테고리
			const temperature = temperatureItem.obsrValue; // 온도 값

			return temperature;
		} catch (error) {
			console.error('Error fetching weather info:', error);
			return 'error';
		}
	};

	const onSuccess = async (position) => {
		const { latitude, longitude } = position.coords;
		const state = await getState(latitude, longitude);
		const temperature = await getWeatherInfo(latitude, longitude);

		setLocation({
			loaded: true,
			coordinates: {
				lat: latitude,
				lng: longitude,
			},
			state,
			temperature,
		});
	};

	const onError = (error) => {
		setLocation({
			loaded: true,
			error,
		});
	};

	useEffect(() => {
		if (!('geolocation' in navigator)) {
			onError({
				code: 0,
				message: 'Geolocation not supported',
			});
		}

		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}, []);

	return (
		<div>
			{location.loaded ? (
				<div>
					<p>{location.temperature}°C</p>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
};

export default WeatherComponent;
