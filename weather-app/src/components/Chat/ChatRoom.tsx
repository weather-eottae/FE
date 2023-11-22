import React from "react";
import { ChatMessage } from "./ChatMessage";
import {
  StyledChatRoom,
  ChatRoomListBtn,
  ChatRoomListContainer,
  ChatRoomParagraph,
} from "./ChatRoom.styled";
import socket from "../../api/socket";

interface ChatRoomProps {
  currentUserNick: string;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ currentUserNick }) => {
  const rooms = [
    "서울",
    "인천",
    "대전",
    "광주",
    "대구",
    "울산",
    "부산",
    "제주",
  ];

  // 방 선택하기
  const handleRoomSelection = (room: string) => {
    // 'socket' 모듈에서 가져온 인스턴스 사용
    socket.emit("join", room);
  };

  return (
    <StyledChatRoom>
      <ChatRoomParagraph>
        ⚠️ 우리 모두의 쾌적한 채팅 환경을 위해 비방, 욕설 또는 부적절한 언어의
        사용을 자제해 주시기 바랍니다. ⚠️
      </ChatRoomParagraph>
      {/* 채팅방 리스트를 나열 로직 */}
      <ChatRoomListContainer>
        {rooms.map((room, index) => (
          // key는 각 요소를 구별하는 데 사용, 예)데이터 ID
          // index 임의로 사용
          <ChatRoomListBtn
            key={index}
            type="button"
            onClick={() => handleRoomSelection(room)}
          >
            {room}
          </ChatRoomListBtn>
        ))}
      </ChatRoomListContainer>{" "}
      <ChatMessage currentUserNick={currentUserNick} />{" "}
      {/* currentUserNick prop을 전달 */}
    </StyledChatRoom>
  );
};
