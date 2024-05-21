import React from "react";
import styled from "styled-components";

const BoardLi = styled.li`
  background-color: none;
  margin: 10px 0;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #ced4da;
  &:hover {
    cursor: pointer;
  }
`;
const OdContain = styled.div`
  align-items: right;
  display: flex;
`;
const TiContain = styled.div`
  align-items: center;
  margin: 0px 363px 10px 0px;
  text-align: center;
`;

const BoardTitle = styled.h3`
  font-size: 1.4em;
  width: 500px;
  color: black;
  margin: 0px 0px 10px 0px;
`;

const Board_View = styled.p`
  color: #444;
  font-size: 13px;
`;

const BoardDate = styled.p`
  color: #777;
  font-size: 13px;
  margin-right: 59px;
`;

const UserId = styled.p`
  color: #555;
  font-style: italic;
  font-size: 13px;
  margin-right: 50px;
`;

const BoardListItem = ({ board, handleDetailClick }) => {
  return (
    <BoardLi onClick={() => handleDetailClick(board.board_no)}>
      <TiContain>
        <BoardTitle>{board.board_title}</BoardTitle>
      </TiContain>
      <OdContain>
        <UserId>{board.user_id}</UserId>
        <BoardDate>{board.board_date}</BoardDate>
        <Board_View>{board.board_view}</Board_View>
      </OdContain>
    </BoardLi>
  );
};

export default BoardListItem;
