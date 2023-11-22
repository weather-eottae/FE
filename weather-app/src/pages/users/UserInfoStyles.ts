//UserInfoStyles.ts
import styled from "styled-components";

export const Header = styled.h2`
  color: #5d6dbe;
  font-size: 25px;
  text-align: left;
  margin-top: 2rem;
  margin-left: 1rem;
  margin-bottom: 40px;
`;

export const TopSection = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding-bottom: 20px;
`;

export const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  margin-top: 4rem;
`;

export const ProfileImagePreview = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  margin-left: 1rem;
`;

export const CustomFileInput = styled.label`
  display: flex;
  padding: 10px 15px;
  margin-left: 40%;
  margin-top: 1rem;
  background-color: #5d6dbe;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #4e5ca1;
  }
  input {
    display: none;
  }
`;

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 480px;
  height: 570px;
  display: flex;
  align-items: flex-start;

  position: relative;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 1;
    left: 0;
    right: 0;
    bottom: 1;
    height: 10px;
    background-color: #5d6dbe;
  }
  &:before {
    top: 20px;
  }

  &:after {
    bottom: 20px;
  }
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`;

export const Label = styled.label`
  color: #5d6dbe;
  padding: 2px;
`;

export const Input = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 2px solid #5d6dbe;
  background-color: white;
  color: #5d6dbe;
  margin-top: 3px;
  font-family: "Jua", sans-serif;
  margin-right: -15%;
  &:focus {
    outline: none;
    cursor: text;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-left: 1rem;
  width: 120%;
`;

export const Button = styled.button`
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  margin-top: 15px;
  color: white;
  cursor: pointer;
  font-family: "Jua", sans-serif;
  background-color: #5d6dbe;
  &:hover {
    background-color: #4e5ca1;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 20px;
  gap: 50px;
`;
