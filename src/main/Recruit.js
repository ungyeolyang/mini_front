import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../component/Modal";
import Btn from "../component/Btn";
import InputBar from "../component/InputBar";
import PopupDom from "../component/PopupDom";
import PostCode from "../component/PostCode";

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

const Recruit = (props) => {
  const { open, close, category } = props;

  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState("");

  // 알림창 닫기
  const closeModal = () => {
    setModalOpen(false);
  };
  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const resetAddress = () => {
    setAddress("");
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
                <InputBar placeholder={"제목"} />
                <InputBar placeholder={"모임명"} />
                <div>
                  인원
                  <input type="number" />
                </div>
                <div>
                  기간
                  <input type="date" /> ~ <input type="date" />
                </div>
                <div>
                  카테고리{" "}
                  <select name="" id="">
                    <option value="">운동</option>
                    <option value="">취미</option>
                    <option value="">공부</option>
                  </select>
                </div>
                <div>
                  위치
                  <button type="button" onClick={openPostCode}>
                    우편번호 검색
                  </button>
                  <div id="popupDom">
                    {isPopupOpen && (
                      <PopupDom>
                        <PostCode
                          onClose={closePostCode}
                          setAddress={setAddress}
                        />
                      </PopupDom>
                    )}
                  </div>
                  <div>{address}</div> {}
                </div>
                <InputBar placeholder={"세부내용"} />
              </main>
              <footer>
                <Btn onClick={close}>등록</Btn>
                <Btn
                  onClick={() => {
                    close();
                    resetAddress();
                  }}
                >
                  취소
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
export default Recruit;
