import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Profile from "./Profile";
import Btn from "./Btn";
import LoginAxiosApi from "../api/LoginAxiosApi";
import { LuUserPlus2, LuMail } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Send from "../letter/Send";
import LetterAxiosApi from "../api/LetterAxiosApi";
import { UserContext } from "../context/UserStore";

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
    width: 30rem;
    max-width: 750px;
    margin: 0 auto;
    border-radius: 0.6rem;
    background-color: #fff;
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
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  > span {
    font-size: 1.1rem;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1rem;
  margin: 1rem 0;
  background-color: #b8d0fa;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  font-size: 3.5rem;
  span {
    font-weight: bold;
    font-size: 1.1rem;
  }
`;
const Div = styled.div`
  display: flex;
  span:first-child {
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const Cdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #94b9f3;
    /* :first-child {
      font-size: 4rem; */
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > span {
    font-size: 0.9rem;
    color: gray;
  }
`;

const UserDetail = (props) => {
  const navigate = useNavigate();
  const { open, close, title, userId, nick, imgUrl } = props;
  const id = localStorage.getItem("id");

  const [user, setUser] = useState("");
  const [letterOpen, setLetterOpen] = useState(false);

  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [isSend, setIsSend] = useState(false);

  // 알림창 닫기
  const closeModal = () => {
    setModalOpen(false);
  };
  //쪽지창 닫기
  const closeLetter = () => {
    setLetterOpen(false);
    setIsSend(false);
  };

  const calAge = () => {
    const date = new Date(user?.birth);
    const birth = date.getFullYear();
    const date1 = new Date();
    const year = date1.getFullYear();

    return `${Math.floor((year - birth) / 10) * 10}대`;
  };

  const onClickLetter = () => {
    setLetterOpen(true);
  };

  const onClickFriend = () => {
    console.log(id, nick, imgUrl);
    console.log(user.id, user.nick, user.profile);
    // setModalOpen(true);
    // setModalContent("친구신청이 완료되었습니다.");
  };

  const plusFriend = async () => {
    // try {
    //   const rsp = await LetterAxiosApi.plusFriend(id, nick, imgUrl,user.id,user.nick,user.profile);
    // } catch (e) {}
  };

  useEffect(() => {
    const getMember = async () => {
      try {
        const rsp = await LoginAxiosApi.memberGetOne(userId);
        setUser(rsp.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    getMember();
  }, [userId]);

  return (
    <>
      <ModalStyle>
        <div className={open ? "openModal modal" : "modal"}>
          {open && (
            <section>
              <header>
                {title}
                <button onClick={close}>&times;</button>
              </header>
              <main>
                <Body>
                  <Profile size={`9rem`}>
                    <img src={user?.profile} alt="프로필사진" />
                  </Profile>
                  <Info>
                    <Div>
                      <span>{user?.nick}</span>
                      <span>({user?.id})</span>
                    </Div>
                    <span>
                      {calAge(user?.birth)} / {user?.gender}
                    </span>
                  </Info>
                  <span>{user?.introdution}</span>
                  <Line></Line>
                  <Footer>
                    {id !== user.id && (
                      <Cdiv onClick={onClickFriend}>
                        <div>
                          <LuUserPlus2 />
                        </div>
                        <span>친구 추가</span>
                      </Cdiv>
                    )}
                    <Cdiv onClick={onClickLetter}>
                      <div>
                        <LuMail />
                      </div>
                      <span>편지 쓰기</span>
                    </Cdiv>
                  </Footer>
                </Body>
              </main>
              <footer>
                <Btn onClick={close}>확인</Btn>
              </footer>
            </section>
          )}
        </div>
        <Send
          open={letterOpen}
          close={closeLetter}
          category="쪽지쓰기"
          setIsSend={setIsSend}
          isSend={isSend}
          user={user}
        ></Send>
      </ModalStyle>
      <Modal open={modalOpen} close={closeModal} header="친구추가" btn="확인">
        {modalContent}
      </Modal>
    </>
  );
};
export default UserDetail;
