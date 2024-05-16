import { Link, Outlet, useNavigate } from "react-router-dom";
import LogoImg from "../image/로고.png";
import LogoStImg from "../image/로고-문구.png";
import BinImg from "../image/사람아이콘.png";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import LoginAxiosApi from "../api/LoginAxiosApi";
import { UserContext } from "../context/UserStore";

const Container = styled.div`
  display: flex;
`;

const Logo = styled.div`
  padding: 2rem;
  cursor: pointer;

  ${({ isLogin }) =>
    isLogin &&
    `img {
    width: 5rem;
    object-fit: cover;
  }`}
`;

const Profil = styled.div`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  background-color: silver;
  display: flex;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #fefae0;
  width: ${({ isLogin }) => (isLogin ? `20vw` : `40vw`)};
  justify-content: ${({ isLogin }) => !isLogin && `center`};
`;

const Body = styled.div`
  display: ${({ isLogin }) => (isLogin ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  height: 100%;

  footer {
    color: #707070;
    position: absolute;
    bottom: 3rem;

    a {
      margin: 0.7rem;
    }

    a:hover {
      color: #94b9f3;
    }
  }
`;

const Aside = () => {
  const [member, setMember] = useState(null);

  const navigate = useNavigate();

  const context = useContext(UserContext);
  const { nick, imgUrl, isLogin } = context;

  const id = localStorage.getItem("id");

  const onClickLogo = () => {
    navigate(isLogin ? "/main" : "/");
  };

  const onClickProfil = () => {
    navigate(isLogin ? "/mypage" : "/");
  };

  useEffect(() => {
    const getMember = async () => {
      try {
        const rsp = await LoginAxiosApi.memberGetOne(id);
        setMember(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMember();
  }, [nick, imgUrl]);

  return (
    <Container>
      <Side isLogin={isLogin}>
        <Logo onClick={onClickLogo} isLogin={isLogin}>
          <img src={isLogin ? LogoImg : LogoStImg} alt="로고" />
        </Logo>
        <Body isLogin={isLogin}>
          <Profil onClick={onClickProfil} isLogin={isLogin}>
            <img src={BinImg || member.image} alt="User" />
          </Profil>
          <>{nick}</>
          <footer>
            <Link to="/board">게시판</Link>ㅣ<Link to="/letter">쪽지함</Link>
          </footer>
        </Body>
      </Side>
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </Container>
  );
};

export default Aside;
