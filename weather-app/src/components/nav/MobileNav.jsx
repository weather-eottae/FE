import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../../assets/img/nav/logo.png";
import archive from "../../assets/img/nav/archive.png";
import weather from "../../assets/img/nav/weather.png";
import chat from "../../assets/img/nav/chat-square-text.png";
import clothing from "../../assets/img/nav/window-stack.png";
import user from "../../assets/img/nav/person-vcard.png";
import { useNavigate } from "react-router-dom";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    toggleNav();
    navigate(path);
  };

  return (
    <Container phoneOpen={isOpen}>
      <Wrap>
        <HamburgerMenu onClick={toggleNav}>
          <div />
          <div />
          <div />
        </HamburgerMenu>
        <LogoWrap>
          <Link
            to={"/"}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/");
            }}
          >
            <h1>
              <img src={logo} alt="로고" />
            </h1>
          </Link>
        </LogoWrap>
        <LogoutButton phoneOpen={isOpen}>
          <p>logout</p>
        </LogoutButton>
      </Wrap>
      <NavWrap phoneOpen={isOpen}>
        <li>
          <Link
            to={"/"}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/");
            }}
          >
            <span>
              <img src={weather} alt="오늘의 날씨" />
              오늘의 날씨
            </span>
          </Link>
        </li>
        <li>
          <Link
            to={"/chat"}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/chat");
            }}
          >
            <span>
              <img src={chat} alt="지역 톡" />
              지역 톡
            </span>
          </Link>
        </li>
        <li>
          <Link
            to={"/feed"}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/feed");
            }}
          >
            <span>
              <img src={clothing} alt="오늘 뭐 입지" />
              오늘 뭐 입지
            </span>
          </Link>
        </li>
        <li>
          <Link
            to={"/archive"}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/archive");
            }}
          >
            <span>
              <img src={archive} alt="게시글 등록" />
              게시글 등록
            </span>
          </Link>
        </li>
        <li>
          <Link
            to={"/user"}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/user");
            }}
          >
            <span>
              <img src={user} alt="마이 페이지" />
              마이 페이지
            </span>
          </Link>
        </li>
      </NavWrap>
    </Container>
  );
};

export default MobileNav;

const sizes = {
  phone: "430px",
};

// 미디어 쿼리
const media = {
  phone: `(max-width: ${sizes.phone})`,
};

const HamburgerMenu = styled.div`
  width: 30px;
  height: 25px;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  z-index: 10;
  position: absolute;
  top: 15px;
  left: 10px;

  div {
    width: 100%;
    height: 3px;
    background-color: #fff;
  }

  @media ${media.phone} {
    display: flex;
    justify-content: space-around;
  }
`;

const Wrap = styled.div`
  position: fixed;
  @media ${media.phone} {
    display: flex;
    justify-content: ${({ phoneOpen }) =>
      phoneOpen ? "center" : "space-around"};
    align-items: flex-start;
    width: 100%;
    height: ${({ phoneOpen }) => (phoneOpen ? "100vh" : "auto")};
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    background-color: #5d6dbe;
    border-bottom: 2px solid #fff;
  }
`;

const Container = styled.div`
  @media ${media.phone} {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: ${({ phoneOpen }) => (phoneOpen ? "100vh" : "auto")};
    overflow: hidden;
    background-color: #5d6dbe;
  }
`;

const LogoWrap = styled.div`
  @media ${media.phone} {
    margin-left: -30px;
  }
`;

const NavWrap = styled.ul`
  position: absolute;
  top: 20%;
  left: 27%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;

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
    @media ${media.phone} {
      flex-direction: column;
      display: ${({ phoneOpen }) => (phoneOpen ? "flex" : "none")};
    }
  }
`;

const LogoutButton = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 20px;
  border: none;
  position: absolute;
  top: 15px;
  right: 10px;
`;
