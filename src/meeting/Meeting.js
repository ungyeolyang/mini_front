import styled from "styled-components";
import Right from "../component/Right";
import { useContext, useEffect, useRef, useState } from "react";
import Btn from "../component/Btn";
import MeetingAxiosApi from "../api/MeetingAxiosApi";
import { UserContext } from "../context/UserStore";
import Modal from "../component/Modal";
import Chatting from "./Chatting";
import Calendar from "./Calender";

const Pp = styled.div``;
const Bo = styled.div``;
const Cal = styled.div``;
const FullBox = styled.div`
  width: 40vw;
  height: 80vh;
  background-color: gray;
`;
const Meeting = () => {
  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Right>
        <FullBox>
          <Pp>참여자</Pp>
          <Bo>공지사항</Bo>
          <Calendar />
        </FullBox>
        <Chatting />
      </Right>
      <Modal open={modalOpen} close={closeModal} header="오류">
        {modalContent}
      </Modal>
    </>
  );
};
export default Meeting;
