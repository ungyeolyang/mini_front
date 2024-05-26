import styled from "styled-components";
import Right from "../component/Right";
import { useContext, useEffect, useState } from "react";
import Modal from "../component/Modal";
import Chatting from "./Chatting";
import Calendar from "./Calender";
import Member from "../component/Member";
import MeetingAxiosApi from "../api/MeetingAxiosApi";
import ScheduleDetail from "./ScheduleDetail";
import { UserContext } from "../context/UserStore";
import ScheduleBox from "./ScheduleBox";

const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: 80vh;
`;
const FullBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40vw;
  height: 85vh;
  background-color: gray;
`;

const MemberBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  position: absolute;
  top: 0;
`;

const Meeting = () => {
  const context = useContext(UserContext);
  const { formatDetailDate, formatDate } = context;

  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [member, setMember] = useState([]);
  const [user, setUser] = useState();
  const [schedule, setSchedule] = useState([]);
  const [isDetail, setIsDetail] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

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
      // console.log(rsp.data);
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
    setDetailOpen(true);
    setUser(props);
  };

  const onClickBack = () => {
    setDetailOpen(false);
  };

  const onClickSchedule = () => {
    setIsDetail(true);
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
            <span onClick={() => setIsDetail(true)}>공지</span>
            <span onClick={() => setIsDetail(false)}>캘린더</span>
            {!isDetail ? (
              <Calendar meetingNo={meetingNo} />
            ) : (
              <ScheduleBox schedule={schedule} onClickDetail={onclickDetail} />
            )}
          </FullBox>
          <Chatting />
        </Container>
      </Right>
      <Modal open={modalOpen} close={closeModal} header="오류">
        {modalContent}
      </Modal>
      <ScheduleDetail
        open={detailOpen}
        close={onClickBack}
        user={user}
        formatDetailDate={formatDetailDate}
        formatDate={formatDate}
      ></ScheduleDetail>
    </>
  );
};
export default Meeting;
