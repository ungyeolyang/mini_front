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
      case "check":
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
        return "7%";
      case "check":
        return "5%";
      default:
        return "auto";
    }
  }};
`;

const LetterList = ({ mailList, category, onClickDetail }) => {
  const [mailNoList, setMailNoList] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  };

  const onChangeCheck = (e, mail) => {
    const checkbox = e.currentTarget;
    if (checkbox.checked) {
      setMailNoList((prev) => [...prev, mail.no]);
    } else {
      setMailNoList((prev) => prev.filter((no) => no !== mail.no));
    }
  };

  useEffect(() => {
    console.log(mailNoList);
  }, [mailNoList]);

  return (
    <>
      {mailList &&
        mailList.map((mail) => (
          <Line key={mail.no} onClick={() => onClickDetail(mail)}>
            <Box type="check">
              <input
                type="checkbox"
                value={mail.no}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => onChangeCheck(e, mail)}
              />
            </Box>
            <Box type="view">
              {mail.view === "TRUE" ? (
                <IoIosMailOpen style={{ color: "black" }} />
              ) : (
                <IoIosMail style={{ color: "gray" }} />
              )}
            </Box>
            <Box type="author">
              {category === "send" ? mail.receiverNick : mail.senderNick}
            </Box>
            <Box type="title">{mail.title}</Box>
            <Box type="date">{formatDate(mail.date)}</Box>
          </Line>
        ))}
    </>
  );
};

export default LetterList;
