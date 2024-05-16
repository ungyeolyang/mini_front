import styled from "styled-components";
import { Link } from "react-router-dom";
import Right from "../component/Right";

const H1 = styled.h1``;

const OutContainer = styled.div`
  background-color: #b8d0fa;
  height: 100vh;
`;
const InContainer = styled.div`
  background-color: #ffffff;
  height: 85vh;
  width: 85%;
  align-self: flex-end;
  border-top-left-radius: 85px;
  border-top-right-radius: 85px;
  position: relative;
`;

const Profile = styled.div`
  position: absolute;
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  background-color: silver;
  display: flex;
  overflow: hidden;
  left: 25%;
  top: 7%;
`;

const SayHi = styled.div`
  position: absolute;
  top: 13%;
  left: 40%;
  font-size: 40px;
`;

const ChangeProfile = styled.div`
  position: absolute;
  background-color: #d9d9d9;
  top: 21%;
  left: 57%;
  width: 300px; /* 원하는 너비 설정 */
  transform: translateX(-50%);
  padding: 3px;
  text-align: center;
  border: 1px solid black;
`;

const GrayLine = styled.div`
  position: absolute;
  top: 30%;
  width: 100%;
  height: 1px;
  background-color: #999999;
`;

const InfoId = styled.div`
  position: absolute;
  left: 30%;
  top: 35%;
  padding: 10px;
`;

const MyId = styled.div`
  position: absolute;
  left: 50%;
  top: 35%;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #999999;
  width: 25%;
`;

const InfoNick = styled.div`
  position: absolute;
  left: 30%;
  top: 45%;
  padding: 10px;
`;

const MyNick = styled.div`
  position: absolute;
  left: 50%;
  top: 45%;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #999999;
  width: 25%;
`;

const InfoPwd = styled.div`
  position: absolute;
  left: 30%;
  top: 55%;
  padding: 10px;
`;

const MyPwd = styled.div`
  position: absolute;
  left: 50%;
  top: 55%;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #999999;
  width: 25%;
`;

const InfoEmail = styled.div`
  position: absolute;
  left: 30%;
  top: 65%;
  padding: 10px;
`;

const MyEmail = styled.div`
  position: absolute;
  left: 50%;
  top: 65%;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #999999;
  width: 25%;
`;

const InfoGender = styled.div`
  position: absolute;
  left: 30%;
  top: 75%;
  padding: 10px;
`;

const MyGender = styled.div`
  position: absolute;
  left: 50%;
  top: 75%;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #999999;
  width: 25%;
`;

const InfoIntro = styled.div`
  position: absolute;
  left: 30%;
  top: 85%;
  padding: 10px;
`;

const MyIntro = styled.div`
  position: absolute;
  left: 50%;
  top: 85%;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #999999;
  width: 25%;
`;

const ChangeInfo = styled.div`
  position: absolute;
  background-color: #d9d9d9;
  top: 92%;
  left: 90%;
  width: 100px;
  transform: translateX(-50%);
  padding: 3px;
  text-align: center;
  border: 1px solid black;
`;

const MyPage = () => {
  return (
    <>
      <OutContainer>
        <Right>
          <InContainer>
            <Profile />
            <SayHi>'김도영'님 안녕하세요!</SayHi>
            <ChangeProfile>프로필 사진 변경</ChangeProfile>
            <GrayLine />
            <InfoId>아이디</InfoId>
            <MyId>kimdy</MyId>
            <InfoNick>닉네임</InfoNick>
            <MyNick>김도영</MyNick>
            <InfoPwd>비밀 번호</InfoPwd>
            <MyPwd>kimdy1</MyPwd>
            <InfoEmail>이메일</InfoEmail>
            <MyEmail>kimdy@example.com</MyEmail>
            <InfoGender>성별</InfoGender>
            <MyGender>남자</MyGender>
            <InfoIntro>자기 소개</InfoIntro>
            <MyIntro>안녕하세요. 김도영입니다~</MyIntro>
            <ChangeInfo>정보 수정</ChangeInfo>
          </InContainer>
        </Right>
      </OutContainer>
    </>
  );
};

export default MyPage;
