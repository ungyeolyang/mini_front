import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import FriendAxiosApi from "../api/FriendAxiosApi";
import Profile from "./Profile";
import Btn from "./Btn";
import Accept from "./Accept";
import Friend from "./Friend";
import UserDetail from "./UserDetail";

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
    height: 12rem;
    overflow: hidden;
    bottom: 0;
  }
`;

const Head = styled.span`
  background-color: #b8d0fa;
  padding: 0.7rem;
  border-radius: 1rem 1rem 0 0;
`;
const Line = styled.div`
  display: flex;
  border-bottom: 3px solid #b8d0fa;
  width: 100%;
  padding-left: 1rem;
  @media (max-width: 1000px) {
    width: 80%;
  }
`;

const SideBar = ({ isOpen, setIsOpen, onDisplay, setOnDisplay, id }) => {
  const [sender, setSender] = useState([]);
  const [friend, setFriend] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [detail, setDetail] = useState("");

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
        console.log("신청목록", rsp.data);
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
      const rsp = await FriendAxiosApi.friendOk(id, user);
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
      const rsp = await FriendAxiosApi.delFriend(id, user);
      if (rsp.data) {
        console.log("거절성공");
        setRefresh(!refresh);
      } else {
        console.log("거절실패");
      }
    } catch (e) {}
  };
  const onClickDetail = (props) => {
    // console.log(props);
    setDetail(props);
    setUserOpen(true);
  };

  useEffect(() => {
    sendList();
    friendList();
  }, [isOpen, refresh]);

  return (
    <Container isOpen={isOpen} onClick={onClickOut}>
      <StyledSideBar
        isOpen={isOpen}
        onDisplay={onDisplay}
        onClick={onClickSide}
      >
        <header>
          <Line>
            <Head>내친구</Head>
          </Line>
          {friend &&
            friend.map((user) => (
              <Friend
                key={user}
                user={user}
                onClickDetail={onClickDetail}
              ></Friend>
            ))}
        </header>
        <footer>
          {sender &&
            sender.map((user) => (
              <Accept
                key={user}
                user={user}
                onClickOk={onClickOk}
                onClickNo={onClickNo}
              ></Accept>
            ))}
        </footer>
      </StyledSideBar>
      <UserDetail
        open={userOpen}
        close={() => setUserOpen(false)}
        userId={detail}
      ></UserDetail>
    </Container>
  );
};
export default SideBar;
