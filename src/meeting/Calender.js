import React, { useState } from "react";
import styled from "styled-components";

const Week = styled.div`
  width: 14%;
  padding-bottom: 1rem;
  font-weight: bold;
  text-align: center;
`;

const Day = styled.div`
  width: 14%;
  height: 5vw;
  background-color: aliceblue;
  position: relative;
  border: 1px solid silver;
  span {
    position: absolute;
    top: 0.2rem;
    left: 0.5rem;
  }
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

const Calendar = () => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  function formatNumber(number) {
    return number.toString().padStart(2, "0");
  }

  const onClickDay = (e) => {
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
          <Day
            key={`last-${i + 1}`}
            onClick={() => onClickDay(preDay)}
            style={{ color: `#707070` }}
          >
            <span>{preDay}</span>
          </Day>
        );
      } else {
        const day = i - firstDayOfWeek + 1;
        calendar.push(
          <Day
            key={`day-${day}`}
            style={{ fontWeight: `bold` }}
            onClick={() => onClickDay(day)}
          >
            <span>{day}</span>
          </Day>
        );
      }
    }

    if ((daysInMonth + firstDayOfWeek) % 7 !== 0) {
      for (let i = 0; i < 7 - ((daysInMonth + firstDayOfWeek) % 7); i++) {
        calendar.push(
          <Day
            key={`next-${i + 1}`}
            onClick={(e) => onClickDay(i + 1)}
            style={{ color: `#707070` }}
          >
            <span>{i + 1}</span>
          </Day>
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
