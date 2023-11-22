import React, { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Container } from "./ChatNotice.styled";
import noticeBanner1 from "../../assets/img/noticeBanner1.png";
import noticeBanner2 from "../../assets/img/noticeBanner2.png";

register();

const ChatNotice: React.FC = () => {
  const swiperElRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (swiperElRef.current) {
      const swiperContainer = document.createElement("swiper-container") as any;
      swiperContainer.slidesPerView = 1;
      swiperContainer.loop = true;
      swiperContainer.pagination = { clickable: true };
      swiperContainer.autoplay = { delay: 3000, disableOnInteraction: false };
      swiperContainer.navigation = true;

      // 이미지를 포함하는 swiper-slide 요소들을 추가
      const slide1 = document.createElement("swiper-slide");
      const img1 = document.createElement("img");
      img1.src = noticeBanner1; // 이미지 모듈 사용
      img1.alt = "Slide 1";
      slide1.appendChild(img1);

      const slide2 = document.createElement("swiper-slide");
      const img2 = document.createElement("img");
      img2.src = noticeBanner2; // 이미지 모듈 사용
      img2.alt = "Slide 2";
      slide2.appendChild(img2);

      swiperContainer.appendChild(slide1);
      swiperContainer.appendChild(slide2);

      swiperElRef.current.appendChild(swiperContainer);
      swiperContainer.initialize();
    }
  }, []);

  return (
    <Container>
      <div ref={swiperElRef}></div>
    </Container>
  );
};

export default ChatNotice;
