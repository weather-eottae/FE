// MyPageStyles.ts
import styled from "styled-components";

export const StyledComponent = styled.div`
  font-family: "Jua", sans-serif;
`;

export const MyPageContainer = styled.div`
  width: 90%;
  height: 90%;
  display: grid;
  grid-template-columns: 150px 1fr auto;
  grid-template-rows: auto 1fr auto;
  gap: 10px;
  margin-top: 2rem;
  margin-left: 4rem;
  margin-right: 3rem;
  background-color: white;
  // border: 2px solid #cccccc;
  border-radius: 10px;

  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 10px;
    background-color: #5d6dbe;
  }

  &::before {
    top: 20px;
  }

  &::after {
    bottom: 20px;
  }
`;

export const ProfileImage = styled.img`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  width: 150px;
  height: 150px;
  margin-top: 4rem;
  margin-left: 3rem;
  border-radius: 50%;
`;

export const ProfileInfo = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  margin-left: 5rem;
  font-size: 25px;
`;

export const Nickname = styled.div`
  font-weight: bold;
  font-size: 40px;
`;

export const StatusMessage = styled.div`
  color: gray;
  margin-top: 1rem;
`;

export const ButtonGroup = styled.div`
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;
  // gap: -20px;
  margin-right: 5rem;
`;

export const Button = styled.button`
  margin-top: 5rem;
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #5d6dbe;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  font-size: 20px;
  margin-bottom: -4rem;
  padding: 10px 20px;
  font-family: "Jua", sans-serif;
  &:hover {
    background-color: #4e5ca1;
  }
`;

export const BoardList = styled.div`
  grid-column: 2 / 2;
  grid-row: 2 / 4;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 3rem;
  margin-left: -4rem;
  margin-bottom: 40px;
  font-size: 30px;
`;

export const RecentPagesWrapper = styled.div`
  max-height: calc(100px * 3 + 10px * 2);
  overflow: hidden;
  width: 120%;
  max-width: 1200px;
  margin: auto;
  margin-top: -1rem;
  margin-bottom: 2rem;
`;
