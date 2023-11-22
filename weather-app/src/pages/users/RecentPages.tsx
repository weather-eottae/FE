// RecentPages.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
  id: number;
  imageUrl: string;
}

// 이미지 목록을 불러오는 가상의 함수. 백엔드 구현시 실제 데이터 호출로 대체.
// 각 페이지에 대해 8개의 이미지를 생성.
// 페이지와 인덱스를 사용하여 각 이미지에 고유한 번호를 부여.
const fetchImages = (page: number): ImageData[] => {
  // 이 함수는 페이지 번호에 따라 새로운 이미지 데이터 배열을 반환.
  // 페이지 번호와 인덱스를 사용하여 이미지에 고유한 ID를 할당.
  return Array.from({ length: 10 }, (_, index) => {
    const postNumber = (page - 1) * 10 + (index + 1); // 페이지가 1부터 시작한다고 가정.
    return {
      id: postNumber,
      imageUrl: `https://via.placeholder.com/150?text=Post+${postNumber}`,
    };
  });
};

const RecentPages = () => {
  // images의 상태 타입을 ImageData[]로 지정하여 never[] 타입으로 추론되는 것을 방지.
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState<number>(0);

  // 무한 스크롤을 구현하기 위한 함수.
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    // 페이지 끝에 도달했는지 확인.
    if (scrollHeight - scrollTop === clientHeight) {
      loadMoreImages();
    }
  };

  // 새 이미지를 불러오는 함수.
  const loadMoreImages = () => {
    const newImages = fetchImages(page + 1);
    setImages((prevImages) => {
      // 기존 이미지 배열에 없는 새 이미지만을 추가.
      const imageIds = new Set(prevImages.map((img) => img.id));
      const uniqueNewImages = newImages.filter(
        (newImg) => !imageIds.has(newImg.id)
      );
      return [...prevImages, ...uniqueNewImages];
    });
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    loadMoreImages(); // 첫 번째 이미지 로드
    window.addEventListener("scroll", handleScroll);
    // 스크롤 이벤트 리스너를 정리
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // 빈 의존성 배열을 전달하여 마운트 시에만 실행

  return (
    <GridContainer>
      {images.map((img) => (
        <Image key={img.id} src={img.imageUrl} alt={`Post ${img.id}`} />
      ))}
    </GridContainer>
  );
};

export default RecentPages;
