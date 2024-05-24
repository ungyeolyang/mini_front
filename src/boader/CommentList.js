import React from "react";
import styled from "styled-components";
import CommentListItem from "./CommentListItem";
import AxiosApi from "../api/BoardAxiosApi";

const CommentUl = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentList = ({ comments }) => {
  if (!Array.isArray(comments)) {
    console.error("Comments is not an array:", comments);
    return null; // 또는 적절한 오류 처리
  }

  const sortedCommentList = comments
    .slice()
    .sort((a, b) => a.comment_no - b.comment_no);
  return (
    <CommentUl>
      {sortedCommentList &&
        sortedCommentList.map((comment) => (
          <CommentListItem key={comment.comment_no} comment={comment} />
        ))}
    </CommentUl>
  );
};
export default CommentList;
