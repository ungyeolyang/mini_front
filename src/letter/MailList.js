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

const MailList = ({ mailList, category }) => {
  const onClickLetter = (e) => {
    console.log(e);
  };

  return (
    <>
      {mailList &&
        mailList.map((mail) => (
          <Line key={mail.no} onClick={onClickLetter}>
            <Box type="author">
              {category === "send" ? mail.sender : mail.receiver}
            </Box>
            <Box type="title">{mail.title}</Box>
            <Box type="date">{mail.date}</Box>
            <Box type="view">{mail.view}</Box>
          </Line>
        ))}
    </>
  );
};
export default MailList;
