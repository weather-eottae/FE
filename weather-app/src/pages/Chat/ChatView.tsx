import React, { useState, useEffect } from "react";
import { ChatRoom } from "../../components/Chat/ChatRoom";
import { MessageInput } from "../../components/Chat/MessageInput";
import { ChatViewContainer } from "./ChaView.styled";
import ChatNotice from "../../components/Chat/ChatNotice";
import socket from "../../api/socket";

const ChatView = () => {
  const [userNick, setUserNick] = useState("닉네임입력");

  // URL에서 쿼리 파라미터 추출
  const [roomCode, setRoomCode] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setRoomCode(searchParams.get("room_code") || "");
    setRoomName(searchParams.get("room_name") || "");

    // 방 입장
    if (roomCode) {
      socket.emit("join", roomCode);
    }

    // 컴포넌트 언마운트 시 실행될 클린업 함수
    return () => {
      if (roomCode) {
        socket.emit("leave", roomCode); // 퇴장시 서버에 알림
      }
    };
  }, [roomCode]); // roomCode가 변경될 때만 실행

  // 사용자가 닉네임을 입력할 때 호출되는 함수
  const handleNickChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserNick(event.target.value);
  };

  return (
    <ChatViewContainer>
      <ChatNotice />
      <input type="text" value={userNick} onChange={handleNickChange} />
      <MessageInput nick={userNick} roomCode={roomCode} roomName={roomName} />
      <ChatRoom currentUserNick={userNick} />
      {/* currentUserNick prop을 전달 */}
    </ChatViewContainer>
  );
};

export default ChatView;
