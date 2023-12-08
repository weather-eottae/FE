import React, { useState, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import {
  StyledChatRoom,
  ChatRoomListBtn,
  ChatRoomListContainer,
} from "./ChatRoom.styled";
import socket from "../../api/socket";

interface ChatRoomProps {
  currentUserNick: string;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ currentUserNick }) => {
  const [currentRoom, setCurrentRoom] = useState("서울");
  const [previousRoom, setPreviousRoom] = useState("");

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

  // 방 변경 감지
  useEffect(() => {
    if (previousRoom && previousRoom !== currentRoom) {
      console.log(`Leaving room: ${previousRoom}`); // 채팅방 퇴장
      socket.emit("leave", previousRoom);
    }

    if (currentRoom !== previousRoom) {
      console.log(`Joining room: ${currentRoom}`); // 채팅방 입장
      socket.emit("join", currentRoom);
      setPreviousRoom(currentRoom);
    }
  }, [currentRoom, previousRoom]);

  const selectRoom = (room: string) => {
    setCurrentRoom(room);
  };

  return (
    <StyledChatRoom>
      <ChatRoomListContainer>
        {rooms.map((room, index) => (
          <ChatRoomListBtn
            key={index}
            type="button"
            onClick={() => selectRoom(room)}
            isActive={currentRoom === room}
          >
            {room}
          </ChatRoomListBtn>
        ))}
      </ChatRoomListContainer>
      <ChatMessage
        key={currentRoom}
        currentUserNick={currentUserNick}
        currentRoom={currentRoom}
      />
    </StyledChatRoom>
  );
};
