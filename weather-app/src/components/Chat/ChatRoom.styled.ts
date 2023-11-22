import styled from "styled-components";

export const StyledChatRoom = styled.div`
  padding: 20px;
  height: calc(100vh - 120px);
  overflow-y: auto;
`;

export const ChatRoomParagraph = styled.p`
  display: flex;
  justify-content: center;
  margin: 1rem;
  font-size: large;
`;

export const ChatRoomListBtn = styled.button`
  color: #fff;
  margin: 5px;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  background-color: #5d6dbe;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5faf5a;
    color: #fff;
  }
`;

export const ChatRoomListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
