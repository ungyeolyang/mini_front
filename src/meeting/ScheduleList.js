import React, { useState } from "react";
import ScheduleLine from "./ScheduleLine";

const ScheduleList = ({
  scheduleList,
  onClickDetail,
  searchCategory,
  text,
}) => {
  const [nick, setNick] = useState("");

  return (
    <>
      {scheduleList &&
        scheduleList
          .filter(
            (schedule) =>
              schedule[searchCategory] &&
              (schedule[searchCategory] || nick).includes(text)
          )
          .map((schedule) => (
            <ScheduleLine
              key={schedule.sno}
              onClickDetail={() => onClickDetail(schedule)}
              schedule={schedule}
              nick={nick}
              setNick={setNick}
            ></ScheduleLine>
          ))}
    </>
  );
};
export default ScheduleList;
