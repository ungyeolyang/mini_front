import styled from "styled-components";
import { FaChevronDown, FaChevronUp, FaChevronLeft } from "react-icons/fa";
import { useContext, useState } from "react";
import Btn from "../component/Btn";
import UserDetail from "../component/UserDetail";
import { UserContext } from "../context/UserStore";
import Send from "./Send";
import LetterAxiosApi from "../api/LetterAxiosApi";
import Modal from "../component/Modal";
import { useNavigate } from "react-router-dom";

const StyledLetterDetail = styled.div`
  display: flex;
  min-width: 1000px;
  min-height: 500px;
  flex-direction: column;
  background-color: #e5f3ff;
  /* padding: 1.5rem; */
  @media (max-width: 720px) {
    width: 100%;
    min-width: 0;
  }
`;
const Div = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: ${({ type }) => {
    switch (type) {
      case "head":
        return `1.5rem 0.5rem`;
      case "title":
        return `1rem 4rem 0.5rem`;
      case "receive":
        return `0 4rem 0.5rem`;
      case "my":
        return `0 4rem 0.5rem`;
      case "date":
        return `0 4rem 1rem`;
      case "contents":
        return `1rem 4rem`;
      default:
        return `0 2rem 1rem`;
    }
  }};
  font-size: ${({ type }) => {
    switch (type) {
      case "title":
        return `1.5rem`;
      case "date":
        return `0.9rem`;
      default:
        return `1rem`;
    }
  }};
  ${({ type }) => (type === "date" ? `0.9rem` : `1rem`)};
  color: ${({ type }) => (type === "date" ? `gray` : `black`)};
  ${(props) => props.type === "receive" && props.isUp && `display:none`}
`;

const StyledUp = styled(FaChevronUp)`
  display: ${({ isUp }) => (!isUp ? "none" : "block")};
`;
const StyledDown = styled(FaChevronDown)`
  display: ${({ isUp }) => (isUp ? "none" : "block")};
`;
const StyledLeft = styled(FaChevronLeft)`
  cursor: pointer;
`;
const Bold = styled.span`
  font-weight: bold;
  font-size: inherit;
`;
const User = styled.span`
  padding: 0.2rem 0.8rem;
  border-radius: 1rem;
  cursor: pointer;
  background-color: #e9edc9;
  &:hover {
    background-color: #ccd5ae;
  }
`;
const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #b8d0fa;
`;

const LetterDetail = ({
  user,
  onClickBack,
  setLetterOpen,
  setResend,
  setReceive,
  setReceiveNick,
  setIsDetail,
}) => {
  const id = localStorage.getItem("id");
  const [isUp, setIsUp] = useState(true);
  const [info, setInfo] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let hour = date.getHours();
    const minute = ("0" + date.getMinutes()).slice(-2);
    const ampm = hour < 12 ? "오전" : "오후";

    if (hour >= 12) {
      hour -= 12;
    }
    if (hour === 0) {
      hour = 12;
    }

    return `${year}-${month}-${day} ${ampm} ${hour}:${minute}`;
  };
  const closeModal = () => {
    setModalOpen(false);
    setIsDetail(false);
  };

  const onClickArrow = () => {
    setIsUp(!isUp);
  };

  const onClickUser = (e) => {
    setUserOpen(true);
    setInfo(e.target.getAttribute("user"));
  };

  const closeUser = () => {
    setUserOpen(false);
  };

  const onClickResend = () => {
    setLetterOpen(true);
    id === user.sender
      ? setResend(`나에게 쓰기`)
      : setResend(`${user.senderNick}(${user.sender})`);
    setReceive(user.sender);
    setReceiveNick(user.senderNick);
  };

  const onClickDelete = async () => {
    console.log(user.no);
    try {
      const rsp = await LetterAxiosApi.delLetter(user.no);
      if (rsp.data) {
        console.log("삭제성공");
        setModalOpen(true);
        setModalContent("메일을 삭제했습니다.");
      } else {
        console.log("삭제실패");
        setModalOpen(true);
        setModalContent("메일을 삭제하지 못했습니다.");
      }
    } catch (e) {
      console.log("삭제 오류");
    }
  };

  return (
    <StyledLetterDetail>
      <Div type="head">
        <StyledLeft onClick={onClickBack} />
        <Btn onClick={onClickResend}>답장</Btn>
        <Btn onClick={onClickDelete}>삭제</Btn>
      </Div>
      <Body>
        <Div type="title">
          <Bold>{user.title}</Bold>
        </Div>
        {user.receiver !== user.sender ? (
          <>
            <Div>
              <StyledUp onClick={onClickArrow} isUp={isUp} />
              <StyledDown onClick={onClickArrow} isUp={isUp} />
              <Bold>보낸 사람</Bold>
              <User onClick={onClickUser} user={user.sender}>
                {user.senderNick}({user.sender})
              </User>
            </Div>

            <Div type="receive" isUp={isUp}>
              <Bold>받는 사람</Bold>
              <User onClick={onClickUser} user={user.receiver}>
                {user.receiverNick}({user.receiver})
              </User>
            </Div>
          </>
        ) : (
          <Div type="my">
            <Bold>내게 쓴 편지</Bold>
          </Div>
        )}

        <Div type="date">{formatDate(user.date)}</Div>
      </Body>
      <Div type="contents">{user.contents}</Div>
      <UserDetail open={userOpen} close={closeUser} userId={info}></UserDetail>

      <Modal open={modalOpen} close={closeModal} header="삭제" btn="확인">
        {modalContent}
      </Modal>
    </StyledLetterDetail>
  );
};
export default LetterDetail;
