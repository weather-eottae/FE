//ModalOverlay.tsx

import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

type ModalOverlayProps = {
  children: React.ReactNode;
};

const ModalOverlay: React.FC<ModalOverlayProps> = ({ children }) => {
  return <Overlay>{children}</Overlay>;
};

export default ModalOverlay;
