import React from "react";
import styled from "styled-components";
import 기온표 from "../../assets/img/main/기온표.png";
import 패딩 from "../../assets/img/main/패딩.jpg";
import 코트 from "../../assets/img/main/코트.jpg";

const DayClothes = () => {
  return (
    <DayClothesWrap>
      <h2 className="title">오늘의 추천 옷차림</h2>
      <div className="clothes__info">
        <img src={기온표} />
        <div>
          <p className="weather-info">오늘의 평균 기온은 14°C 입니다</p>
          <div className="clothes">
            <h2>추천의상</h2>

            <img className="clothes__img" src={코트} />
            <img className="clothes__img" src={패딩} />

            <p>자켓, 가디건, 야상, 스타킹</p>
          </div>
        </div>
      </div>
    </DayClothesWrap>
  );
};

export default DayClothes;

const DayClothesWrap = styled.div`
  width: 470px;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 4px 10px 0 #dcdbdb;
  .title {
    text-align: center;
    font-size: 24px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .clothes__info {
    display: flex;
    gap: 30px;
    justify-content: center;
  }
  .clothes {
    text-align: center;
    border-radius: 10px;

    box-shadow: 2px 4px 10px 0 #dcdbdb;
    h2 {
      font-size: 24px;
      padding-top: 30px;
      padding-bottom: 30px;
    }
    p {
      font-size: 20px;
      padding-bottom: 50px;
      padding-top: 50px;
    }
  }
  .weather-info {
    font-size: 20px;
    padding: 20px;
  }
  .clothes__img {
    width: 100px;
  }
`;
