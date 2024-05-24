import { useContext, useEffect, useRef, useState } from "react";
import MeetingAxiosApi from "../api/MeetingAxiosApi";
import { UserContext } from "../context/UserStore";
import styled from "styled-components";
import Btn from "../component/Btn";
import { LuSend } from "react-icons/lu";

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

const Line = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.display && "row-reverse"};
  align-items: center;
  padding: 0 1rem;
  gap: 0.5rem;
  padding-bottom: 1rem;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const Contents = styled.span`
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 1rem;
  background-color: gray;
`;

const Nick = styled.div`
  display: ${(props) => props.display && "none"};
  font-size: 0.8rem;
  padding-left: 0.5rem;
  padding-bottom: 0.3rem;
  font-weight: bold;
  color: #707070;
`;

const Profil = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: silver;
  display: ${(props) => (props.display ? "none" : "flex")};
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
`;

const Time = styled.div`
  padding-top: 2.3rem;
  font-size: 0.7rem;
  font-weight: bold;
  color: #707070;
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

const Chatting = () => {
  const input = useRef(null);
  const id = localStorage.getItem("id");
  const context = useContext(UserContext);
  const { imgUrl, nick } = context;

  const [contents, setContents] = useState("");
  const [chat, setChat] = useState(null);

  const onChangeDe = (e) => {
    setContents(e.target.value);
  };

  const onClickSend = async () => {
    try {
      const rsp = await MeetingAxiosApi.chat(id, nick, contents);
      if (rsp.data) {
        setContents("");
        input.current.value = "";
      } else {
      }
    } catch (e) {}
  };

  // const getChat = async () => {
  //   try {
  //     const rsp = await MeetingAxiosApi.chatList(1);
  //     setChat(rsp.data);
  //     if (rsp.data) {
  //     } else {
  //     }
  //   } catch (e) {}
  // };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    let hour = date.getHours();
    const minute = ("0" + date.getMinutes()).slice(-2);
    const ampm = hour < 12 ? "오전" : "오후";

    if (hour >= 12) {
      hour -= 12;
    }
    if (hour === 0) {
      hour = 12;
    }

    return `${ampm} ${hour}:${minute}`;
  };

  const onKeyDownEnter = (e) => {
    if (e.key === "Enter") {
      onClickSend();
    }
  };

  useEffect(() => {
    const getChat = async () => {
      try {
        const rsp = await MeetingAxiosApi.chatList(1);
        if (rsp.data) {
          setChat(rsp.data);
        } else {
          console.log("값을 못가지고옴");
        }
      } catch (e) {
        console.log("에러");
      }
    };

    const interval = setInterval(getChat, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ChatOutBox>
      <ChatInBox>
        <Title>낚시A</Title>
        <Chat>
          {chat ? (
            chat.map((e) => (
              <Line display={id === e.id}>
                <Profil display={id === e.id} />
                <Box>
                  <Nick display={id === e.id}>{e.nick}</Nick>{" "}
                  <Contents>{e.contents}</Contents>
                </Box>
                <Time>{formatDate(e.date)}</Time>
              </Line>
            ))
          ) : (
            <p>글이 존재하지 않습니다.</p>
          )}
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
