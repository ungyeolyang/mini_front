import React from "react";
import styled from "styled-components";
import BoardListItem from "./BoardListItem";

const BoardUl = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const BoardList = ({ boardList, handleDetailClick }) => {
  return (
    <BoardUl>
      {boardList &&
        boardList.map((board) => (
          <BoardListItem
            key={board.board_no}
            board={board}
            handleDetailClick={handleDetailClick} // handleDetailClick 함수 전달
          />
        ))}
    </BoardUl>
  );
};
export default BoardList;
