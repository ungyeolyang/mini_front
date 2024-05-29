import styled from "styled-components";
import LoginAxiosApi from "../api/LoginAxiosApi";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserStore";
import MeetingAxiosApi from "../api/MeetingAxiosApi";
import { FaLocationDot, FaClock } from "react-icons/fa6";
import { GoPersonFill } from "react-icons/go";

const StyledMoim = styled.div`
  display: flex;
  width: 27rem;
  height: 12rem;
  flex-direction: column;
  border-radius: 1rem;
  padding: 1rem 2rem;
  background-color: #e5f3ff;
  gap: 1rem;
  &:hover {
    background-color: #b8d0fa;
  }
`;
const Category = styled.span`
  color: gray;
`;
const Title = styled.span`
  font-size: 1.5rem;
`;
const Nick = styled.div`
  display: flex;
  align-items: center;
  gap: 0.1rem;
  span {
    font-weight: bold;
  }
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Cdiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Moim = ({ meeting, onClickMoim, currentPage }) => {
  const [nick, setNick] = useState("");
  const [size, setSize] = useState(0);
  const [refresh, setRefresh] = useState("");
  const context = useContext(UserContext);
  const { rpad } = context;

  const memberList = async () => {
    try {
      const rsp = await MeetingAxiosApi.memberList(meeting.no);
      if (rsp.data) {
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
  }, [nick, currentPage]);

  useEffect(() => {
    setRefresh(!refresh);
  }, []);

  return (
    <StyledMoim onClick={() => onClickMoim(meeting)}>
      <Cdiv>
        <Category>{meeting.category}</Category>
        <Title>{meeting.title}</Title>
      </Cdiv>
      <Div>
        <div>
          <FaLocationDot style={{ color: `gray` }} />
          {meeting.location === "온라인"
            ? meeting.location
            : meeting.location?.split(" ")[1]}
        </div>
        <div>
          <FaClock style={{ color: `gray` }} />
          {meeting.duration1 ? meeting.duration1 : "매일"}
          {meeting.duration2 && ` ~ ${meeting.duration2}`}
        </div>
        <div>
          <GoPersonFill style={{ color: `gray` }} />
          {size}/ {meeting.personnel}
        </div>
      </Div>
      <Nick>
        <span>{nick}</span>(
        {rpad(meeting.id.substr(0, 3), meeting.id.length, "*")})
      </Nick>
    </StyledMoim>
  );
};

export default Moim;
