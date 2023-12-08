import React, { ReactNode } from "react";
import Nav from "../nav/Nav";
import Header from "../header/Header";
import styled from "styled-components";
import Footer from "../footer/Footer";

interface LayoutProps {
	children?: ReactNode;
	
}

const Layout: React.FC<LayoutProps> = ({ children}) => {
	return (
		<>
			<Container>
				<NavWrap>
					<Nav />
				</NavWrap>
				<Wrap>{children}</Wrap>
			</Container>
			<Footer />
		</>
	);
};

export default Layout;

// 스타일드 컴포넌트는 그대로 유지됩니다.
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  max-width: 1440px;
  margin: 0 auto;
  background-color: #ededed;
  @media (max-width: 430px) {
    flex-direction: column;
  }
`;

/* @media (max-width: 1280px) {
    margin-left: 20%;
  }
  @media (max-width: 1024px) {
    margin-left: 25%;
  }
  @media (max-width: 1024px) {
    margin-left: 30%;
  }
  @media (max-width: 1024px) {
    margin-left: 0;
  } */

const NavWrap = styled.div``;

const Wrap = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  @media (max-width: 430px) {
    width: 100%;
    padding-bottom: 0;
  }
`;
