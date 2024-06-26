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
import UserDetail from "../component/UserDetail";

const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
`;
const FullBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40vw;
  height: 85vh;
  @media (max-width: 762px) {
    width: 80vw;
    height: 80vh;
    position: absolute;
    left: 1rem;
  }
`;

const MemberBox = styled.div`
  width: 95%;
  display: flex;
  position: absolute;
  align-items: center;
  padding-right: 4rem;
  overflow-x: auto;
  top: -4rem;
  border-radius: 1rem;
  background-color: #e5f3ff;
`;
const Personnel = styled.span`
  position: absolute;
  font-weight: bold;
  right: 2rem;
  span {
    color: gray;
  }
`;
const Head = styled.div`
  position: absolute;
  top: 5rem;
  width: 90%;
  height: 2.4rem;
  border-bottom: 2px solid #ccd5ae;
  padding-left: 1rem;
  span {
    padding: 1rem;
    font-size: 1rem;
    border: 2px solid;
    border-bottom: none;
    cursor: pointer;
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

const Span = styled.span`
  color: ${({ isDetail }) => (isDetail === 3 ? `#94b9f3` : `#e5f3ff`)};
  border-color: ${({ isDetail }) => (isDetail === 3 ? `#ccd5ae` : `#e9edc9`)};
  display: ${({ isSmall }) => !isSmall && `none`};
`;

const Meeting = () => {
  const { no } = useParams();
  const context = useContext(UserContext);
  const { formatDetailDate, formatDate } = context;
  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [member, setMember] = useState();
  const [user, setUser] = useState();
  const [info, setInfo] = useState();
  const [size, setSize] = useState(0);
  const [userId, setUserId] = useState();
  const [schedule, setSchedule] = useState([]);
  const [isDetail, setIsDetail] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  const [searchCategory, setSearchCategory] = useState("title");
  const [text, setText] = useState("");

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeSend = () => {
    setSendOpen(false);
    setIsSend(false);
  };

  const meetingInfo = async () => {
    try {
      const rsp = await MeetingAxiosApi.meetingInfo(no);
      if (rsp.data) {
        console.log("정보", rsp.data);
        setInfo(rsp.data[0]);
      } else {
        console.log("모임정보를 못불러옴");
      }
    } catch (e) {
      console.log("오류발생");
    }
  };

  const memberList = async () => {
    try {
      const rsp = await MeetingAxiosApi.memberList(no);
      if (rsp.data) {
        setMember(rsp.data);
        setSize(rsp.data.length);
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
    setIsDelete(false);
  };

  const onClickDetail = (props) => {
    setUserOpen(true);
    setUserId(props);
  };
  const detail = () => {
    switch (isDetail) {
      case 2:
        return (
          <Calendar
            meetingNo={no}
            setIsDetail={setIsDetail}
            setText={setText}
            setSearchCategory={setSearchCategory}
            isSend={isSend}
            isSmall={isSmall}
          />
        );
      case 1:
        return (
          <ScheduleBox
            schedule={schedule}
            onClickDetail={onclickDetail}
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            text={text}
            setText={setText}
          />
        );
      case 3:
        return <Chatting no={no} info={info} isSmall={isSmall} />;
      default:
        return (
          <ScheduleBox
            schedule={schedule}
            onClickDetail={onclickDetail}
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            text={text}
            setText={setText}
          />
        );
    }
  };

  useEffect(() => {
    memberList();
    scheduleList();
    meetingInfo();
  }, [isSend, isDetail, isDelete]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 720) {
        setIsSmall(true);
      } else setIsSmall(false);
      setIsDetail(1);
    };

    window.addEventListener("resize", handleResize);
    // 초기 실행을 위해 호출
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSmall]);

  return (
    <>
      <Right>
        <Container>
          <FullBox>
            <MemberBox>
              {member &&
                member.map((user) => (
                  <Member
                    key={user.id}
                    size={`3rem`}
                    id={user.id}
                    onClickDetail={onClickDetail}
                  ></Member>
                ))}
              <Personnel>
                <span>{size}</span> / {info?.personnel}
              </Personnel>
            </MemberBox>
            <Head>
              <span
                onClick={() => setIsDetail(1)}
                style={{
                  color: isDetail === 1 ? `#94b9f3` : `#e5f3ff`,
                  borderColor: isDetail === 1 ? `#ccd5ae` : `#e9edc9`,
                }}
              >
                공지
              </span>
              <span
                onClick={() => setIsDetail(2)}
                style={{
                  color: isDetail === 2 ? `#94b9f3` : `#e5f3ff`,
                  borderColor: isDetail === 2 ? `#ccd5ae` : `#e9edc9`,
                }}
              >
                캘린더
              </span>
              <Span
                onClick={() => setIsDetail(3)}
                isSmall={isSmall}
                isDetail={isDetail}
              >
                채팅
              </Span>
              <Button onClick={() => setSendOpen(true)}>글쓰기</Button>
            </Head>
            {detail()}
          </FullBox>
          {!isSmall && <Chatting no={no} info={info} isSmall={isSmall} />}
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
        isDelete={isDelete}
        setIsDelete={setIsDelete}
      ></ScheduleDetail>
      <ScheduleSend
        open={sendOpen}
        close={closeSend}
        isSend={isSend}
        setIsSend={setIsSend}
        no={no}
      ></ScheduleSend>
      <UserDetail
        open={userOpen}
        close={() => {
          setUserOpen(false);
        }}
        userId={userId}
      ></UserDetail>
    </>
  );
};
export default Meeting;
