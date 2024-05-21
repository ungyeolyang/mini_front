import styled from "styled-components";
import Title from "./Title";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserStore";

const StyledHeader = styled.div`
  display: ${({ isLogin }) => (isLogin ? `flex` : `none`)};
  width: 95%;
  position: absolute;
  top: 0px;
  justify-content: center;
  align-items: top;
  padding: 2rem;
`;

const Circle = styled.div`
  position: absolute;
  top: -15rem;
  right: -17rem;
  width: 35rem;
  height: 30rem;
  border-radius: 50%;
  background-color: #e9edc9;
  opacity: ${({ hover }) => (hover ? 0.5 : 0)};
`;

const StyledGiHamburgerMenu = styled(GiHamburgerMenu)`
  display: ${({ isOpen }) => (isOpen ? `none` : ``)};
  font-size: 3rem;
  position: absolute;
  right: 3rem;
  cursor: pointer;
  z-index: 1;
`;

const Header = ({ title, isLogin }) => {
  const [isHover, setIsHover] = useState(false);
  const context = useContext(UserContext);
  const { setIsOpen, isOpen } = context;
  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };
  const onClickHam = () => {
    setIsOpen(true);
  };
  return (
    <StyledHeader isLogin={isLogin}>
      <Title>{title}</Title>
      <StyledGiHamburgerMenu
        onClick={onClickHam}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        isOpen={isOpen}
      />
      <Circle hover={isHover} />
    </StyledHeader>
  );
};
export default Header;
