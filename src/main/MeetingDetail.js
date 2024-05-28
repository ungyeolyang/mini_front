import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Btn from "../component/Btn";
import Modal from "../component/Modal";
import UserDetail from "../component/UserDetail";
import { UserContext } from "../context/UserStore";
import LetterAxiosApi from "../api/LetterAxiosApi";
import KakaoMap from "../KakaoMap";
import Application from "./Application";
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
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 1000px;
    min-height: 900px;
    margin: 0 auto;
    border-radius: 0.6rem;
    background-color: #e5f3ff;
    animation: modal-show 0.3s;
    overflow: hidden;
    header {
      position: relative;
      text-align: center;
      width: 100%;
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
  }
`;

const Div = styled.div``;

const Bold = styled.span`
  font-weight: bold;
  font-size: inherit;
`;
const Title = styled.div`
  font-size: 3rem;
  padding: 1rem;
  width: 90%;
  text-align: center;
  border-bottom: 1px solid gray;
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
  width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-top-left-radius: 85px;
  border-top-right-radius: 85px;
  padding: 2rem;
`;

const MeetingDetail = (props) => {
  const { open, close, moim, accept } = props;
  const id = localStorage.getItem("id");

  const context = useContext(UserContext);
  const { nick, imgUrl, formatDate } = context;

  const [size, setSize] = useState(0);
  const [userOpen, setUserOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const [userNick, setUserNick] = useState("");
  const [isSend, setIsSend] = useState(false);

  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

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

  const closeApply = () => {
    setApplyOpen(false);
    setIsSend(false);
  };

  const memberList = async () => {
    try {
      const rsp = await MeetingAxiosApi.memberList(moim.no);
      if (rsp.data) {
        console.log("인원수", rsp.data.length);
        setSize(rsp.data.length);
      } else {
        console.log("멤버를 못불러옴");
        setSize(0);
      }
    } catch (e) {
      console.log("오류발생");
    }
  };

  useEffect(() => {
    const getNick = async () => {
      try {
        const rsp = await LetterAxiosApi.getNick(moim?.id);
        if (rsp.data) {
          // console.log(rsp.data);
          setUserNick(rsp.data);
        }
      } catch (e) {}
    };
    getNick();
    memberList();
  }, [moim]);

  return (
    <>
      <ModalStyle>
        <div className={open ? "openModal modal" : "modal"}>
          {open && (
            <section>
              <header>
                모임
                <button onClick={close}>&times;</button>
              </header>
              <main>
                <Body>
                  <Title>{moim?.name}</Title>
                  <span>
                    기간 :
                    {moim?.duration1 ? formatDate(moim?.duration1) : "매일"}
                    {moim?.duration2 && ` ~ ${formatDate(moim?.duration2)}`}
                  </span>
                  {id === moim?.id && <Btn>삭제</Btn>}
                  <Div>{moim?.category}</Div>
                  <Div>{moim?.title}</Div>
                  <Div>
                    {size} / {moim?.personnel}
                  </Div>
                  <Div>{moim?.detail}</Div>
                  <Div>{moim?.location || "온라인"}</Div>
                  {moim?.id !== id && !accept?.includes(moim.no) && (
                    <Btn
                      onClick={() => {
                        setApplyOpen(true);
                      }}
                    >
                      신청하기
                    </Btn>
                  )}
                  <KakaoMap moim={moim} />
                  <Div type="receive">
                    <Bold>작성자</Bold>
                    <User onClick={onClickUser} user={moim?.id}>
                      {userNick}({moim?.id})
                    </User>
                  </Div>
                </Body>
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
        userId={moim?.id}
        nick={nick}
        imgUrl={imgUrl}
      ></UserDetail>
      <Application
        no={moim?.no}
        open={applyOpen}
        close={closeApply}
        isSend={isSend}
        setIsSend={setIsSend}
      ></Application>
    </>
  );
};
export default MeetingDetail;
