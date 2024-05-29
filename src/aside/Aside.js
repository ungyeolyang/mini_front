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
import { FaBellSlash } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import { FaBell } from "react-icons/fa";

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
  @media (max-width: 720px) {
    padding: 0;
    margin-left: 5%;
    ${({ isLogin }) =>
      isLogin
        ? `img {
        width: 4rem;
        object-fit: cover; 
        
  }`
        : `{width: 5rem; height: 5rem; margin:0; padding:0;} img{width: 7rem; height: 7rem; object-fit: cover; margin-bottom: 10px; padding-bottom: 10px}`}
  }
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
  @media (max-width: 720px) {
    position: absolute;
    right: 100px;
    border-radius: 0;
    width: 100px;
    height: 2rem;
    background-color: transparent;
    img {
      display: none;
    }
    &::after {
      content: "마이페이지";
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: black;
    }
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
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: none;
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
    font-size: 14px;

    a {
      margin: 0.7rem;
    }

    a:hover {
      color: #94b9f3;
    }
  }

  @media (max-width: 720px) {
    display: ${({ isLogin }) => (isLogin ? "flex" : "none")};
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    footer {
      position: static;
      bottom: auto;
      width: 100%;
      display: flex;
      justify-content: center;
      margin-left: 60px;
      span.separator {
        display: none;
      }
    }
    a {
      color: black;
      font-weight: bold;
      font-size: 20px;
    }
    @media (max-width: 720px) {
      header {
        display: none;
      }
    }
  }
`;

const Nick = styled.span`
  padding-top: 1rem;
  font-size: large;
  font-weight: bold;
  @media (max-width: 720px) {
    display: none;
  }
`;

const Id = styled.span`
  color: gray;
  @media (max-width: 720px) {
    display: none;
  }
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
  @media (max-width: 720px) {
    border: 0;
    position: absolute;
    right: 1px;
    margin: 0;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${(props) => props.color || `transparent`};

  @media (max-width: 720px) {
    ${({ isLogin }) => (isLogin ? `{}` : `align-items:center; height: 100vw;`)}
  }
`;

const Head = styled.div`
  background-color: #b8d0fa;
  padding: 0.7rem;
  border-radius: 1rem 1rem 0 0;
  @media (max-width: 720px) {
    display: none;
  }
`;
const Icon = styled.button`
  width: 1rem;
  height: 1rem;
  background-color: transparent;
  margin: 0;
  padding: 0;
  border: 0;
  position: absolute;
  right: 200px;
  :hover {
    cursor: pointer;
  }
  @media (min-width: 721px) {
    display: none; /* 전체 화면이 721px 이상일 때 숨김 */
  }
`;
const Mdicon = styled.button`
  width: 1rem;
  height: 1rem;
  background-color: transparent;
  margin: 0;
  padding: 0;
  border: 0;
  position: absolute;
  right: 230px;
  :hover {
    cursor: pointer;
  }
  @media (min-width: 721px) {
    display: none; /* 전체 화면이 721px 이상일 때 숨김 */
  }
`;

const Aside = () => {
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  const [member, setMember] = useState();
  const [myMeeting, setMyMeeting] = useState();
  const [accept, setAccept] = useState();
  const [refresh, setRefresh] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false); // 메뉴 열림/닫힘 상태
  const [isOpen2, setIsOpen2] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false); // 알림 여부

  const onClickDetail = (props) => {
    console.log(props);
    navigate(`/meeting/${props.no}`);
  };
  const toggleMenu = () => {
    setIsOpen1(!isOpen1);
  };
  const toggleMenu1 = () => {
    setIsOpen2(!isOpen2);
  };
  const acceptList1 = async () => {
    try {
      const rsp = await MeetingAxiosApi.acceptList(id);
      if (rsp.data) {
        setAccept(rsp.data);
        setHasNotifications(rsp.data.length > 0); // 알림 여부 설정
      } else {
        console.log(`리스트가 없음`);
        setHasNotifications(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const myMeetingList1 = async () => {
    try {
      const rsp = await MeetingAxiosApi.myMeetingList1(id);
      if (rsp.data) {
        console.log(rsp.data);
        setMyMeeting(rsp.data);
      } else {
        console.log(`리스트가 없음`);
      }
    } catch (e) {
      console.log(e);
    }
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
    acceptList1();
    myMeetingList1();
  }, [id, nick, imgUrl, refresh, isOpen, hasNotifications]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 721) {
        setIsOpen1(false);
        setIsOpen2(false);
      }
    };

    window.addEventListener("resize", handleResize);
    // 초기 실행을 위해 호출
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      <Side isLogin={isLogin}>
        <Logo onClick={onClickLogo} isLogin={isLogin}>
          <img src={isLogin ? LogoImg : LogoStImg} alt="로고" />
        </Logo>
        <Body isLogin={isLogin}>
          <Icon onClick={toggleMenu}>
            {hasNotifications ? <FaBell /> : <FaBellSlash />}
          </Icon>
          {isOpen1 && (
            <div
              style={{
                position: "absolute",
                top: "3.7rem",
                right: "1rem",
                background: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                padding: "1rem",
                zIndex: 1000,
              }}
            >
              {accept && accept.length > 0 ? (
                accept.map((user) => (
                  <Accept
                    key={user.id}
                    user={user}
                    onClickOk={onClickOk}
                    onClickNo={onClickNo}
                  />
                ))
              ) : (
                <div>알림이 없습니다</div>
              )}
            </div>
          )}
          <Mdicon onClick={toggleMenu1}>
            <MdPeople />
          </Mdicon>
          {isOpen2 && (
            <div
              style={{
                position: "fixed",
                top: "60px",
                right: "225px",
              }}
            >
              <Head>내모임</Head>
              {myMeeting &&
                myMeeting.map((meeting) => (
                  <MyMeeting meeting={meeting} onclickDetail={onClickDetail} />
                ))}
            </div>
          )}
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

            {accept &&
              accept.map((user) => (
                <Accept
                  user={user}
                  onClickOk={onClickOk}
                  onClickNo={onClickNo}
                ></Accept>
              ))}
          </header>
          <footer>
            <Link to="/board">게시판</Link>
            <span className="separator">ㅣ</span>
            <Link to="/letter">편지함</Link>
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
