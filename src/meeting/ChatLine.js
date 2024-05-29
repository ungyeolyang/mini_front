import styled from "styled-components";
import Profile from "../component/Profile";
import { useEffect, useState } from "react";
import LoginAxiosApi from "../api/LoginAxiosApi";

const Line = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.display && "row-reverse"};
  align-items: center;
  padding: 0 1rem;
  gap: 0.5rem;
  padding-bottom: 1rem;
`;

const Time = styled.div`
  padding-top: 2.3rem;
  font-size: 0.7rem;
  font-weight: bold;
  color: #707070;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const Contents = styled.span`
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => (props.display ? `#e9edc9` : `#ccd5ae`)};
`;

const Nick = styled.div`
  display: ${(props) => props.display && "none"};
  font-size: 0.8rem;
  padding-left: 0.5rem;
  padding-bottom: 0.3rem;
  font-weight: bold;
  color: #707070;
`;

const ChatLine = ({ user, id }) => {
  const [member, setMember] = useState("");

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

  useEffect(() => {
    const getMember = async () => {
      try {
        const rsp = await LoginAxiosApi.memberGetOne(user.id);
        setMember(rsp.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    getMember();
  }, []);

  useEffect(() => {
    console.log("아이디", member.id);
  }, []);
  return (
    <Line display={id === user.id}>
      <Profile size={"4rem"} display={id === member.id} src={member.profile} />
      <Box>
        <Nick display={id === member.id}>{member.nick}</Nick>
        <Contents display={id === member.id}>{user.contents}</Contents>
      </Box>
      <Time>{formatDate(user.date)}</Time>
    </Line>
  );
};
export default ChatLine;
