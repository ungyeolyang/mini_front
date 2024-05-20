import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Modal from "../component/Modal";
import LetterAxiosApi from "../api/LetterAxiosApi";
import Btn from "../component/Btn";
import InputBar from "../component/InputBar";
import LoginAxiosApi from "../api/LoginAxiosApi";

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
  position: relative;
  align-items: center;
  display: flex;
  width: 25rem;
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

const Send = (props) => {
  const { open, close, category, onSelect } = props;
  const inputId = useRef(null);
  const id = localStorage.getItem("id");

  const [receive, setReceive] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);

  const [isId, setIsId] = useState(false);
  const [isSend, setIsSend] = useState(false);

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
  };
  const searchId = async (e) => {
    try {
      const rsp = await LetterAxiosApi.searchId(receive);
      if (receive < 3) {
        setUser(null);
        setIdContents("");
      } else if (!rsp.data && receive.length >= 3) {
        setUser(null);
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

  //아이디 확인
  const conId = async () => {
    const rsp1 = await LoginAxiosApi.memberConId(receive);
    try {
      if (rsp1.data) {
        console.log(rsp1.data);
        setIsId(true);
      } else {
        console.log(rsp1.data);
        setIsId(false);
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

  //아이디 선택
  const onClickId = (e) => {
    const idReg = /\((.*?)\)/;
    const matchId = idReg.exec(e.target.textContent);
    // const nickReg = /^(.*?)\(/;
    // const matcheNick = nickReg.exec(e.target.textContent);
    if (matchId) {
      inputId.current.value = matchId[1];
      setReceive(matchId);
    } else {
      console.log("괄호 안의 문자열을 추출할 수 없습니다.");
    }
  };

  useEffect(() => {
    searchId();
    conId();
  }, [receive]);

  // 송신버튼 누르기
  const onClickSend = async () => {
    try {
      const rsp = await LetterAxiosApi.send(id, receive, title, text);
      if (!isId) {
        setModalOpen(true);
        setModalContent("아이디를 재 확인 해 주세요.");
      } else if (rsp.data) {
        setIsSend(true);
      } else {
        setModalOpen(true);
        setModalContent("송신 오류");
      }
    } catch (e) {
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
                {category}
                <button onClick={close}>&times;</button>
              </header>
              <main>
                {!isSend ? (
                  <>
                    <Div type="nick">
                      <Input
                        placeholder="받는사람"
                        onChange={onChangeReceive}
                        ref={inputId}
                      />
                      <Error>{idContents}</Error>
                    </Div>
                    {user &&
                      !isId &&
                      user.map((e) => (
                        <Search key={e.id} onClick={onClickId}>
                          <span>
                            {e.nick}({e.id})
                          </span>
                        </Search>
                      ))}
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
                  </>
                ) : (
                  <p>편지를 발송했습니다.</p>
                )}
              </main>
              <footer>
                <Btn onClick={onClickSend}>보내기</Btn>
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
