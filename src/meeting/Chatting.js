import { useContext, useEffect, useRef, useState } from "react";
import MeetingAxiosApi from "../api/MeetingAxiosApi";
import { UserContext } from "../context/UserStore";
import styled from "styled-components";
import Btn from "../component/Btn";
import { LuSend } from "react-icons/lu";
import ChatLine from "./ChatLine";

const ChatOutBox = styled.div`
  width: 30vw;
  height: 80vh;
  background-color: silver;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ChatInBox = styled.div`
  width: 95%;
  height: 96%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Chat = styled.div`
  width: 100%;
  height: 83%;
  background-color: green;
  overflow: auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 0.5rem;
`;

const InputBox = styled.div`
  width: 90%;
  display: flex;
  background-color: gray;
  position: absolute;
  bottom: 1.5rem;
  padding: 0.3rem;
`;

const Input = styled.input`
  width: 84%;
  padding-left: 0.5rem;
  outline: none;
  background-color: inherit;
  border: none;
`;

const Chatting = ({ info }) => {
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
      setChat(rsp.data);
    } catch (e) {}
  };

  const onKeyDownEnter = (e) => {
    if (e.key === "Enter") {
      onClickSend();
    }
  };

  useEffect(() => {
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

    const interval = setInterval(getChat, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ChatOutBox>
      <ChatInBox>
        <Title>{info?.name}</Title>
        <Chat>
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
