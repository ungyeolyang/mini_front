import styled from "styled-components";
import { Link } from "react-router-dom";
import Right from "../component/Right";
import { useContext, useEffect, useState } from "react";
import LoginAxiosApi from "../api/LoginAxiosApi";
import { UserContext } from "../context/UserStore";

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
