//DeleteConfirmationModal.tsx

import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    // const access_token = localStorage.getItem("access_token");
    // if (!access_token) {
    //   console.error("Access token not found");
    //   return;
    // }

    try {
      const response = await axios.delete(
        "http://43.200.188.52:8080/api/user",
        {
          headers: {
            Authorization: token, // 토큰을 헤더에 추가
          },
        }
      );
      console.log("회원 탈퇴 성공:", response.data);
      onClose();
      navigate("/");
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
    }
  };

  const ModalContainer = styled.div`
    align-items: center;
    position: fixed;
    font-size: 20px;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 160px;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  `;

  const StyledParagraph = styled.p`
    text-align: center;
    margin: 30px;
    padding: 0;
  `;

  const Button = styled.button`
    margin: 10px;
    padding: 10px 20px;
    gap: 1px;
    display: flex;

    align-items: center;
    border: none;
    background-color: #5d6dbe;
    color: white;
    cursor: pointer;
    border-radius: 10px;
    font-size: 15px;

    font-family: "Jua", sans-serif;
    &:hover {
      background-color: #4e5ca1;
    }
  `;

  const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    gap: 30px;

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
      top: 10px;
    }

    &::after {
      bottom: 10px;
    }
  `;

  return (
    <ModalContainer>
      <StyledParagraph>❗ 정말 탈퇴하시겠습니까?</StyledParagraph>
      <ButtonsContainer>
        <Button onClick={handleConfirmDelete}>예</Button>
        <Button onClick={onClose}>아니오</Button>
      </ButtonsContainer>
    </ModalContainer>
  );
};

export default DeleteConfirmationModal;
