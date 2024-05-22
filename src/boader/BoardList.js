import React from "react";
import styled from "styled-components";
import BoardListItem from "./BoardListItem";

const BoardUl = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const BoardList = ({ boardList, handleDetailClick, handleView }) => {
  const sortedBoardList = boardList
    .slice()
    .sort((a, b) => b.board_no - a.board_no);
  return (
    <BoardUl>
      {sortedBoardList &&
        sortedBoardList.map((board) => (
          <BoardListItem
            key={board.board_no}
            board={board}
            handleDetailClick={handleDetailClick} // handleDetailClick 함수 전달
            handleView={handleView}
          />
        ))}
    </BoardUl>
  );
};
export default BoardList;
