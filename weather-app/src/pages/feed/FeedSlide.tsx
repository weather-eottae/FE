import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "styled-components";
import VideoCont from "./VideoCont";

interface ImgsProps {
  imgs: string[];
}

const FeedSlide: FC<ImgsProps> = ({ imgs }) => {
  const isVideo = (url: string) => {
    return url.includes(
      ".mp4" || ".avi" || ".wmv" || ".asf" || ".mkv" || ".mov"
    );
  };

  return (
    <>
      <StyledSwiper
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {imgs?.map((img, index) => (
          <SwiperSlide key={index}>
            {isVideo(img) ? (
              <VideoCont src={img} />
            ) : (
              <img src={img} alt={`slide ${index + 1}`} />
            )}
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </>
  );
};

export default FeedSlide;

const StyledSwiper = styled(Swiper)`
  width: 500px;
  height: 500px;
  border-radius: 5px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    line-height: 8px;
    color: #000;
    opacity: 1;
    background: rgba(255, 255, 255, 0.6);
  }

  .swiper-pagination-bullet-active {
    background: #5d6dbe;
    opacity: 0.8;
  }

  .swiper-button-prev,
  .swiper-button-next {
    background-color: #fff;
    opacity: 0.6;
    height: 30px;
    width: 30px;
    border-radius: 30px;

    &:after {
      font-size: 1rem;
      font-weight: bold;
      color: #5d6dbe;
    }
  }
`;
