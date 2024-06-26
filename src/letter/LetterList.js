import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosMail } from "react-icons/io";
import { IoIosMailOpen } from "react-icons/io";

const Line = styled.div`
  display: flex;
  border-bottom: 1px solid gray;
  cursor: pointer;
  &:hover {
    background-color: #b8d0fa;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  justify-content: ${(props) => {
    switch (props.type) {
      case "title":
        return "";
      case "author":
        return "";
      case "date":
        return "center";
      case "view":
        return "center";
      default:
        return "auto";
    }
  }};
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

const LetterList = ({
  mailList,
  category,
  onClickDetail,
  searchCategory,
  text,
}) => {
  const id = localStorage.getItem("id");
  const [mailNoList, setMailNoList] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  };

  // const onChangeCheck = (e, mail) => {
  //   const checkbox = e.currentTarget;
  //   if (checkbox.checked) {
  //     setMailNoList((prev) => [...prev, mail.no]);
  //   } else {
  //     setMailNoList((prev) => prev.filter((no) => no !== mail.no));
  //   }
  // };
  // const category = () => {
  //   switch(category){
  //     case "send":
  //       return if(id === mail.receiver)
  //       `내게 쓴 편지`
  //       else mail.receiverNick;
  //       case "receive":
  //         return if(id === mail.sender)
  //           `내게 쓴 편지`
  //           else mail.senderNick;
  //   }

  //   return                {category === "send"
  //   ? id === mail.receiver
  //     ? `내게 쓴 편지`
  //     : mail.receiverNick
  //   : id === mail.receiver
  //   ? `내게 쓴 편지`
  //   : mail.senderNick}
  // }

  return (
    <>
      {mailList &&
        mailList
          .filter(
            (mail) =>
              mail[searchCategory] && mail[searchCategory].includes(text)
          )
          .map((mail) => (
            <Line key={mail.no} onClick={() => onClickDetail(mail)}>
              <Box type="view">
                {mail.view === "TRUE" ? (
                  <IoIosMailOpen style={{ color: "black" }} />
                ) : (
                  <IoIosMail style={{ color: "gray" }} />
                )}
              </Box>
              <Box type="author">
                {category === "send"
                  ? id === mail.receiver
                    ? `내게 쓴 편지`
                    : mail.receiverNick
                  : id === mail.sender
                  ? `내게 쓴 편지`
                  : mail.senderNick}
              </Box>
              <Box type="title">{mail.title}</Box>
              <Box type="date">{formatDate(mail.date)}</Box>
            </Line>
          ))}
    </>
  );
};

export default LetterList;
