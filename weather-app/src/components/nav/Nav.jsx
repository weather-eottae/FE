import React from "react";
import styled from "styled-components";
import logo from "../../assets/img/nav/logo.png";
import archive from "../../assets/img/nav/archive.png";
import weather from "../../assets/img/nav/weather.png";
import chat from "../../assets/img/nav/chat-square-text.png";
import clothing from "../../assets/img/nav/window-stack.png";
import user from "../../assets/img/nav/person-vcard.png";
import logout from "../../assets/img/nav/logout.png";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";

const Nav = () => {
  return (
    <>
      <StyledMobileNav>
        <MobileNav />
      </StyledMobileNav>
      <Container>
        <Link to={"/"}>
          <h1>
            <img src={logo} alt="로고" />
          </h1>
        </Link>
        <NavWrap>
          <li>
            <Link to={"/"}>
              <span>
                <img src={weather} />
                오늘의 날씨
              </span>
            </Link>
          </li>
          <li>
            <Link to={"/chat"}>
              <span>
                <img src={chat} />
                지역 톡
              </span>
            </Link>
          </li>
          <li>
            <Link to={"/feed"}>
              <span>
                <img src={clothing} />
                오늘 뭐 입지
              </span>
            </Link>
          </li>
          <li>
            <Link to={"/archive"}>
              <span>
                <img src={archive} />
                게시글 등록
              </span>
            </Link>
          </li>
          <li>
            <Link to={"/user"}>
              <span>
                <img src={user} />
                마이 페이지
              </span>
            </Link>
          </li>
        </NavWrap>
        <button>
          <img src={logout} />
        </button>
      </Container>
    </>
  );
};

export default Nav;

const sizes = {
  large: "1280px",
  desktop: "1024px",
  tablet: "768px",
  phone: "430px",
};

// 미디어 쿼리
const media = {
  large: `(max-width: ${sizes.large})`,
  desktop: `(max-width: ${sizes.desktop})`,
  tablet: `(max-width: ${sizes.tablet})`,
  phone: `(max-width: ${sizes.phone})`,
};

const Container = styled.div`
  width: 100%;
  max-width: 15%;
  height: 100%;
  max-height: 100vh;
  position: fixed;
  top: 0;
  background-color: #5d6dbe;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 20px;

  h1 {
    height: 20%;
    display: flex;
    align-items: flex-start;
  }
  button {
    border: none;
    margin-top: 200px;
    background: none;
  }
  @media ${media.large} {
    width: 20%;
  }
  @media ${media.desktop} {
    width: 25%;
    h1 {
      margin-top: -20px;
    }
  }
  @media ${media.tablet} {
    width: 30%;
    h1 {
      margin-top: -20px;
    }
  }
  @media ${media.phone} {
    display: none;
  }
`;

const NavWrap = styled.ul`
  /* width: 80%; */
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-around;

  li {
    width: 100%;
    display: flex;
    color: #fff;

    &:hover {
      border-radius: 10px;
      background-color: #edebeb;

      img {
        color: #000;
        background-color: #5d6dbe;
      }
      span {
        color: #5d6dbe;
        font-weight: bold;
      }
    }

    a {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 6px;
    }
    span {
      font-size: 1.125rem;
      color: inherit;
      margin-left: 5px;
      display: flex;
      align-items: center;
      transition: color 0.3s;

      img {
        width: 20px;
        height: 18px;
        object-fit: contain;
        padding: 5px;
        border-radius: 30%;
        margin-right: 5px;
        background: #c4c4c4;
        transition: background-color 0.3s;
      }
    }
    @media ${media.large} {
      span {
        font-size: 1rem;
      }
      @media ${media.desktop} {
        span {
          font-size: 0.925rem;
        }
      }
      @media ${media.tablet} {
        span {
          font-size: 0.825rem;
        }
      }
      @media ${media.phone} {
        span {
          font-size: 0.725rem;
        }
      }
    }
  }
`;

const StyledMobileNav = styled.div`
  display: none;
  @media ${media.phone} {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
`;
