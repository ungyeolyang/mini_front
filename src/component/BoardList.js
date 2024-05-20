import React from "react";
import styled from "styled-components";

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

const BoardList = ({ boardList }) => {
  return (
    <>
      {boardList &&
        boardList.map((board) => (
          <Line key={board.no}>
            <Box type="title">{board.title}</Box>
            <Box type="author">{board.author}</Box>
            <Box type="date">{board.date}</Box>
            <Box type="view">{board.view}</Box>
          </Line>
        ))}
    </>
  );
};
export default BoardList;
