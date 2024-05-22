import { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { UserContext } from "../context/UserStore";

const openSide = keyframes`
0% {
  right: -20vw;
}
100% {
  right: 0;
}`;

const closeSide = keyframes`
0% {
  right: 0;
}
100% {
  right: -20vw;
}`;

const sideBar = (onDisplay) => {
  return onDisplay ? openSide : closeSide;
};

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
`;
const StyledSideBar = styled.div`
  position: fixed;
  right: 0;
  height: 100vh;
  background-color: #fefae0;
  width: 20vw;
  animation: ${({ onDisplay }) => sideBar(onDisplay)} 0.4s forwards;
`;

const SideBar = ({ children, isOpen, setIsOpen, onDisplay, setOnDisplay }) => {
  const onClickOut = () => {
    setOnDisplay(false);
    const timer = setTimeout(() => setIsOpen(false), 300);
    return () => clearTimeout(timer);
  };

  const onClickSide = (e) => {
    e.stopPropagation();
  };

  return (
    <Container isOpen={isOpen} onClick={onClickOut}>
      <StyledSideBar
        isOpen={isOpen}
        onDisplay={onDisplay}
        onClick={onClickSide}
      >
        {children}
      </StyledSideBar>
      ;
    </Container>
  );
};
export default SideBar;
