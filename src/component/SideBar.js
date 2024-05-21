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

const StyledSideBar = styled.div`
  position: fixed;
  right: 0;
  height: 100vh;
  background-color: #fefae0;
  /* border-top-left-radius: 85px; */
  width: 20vw;
  display: ${({ open }) => (open ? "flex" : "none")};
  animation: ${({ open }) => openSide(open)} 0.4s forwards;
`;

const SideBar = ({ children }) => {
  const context = useContext(UserContext);
  const { isOpen } = context;

  return <StyledSideBar open={isOpen}>{children}</StyledSideBar>;
};
export default SideBar;
