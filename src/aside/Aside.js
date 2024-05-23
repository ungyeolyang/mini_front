import { Link, Outlet, useNavigate } from "react-router-dom";
import LogoImg from "../image/로고.png";
import LogoStImg from "../image/로고-문구.png";
import styled, { keyframes } from "styled-components";
import { useContext, useEffect, useState } from "react";
import LoginAxiosApi from "../api/LoginAxiosApi";
import { UserContext } from "../context/UserStore";
import SideBar from "../component/SideBar";

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
const Nick = styled.span`
  padding-top: 1rem;
  font-size: large;
  font-weight: bold;
`;

const Id = styled.span`
  color: gray;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 0.3rem 0.6rem;
  gap: 0.4rem;
  margin-top: 1rem;
  border-radius: 2rem;
  color: gray;
  border: 1px solid silver;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${(props) => props.color || `transparent`};
`;

const Aside = () => {
  const [member, setMember] = useState(null);

  const navigate = useNavigate();

  const context = useContext(UserContext);
  const {
    nick,
    setNick,
    imgUrl,
    setImgUrl,
    isLogin,
    color,
    isOpen,
    setIsOpen,
    onDisplay,
    setOnDisplay,
  } = context;

  const id = localStorage.getItem("id");

  const onClickLogo = () => {
    navigate(isLogin ? "/main" : "/");
  };

  const onClickProfil = () => {
    navigate(isLogin ? "/mypage" : "/");
  };

  const onClickLogOut = () => {
    navigate("/");
    localStorage.clear();
  };

  useEffect(() => {
    const getMember = async () => {
      try {
        const rsp = await LoginAxiosApi.memberGetOne(id);
        setMember(rsp.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    getMember();
    setNick(member?.nick);
    setImgUrl(member?.profile);
  }, [id, nick, imgUrl]);

  return (
    <Container>
      <Side isLogin={isLogin}>
        <Logo onClick={onClickLogo} isLogin={isLogin}>
          <img src={isLogin ? LogoImg : LogoStImg} alt="로고" />
        </Logo>
        <Body isLogin={isLogin}>
          <Profil onClick={onClickProfil} isLogin={isLogin}>
            <img src={member ? member?.profile : imgUrl} alt="User" />
          </Profil>
          <Nick>{member ? member?.nick : nick}</Nick>
          <Id>{"(" + id + ")"}</Id>
          <Button onClick={onClickLogOut}>
            로그아웃<span>[→</span>
          </Button>
          <footer>
            <Link to="/board">게시판</Link>ㅣ<Link to="/letter">편지함</Link>
          </footer>
        </Body>
      </Side>
      <Div color={color}>
        <Outlet />
      </Div>
      <SideBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDisplay={onDisplay}
        setOnDisplay={setOnDisplay}
      ></SideBar>
    </Container>
  );
};

export default Aside;
