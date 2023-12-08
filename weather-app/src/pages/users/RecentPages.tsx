// RecentPages.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import axios from "axios";
import EditPost from "../editpost/EditPost";

//npm install jwt-decode
//npm install @types/jwt-decode --save-dev 설치필요

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr); // 3개의 행
  grid-gap: 5px;
  margin-bottom: 2rem;
  margin-top: 2rem;
  justify-content: center;
  align-content: start;
  overflow-y: auto; // 세로 스크롤을 위해 auto로 설정
  height: calc(
    100px * 3 + 10px * 2
  ); // 이미지 높이 * 행 수 + (행 수 - 1) * grid-gap
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

interface ImageData {
  postId: number;
  mediaUrl: string;
  userId: number;
}

interface PostResponse {
  // API 응답 구조에 따라 필드를 조정해야 함
  postId: number;
  mediaUrls: string[];
  userId: number;
  // ...[다른 필요한 필드]
}

interface ApiResponse {
  content?: PostResponse[];
}

// 로그인한 사용자의 정보를 가져오는 함수
const fetchUserNickName = async (): Promise<string> => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found");
  }

  try {
    const response = await axios.get(`http://43.200.188.52:8080/api/user`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data.nickName;
  } catch (error) {
    console.error("Error fetching user nickname:", error);
    throw error;
  }
};

// 사용자의 게시물을 가져오는 함수
const fetchUserPosts = async (nickName: string): Promise<ImageData[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch(
    `http://43.200.188.52:8080/api/posts/user/${nickName}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.postResponseDtos.map((post: any) => ({
    mediaUrl: post.mediaUrls[0],
    postId: post.postId,
  }));
};

const RecentPages = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const nickName = await fetchUserNickName();
        const userPosts = await fetchUserPosts(nickName);
        setImages(userPosts);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadImages();
  }, []);

  return (
    <GridContainer>
      {images.map((img) => (
        // <Link key={img.postId} to={`/feed/${img.postId}`}>
        <Link key={img.postId} to={`/editpost/${img.postId}`}>
          <Image src={img.mediaUrl} alt={`Post ${img.postId}`} />
        </Link>
      ))}
    </GridContainer>
  );
};

export default RecentPages;
