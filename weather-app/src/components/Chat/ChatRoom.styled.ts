import styled from "styled-components";

// ChatRoomListBtnProps 인터페이스 정의
interface ChatRoomListBtnProps {
  isActive: boolean;
}

export const StyledChatRoom = styled.div`
  padding: 10px;
  overflow-y: auto;
`;

export const ChatRoomListBtn = styled.button<ChatRoomListBtnProps>`
  color: #fff;
  margin: 5px;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  background-color: ${(props) => (props.isActive ? "#FF884B" : "#5d6dbe")};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isActive ? "#5d6dbe" : "#5faf5a")};
    color: #fff;
  }
`;

export const ChatRoomListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
