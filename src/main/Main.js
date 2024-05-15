import styled from "styled-components";
import { Link } from "react-router-dom";
import Right from "../component/Right";

const H = styled.h1`
  font-size: 4rem;
`;

const Main = () => {
  return (
    <>
      <Right>
        <H>메인</H>
        <Link to="/meeting">모임</Link>
      </Right>
    </>
  );
};

export default Main;
