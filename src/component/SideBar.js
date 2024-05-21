import { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { UserContext } from "../context/UserStore";

const openSide = (open) => keyframes`
0% {
  right: -20vw;
}
100% {
  right: 0;
}
`;

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
  /* border-top-left-radius: 85px; */
  width: 20vw;
  animation: ${({ isOpen }) => openSide(isOpen)} 0.4s forwards;
`;

const SideBar = ({ children, isOpen, setIsOpen }) => {
  const onClickOut = () => {
    setIsOpen(false);
  };

  const onClickSide = (e) => {
    e.stopPropagation();
  };

  return (
    <Container isOpen={isOpen} onClick={onClickOut}>
      <StyledSideBar isOpen={isOpen} onClick={onClickSide}>
        {children}
      </StyledSideBar>
      ;
    </Container>
  );
};
export default SideBar;
