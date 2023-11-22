import styled from "styled-components";

export const StyledMessageInput = styled.form`
  display: flex;
  justify-content: space-between;
  padding: 10px;

  input {
    color: #ffffff;
    flex-grow: 1;
    margin-right: 10px;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: #5d6dbe;
  }

  input::placeholder {
    color: #ffffff; /* 플레이스홀더 텍스트 색상을 원하는 색으로 설정*/
  }

  button {
    padding: 10px 20px;
    background-color: #5d6dbe;
    border: none;
    border-radius: 10px;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #5faf5a;
    }
  }
`;
