import React, { useState } from "react";
import styled from "styled-components";

const Day = styled.div`
  width: 5vw;
  height: 5vw;
  background-color: aliceblue;
`;

const Box = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
`;
const Head = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Calendar = () => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const createCalendar = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPreMonth = new Date(year, month, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const calendar = [];

    for (let i = 0; i < daysInMonth + firstDayOfWeek; i++) {
      if (i < firstDayOfWeek) {
        const preDay = daysInPreMonth - firstDayOfWeek + i + 1;
        calendar.push(
          <Day
            key={`empty-${i}`}
            onClick={(e) => console.log(`empty-${i}`)}
            style={{ color: `#707070` }}
          >
            {preDay}
          </Day>
        );
      } else {
        const day = i - firstDayOfWeek + 1;
        calendar.push(
          <Day key={`day-${i}`} onClick={(e) => console.log(`day-${i}`)}>
            {day}
          </Day>
        );
      }
    }

    return calendar;
  };

  return (
    <Container>
      <Head>
        <button onClick={() => setMonth(month === 0 ? 11 : month - 1)}>
          이전 달
        </button>
        <span>
          {year}년 {month + 1}월
        </span>
        <button onClick={() => setMonth(month === 11 ? 0 : month + 1)}>
          다음 달
        </button>
      </Head>
      <Box>{createCalendar()}</Box>
    </Container>
  );
};

export default Calendar;
