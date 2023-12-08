import axios from "axios";

const BASE_URL = "http://43.200.188.52:8080";

export const currentweather = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/current/{locationId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching state:", error);
    throw error; // 오류를 호출자에게 전파
  }
};
