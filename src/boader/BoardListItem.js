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
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  @media (max-width: 720px) {
    align-items: flex-start;
    margin: 5px 0;
    position: relative;
  }
`;
const OdContain = styled.div`
  align-items: right;
  display: flex;

  @media (max-width: 720px) {
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;
    position: absolute;
    right: 1px;
  }
`;
const TiContain = styled.div`
  align-items: center;
  margin: 0px 36% 10px 0px;
  text-align: center;

  @media (max-width: 720px) {
    margin: 0;
    width: 70%;
  }
`;

const BoardTitle = styled.h3`
  width: 500px;
  color: black;
  margin: 0px 0px 10px 0px;

  @media (max-width: 720px) {
    width: 100%;
    font-size: 18px;
  }
`;

const Board_View = styled.p`
  color: #444;
  font-size: 13px;
  text-align: center;

  @media (max-width: 720px) {
    color: #777;
    margin: 0 10px;
    margin-top: 13px;
    width: 18px;
  }
`;

const BoardDate = styled.p`
  color: #777;
  font-size: 13px;
  margin-right: 59px;
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 720px) {
    text-align: left;
    margin-right: 10px;
    margin-bottom: 0;
    width: 70px;
  }
`;

const UserId = styled.p`
  color: #555;
  font-style: italic;
  font-size: 13px;
  margin-right: 50px;
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 720px) {
    text-align: left;
    margin-right: 10px;
    margin-bottom: 0;
    width: 40px;
  }
`;

const BoardListItem = ({ board, handleDetailClick, handleView }) => {
  const handleClick = (boardNo) => {
    handleDetailClick(boardNo);
    handleView(boardNo);
  };
  const truncateTitle = (title) => {
    return title.length > 25 ? title.substring(0, 25) + "..." : title;
  };
  return (
    <BoardLi onClick={() => handleClick(board.board_no)}>
      <TiContain>
        <BoardTitle>{truncateTitle(board.board_title)}</BoardTitle>
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
