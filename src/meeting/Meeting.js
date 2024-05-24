import styled from "styled-components";
import Right from "../component/Right";
import { useEffect, useState } from "react";
import Modal from "../component/Modal";
import Chatting from "./Chatting";
import Calendar from "./Calender";
import Member from "../component/Member";
import MeetingAxiosApi from "../api/MeetingAxiosApi";
import Schedule from "./Schedule";
import ScheduleDetail from "./ScheduleDetail";

const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: 80vh;
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
`;
const Meeting = () => {
  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [member, setMember] = useState([]);
  const [user, setUser] = useState();
  const [schedule, setSchedule] = useState([]);
  const [isDetail, setIstDetail] = useState(false);

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
    setIstDetail(true);
    setUser(props);
  };

  const onClickBack = () => {
    setIstDetail(false);
  };

  useEffect(() => {
    memberList(meetingNo);
    scheduleList(meetingNo);
  }, []);

  return (
    <>
      <Right>
        <Container>
          {!isDetail ? (
            <>
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
                <Calendar meetingNo={meetingNo} />
              </FullBox>
              <Chatting />
            </>
          ) : (
            <ScheduleDetail user={user} onClickBack={onClickBack} />
          )}
        </Container>
      </Right>
      <Modal open={modalOpen} close={closeModal} header="오류">
        {modalContent}
      </Modal>
    </>
  );
};
export default Meeting;
