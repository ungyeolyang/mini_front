import React from "react";
import styled from "styled-components";
import AxiosApi from "../api/BoardAxiosApi";

const CommentLi = styled.li`
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #ced4da;
  position: relative;
`;
const TiContain = styled.div`
  align-items: center;
  text-align: center;
  margin: 0;
`;

const CommentId = styled.h6`
  font-size: 17px;
  color: black;
  font-weight: bold;
  margin: 0;
  text-align: left;
`;

const Commentde = styled.p`
  color: #555;
  font-style: italic;
  font-size: 13px;
  text-align: left;
`;
const CommentDate = styled.p`
  color: #adb5bd;
  font-size: 10px;
  text-align: left;
`;
const Delbutton = styled.button`
  color: #adb5bd;
  background-color: white;
  font-size: 8px;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 1px;
  margin: 0;
  padding: 0;
  border: 0;
  &:hover {
    cursor: pointer;
    border-bottom: 1px solid #495057;
    color: #868e96;
  }
`;

const CommentListItem = ({ comment }) => {
  const user_id = localStorage.getItem("id");
  const deleteComment = () => {
    console.log("댓글 삭제하기 함수 호출");
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const delBoardApi = async () => {
        try {
          const rsp = await AxiosApi.CommentDelete(comment.comment_no);
          console.log(comment.comment_no);
          if (rsp.data) {
            alert("댓글이이 삭제되었습니다.");
            window.location.reload();
          }
        } catch (e) {
          console.log(e);
        }
      };
      delBoardApi();
    }
  };
  return (
    <CommentLi>
      <TiContain>
        <CommentId>{comment.comment_id}</CommentId>
        <Commentde>{comment.comment_detail}</Commentde>
        <CommentDate>{comment.comment_date}</CommentDate>
      </TiContain>
      {user_id === comment.comment_id && (
        <Delbutton onClick={deleteComment}>삭제</Delbutton>
      )}
    </CommentLi>
  );
};
export default CommentListItem;
