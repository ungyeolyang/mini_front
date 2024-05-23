import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import FriendAxiosApi from "../api/FriendAxiosApi";
import Profile from "./Profile";
import Btn from "./Btn";

const openSide = keyframes`
0% {
  right: -20vw;
}
100% {
  right: 0;
}`;

const closeSide = keyframes`
0% {
  right: 0;
}
100% {
  right: -20vw;
}`;

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDown = () => keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const sideBar = (onDisplay) => {
  return onDisplay ? openSide : closeSide;
};

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
`;
const StyledSideBar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  right: 0;
  height: 100vh;
  background-color: #fefae0;
  width: 20vw;
  animation: ${({ onDisplay }) => sideBar(onDisplay)} 0.4s forwards;
  header {
    position: absolute;
    top: 1rem;
  }
  footer {
    position: absolute;
    bottom: 0;
  }
`;
const Accept = styled.div`
  display: flex;
  opacity: 0;
  flex-direction: column;
  margin-bottom: 1rem;
  animation: ${slideUp} 0.5s 0.4s forwards;
`;
const Head = styled.div`
  background-color: #b8d0fa;
  padding: 0.7rem;
  border-radius: 1rem 1rem 0 0;
`;
const Body = styled.div`
  background-color: #e5f3ff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  border-radius: 0 0 1rem 1rem;
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Cdiv = styled.div`
  background-color: #e5f3ff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SideBar = ({ isOpen, setIsOpen, onDisplay, setOnDisplay, id }) => {
  const [sender, setSender] = useState([]);
  const [friend, setFriend] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const onClickOut = () => {
    setOnDisplay(false);
    const timer = setTimeout(() => setIsOpen(false), 300);
    return () => clearTimeout(timer);
  };

  const onClickSide = (e) => {
    e.stopPropagation();
  };

  //친구 신청받은 목록
  const sendList = async () => {
    try {
      const rsp = await FriendAxiosApi.sendList(id);
      if (rsp.data) {
        setSender(rsp.data);
      } else {
        console.log(`리스트가 없음`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //내친구 목록
  const friendList = async () => {
    try {
      const rsp = await FriendAxiosApi.friendList(id);
      if (rsp.data) {
        setFriend(rsp.data);
      } else {
        console.log(`리스트가 없음`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //친구 수락버튼 클릭
  const onClickOk = async (user) => {
    try {
      const rsp = await FriendAxiosApi.friendOk(id, user.sendId);
      if (rsp.data) {
        console.log("수락성공");
        setRefresh(!refresh);
      } else {
        console.log("수락실패");
      }
    } catch (e) {}
  };
  //친구 거절버튼 클릭
  const onClickNo = async (user) => {
    try {
      const rsp = await FriendAxiosApi.delFriend(id, user.sendId);
      if (rsp.data) {
        console.log("거절성공");
        setRefresh(!refresh);
      } else {
        console.log("거절실패");
      }
    } catch (e) {}
  };

  useEffect(() => {
    sendList();
    friendList();
  }, [isOpen]);

  return (
    <Container isOpen={isOpen} onClick={onClickOut}>
      <StyledSideBar
        isOpen={isOpen}
        onDisplay={onDisplay}
        onClick={onClickSide}
      >
        <header>
          <Head>내친구</Head>
          {friend &&
            friend.map((user) => (
              <Accept key={user.sendId}>
                <Div>
                  <Profile size={`5rem`}>
                    <img src={user?.sendProfile} alt="프로필" />
                  </Profile>
                  <Cdiv>
                    <div>
                      <span style={{ fontWeight: `bold` }}>
                        {user?.sendNick}
                      </span>
                      <span> ({user?.sendId})</span>
                    </div>
                  </Cdiv>
                </Div>
              </Accept>
            ))}
        </header>
        <footer>
          {sender &&
            sender.map((user) => (
              <Accept key={user.sendId}>
                <Head>
                  친구신청<span>{sender.length}</span>
                </Head>
                <Body>
                  <Profile size={`5rem`}>
                    <img src={user?.sendProfile} alt="프로필" />
                  </Profile>
                  <Cdiv>
                    <div>
                      <span style={{ fontWeight: `bold` }}>
                        {user?.sendNick}
                      </span>
                      <span> ({user?.sendId})</span>
                    </div>
                    <div>
                      <Btn onClick={() => onClickOk(user)}>수락</Btn>
                      <Btn onClick={() => onClickNo(user)}>거절</Btn>
                    </div>
                  </Cdiv>
                </Body>
              </Accept>
            ))}
        </footer>
      </StyledSideBar>
      ;
    </Container>
  );
};
export default SideBar;
