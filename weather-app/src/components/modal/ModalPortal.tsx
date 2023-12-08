import React, { FC, useEffect, ReactNode, MouseEvent } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface ModalPortalProps {
  children: ReactNode;
  onClose: () => void;
}

const ModalPortal: FC<ModalPortalProps> = ({ children, onClose }) => {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    if (!modalRoot) return;

    const scrollY = window.scrollY; // 현재 스크롤 위치
    document.body.style.cssText = `
      position: fixed;
      top: -${scrollY}px;
      overflow-y: scroll;
      width: 100%;`;

    return () => {
      document.body.style.cssText = "";
      window.scrollTo(0, scrollY);
    };
  }, [modalRoot]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <ModalBg onClick={onClose}>
      <div onClick={(e: MouseEvent) => e.stopPropagation()}>{children}</div>
    </ModalBg>,
    modalRoot
  );
};

export default ModalPortal;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
