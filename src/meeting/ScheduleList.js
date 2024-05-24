import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserStore";

const Line = styled.div`
  display: flex;
  border-bottom: 1px solid gray;
`;
const Box = styled.div`
  padding: 2% 0;
  text-align: center;
  font-weight: bold;
  width: ${(props) => {
    switch (props.type) {
      case "title":
        return "50%";
      case "author":
        return "20%";
      case "date":
        return "20%";
      case "view":
        return "10%";
      default:
        return "auto";
    }
  }};
`;

const ScheduleList = ({ scheduleList, onClickDetail }) => {
  const context = useContext(UserContext);
  const { formatDate } = context;
  return (
    <>
      {scheduleList &&
        scheduleList.map((schedule) => (
          <Line key={schedule.sno} onClick={() => onClickDetail(schedule)}>
            <Box type="title">{schedule.title}</Box>
            <Box type="author">{schedule.nick}</Box>
            <Box type="date">{formatDate(schedule.sdate)}</Box>
          </Line>
        ))}
    </>
  );
};
export default ScheduleList;
