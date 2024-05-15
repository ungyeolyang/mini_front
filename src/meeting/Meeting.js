import styled from "styled-components";
import Right from "../component/Right";
import { useEffect, useState } from "react";

const Pp = styled.div``;
const Bo = styled.div``;
const Cal = styled.div``;
const Box = styled.div`
  width: 30vw;
  height: 80vh;
  background-color: gray;
`;
const Chat = styled.div`
  width: 30vw;
  height: 80vh;
  background-color: silver;
`;
const Meeting = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [year, setYear] = useState(today.getFullYear());
  const [mon, setMon] = useState(today.getMonth() + 1);
  const [week, setWeak] = useState(today.getDay());
  const [day, setDay] = useState(today.getDate());

  const onClickDate = () => {};

  const onClickMinus = () => {
    const today = new Date();
    today.setMonth(today.getMonth() - 1);
    refresh(today);
  };

  const onClickPlus = () => {
    const today = new Date();
    today.setMonth(today.getMonth() + 1);
    refresh(today);
  };

  const refresh = (today) => {
    setDate(today);
    setYear(today.getFullYear());
    setMon(today.getMonth() + 1);
    setDay(today.getDate());
  };

  // useEffect(() => {
  //   const date = new Date();
  //   const year = date.getFullYear();
  //   const month = date.getMonth() + 1;
  //   const week = date.getDay(); //몇주차인지
  //   const day = date.getDate();
  //   setYear(year);
  //   setMonth(month);
  //   setWeak(week);
  //   setDay(day);
  // }, []);

  return (
    <>
      <Right>
        <Box>
          <Pp>참여자</Pp>
          <Bo>공지사항</Bo>
          <Cal>
            달력
            <button onClick={onClickMinus}>&lt;</button>
            <p>
              {year}년 {mon}월
            </p>
            <button onClick={onClickPlus}>&gt;</button>
          </Cal>
        </Box>
        <Chat>채팅창</Chat>
      </Right>
    </>
  );
};
export default Meeting;
