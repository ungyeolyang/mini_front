import styled from "styled-components";
import LoginAxiosApi from "../api/LoginAxiosApi";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserStore";
import MeetingAxiosApi from "../api/MeetingAxiosApi";

const StyledMoim = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  padding: 1rem;
  background-color: #e5f3ff;
`;

const Moim = ({ meeting, onClickMoim }) => {
  const [nick, setNick] = useState("");
  const [size, setSize] = useState(0);
  const context = useContext(UserContext);
  const { rpad } = context;

  const memberList = async () => {
    try {
      const rsp = await MeetingAxiosApi.memberList(meeting.no);
      if (rsp.data) {
        console.log("인원수", rsp.data.length);
        setSize(rsp.data.length);
      } else {
        console.log("멤버를 못불러옴");
        setSize(0);
      }
    } catch (e) {
      console.log("오류발생");
    }
  };

  const getMember = async () => {
    try {
      const rsp = await LoginAxiosApi.memberGetOne(meeting.id);
      setNick(rsp.data[0]?.nick);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    memberList();
    getMember();
  }, []);

  return (
    <StyledMoim onClick={() => onClickMoim(meeting)}>
      <div>{meeting.category}</div>
      <div>{meeting.title}</div>
      <div>
        {meeting.location}
        {meeting.duration1 ? meeting.duration1 : "매일"}
        {meeting.duration2 && ` ~ ${meeting.duration2}`}
      </div>
      <div>
        {size}/ {meeting.personnel}
      </div>
      <div>
        {nick}({rpad(meeting.id.substr(0, 3), meeting.id.length, "*")})
      </div>
    </StyledMoim>
  );
};

export default Moim;
