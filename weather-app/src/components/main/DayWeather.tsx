import React from "react";
import styled from "styled-components";
import 비 from "../../assets/img/main/비.png";
import 평균기온 from "../../assets/img/main/온도.png";
import 자외선 from "../../assets/img/main/자외선.png";
import 강수확률 from "../../assets/img/main/강수.png";

const DayWaether = () => {
  return (
    <DayWaetherWarp>
      <h2 className="title">오늘의 날씨</h2>
      <TodayWrap>
        <img src={비} />
        <HighLowTemperatures>
          <div id="high">16</div>
          <div>--</div>
          <div id="low">12</div>
        </HighLowTemperatures>

        <div className="today-weather">14°C</div>
      </TodayWrap>
      <div className="weather__infos">
        <div className="weather__info--box">
          <p className="weather__info--title">평균기온</p>
          <img src={평균기온} />
          <p className="weather__info--value">14°C</p>
        </div>
        <div className="weather__info--box">
          <p className="weather__info--title">강수확률</p>
          <img src={자외선} />
          <p className="weather__info--value">20%</p>
        </div>
        <div className="weather__info--box">
          <p className="weather__info--title">강수확률</p>
          <img src={강수확률} />
          <p className="weather__info--value">높음</p>
        </div>
      </div>
    </DayWaetherWarp>
  );
};

export default DayWaether;

const DayWaetherWarp = styled.div`
  width: 470px;
  height: 500px;
  border-radius: 10px;
  box-shadow: 2px 4px 10px 0 #dcdbdb;
  background-color: white;
  text-align: center;
  .weather__info--title {
    font-size: large;

    margin: 10px 0 5px 0;
  }
  .weather__infos {
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 4.6rem;
      height: 4.6rem;
    }
  }
  .title {
    text-align: center;
    font-size: 24px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .weather__info--box {
    width: 115px;
    height: 160px;
    box-shadow: 2px 4px 10px 0 #dcdbdb;
    border-radius: 10px;
  }
  .weather__info--value {
    margin: 5px;
  }
`;

const TodayWrap = styled.div`
  display: flex;

  height: 230px;
  img {
    margin-left: 20px;
    width: 240px;
    height: 170px;
  }
  .today-weather {
    line-height: 150px;
    font-size: 64px;
    margin-left: 20px;
  }
`;

const HighLowTemperatures = styled.div`
  height: 230px;
  padding-top: 10%;
  font-size: 10px;

  #high {
    color: #ff0000;
    font-size: 20px;
  }
  #low {
    color: #5d6dbe;
    font-size: 20px;
  }
`;
