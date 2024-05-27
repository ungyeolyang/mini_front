import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Modal from "../component/Modal";
import LetterAxiosApi from "../api/LetterAxiosApi";
import Btn from "../component/Btn";
import InputBar from "../component/InputBar";
import { UserContext } from "../context/UserStore";
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
    background-color: rgba(0, 0, 0, 0.6);
  }

  .openModal {
    display: flex;
    align-items: center;
    animation: modal-bg-show 0.8s;
  }

  section {
    width: 24%;
    max-width: 750px;
    margin: 0 auto;
    border-radius: 0.6rem;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;
    header {
      position: relative;
      padding: 16px 64px 16px 16px;
      background-color: #fefae0;
      font-weight: 700;
      text-align: center;
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
      padding: 2rem 2rem 0;
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

const Textarea = styled.textarea`
  resize: none;
  width: 25rem;
  font-size: 0.9rem;
  min-height: 10rem;
  padding: 1rem;
  margin-top: 1rem;
  &:focus {
    outline: none;
  }
`;
const Div = styled.div`
  /* position: absolute; */
  align-items: center;
  display: flex;
  width: 25rem;
  flex-direction: ${({ type }) => (type === "id" ? `column` : "row")};
`;

const Search = styled.div`
  display: flex;
  border: 0.1rem solid silver;
  padding: 0.8rem;
  border-top: none;
  width: 25rem;
`;

const Error = styled.span`
  color: red;
  position: absolute;
  top: ${(props) => (props.type === "area" ? `2rem` : `1rem`)};
  right: 0.5rem;
  font-size: 0.8rem;
  height: 1.5rem;
`;
const Input = styled.input`
  width: 25rem;
  height: 3rem;
  padding-left: 1rem;
  border: none;
  border-bottom: 0.1rem solid silver;
  cursor: ${(props) => !props.disabled && `pointer`};
  &:focus {
    outline: none;
  }
`;
const Id = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding-left: 1rem;
  font-size: 0.9rem;
  border-bottom: 0.1rem solid silver;
`;
const Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Application = (props) => {
  const { open, close, setIsSend, isSend, no } = props;

  const id = localStorage.getItem("id");
  const [text, setText] = useState("");

  const [textContents, setTextContents] = useState("");

  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // 알림창 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  //내용입력
  const onChangeContents = (e) => {
    setText(e.target.value);
    if (!e.target.value) {
      setTextContents("내용을 입력해주세요.");
    } else {
      setTextContents("");
    }
  };

  // 송신버튼 누르기
  const onClickSend = async () => {
    try {
      const rsp = await MeetingAxiosApi.application(no, id, text);
      console.log(rsp.data);
      if (rsp.data) {
        setIsSend(true);
      } else {
        setModalOpen(true);
        setModalContent("송신 오류");
      }
    } catch (e) {
      setIsSend(false);
      setModalOpen(true);
      setModalContent("서버가 응답하지 않습니다.");
    }
  };

  return (
    <>
      <ModalStyle>
        <div className={open ? "openModal modal" : "modal"}>
          {open && (
            <section>
              <header>
                신청하기
                <button onClick={close}>&times;</button>
              </header>
              <main>
                <Body>
                  {!isSend ? (
                    <>
                      <Div>
                        <Textarea
                          placeholder="추가소개"
                          onChange={onChangeContents}
                        ></Textarea>
                        <Error type="area">{textContents}</Error>
                      </Div>
                    </>
                  ) : (
                    <p>모임 신청을 완료했습니다.</p>
                  )}
                </Body>
              </main>
              <footer>
                <Btn onClick={!isSend ? onClickSend : close}>
                  {!isSend ? "신청" : "확인"}
                </Btn>
              </footer>
            </section>
          )}
        </div>
      </ModalStyle>
      <Modal open={modalOpen} close={closeModal} header="오류" btn="확인">
        {modalContent}
      </Modal>
    </>
  );
};
export default Application;
