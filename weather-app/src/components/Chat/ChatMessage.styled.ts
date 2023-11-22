import styled from "styled-components";

// 'own' prop의 타입을 정의합니다.
interface MessageBubbleProps {
  own: boolean;
}

export const StyledChatMessage = styled.div`
  display: flex; // Flexbox 컨테이너로 설정
  flex-direction: column; // 자식 요소들을 세로 방향으로 정렬
  padding: 10px;
  border-bottom: 1px solid #ececec;
  overflow-y: auto; // 메시지 목록이 길어졌을 때 스크롤 가능하게 설정
  max-height: 400px; // 메시지 목록의 최대 높이 제한
  margin-bottom: 20px; // 하단 여백 추가

  &:last-child {
    border-bottom: none;
  }

  p {
    padding: 5px 10px; // 각 메시지에 패딩을 추가하여 구분을 쉽게
    border-radius: 10px;
    background-color: #f0f0f0;
    margin-bottom: 8px; // 메시지 사이 간격 추가
    &:last-child {
      border-bottom: none;
    }
  }
`;

export const MessageBubble = styled.div<MessageBubbleProps>`
  background-color: ${(props) => (props.own ? "#5d6dbe" : "#F4F4F4")};
  align-self: ${(props) => (props.own ? "flex-end" : "flex-start")};
  padding: 10px;
  border-radius: 20px;
  margin-bottom: 10px;
  min-width: 15%;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  margin-left: ${(props) => (props.own ? "auto" : "0")};
  margin-right: ${(props) => (props.own ? "0" : "auto")};

  .header {
    padding: 5px;
    display: flex;
    justify-content: space-between; // 닉네임과 시간을 양 끝으로 분산 배치
    margin-bottom: 4px;
  }

  .message {
    padding: 5px; // 메시지 패딩
    color: ${(props) => (props.own ? "#ffffff" : "black")};
  }
`;
