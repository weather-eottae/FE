//MyPage.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import UserInfo from "./UserInfo";
import RecentPages from "./RecentPages";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import {
  MyPageContainer,
  ProfileImage,
  ProfileInfo,
  Nickname,
  StatusMessage,
  ButtonGroup,
  Button,
  BoardList,
  RecentPagesWrapper,
} from "./MyPageStyles";

const MyPage = () => {
  const [isUserInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);

  const handleOpenDeleteConfirmationModal = () => {
    setDeleteConfirmationModalOpen(true);
  };

  const handleCloseDeleteConfirmationModal = () => {
    setDeleteConfirmationModalOpen(false);
  };

  const handleToggleUserInfoModal = () => {
    setUserInfoModalOpen(!isUserInfoModalOpen);
  };

  const [profileImage, setProfileImage] = useState("/person-circle.svg");
  const [nickname, setNickname] = useState("NickName");
  const [statusMessage, setStatusMessage] = useState("Have a nice day!");

  const handleUserInfoChange = (
    newProfileImage: string,
    newNickname: string,
    newStatusMessage: string
  ) => {
    setProfileImage(newProfileImage);
    setNickname(newNickname);
    setStatusMessage(newStatusMessage);
    <UserInfo
      isOpen={isUserInfoModalOpen}
      onClose={handleToggleUserInfoModal}
      onSave={handleUserInfoChange}
    />;
  };

  return (
    <MyPageContainer>
      <ProfileImage src="/person-circle.svg" alt="프로필 이미지" />

      <ProfileInfo>
        <Nickname>{nickname} 님</Nickname>
        {/* <p>현재 위치 : 서울특별시 중구</p> */}
        <StatusMessage>{statusMessage}</StatusMessage>
      </ProfileInfo>

      <ButtonGroup>
        <Button onClick={handleToggleUserInfoModal}>프로필 수정</Button>
        <Button onClick={handleOpenDeleteConfirmationModal}>회원탈퇴</Button>
      </ButtonGroup>

      <BoardList>
        <h2>최근 피드</h2>
        <RecentPagesWrapper>
          <RecentPages />
        </RecentPagesWrapper>
      </BoardList>

      {isUserInfoModalOpen && (
        <UserInfo
          isOpen={isUserInfoModalOpen}
          onClose={handleToggleUserInfoModal}
          onSave={handleUserInfoChange}
        />
      )}

      {isDeleteConfirmationModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteConfirmationModalOpen}
          onClose={handleCloseDeleteConfirmationModal}
        />
      )}
    </MyPageContainer>
  );
};

export default MyPage;
