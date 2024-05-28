import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Btn from "../component/Btn";
import Modal from "../component/Modal";
import UserDetail from "../component/UserDetail";
import { UserContext } from "../context/UserStore";
import LoginAxiosApi from "../api/LoginAxiosApi";
import MeetingAxiosApi from "../api/MeetingAxiosApi";

const ModalStyle = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0);
  }

  .openModal {
    display: flex;
    align-items: center;
    animation: modal-bg-show 0.8s;
  }

  section {
    min-width: 1000px;
    min-height: 500px;
    margin: 0 auto;
    border-radius: 0.6rem;
    background-color: #e5f3ff;
    animation: modal-show 0.3s;
    overflow: hidden;
    header {
      position: relative;
      text-align: center;
      padding: 16px 64px 16px 64px;
      background-color: #fefae0;
      font-weight: 700;
      button {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 30px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #999;
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }
    }
    main {
      padding: 2rem 0;
      border-top: 1px solid #dee2e6;
    }
    footer {
      padding: 12px 16px;
      text-align: right;
    }
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Div = styled.div`
  display: flex;
  align-content: center;
  gap: ${({ type }) => {
    switch (type) {
      case "title":
        return `35rem`;
      default:
        return `1rem`;
    }
  }};
  align-items: center;
  padding: ${({ type }) => {
    switch (type) {
      case "head":
        return `1.5rem 0.5rem`;
      case "title":
        return `1rem 3.8rem 0.5rem`;
      case "receive":
        return `0 4rem 0.5rem`;
      case "my":
        return `0 4rem 0.5rem`;
      case "date":
        return `0 4rem 1rem`;
      case "contents":
        return `1rem 4rem`;
      default:
        return `0`;
    }
  }};
  font-size: ${({ type }) => {
    switch (type) {
      case "title":
        return `2rem`;
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
const Del = styled.div`
  text-align: center;
  font-size: 1.5rem;
`;

const ScheduleDetail = (props) => {
  const {
    open,
    close,
    user,
    formatDate,
    formatDetailDate,
    setIsDelete,
    isDelete,
  } = props;
  const id = localStorage.getItem("id");
  const context = useContext(UserContext);
  const { rpad } = context;

  const [userOpen, setUserOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [nick, setNick] = useState("");

  // 알림창 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  const onClickUser = (e) => {
    setUserOpen(true);
  };

  const closeUser = () => {
    setUserOpen(false);
  };
  const onClickDelete = async (sno) => {
    console.log(sno);
    try {
      const rsp = await MeetingAxiosApi.delSchedule(sno);
      if (rsp.data) {
        console.log("삭제성공");
      } else {
        console.log("삭제실패");
      }
    } catch (e) {
      console.log("삭제 오류");
    }
    setIsDelete(true);
  };

  useEffect(() => {
    const getMember = async () => {
      try {
        const rsp = await LoginAxiosApi.memberGetOne(id);
        console.log(rsp.data);
        setNick(rsp.data[0].nick);
      } catch (e) {
        console.log(e);
      }
    };
    getMember();
  }, []);
  return (
    <>
      <ModalStyle>
        <div className={open ? "openModal modal" : "modal"}>
          {open && (
            <section>
              <header>
                공지사항
                <button onClick={close}>&times;</button>
              </header>
              <main>
                {!isDelete ? (
                  <>
                    <Body>
                      <Div type="title">
                        <Bold>{user.title}</Bold>
                        <Div>
                          <span>일정 : {formatDate(user.sdate)}</span>
                          {id === user.id && (
                            <Btn onClick={() => onClickDelete(user.sno)}>
                              삭제
                            </Btn>
                          )}
                        </Div>
                      </Div>
                      <Div type="receive">
                        <Bold>작성자</Bold>
                        <User onClick={onClickUser} user={user.id}>
                          <Bold>{nick}</Bold>(
                          {rpad(user.id.substr(0, 3), user.id.length, "*")})
                        </User>
                      </Div>
                      <Div type="date">{formatDetailDate(user.bdate)}</Div>
                    </Body>
                    <Div type="contents">{user.contents}</Div>
                  </>
                ) : (
                  <Del>삭제가 완료되었습니다.</Del>
                )}
              </main>
            </section>
          )}
        </div>
      </ModalStyle>
      <Modal open={modalOpen} close={closeModal} header="친구추가" btn="확인">
        {modalContent}
      </Modal>
      <UserDetail
        open={userOpen}
        close={closeUser}
        userId={user?.id}
      ></UserDetail>
    </>
  );
};
export default ScheduleDetail;
