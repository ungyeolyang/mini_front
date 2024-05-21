import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { UserContext } from "../context/UserStore";
import Header from "./Header";

const rightShow = (isLogin) => keyframes`
  0% {
    width: ${isLogin ? "60vw" : "40vw"};
  }
  100% {
    width: ${isLogin ? "80vw" : "60vw"};
  }
`;
const StyledRight = styled.div`
  display: flex;
  position: relative;
  background-color: ${({ backgroundColor }) => backgroundColor || `inherit`};
  ${({ isLogin }) => !isLogin && `flex-direction: column;`};
  justify-content: center;
  align-items: center;
  height: 100vh;
  animation: ${({ isLogin }) => rightShow(isLogin)} 0.4s forwards;
  width: ${({ isLogin }) => (isLogin ? "80vw" : "60vw")};
`;

// Right 컴포넌트 정의
const Right = ({ children, backgroundColor, title }) => {
  const context = useContext(UserContext);
  const { isLogin } = context;

  return (
    <StyledRight
      isLogin={isLogin}
      backgroundColor={backgroundColor}
      title={title}
    >
      <Header title={title} isLogin={isLogin} />
      {children}
    </StyledRight>
  );
};

export default Right;
