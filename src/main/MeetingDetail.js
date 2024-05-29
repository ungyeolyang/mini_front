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
    background-color: rgba(
      0,
      0,
      0,
      0.5
    ); /* Increased opacity for better visibility */
  }

  .openModal {
    display: flex;
    align-items: center;
    justify-content: center; /* Centering the modal */
    animation: modal-bg-show 0.8s;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 1000px;
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
  @media (max-width: 720px) {
    .openModal {
      align-items: flex-start;
    }
    section {
      height: 100%;
      width: 100%;
      min-width: 100%;
      border-radius: 0;
      overflow: auto;
    }
    header {
      width: 100%;
      padding: 16px 16px;
    }
    main {
      padding: 1rem 0;
    }
  }
`;

const Div = styled.div`
  display: flex;
  width: 90%;
  justify-content: flex-start;
  align-items: ${({ type }) => (type === "head" ? `flex-end` : `center`)};
  padding: 0.5rem 5rem;
  gap: ${({ type }) => (type === "head" ? `30%` : `60%`)};

  @media (max-width: 720px) {
    padding: 0.5rem 1rem;
    flex-direction: column;
    gap: ${({ type }) => (type === "head" ? `0.5rem` : `1rem`)};
    text-align: center;
    align-items: center;
  }
`;

const Cdiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ type }) => (type === "head" ? `0.5rem` : `0.5rem`)};
  > span {
    font-size: 1.1rem;
    padding-left: 0.5rem;
  }
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Bold = styled.div`
  font-weight: bold;
  font-size: ${({ size }) => size || "1rem"};
`;

const Title = styled.div`
  font-size: 3rem;
  padding: 1rem;
  width: 90%;
  text-align: center;
  border-bottom: 1px solid gray;
  @media (max-width: 720px) {
    font-size: 20px;
    width: 100%;
    padding: 0.5rem;
  }
`;

const Gray = styled.span`
  color: gray;
  font-size: 1.1rem;
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
  @media (max-width: 720px) {
    width: 100%;
    padding: 1rem;
    border-radius: 0;
    text-align: center;
  }
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

  const onClickUser = () => {
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
                  <Div type="head">
                    <Cdiv>
                      <Gray>{moim?.category}</Gray>
                      <Bold size={"2rem"}>{moim?.title}</Bold>
                      <UserBox>
                        <Bold>모임장</Bold>
                        <User onClick={onClickUser}>
                          {userNick}({moim?.id})
                        </User>
                      </UserBox>
                    </Cdiv>
                    {moim?.id !== id && !accept?.includes(moim.no) && (
                      <Btn
                        onClick={() => {
                          setApplyOpen(true);
                        }}
                      >
                        신청하기
                      </Btn>
                    )}
                  </Div>
                  <Div>
                    <Cdiv>
                      <Bold size={"1.5rem"}>인원</Bold>
                      <span>
                        {size} / {moim?.personnel}
                      </span>
                    </Cdiv>
                    <Cdiv>
                      <Bold size={"1.5rem"}>기간</Bold>
                      <span>
                        {moim?.duration1 ? formatDate(moim?.duration1) : "매일"}
                      </span>
                      <span>
                        {moim?.duration2 && ` ~ ${formatDate(moim?.duration2)}`}
                      </span>
                    </Cdiv>
                  </Div>
                  <Div>
                    <Cdiv>
                      <Bold size={"1.5rem"}>세부사항</Bold>
                      <span>{moim?.detail}</span>
                    </Cdiv>
                  </Div>
                  <Div>
                    <Cdiv>
                      <Bold size={"1.5rem"}>세부위치</Bold>
                      <span>{moim?.location}</span>
                      {moim?.location !== "온라인" && <KakaoMap moim={moim} />}
                    </Cdiv>
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
