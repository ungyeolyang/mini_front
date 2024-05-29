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
  @media (max-width: 720px) {
    border-radius: 0;
    height: 7rem;
    width: 100%;
    border: 1px solid #b8d0fa;
    flex-direction: row;
    position: relative;
  }
`;
const Category = styled.span`
  color: gray;
  @media (max-width: 720px) {
    font-size: 10px;
  }
`;
const Title = styled.span`
  font-size: 1.5rem;
  @media (max-width: 720px) {
    font-size: 20px;
  }
`;
const Nick = styled.div`
  display: flex;
  align-items: center;
  gap: 0.1rem;
  span {
    font-weight: bold;
  }
  @media (max-width: 720px) {
    position: absolute;
    right: 1px;
    bottom: 1px;
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
  @media (max-width: 720px) {
    position: absolute;
    right: 130px;
    bottom: 1px;
    div {
      text-align: center;
    }
  }
`;

const Cdiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Moim = ({ meeting, onClickMoim, currentPage }) => {
  const [nick, setNick] = useState(""); // 초기 상태 설정
  const [size, setSize] = useState(0);
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
      if (rsp.data) {
        setNick(rsp.data[0]?.nick); // 상태 업데이트
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    memberList();
  }, [currentPage, meeting.id, meeting.no]); // 의존성 배열 수정

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
      <Nick>{rpad(meeting.id.substr(0, 3), meeting.id.length, "*")}</Nick>
    </StyledMoim>
  );
};

export default Moim;
