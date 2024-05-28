import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Btn from "../component/Btn";
import InputBar from "../component/InputBar";
import PopupDom from "../component/PopupDom";
import PostCode from "../component/PostCode";
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
    width: 40rem;
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
const Box = styled.div`
  display: flex;
  align-items: ${({ type }) => {
    switch (type) {
      case "footer":
        return `flex-end`;
      default:
        return `center`;
    }
  }};
  width: ${({ type }) => {
    switch (type) {
      case "footer":
        return `50rem`;
      case "duration":
        return `50rem`;
      case "location":
        return `50rem`;
      default:
        return `25rem`;
    }
  }};
  height: ${({ type }) => {
    switch (type) {
      case "footer":
        return `10rem`;
      default:
        return `3rem`;
    }
  }};
  padding-left: ${({ type }) => {
    switch (type) {
      case "footer":
        return `0`;
      case "location":
        return `0`;
      default:
        return `1rem`;
    }
  }};
  gap: ${({ type }) => {
    switch (type) {
      case "footer":
        return `5rem`;
      default:
        return `1.5rem`;
    }
  }};
  margin-top: 0.1rem;

  span,
  label {
    color: #757575;
    font-size: small;
  }
  input,
  select {
    height: 100%;
    padding-left: 1rem;
    border: none;
    border-bottom: 0.1rem solid silver;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
`;

const Number = styled.input`
  width: 3rem;
  margin-right: 4rem;
`;

const Select = styled.select`
  width: 5rem;
`;
const Input = styled.div`
  display: flex;
  align-items: center;
  width: 25rem;
  height: 3rem;
  padding-left: 1rem;
  gap: 1.5rem;
  cursor: pointer;
  border-bottom: 0.1rem solid silver;
  span {
    color: #757575;
    font-size: small;
  }
`;
const Text = styled.textarea`
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

const Recruit = (props) => {
  const {
    open,
    close,
    setModalOpen,
    setModalContent,
    setHeader,
    address,
    setAddress,
  } = props;
  const context = useContext(UserContext);
  const { rpad } = context;
  const id = localStorage.getItem("id");

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [personnel, setPersonnel] = useState("");
  const [category, setCategory] = useState("운동");
  const [isDuration, setIsDuration] = useState(1);
  const [duration1, setDuration1] = useState("");
  const [duration2, setDuration2] = useState("");
  const [isLocation, setIsLocation] = useState("오프라인");
  const [detail, setDetail] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangePersonnel = (e) => {
    e.target.value < 2 && (e.target.value = 2);
    setPersonnel(e.target.value);
  };
  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const onChangeIsDuration = (e) => {
    setIsDuration(parseInt(e.target.id));
  };
  const onChangeDuration1 = (e) => {
    setDuration1(e.target.value);
  };
  const onChangeDuration2 = (e) => {
    setDuration2(e.target.value);
  };
  const onChangeIsLocation = (e) => {
    setIsLocation(e.target.id);
    e.target.id === "온라인" ? setAddress("온라인") : setAddress("");
  };
  const onChangeDetail = (e) => {
    setDetail(e.target.value);
  };

  const duration = () => {
    switch (isDuration) {
      case 1:
        return <input type="date" onChange={onChangeDuration1} />;
      case 2:
        return (
          <>
            <input type="date" onChange={onChangeDuration1} />
            <span>~</span>
            <input type="date" onChange={onChangeDuration2} />
          </>
        );
      case 3:
        return <></>;
      default:
        return <></>;
    }
  };

  const master = async () => {
    try {
      const rsp = await MeetingAxiosApi.master(id, detail);
      if (rsp.data) {
        console.log("등록성공");
      } else {
        console.log("등록실패");
      }
    } catch (e) {
      console.log("오류");
    }
  };

  const onClickRecruit = async () => {
    try {
      const rsp = await MeetingAxiosApi.recruit(
        id,
        title,
        name,
        personnel,
        category,
        duration1,
        duration2,
        address,
        detail
      );
      if (rsp.data) {
        setModalOpen(true);
        setModalContent("모임 등록성공");
        setHeader("모임 등록");
        await master();
        close();
      } else {
        setModalOpen(true);
        setModalContent("모임 등록실패");
        setHeader("모임 등록");
      }
    } catch (e) {
      setModalOpen(true);
      setModalContent("서버가 응답하지 않습니다.");
      setHeader("오류");
    }
  };

  return (
    <>
      <ModalStyle>
        <div className={open ? "openModal modal" : "modal"}>
          {open && (
            <section>
              <header>
                회원모집
                <button onClick={close}>&times;</button>
              </header>
              <main>
                <InputBar placeholder="제목" onChange={onChangeTitle} />
                <InputBar placeholder="모임명" onChange={onChangeName} />
                <Box>
                  <span>인원</span>
                  <Number type="number" onChange={onChangePersonnel} />

                  <span>카테고리</span>
                  <Select name="" id="" onChange={onChangeCategory}>
                    <option value="운동">운동</option>
                    <option value="취미">취미</option>
                    <option value="공부">공부</option>
                  </Select>
                </Box>
                <Box type="duration">
                  <span>기간</span>
                  {duration()}
                  <Box>
                    <label htmlFor={1}>
                      하루
                      <input
                        type="radio"
                        id={1}
                        name="duration"
                        onChange={onChangeIsDuration}
                        checked={isDuration === 1}
                      />
                    </label>

                    <label htmlFor={2}>
                      기간
                      <input
                        type="radio"
                        id={2}
                        name="duration"
                        onChange={onChangeIsDuration}
                        checked={isDuration === 2}
                      />
                    </label>

                    <label htmlFor={3}>
                      매일
                      <input
                        type="radio"
                        id={3}
                        name="duration"
                        onChange={onChangeIsDuration}
                        checked={isDuration === 3}
                      />
                    </label>
                  </Box>
                </Box>
                <div id="popupDom">
                  {isPopupOpen ? (
                    <PopupDom>
                      <PostCode
                        onClose={closePostCode}
                        setAddress={setAddress}
                      />
                    </PopupDom>
                  ) : (
                    <Box type="location">
                      <Input
                        onClick={
                          isLocation === "오프라인" ? openPostCode : undefined
                        }
                      >
                        {address ? (
                          <div>
                            {address.length < 32
                              ? address
                              : rpad(address.substring(0, 30), 33, ".")}
                          </div>
                        ) : (
                          <span>장소</span>
                        )}
                      </Input>
                      <Box>
                        <label htmlFor="오프라인">
                          오프라인
                          <input
                            type="radio"
                            id="오프라인"
                            name="location"
                            onChange={onChangeIsLocation}
                            checked={isLocation === "오프라인"}
                          />
                        </label>
                        <label htmlFor="온라인">
                          온라인
                          <input
                            type="radio"
                            id="온라인"
                            name="location"
                            onChange={onChangeIsLocation}
                            checked={isLocation === "온라인"}
                          />
                        </label>
                      </Box>
                    </Box>
                  )}
                </div>
                <Box type="footer">
                  <Text placeholder="세부내용" onChange={onChangeDetail} />
                  <Btn onClick={onClickRecruit}>등록</Btn>
                </Box>
              </main>
              <footer></footer>
            </section>
          )}
        </div>
      </ModalStyle>
    </>
  );
};
export default Recruit;
