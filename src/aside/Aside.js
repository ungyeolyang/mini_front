import { Link, Outlet, useNavigate } from "react-router-dom";
import LogoImg from "../image/로고.png";
import LogoStImg from "../image/로고-문구.png";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import LoginAxiosApi from "../api/LoginAxiosApi";
import { UserContext } from "../context/UserStore";
import SideBar from "../component/SideBar";
import MeetingAxiosApi from "../api/MeetingAxiosApi";
import MyMeeting from "./MyMeeting";
import Accept from "./Accept";

const Container = styled.div`
  display: flex;

  @media (max-width: 720px) {
    display: flex;
    flex-direction: column;
  }
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

  @media (max-width: 720px) {
    display: flex;
    height: 5rem;
    width: 100vw;
  }
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

const Head = styled.div`
  background-color: #b8d0fa;
  padding: 0.7rem;
  border-radius: 1rem 1rem 0 0;
`;

const Aside = () => {
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  const [member, setMember] = useState();
  const [myMeeting, setMyMeeting] = useState();
  const [accept, setAccept] = useState();
  const [refresh, setRefresh] = useState(false);

  const onClickDetail = (props) => {
    console.log(props);
    navigate(`/meeting/${props.no}`);
  };

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

  //모임 수락버튼 클릭
  const onClickOk = async (user) => {
    try {
      const rsp = await MeetingAxiosApi.acceptOk(user.no, user.id);
      if (rsp.data) {
        console.log("수락성공");
        setRefresh(!refresh);
      } else {
        console.log("수락실패");
      }
    } catch (e) {}
  };
  //모임 거절버튼 클릭
  const onClickNo = async (user) => {
    try {
      const rsp = await MeetingAxiosApi.delMember(user.no, user.id);
      if (rsp.data) {
        console.log("거절성공");
        setRefresh(!refresh);
      } else {
        console.log("거절실패");
      }
    } catch (e) {}
  };

  const myMeetingList = async () => {
    try {
      const rsp = await MeetingAxiosApi.myMeetingList(id);
      if (rsp.data) {
        console.log(rsp.data);
        setMyMeeting(rsp.data);
      } else {
        console.log("가입한 모임이없습니다.");
      }
    } catch (e) {
      console.log("내모임 에러.");
    }
  };

  //친구 신청받은 목록
  const acceptList = async () => {
    try {
      const rsp = await MeetingAxiosApi.acceptList(id);
      if (rsp.data) {
        console.log(rsp.data);
        setAccept(rsp.data);
      } else {
        console.log(`리스트가 없음`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getMember = async () => {
    try {
      const rsp = await LoginAxiosApi.memberGetOne(id);
      setMember(rsp.data[0]);
      setNick(rsp.data[0]?.nick);
      setImgUrl(rsp.data[0]?.profile);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMember();
    myMeetingList();
    acceptList();
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
          <header>
            <Head>내모임</Head>
            {myMeeting &&
              myMeeting.map((meeting) => (
                <MyMeeting
                  meeting={meeting}
                  onclickDetail={onClickDetail}
                ></MyMeeting>
              ))}
          </header>
          {accept &&
            accept.map((user) => (
              <Accept
                user={user}
                onClickOk={onClickOk}
                onClickNo={onClickNo}
              ></Accept>
            ))}
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
        id={id}
      ></SideBar>
    </Container>
  );
};

export default Aside;
