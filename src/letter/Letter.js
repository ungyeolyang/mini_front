import styled from "styled-components";
import Board from "../component/Board";
import Btn from "../component/Btn";
import Right from "../component/Right";
import Paging from "../component/Paging";
import Send from "./Send";
import { TbMail, TbMailOpened, TbSend } from "react-icons/tb";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 95%;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  gap: 1rem;
`;
const LetterBox = styled.div`
  display: flex;
  width: 95%;
  flex-direction: column;
`;

const Letter = () => {
  const [letterOpen, setLetterOpen] = useState(false);

  const onClickLetter = () => {
    setLetterOpen(true);
  };

  const closeLetter = () => {
    setLetterOpen(false);
  };
  return (
    <Right>
      <Container>
        <BtnBox>
          <Btn>
            <TbMail />
            전체 쪽지함
          </Btn>
          <Btn>
            <TbMailOpened />
            보낸 쪽지함
          </Btn>
          <Btn>
            <TbSend />
            받은 쪽지함
          </Btn>
          <Btn onClick={onClickLetter}>쪽지 쓰기</Btn>
        </BtnBox>
        <LetterBox>
          <Board></Board>
          <Paging></Paging>
        </LetterBox>
      </Container>
      <Send open={letterOpen} close={closeLetter} category="쪽지쓰기"></Send>
    </Right>
  );
};

export default Letter;
