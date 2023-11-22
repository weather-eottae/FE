//Button.tsx
import React from "react";
import styled, { css } from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant: "primary" | "secondary";
}

const StyledButton = styled.button<ButtonProps>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
  font-family: "Jua", sans-serif;

  ${({ variant }) =>
    variant === "primary" &&
    css`
      background-color: #5d6dbe;
      color: white;
    `}
  ${({ variant }) =>
    variant === "secondary" &&
    css`
      background-color: #5d6dbe;
      color: white;
    `}
  &:hover {
    background-color: #4e5ca1;
  }
`;

// Button 컴포넌트 정의
export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant,
}) => {
  return (
    <StyledButton onClick={onClick} variant={variant}>
      {children}
    </StyledButton>
  );
};
