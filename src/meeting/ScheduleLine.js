import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserStore";
import LoginAxiosApi from "../api/LoginAxiosApi";

const Line = styled.div`
  display: flex;
  border-bottom: 1px solid gray;
  cursor: pointer;
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
        return "15%";
      default:
        return "auto";
    }
  }};
`;
const ScheduleLine = ({ schedule, onClickDetail, nick, setNick }) => {
  const context = useContext(UserContext);
  const { formatDate } = context;

  useEffect(() => {
    const getMember = async () => {
      try {
        const rsp = await LoginAxiosApi.memberGetOne(schedule?.id);
        console.log(rsp.data);
        setNick(rsp.data[0].nick);
      } catch (e) {
        console.log(e);
      }
    };
    getMember();
  }, [nick]);
  return (
    <Line key={schedule?.sno} onClick={() => onClickDetail(schedule)}>
      <Box type="title">{schedule?.title}</Box>
      <Box type="author">{nick}</Box>
      <Box type="date">{formatDate(schedule?.sdate)}</Box>
      <Box type="date">{formatDate(schedule?.bdate)}</Box>
    </Line>
  );
};

export default ScheduleLine;
