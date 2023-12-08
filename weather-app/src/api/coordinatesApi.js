import axios from "axios";

const BASE_URL = "http://43.200.188.52:8080";

export const coordinates = async (location) => {
  return axios.get(
    `${BASE_URL}/api/coordinates?latitude=${location.coordinate.lat}&longitude=${location.coordinate.lng}`
  );
};

export const GET_COORDINATES_API = `${BASE_URL}/api/product/all`; // 특정 패스파라미터 앞에 해당 변수 넣어 API 주소 세팅
