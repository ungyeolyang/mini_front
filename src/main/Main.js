import styled from "styled-components";
import { Link } from "react-router-dom";
import Right from "../component/Right";
import Paging from "../component/Paging";
import Btn from "../component/Btn";
import Recruit from "./Recruit";
import KakaoMap from "../KakaoMap";
import { useState } from "react";
import Title from "../component/Title";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const MoimBox = styled.div`
  background-color: black;
`;
const Moim = styled.div`
  display: flex;
  align-items: center;
  border-radius: 1rem;
  padding: 1rem;
  background-color: #e5f3ff;
`;

const Main = () => {
  const [recruitOpen, setRecruitOpen] = useState(false);

  const onClickRecruit = (e) => {
    setRecruitOpen(true);
  };
  //모집창 닫기
  const closeRecruit = () => {
    setRecruitOpen(false);
  };
  //모임창 클릭
  const onClickMoim = (e) => {
    console.log(e.target);
  };

  return (
    <Right>
      <Container>
        <Title>메인</Title>
        <Link to="/meeting">모임</Link>
        <MoimBox>
          <Moim onClick={onClickMoim}>
            <div>이미지</div>
            <div>
              <div>장소</div>
              <div>시간</div>
              <div>제한</div>
              <div>모임장</div>
            </div>
          </Moim>
        </MoimBox>
        <Paging></Paging>
      </Container>
      <Btn onClick={onClickRecruit}>모집하기</Btn>
      <Recruit
        open={recruitOpen}
        close={closeRecruit}
        category="회원 모집"
      ></Recruit>
    </Right>
  );
};

export default Main;
