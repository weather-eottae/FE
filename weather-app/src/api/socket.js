import io from "socket.io-client";

// 전체 애플리케이션에서 사용할 단일 소켓 인스턴스 생성
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  path: "/socket.io", // 서버의 path 옵션과 일치
  transports: ["websocket"], // 웹소켓 연결만 사용하도록 설정
});

export default socket;
