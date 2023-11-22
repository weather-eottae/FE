import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoIcon from "../../assets/img/not-found/logoIcon.png";

const Error = () => {
  return (
    <ErrorContainer>
      <LogoContainer>
        <img src={LogoIcon} alt="날씨어때" />
      </LogoContainer>

      <ErrorMessage>
        <p>죄송합니다. 원하시는 페이지를 찾을 수 없습니다.</p>
        <span>
          잘못된 주소거나 주소의 변경/삭제로 인해 사용하실 수 없습니다.
          <br />
          입력하신 페이지 주소를 다시 한번 확인해 주세요.
        </span>
      </ErrorMessage>

      <Link to={"/"}>
        <HomeButton>메인페이지 바로가기</HomeButton>
      </Link>
    </ErrorContainer>
  );
};

export default Error;

const ErrorContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  img {
    width: 250px;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  p {
    font-size: 1.875rem;
    font-weight: bold;
    color: #5d6dbe;
    margin-bottom: 10px;
  }
  span {
    line-height: 1.5rem;
  }
`;

const HomeButton = styled.button`
  font-size: 1.125rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
  border: none;
  border-radius: 10px;
  background-color: #5d6dbe;
  padding: 10px 25px;
  margin-top: 30px;
  cursor: pointer;
  &:hover {
    background-color: #4f5da1;
    transition: all 0.3s ease-in-out;
  }
`;
