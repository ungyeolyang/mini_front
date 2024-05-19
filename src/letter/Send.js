import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Modal from "../component/Modal";
import LetterAxiosApi from "../api/LetterAxiosApi";
import Btn from "../component/Btn";
import InputBar from "../component/InputBar";

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
    width: 28%;
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
  position: relative;
  display: flex;
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

const Send = (props) => {
  const { open, close, category, onSelect } = props;

  const [receive, setReceive] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [user, setUser] = useState([]);

  const [idContents, setIdContents] = useState("");
  const [titleContents, setTitleContents] = useState("");
  const [textContents, setTextContents] = useState("");

  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const onClickCategory = (e) => {
    onSelect(e.target.textContent);
  };

  // 알림창 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  //받을사람 입력
  const onChangeReceive = async (e) => {
    setReceive(e.target.value);

    try {
      const rsp = await LetterAxiosApi.searchId(receive);
      if (e.target.value.length < 3) {
        setUser([]);
        setIdContents("");
      } else if (rsp.data.length === 0 && e.target.value.length >= 3) {
        setUser([]);
        setIdContents("아이디를 재 확인 해 주세요.");
      } else {
        setUser(rsp.data);
        setIdContents("");
        console.log(rsp.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  //제목입력
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    if (!e.target.value) {
      setTitleContents("제목을 입력해주세요.");
    } else {
      setTitleContents("");
    }
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

  // // 송신버튼 누르기
  // const onClickCert = async () => {
  //   try {
  //     const rsp = await LoginAxiosApi.memberCertEmail(inputEmail, category);
  //     console.log(rsp.data);
  //     if (!hasId) {
  //       setModalOpen(true);
  //       setModalContent("아이디와 이메일을 재 확인 해 주세요.");
  //     } else if (rsp.data) {
  //       onFind(true);
  //       setContent(rsp.data);
  //     } else {
  //       setModalOpen(true);
  //       setModalContent("이메일을 재 확인 해 주세요.");
  //     }
  //   } catch (e) {
  //     setModalOpen(true);
  //     setModalContent("서버가 응답하지 않습니다.");
  //   }
  // };

  return (
    <>
      <ModalStyle>
        <div className={open ? "openModal modal" : "modal"}>
          {open && (
            <section>
              <header>
                {category}
                <button onClick={close}>&times;</button>
              </header>
              <main>
                <Div>
                  <InputBar placeholder="받는사람" onChange={onChangeReceive} />
                  <Error>{idContents}</Error>
                </Div>
                <div>
                  {user &&
                    user.map((e) => (
                      <span key={e.id}>
                        {e.nick}({e.id})
                      </span>
                    ))}
                </div>
                <Div>
                  <InputBar placeholder="제목" onChange={onChangeTitle} />
                  <Error>{titleContents}</Error>
                </Div>
                <Div>
                  <Textarea
                    placeholder="내용"
                    onChange={onChangeContents}
                  ></Textarea>
                  <Error type="area">{textContents}</Error>
                </Div>
              </main>
              <footer>
                <Btn onClick={close}>취소</Btn>
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
export default Send;
