import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { UserContext } from "../context/UserStore";

const rightShow = (isLogin) => keyframes`
  0% {
    width: ${isLogin ? "55vw" : "40vw"};
  }
  100% {
    width: ${isLogin ? "75vw" : "60vw"};
  }
`;

const StyledRight = styled.div`
  display: flex;
  ${({ isLogin }) => !isLogin && `flex-direction: column;`};
  justify-content: center;
  align-items: center;
  height: 100vh;
  animation: ${({ isLogin }) => rightShow(isLogin)} 0.5s forwards;
  width: ${({ isLogin }) => (isLogin ? "75vw" : "60vw")};
`;

// Right 컴포넌트 정의
const Right = ({ children }) => {
  const context = useContext(UserContext);
  const { isLogin, setIsLogin } = context;

  return <StyledRight isLogin={isLogin}>{children}</StyledRight>;
};

export default Right;
