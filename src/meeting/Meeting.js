import styled from "styled-components";
import Right from "../component/Right";
import { useEffect, useState } from "react";
import Modal from "../component/Modal";
import Chatting from "./Chatting";
import Calendar from "./Calender";
import Member from "../component/Member";
import MeetingAxiosApi from "../api/MeetingAxiosApi";
import Schedule from "./Schedule";

const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: 80vh;
  overflow: hidden;
`;
const FullBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40vw;
  height: 85vh;
  background-color: gray;
`;

const MemberBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  background-color: blue;
`;
const Meeting = () => {
  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [member, setMember] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const closeModal = () => {
    setModalOpen(false);
  };
  const meetingNo = 1;

  const memberList = async (meetingNo) => {
    try {
      const rsp = await MeetingAxiosApi.memberList(meetingNo);
      if (rsp.data) {
        setMember(rsp.data);
      } else {
        console.log("멤버를 못불러옴");
        setMember([]);
      }
    } catch (e) {
      console.log("오류발생");
    }
  };

  const scheduleList = async (meetingNo) => {
    try {
      const rsp = await MeetingAxiosApi.scheduleList(meetingNo);
      console.log(rsp.data);
      if (rsp.data) {
        setSchedule(rsp.data);
      } else {
        console.log("공지를 못불러옴");
        setSchedule([]);
      }
    } catch (e) {
      console.log("오류발생");
    }
  };

  const onclickDetail = (props) => {
    console.log(props);
  };

  useEffect(() => {
    memberList(meetingNo);
    scheduleList(meetingNo);
  }, []);

  return (
    <>
      <Right>
        <Container>
          <FullBox>
            <MemberBox>
              {member &&
                member.map((user) => (
                  <Member key={user.id} size={`3rem`} user={user}></Member>
                ))}
            </MemberBox>
            <Schedule
              schedule={schedule}
              onClickDetail={onclickDetail}
            ></Schedule>
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
