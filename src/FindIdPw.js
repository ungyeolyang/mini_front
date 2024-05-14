import React, { useRef, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import AxiosApi from "./api/AxiouApi";

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
    width: 90%;
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
      button {
        padding: 6px 12px;
        color: #000;
        background-color: #e9edc9;
        border-radius: 5px;
        font-size: 13px;
      }
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

const Button = styled.button`
  outline: none;
  cursor: pointer;
  margin-right: 10px;
  border: 0;
  width: 60px;
  &:hover {
    background-color: #ccd5ae;
    color: #fff;
  }
`;

const Span = styled.span`
  padding: 1rem;
  cursor: pointer;
  border: 1px solid silver;
  color: ${(props) => (props.active ? "#94B9F3" : "inherit")};
  border-bottom: ${(props) =>
    props.active ? "1px solid white" : "1px solid silver"};
`;

const Body = styled.div`
  display: flex;
  border: 1px solid silver;
  margin-top: 1rem;
  padding: 2rem;
  flex-direction: column;
`;

const Input = styled.input`
  width: ${(props) => (props.placeholder === "인증번호" ? "12.5rem" : "25rem")};
  height: 2.5rem;
  margin: 0.7rem;
  padding-left: 1rem;
`;
const Btn = styled.button`
  height: 2.5rem;
  border: 0;
  padding: 0 1.5rem;
  background-color: #e9edc9;
  border-radius: 5px;
  &:hover {
    background-color: #ccd5ae;
    color: #fff;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 0.8rem;
`;

const FindIdPw = (props) => {
  const { open, close, category, onSelect, onFind, isFind } = props;

  const [inputId, setInputId] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [hasId, setHasId] = useState(false);
  const [content, setContent] = useState("");

  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const id = useRef(null);
  const onClickCategory = (e) => {
    onSelect(e.target.textContent);
  };

  // 알림창 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  // 인증번호버튼 누르기
  const onClickCert = async () => {
    try {
      const rsp = await AxiosApi.memberCertEmail(inputEmail, category);
      console.log(rsp.data);
      if (!hasId) {
        setModalOpen(true);
        setModalContent("아이디와 이메일을 재 확인 해 주세요.");
      } else if (rsp.data) {
        onFind(true);
        setContent(rsp.data);
      } else {
        setModalOpen(true);
        setModalContent("이메일을 재 확인 해 주세요.");
      }
    } catch (e) {
      setModalOpen(true);
      setModalContent("서버가 응답하지 않습니다.");
    }
  };

  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
  };

  const onChangeId = async (e) => {
    setInputId(e.target.value);

    try {
      const rsp = await AxiosApi.memberCertId(inputId);
      console.log(rsp.data);
      if (!inputId || inputId.length <= 3) {
        setContent("");
        setHasId(false);
      }
      if (!rsp.data && inputId.length >= 3) {
        setContent("아이디를 재 확인 해 주세요.");
        setHasId(false);
      } else {
        setContent("");
        setHasId(true);
      }
    } catch (e) {
      console.log(e);
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
                {!isFind ? (
                  <>
                    <Span
                      onClick={onClickCategory}
                      active={category === "아이디 찾기"}
                    >
                      아이디 찾기
                    </Span>
                    <Span
                      onClick={onClickCategory}
                      active={category === "비밀번호 찾기"}
                    >
                      비밀번호 찾기
                    </Span>
                    <Body>
                      {category === "비밀번호 찾기" && (
                        <div>
                          <Input
                            type="text"
                            placeholder="아이디를 입력해주세요."
                            ref={id}
                            onChange={onChangeId}
                          />
                          <Error>{content}</Error>
                        </div>
                      )}
                      <div>
                        <Input
                          type="text"
                          placeholder="이메일을 입력해주세요."
                          onChange={onChangeEmail}
                        />
                        <Btn onClick={onClickCert}>확인</Btn>
                      </div>
                      {/* <div>
                        <Input type="text" placeholder="인증번호" />
                        <Btn>확인</Btn>
                      </div> */}
                    </Body>
                  </>
                ) : (
                  <>
                    <p>
                      {category} : {content}
                    </p>
                  </>
                )}
              </main>
              <footer>
                <Button onClick={close}>취소</Button>
              </footer>
            </section>
          )}
        </div>
      </ModalStyle>
      <Modal open={modalOpen} close={closeModal} header="오류">
        {modalContent}
      </Modal>
    </>
  );
};
export default FindIdPw;
