import styled from "styled-components";
import Btn from "../component/Btn";
import Right from "../component/Right";
import Send from "./Send";
import LetterAxiosApi from "../api/LetterAxiosApi";
import { TbMailOpened, TbSend } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import LetterBox from "./LetterBox";
import LetterDetail from "./LetterDetail";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 95%;
  @media (max-width: 720px) {
    position: absolute;
    top: 105px;
    flex-direction: column;
  }
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  gap: 1rem;
  @media (max-width: 720px) {
    flex-direction: row;
    width: 100%;
    gap: 0;
  }
`;

const Letter = () => {
  const id = localStorage.getItem("id");
  const [letterOpen, setLetterOpen] = useState(false);
  const [letter, setLetter] = useState(null);
  const [category, setCategory] = useState("receive");
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);
  const [resend, setResend] = useState("");
  const [receive, setReceive] = useState("");
  const [receiveNick, setReceiveNick] = useState("");

  const [isSend, setIsSend] = useState(false);
  const [isDetail, setIsDetail] = useState(false);

  const onClickLetter = () => {
    setLetterOpen(true);
  };

  const closeLetter = () => {
    setLetterOpen(false);
    setIsSend(false);
    setResend("");
  };

  //보낸 편지함 클릭
  const onClickSend = () => {
    setIsDetail(false);
    if (category !== "send") {
      setCategory("send");
      setCurrentPage(1);
    }
  };
  //받은 편지함 클릭
  const onClickReceive = () => {
    setIsDetail(false);
    if (category !== "receive") {
      setCategory("receive");
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  //메일 자세히보기
  const onClickDetail = (props) => {
    setIsDetail(true);
    setUser(props);
    if (props.receiver === id && props.view === "FALSE") {
      setView(props.no);
    }
  };

  //읽음으로 변경
  const setView = async (props) => {
    try {
      const rsp = await LetterAxiosApi.setView(props);
      if (rsp.data) {
        // console.log("성공");
      } else {
        // console.log("실패");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickBack = () => {
    setIsDetail(false);
  };

  const onSetReceive = (props) => {
    setReceive(props);
  };
  const onSetReceiveNick = (props) => {
    setReceiveNick(props);
  };

  useEffect(() => {
    const getLetter = async () => {
      try {
        const rsp = await LetterAxiosApi.letterList(id, category);
        if (rsp.data) {
          setLetter(rsp.data);
        } else {
          setLetter(null);
          console.log("데이터가 없음");
        }
      } catch (e) {
        console.log(e);
      }
    };
    getLetter();
  }, [id, category, isSend, isDetail]);

  return (
    <Right title={`${category === "send" ? `보낸 ` : `받은 `} 편지함`}>
      <Container>
        <BtnBox>
          <Btn onClick={onClickReceive} mediaQuery>
            <TbMailOpened />
            받은 편지함
          </Btn>
          <Btn onClick={onClickSend} mediaQuery>
            <TbSend />
            보낸 편지함
          </Btn>
          <Btn onClick={onClickLetter} mediaQuery>
            편지 쓰기
          </Btn>
        </BtnBox>
        {!isDetail ? (
          <LetterBox
            category={category}
            onClickDetail={onClickDetail}
            currentPage={currentPage}
            letter={letter}
            handlePageChange={handlePageChange}
          />
        ) : (
          <>
            <LetterDetail
              user={user}
              onClickBack={onClickBack}
              setLetterOpen={setLetterOpen}
              setResend={setResend}
              setReceive={setReceive}
              setReceiveNick={setReceiveNick}
              setIsDetail={setIsDetail}
            />
          </>
        )}
      </Container>
      <Send
        open={letterOpen}
        close={closeLetter}
        category="쪽지쓰기"
        isSend={isSend}
        setIsSend={setIsSend}
        resend={resend}
        receive={receive}
        setReceive={onSetReceive}
        receiveNick={receiveNick}
        setReceiveNick={onSetReceiveNick}
      ></Send>
    </Right>
  );
};

export default Letter;
