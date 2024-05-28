import React, { useRef, useState } from "react";
import styled from "styled-components";
import Modal from "../component/Modal";
import LoginAxiosApi from "../api/LoginAxiosApi";
import Btn from "../component/Btn";
import Input from "../component/Input";

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
      text-align: center;
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
  padding: 0.9rem 1rem;
  border-radius: 0.5rem;
  background-color: #e9edc9;
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

const Error = styled.span`
  color: red;
  font-size: 0.8rem;
`;

const FindIdPw = (props) => {
  const {
    open,
    close,
    category,
    onSelect,
    onFind,
    isFind,
    content,
    setContent,
  } = props;

  const [inputId, setInputId] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [hasId, setHasId] = useState(false);

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
      const rsp = await LoginAxiosApi.memberCertEmail(inputEmail, category);
      console.log(rsp.data);
      if (!hasId && category === "비밀번호 찾기") {
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
  //이메일 입력
  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
  };
  //아이디 확인
  const onChangeId = async (e) => {
    const id = e.target.value;
    setInputId(id);

    try {
      const rsp = await LoginAxiosApi.memberConId(id);
      console.log(rsp.data);
      if (category === "비밀번호 찾기") {
        if (!id || id.length <= 3) {
          setContent("");
          setHasId(false);
        } else if (!rsp.data && id.length >= 3) {
          setContent("아이디를 재 확인 해 주세요.");
          setHasId(false);
        } else {
          console.log(rsp.data);
          setContent("");
          setHasId(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onKeyDownEnter = (e) => {
    if (e.key === "Enter") {
      onClickCert();
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
                            placeholder="아이디를 입력해주세요."
                            ref={id}
                            onChange={onChangeId}
                            onKeyDown={onKeyDownEnter}
                          />
                          <Error>{content}</Error>
                        </div>
                      )}
                      <div>
                        <Input
                          placeholder="이메일을 입력해주세요."
                          onChange={onChangeEmail}
                          onKeyDown={onKeyDownEnter}
                        />
                        <Button onClick={onClickCert}>확인</Button>
                      </div>
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
              <footer></footer>
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
export default FindIdPw;
