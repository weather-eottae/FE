import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getAuthToken = () => localStorage.getItem("access_token");

const getUserInfo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user`, {
      headers: {
        Authorization: `${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("유저 정보를 가져오는 중 에러가 발생했습니다.:", error);
    throw error;
  }
};

// 유저 정보에서 nickName을 먼저 확인, 없으면 name을 반환
const getUserName = async () => {
  const userInfo = await getUserInfo();
  return userInfo.nickName || userInfo.name || "익명";
};

export { getUserInfo, getUserName };
