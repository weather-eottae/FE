import React from "react";

import styled from "styled-components";

const LoginBut = () => {
  return (
    <LoginWrap>
      <SignUp>SignUp</SignUp>
      <Login>Login</Login>
    </LoginWrap>
  );
};

export default LoginBut;

const LoginWrap = styled.div`
  width: 63vw;
  display: flex;
  gap: 10px;
  justify-content: end;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const Login = styled.div`
  background-color: #3563e9;
  width: 5rem;
  height: 2rem;
  border-radius: 5px;
  text-align: center;
  line-height: 2rem;

  color: white;
`;

const SignUp = styled.div`
  border: 1px solid #3563e9;
  width: 5rem;
  height: 2rem;
  border-radius: 5px;
  text-align: center;
  line-height: 2rem;

  color: #3563e9;
`;
