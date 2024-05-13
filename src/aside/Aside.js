import { Link } from "react-router-dom";
import LogoImg from "../image/로고-fococlipping-standard.png";
import styled from "styled-components";
import { useState } from "react";

const Logo = styled.img`
  width: 100px;
  object-fit: cover;
`;
const Profil = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: black;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 100vh;
  background-color: #fefae0;
`;

const Aside = () => {
  const [member, setMember] = useState(null);

  return (
    <Side>
      <Logo src={LogoImg} alt="로고" />
      <Profil></Profil>
      <>이름 아이디</>
      모임
      <>게시판 쪽지함</>
    </Side>
  );
};

export default Aside;
