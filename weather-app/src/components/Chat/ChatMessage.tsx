import React, { useState, useEffect } from "react";
import { StyledChatMessage, MessageBubble } from "./ChatMessage.styled";
import socket from "../../api/socket";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface IMessage {
  nick: string;
  msg: string;
  timestamp: string; // ISO 형식의 날짜 문자열을 가정
}

interface ChatMessageProps {
  currentUserNick: string; // 현재 사용자의 닉네임을 받기 위한 prop
}

const formatTimeAgo = (timestamp: string | number | Date) => {
  const result = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
    locale: ko,
  });
  // '1분 미만 전'-> '1분 전'으로 변경
  return result.replace("1분 미만", "방금");
};

export const ChatMessage = ({ currentUserNick }: ChatMessageProps) => {
  // 메시지들을 저장할 상태를 생성
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    // 서버로부터 메시지를 수신할 리스너를 설정
    // 이벤트 이름을 백엔드와 일치
    socket.on("message", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });
    // 컴포넌트가 언마운트시 리스너를 제거.
    // 소켓 연결은 유지
    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <StyledChatMessage>
      {[...messages].reverse().map((messageData, index) => {
        const timeAgo = formatTimeAgo(messageData.timestamp);
        return (
          <MessageBubble key={index} own={messageData.nick === currentUserNick}>
            <div className="header">
              <span className="nickname">{messageData.nick}</span>
              <span className="timestamp">{timeAgo}</span>
            </div>
            <div className="message">{messageData.msg}</div>
          </MessageBubble>
        );
      })}
    </StyledChatMessage>
  );
};
