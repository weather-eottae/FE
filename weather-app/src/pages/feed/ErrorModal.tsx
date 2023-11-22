// ErrorModal.tsx
import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ModalPortal from "../../components/modal/ModalPortal";
import { BsHeartFill } from "react-icons/bs";

interface ErrorModalProps {
  onClose: () => void;
}

const ErrorModal: FC<ErrorModalProps> = ({ onClose }) => {
  return (
    <ModalPortal onClose={onClose}>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <ErrorMessage>
          <BsHeartFill />
          <p>날씨어때에 가입하여 해당 게시물에 좋아요를 눌러보세요!</p>
        </ErrorMessage>

        <LinkContainer>
          <button className="signup">
            <Link to={"/signup"}>가입하기</Link>
          </button>
          <button className="login">
            <Link to={"/login"}>로그인</Link>
          </button>
        </LinkContainer>
      </ModalContent>
    </ModalPortal>
  );
};

export default ErrorModal;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  padding: 20px 20px 40px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: #000;
  border: none;
  background-color: transparent;
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0 30px;
  svg {
    font-size: 50px;
    color: #5d6dbe;
  }
  p {
    margin-top: 15px;
    font-size: 18px;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    width: 130px;
    height: 45px;
    border-radius: 15px;
    text-align: center;
    font-size: 20px;
    font-family: "Jua", sans-serif;
  }
  .signup {
    margin-right: 20px;
    background-color: transparent;
    color: #5d6dbe;
    border: 1px solid #5d6dbe;
  }
  .login {
    background-color: #5d6dbe;
    color: #fff;
    border: none;
  }
`;
