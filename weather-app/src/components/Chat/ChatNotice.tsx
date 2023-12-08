import React, { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Container } from "./ChatNotice.styled";
import noticeBanner0 from "../../assets/img/chat/noticeBanner0.png";
import noticeBanner1 from "../../assets/img/chat/noticeBanner1.png";
import noticeBanner2 from "../../assets/img/chat/noticeBanner2.png";

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

      // 첫 번째 슬라이드
      const slide1 = document.createElement("swiper-slide");
      const img1 = document.createElement("img");
      img1.src = noticeBanner0; // 첫 번째 이미지
      img1.alt = "Slide 1";
      slide1.appendChild(img1);

      // 두 번째 슬라이드
      const slide2 = document.createElement("swiper-slide");
      const img2 = document.createElement("img");
      img2.src = noticeBanner1; // 두 번째 이미지
      img2.alt = "Slide 2";
      slide2.appendChild(img2);

      // 세 번째 슬라이드
      const slide3 = document.createElement("swiper-slide");
      const img3 = document.createElement("img");
      img3.src = noticeBanner2; // 세 번째 이미지
      img3.alt = "Slide 3";
      slide3.appendChild(img3);

      // 슬라이드 컨테이너에 슬라이드 추가
      swiperContainer.appendChild(slide1);
      swiperContainer.appendChild(slide2);
      swiperContainer.appendChild(slide3);

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
