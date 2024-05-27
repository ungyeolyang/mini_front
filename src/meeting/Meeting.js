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
import { useParams } from "react-router-dom";
import ScheduleSend from "./ScheduleSend";

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
const Head = styled.div`
  position: relative;
  width: 90%;
  height: 2.4rem;
  margin-top: 4rem;
  border-bottom: 2px solid #94b9f3;
  padding-left: 1rem;
  span {
    padding: 1rem;
    font-size: 1rem;
    border: 2px solid #e5f3ff;
    border-bottom: none;
    cursor: pointer;
    &:hover {
      border-color: #94b9f3;
    }
  }
`;

const Button = styled.button`
  position: absolute;
  right: 1rem;
  bottom: 0.5rem;
  outline: none;

  align-items: center;
  cursor: pointer;
  margin-right: 10px;
  background-color: #e9edc9;
  border: 0;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  &:hover {
    background-color: #ccd5ae;
    color: #fff;
  }
`;

const Meeting = () => {
  const { no } = useParams();
  const context = useContext(UserContext);
  const { formatDetailDate, formatDate } = context;
  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [member, setMember] = useState();
  const [user, setUser] = useState();
  const [schedule, setSchedule] = useState([]);
  const [isDetail, setIsDetail] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);

  const [searchCategory, setSearchCategory] = useState("title");
  const [text, setText] = useState("");

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeSend = () => {
    setSendOpen(false);
    setIsSend(false);
  };
  const memberList = async () => {
    try {
      const rsp = await MeetingAxiosApi.memberList(13);
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

  const scheduleList = async () => {
    try {
      const rsp = await MeetingAxiosApi.scheduleList(no);
      console.log(rsp.data);
      if (rsp.data) {
        setSchedule(rsp.data);
      } else {
        console.log("공지를 못불러옴");
        setSchedule([]);
      }
    } catch (e) {
      console.log(e);
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
    console.log(no);
    memberList();
    scheduleList();
  }, [sendOpen]);

  return (
    <>
      <Right>
        <Container>
          <FullBox>
            <MemberBox>
              {member &&
                member.map((user) => (
                  <Member key={user.id} size={`3rem`} id={user.id}></Member>
                ))}
            </MemberBox>
            <Head>
              <span
                onClick={() => setIsDetail(true)}
                style={{
                  color: isDetail ? `#94b9f3` : `#e5f3ff`,
                  borderColor: isDetail ? `#94b9f3` : `#e5f3ff`,
                }}
              >
                공지
              </span>
              <span
                onClick={() => setIsDetail(false)}
                style={{
                  color: !isDetail ? `#94b9f3` : `#e5f3ff`,
                  borderColor: !isDetail ? `#94b9f3` : `#e5f3ff`,
                }}
              >
                캘린더
              </span>
              <Button onClick={() => setSendOpen(true)}>글쓰기</Button>
            </Head>
            {!isDetail ? (
              <Calendar
                meetingNo={no}
                setIsDetail={setIsDetail}
                setText={setText}
                setSearchCategory={setSearchCategory}
              />
            ) : (
              <ScheduleBox
                schedule={schedule}
                onClickDetail={onclickDetail}
                searchCategory={searchCategory}
                setSearchCategory={setSearchCategory}
                text={text}
                setText={setText}
              />
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
      <ScheduleSend
        open={sendOpen}
        close={closeSend}
        isSend={isSend}
        setIsSend={setIsSend}
        no={no}
      ></ScheduleSend>
    </>
  );
};
export default Meeting;
