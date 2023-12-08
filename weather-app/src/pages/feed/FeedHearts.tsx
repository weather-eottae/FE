import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { toggleLike, fetchHeartUsers } from "../../api/feed";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import ErrorModal from "./ErrorModal";
import HeartsModal from "./HeartsModal";

interface FeedHeartsProps {
  postId: number;
  liked: boolean;
  heartCount: number;
}

const FeedHearts: FC<FeedHeartsProps> = ({
  postId,
  liked,
  heartCount: initialHeartCount,
}) => {
  const [isHeart, setIsHeart] = useState(liked);
  const [heartCount, setHeartCount] = useState(initialHeartCount);

  const [showErrorModal, setShowErrorModal] = useState(false); // 에러 모달 상태
  const [showHeartsModal, setShowHeartsModal] = useState(false); // 좋아요 유저 모달 상태

  const [heartUsers, setHeartUsers] = useState([]);

  useEffect(() => {
    setIsHeart(liked);
  }, [liked]);

  const handleLike = async () => {
    if (!localStorage.getItem("access_token")) {
      setShowErrorModal(true);
      return;
    }

    try {
      const response = await toggleLike(postId);

      if (response.status === 201) {
        setIsHeart(true);
        setHeartCount(heartCount + 1);
      } else if (response.status === 204) {
        setIsHeart(false);
        setHeartCount(heartCount - 1);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          setShowErrorModal(true);
        } else {
          console.error("Error toggling like:", error);
        }
      }
    }
  };

  const openModal = async () => {
    if (heartCount > 0) {
      const users = await fetchHeartUsers(postId);
      setHeartUsers(users);
      setShowHeartsModal(true);
    }
  };

  const closeModal = (modalType: string) => {
    if (modalType === "error") {
      setShowErrorModal(false);
    } else if (modalType === "hearts") {
      setShowHeartsModal(false);
    }
  };

  return (
    <HeartContainer>
      <HeartButton onClick={handleLike}>
        {isHeart ? <StyledHeartFill /> : <BsHeart />}
      </HeartButton>

      {heartCount > 0 ? (
        <HeartsModalButton onClick={openModal}>
          좋아요 <span>{heartCount}</span>개
        </HeartsModalButton>
      ) : (
        <p>좋아요</p>
      )}

      {showErrorModal && <ErrorModal onClose={() => closeModal("error")} />}
      {showHeartsModal && (
        <HeartsModal
          heartUsers={heartUsers}
          onClose={() => closeModal("hearts")}
        />
      )}
    </HeartContainer>
  );
};

export default FeedHearts;

const HeartContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 10px 0;
`;

const HeartButton = styled.button`
  border: none;
  background-color: transparent;
  margin-right: 8px;
  padding: 0;
  font-size: 1.25rem;
  display: flex;
  :hover {
    opacity: 0.6;
    transition: all 0.1s ease-in-out;
  }
`;

const StyledHeartFill = styled(BsHeartFill)`
  color: #5d6dbe;
`;

const HeartsModalButton = styled.button`
  border: none;
  background-color: transparent;
  font-family: "Jua", sans-serif;
  font-size: 0.875rem;
  line-height: 20px;
  color: #4d4343;
  padding: 0;
`;
