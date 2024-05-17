import styled from "styled-components";
import Right from "../component/Right";
import { useContext, useEffect, useRef, useState } from "react";
import Btn from "../component/Btn";
import { UserContext } from "../context/UserStore";
import Modal from "../component/Modal";
import Chatting from "./Chatting";
import Calendar from "./Calender";
import Board from "../component/Board";
import Member from "../component/Member";

const Container = styled.div`
  display: flex;
  min-height: 80vh;
  overflow: hidden;
`;
const FullBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
        <Container>
          <FullBox>
            <Member></Member>
            <Board></Board>
            <Calendar />
          </FullBox>
          <Chatting />
        </Container>
      </Right>
      <Modal open={modalOpen} close={closeModal} header="오류">
        {modalContent}
      </Modal>
    </>
  );
};
export default Meeting;
