import React, { ReactNode } from "react";
import Nav from "../nav/Nav";
import styled from "styled-components";

interface LayoutProps {
  children?: ReactNode;
 
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Nav />
      <RightWrap>{children}</RightWrap>
    </Container>
  );
};

export default Layout;

// 스타일드 컴포넌트는 그대로 유지됩니다.
const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

const RightWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #ededed;
`;
