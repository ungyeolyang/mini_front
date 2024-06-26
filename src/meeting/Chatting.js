import { useContext, useEffect, useRef, useState } from "react";
import MeetingAxiosApi from "../api/MeetingAxiosApi";
import { UserContext } from "../context/UserStore";
import styled from "styled-components";
import Btn from "../component/Btn";
import { LuSend } from "react-icons/lu";
import ChatLine from "./ChatLine";

const ChatOutBox = styled.div`
  width: ${({ isSmall }) => (isSmall ? "75vw" : "30vw")};
  height: ${({ isSmall }) => (isSmall ? "50vh" : "80vh")};
  display: flex;
  justify-content: center;
  align-items: center;
  position: ${({ isSmall }) => (isSmall ? "absolute" : "relative")};
`;

const ChatInBox = styled.div`
  width: 95%;
  height: 96%;
  background-color: #e5f3ff;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Chat = styled.div`
  padding-top: 1rem;
  width: 100%;
  height: ${({ isSmall }) => (isSmall ? "66%" : "78%")};
  overflow: auto;
  scrollbar-width: none;
`;

const Title = styled.div`
  width: 100%;
  padding: 1rem 0;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  background-color: #b8d0fa;
  border-radius: 1rem 1rem 0 0;
`;

const InputBox = styled.div`
  width: 90%;
  display: flex;
  background-color: transparent;
  position: absolute;
  bottom: 1.5rem;
  padding: 0.3rem;
  border: 3px solid silver;
  border-radius: 1rem;
`;

const Input = styled.input`
  width: 84%;
  padding-left: 1rem;
  outline: none;
  background-color: inherit;
  border: none;
  font-weight: bold;
`;

const Chatting = ({ info, isSmall }) => {
  const input = useRef(null);
  const id = localStorage.getItem("id");

  const [contents, setContents] = useState("");
  const [chat, setChat] = useState(null);

  const onChangeDe = (e) => {
    setContents(e.target.value);
  };

  const onClickSend = async () => {
    try {
      const rsp = await MeetingAxiosApi.chat(info?.no, id, contents);
      if (rsp.data) {
        setContents("");
        input.current.value = "";
      } else {
        console.log("보내지지않음");
      }
    } catch (e) {
      console.log("채팅오류");
    }
  };

  const getChat = async () => {
    try {
      const rsp = await MeetingAxiosApi.chatList(info?.no);
      if (rsp.data) {
        setChat(rsp.data);
      } else {
        console.log("값을 못가지고옴");
      }
    } catch (e) {
      console.log("에러");
    }
  };

  const onKeyDownEnter = (e) => {
    if (e.key === "Enter") {
      onClickSend();
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(getChat, 500);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <ChatOutBox isSmall={isSmall}>
      <ChatInBox>
        <Title>{info?.name}</Title>
        <Chat isSmall={isSmall}>
          {chat && chat.map((user) => <ChatLine id={id} user={user} />)}
        </Chat>
        <InputBox>
          <Input
            onChange={onChangeDe}
            ref={input}
            onKeyDown={onKeyDownEnter}
          ></Input>
          <Btn onClick={onClickSend}>
            <LuSend style={{ fontSize: `1.5rem` }} />
          </Btn>
        </InputBox>
      </ChatInBox>
    </ChatOutBox>
  );
};

export default Chatting;
