import React, { useState, useEffect } from "react";

const CoordinatesComponent = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
    error: "", // 에러 상태
  });

  const onSuccess = (position) => {
    const { latitude, longitude } = position.coords;

    setLocation({
      loaded: true,
      coordinates: {
        lat: latitude,
        lng: longitude,
      },
      error: "", // 에러 상태 초기화
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      coordinates: { lat: "", lng: "" },
      error: error.message, // 에러 메시지 저장
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  return (
    <div>
      {location.loaded ? (
        location.error ? (
          <div>Error: {location.error}</div>
        ) : (
          <div>
            <p>위도: {location.coordinates.lat}</p>
            <p>경도: {location.coordinates.lng}</p>
          </div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CoordinatesComponent;
