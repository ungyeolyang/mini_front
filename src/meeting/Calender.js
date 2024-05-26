import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MeetingAxiosApi from "../api/MeetingAxiosApi";

const Week = styled.div`
  width: 14%;
  padding-bottom: 1rem;
  font-weight: bold;
  text-align: center;
`;

const DayBox = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 14%;
  height: 5vw;
  position: relative;
  border: 1px solid silver;
  cursor: pointer;
`;

const Day = styled.div`
  padding-left: 0.7rem;
  padding-top: 0.5rem;
`;
const NickBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-left: 0.7rem;
  padding-top: 0.5rem;
  gap: 0.3rem;
`;

const Nick = styled.div`
  padding-left: 0.3rem;
  padding-right: 1rem;
  overflow: hidden;
  font-size: 0.8rem;
  background-color: aliceblue;
`;

const Box = styled.div`
  width: 96%;
  display: flex;
  flex-wrap: wrap;
`;
const Head = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Span = styled.span`
  font-size: 2rem;
  padding: 1rem;
`;

const Button = styled.button`
  font-size: 2rem;
  padding-top: 0.3rem;
  font-weight: bold;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Calendar = ({ meetingNo }) => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [writer, setWriter] = useState();

  function formatNumber(number) {
    return number.toString().padStart(2, "0");
  }

  const writerList = async () => {
    try {
      const rsp = await MeetingAxiosApi.writerList(meetingNo, year, month + 1);
      if (rsp.data) {
        // console.log(rsp.data);
        setWriter(rsp.data);
      } else {
        console.log(`글쓴이가 없습니다.`);
      }
    } catch (e) {
      console.log(`오류입니다.`);
    }
  };

  useEffect(() => {
    writerList();
  }, [year, month]);

  const onClickDay = (e, type) => {
    switch (type) {
      case `-`:
        setMonth(month === 0 ? 11 : month - 1);
        break;
      case `+`:
        setMonth(month === 0 ? 11 : month + 1);
        break;
      default:
        break;
    }

    console.log(`${year}-${formatNumber(month + 1)}-${formatNumber(e)}`);
  };

  const createCalendar = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInLastMonth = new Date(year, month, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const calendar = [];

    for (let i = 0; i < daysInMonth + firstDayOfWeek; i++) {
      if (i < firstDayOfWeek) {
        const preDay = daysInLastMonth - firstDayOfWeek + i + 1;
        calendar.push(
          <DayBox
            key={`last-${i + 1}`}
            onClick={() => onClickDay(preDay, `-`)}
            style={{ color: `#707070` }}
          >
            <Day>{preDay}</Day>
          </DayBox>
        );
      } else {
        const day = i - firstDayOfWeek + 1;
        calendar.push(
          <DayBox
            key={`day-${day}`}
            style={{ fontWeight: `bold` }}
            onClick={() => onClickDay(day)}
          >
            <Day>{day}</Day>
            <NickBox>
              {writer
                ?.filter(
                  (e) =>
                    e.sdate ===
                    `${year}-${formatNumber(month + 1)}-${formatNumber(day)}`
                )
                ?.map((e) => e.nick)
                ?.map((e) => (
                  <Nick>{e}</Nick>
                ))}
            </NickBox>
          </DayBox>
        );
      }
    }

    if ((daysInMonth + firstDayOfWeek) % 7 !== 0) {
      for (let i = 0; i < 7 - ((daysInMonth + firstDayOfWeek) % 7); i++) {
        calendar.push(
          <DayBox
            key={`next-${i + 1}`}
            onClick={(e) => onClickDay(i + 1, `+`)}
            style={{ color: `#707070` }}
          >
            <Day>{i + 1}</Day>
          </DayBox>
        );
      }
    }
    return calendar;
  };

  return (
    <Container>
      <Head>
        <Button onClick={() => setMonth(month === 0 ? 11 : month - 1)}>
          &lt;
        </Button>
        <Span>
          {year}년 {month + 1}월
        </Span>
        <Button onClick={() => setMonth(month === 11 ? 0 : month + 1)}>
          &gt;
        </Button>
      </Head>
      <Box>
        <Week>Sun</Week>
        <Week>Mon</Week>
        <Week>Tue</Week>
        <Week>Wen</Week>
        <Week>Tur</Week>
        <Week>Fri</Week>
        <Week>Sat</Week>
        {createCalendar()}
      </Box>
    </Container>
  );
};

export default Calendar;
