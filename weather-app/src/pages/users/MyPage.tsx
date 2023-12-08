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
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
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
  const [nickName, setNickName] = useState("NickName");
  const [statusMessage, setStatusMessage] = useState("Have a nice day!");

  //백엔드에서 nickname, message불러오기
  useEffect(() => {
    const fetchData = async () => {
      // 로컬 스토리지에서 access_token 가져오기
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get("http://43.200.188.52:8080/api/user", {
          headers: {
            Authorization: token, // 토큰을 요청 헤더에 추가
          },
        });

        setNickName(response.data.nickName || "nickName"); // 백엔드 응답이 없을 경우 기본값 사용
        setStatusMessage(response.data.message || "Have a nice day!"); // 백엔드 응답이 없을 경우 기본값 사용
        setProfileImage(response.data.imageUrl || "/person-circle.svg");
      } catch (error) {
        console.error("백엔드로부터 데이터를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleUserInfoChange = (
    newProfileImage: string,
    newNickname: string,
    newStatusMessage: string
  ) => {
    setProfileImage(newProfileImage);
    setNickName(newNickname);
    setStatusMessage(newStatusMessage);
    <UserInfo
      isOpen={isUserInfoModalOpen}
      onClose={handleToggleUserInfoModal}
      onSave={handleUserInfoChange}
    />;
  };

  return (
    <MyPageContainer>
      {/* <ProfileImage src="/person-circle.svg" alt="프로필 이미지" /> */}
      <ProfileImage src={profileImage} alt="프로필 이미지" />
      <ProfileInfo>
        <Nickname>{nickName} 님</Nickname>
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
