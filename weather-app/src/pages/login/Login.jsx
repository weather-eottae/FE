import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import login from "../../assets/img/login/login.png";
import devicon_google from "../../assets/img/login/devicon_google.png";
import kakao from "../../assets/img/login/kakao.png";
import axios from "axios";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    if (e.target.name === "email") {
      setUserId(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://43.200.188.52:8080/login", {
        email: userId,
        password: password,
      });
      const accessToken = response.headers["authorization_access_token"];
      const refreshToken = response.headers["authorization_refresh_token"];

      if (accessToken && refreshToken) {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        navigate("/");
      } else {
        console.log("토큰이 없습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
    }
  };

  return (
    <Container>
      <div className="cover-img">
        <img src={login} alt="login" height="100%" width="720px" />
      </div>

      <div className="loginPage">
        <div className="loginPage-content">
          <h1>로그인</h1>
          <p>오늘도 좋은 날이에요</p>
          <div className="form-container">
            <div className="textfield-container">
              <input
                type="text"
                value={userId}
                name="email"
                id=""
                placeholder="이메일"
                onChange={handleInputChange}
              />
              <input
                type="password"
                value={password}
                name="password"
                placeholder="비밀번호"
                onChange={handleInputChange}
              />
            </div>
            <div className="button-container">
              <div className="checkbox">
                <input type="checkbox" id="checkbox" />
                로그인 정보 기억하기
              </div>
              <div className="button">
                <button onClick={handleSubmit}>로그인</button>
              </div>
            </div>
          </div>
          <div className="password-container">
            <p>비밀번호를 잊으셨나요?</p>
          </div>
          <div className="line">
            <hr className="line" />
            <p>Or</p>
            <hr className="line" />
          </div>
          <div className="social-login">
            <img src={devicon_google} alt="google" />
            <img src={kakao} alt="kakao" />
          </div>
          <div className="signup-container">
            <h3>
              아이디가 없으신가요?{" "}
              <h6>
                <Link to="/signup">회원가입하기</Link>
              </h6>
            </h3>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1440px;
  height: 100vh;
  margin: 0 auto;

  .loginPage {
    display: flex;
    justify-content: center;
    background-color: #505ea3;
    color: white;
    width: 720px;
  }
  .loginPage-content {
    display: flex;
    flex-direction: column;
    justify-content: center;

    text-align: center;
    width: 70%;
    row-gap: 20px;
  }

  h1 {
    font-size: 36px;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 10px;
  }

  .textfield-container {
    display: flex;
    flex-direction: column;

    justify-content: center;
    row-gap: 10px;
  }

  input[type="text"],
  input[type="password"] {
    margin: 0 auto;
    height: 35px;
    width: 400px;
    background-color: #505ea3;
    color: white;
    border: 0.2px solid white;
    border-radius: 10px;
    outline: none;

    &::placeholder {
      color: #ffffff80;
      font-family: "Jua", sans-serif;
    }
  }

  .button-container {
    margin: 0 auto;
    .checkbox {
      margin: 10px 0 0;
    }
  }

  button {
    height: 50px;
    width: 400px;
    background-color: #d9d9d9;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    margin-top: 10px;

    &:hover {
      background-color: #a6a6a6;
    }
  }

  .line {
    display: flex;
    flex-direction: row;

    & hr {
      width: 30%;
    }
  }
  .social-login {
    display: flex;
    justify-content: space-evenly;

    & img {
      cursor: pointer;
    }
  }
  h3 {
    line-height: 1.4;
    h6 {
      font-size: 14px;
      & a:hover,
      & a.active {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 770px) {
    .cover-img {
      display: none;
    }
  }
`;
