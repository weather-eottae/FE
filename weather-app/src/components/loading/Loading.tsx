import React from "react";
import styled, { keyframes } from "styled-components";
import SunSVG from "../../assets/img/loading/sun.svg";
import CloudSVG from "../../assets/img/loading/cloud.svg";

const Loading: React.FC = () => {
  return (
    <LoadingContainer>
      <LoadingIconContainer>
        <Sun src={SunSVG} alt="Sun" />
        <Cloud src={CloudSVG} alt="Cloud" />
      </LoadingIconContainer>
      <LoadingTextContainer>
        <p>로딩중입니다</p>
      </LoadingTextContainer>
    </LoadingContainer>
  );
};

export default Loading;

const rotationSun = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingIconContainer = styled.div`
  position: relative;
  width: 110px;
  height: 73px;
`;

const LoadingTextContainer = styled.div`
  width: 110px;
  text-align: center;
  margin-top: 10px;
  p {
    color: #5d6dbe;
  }
`;

const Sun = styled.img`
  position: absolute;
  width: 70px;
  height: 70px;
  animation: ${rotationSun} 3s infinite linear;
  top: 0px;
  right: 3px;
`;

const Cloud = styled.img`
  position: absolute;
  width: 80px;
  height: 80px;
  left: 7px;
  bottom: -11px;
`;
