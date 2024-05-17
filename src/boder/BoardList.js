import React from "react";
import styled from "styled-components";
import BoardListItem from "./BoardListItem";

const BoardUl = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const BoardList = ({ boardList }) => {
  return (
    <BoardUl>
      {boardList &&
        boardList.map((board) => (
          <BoardListItem key={board.board_no} board={board} />
        ))}
    </BoardUl>
  );
};
export default BoardList;
