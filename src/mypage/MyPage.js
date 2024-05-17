import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Right from "../component/Right";
import Input_ from "../component/Input_";
import Btn from "../component/Btn";
import { useContext, useEffect, useState } from "react";
import LoginAxiosApi from "../api/LoginAxiosApi";
import MyAxiosApi from "../api/LoginAxiosApi";
import { UserContext } from "../context/UserStore";

const OutContainer = styled.div`
  background-color: #b8d0fa;
  height: 100vh;
`;
const InContainer = styled.div`
  position: absolute;
  bottom: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  width: 65%;
  border-top-left-radius: 85px;
  border-top-right-radius: 85px;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 3rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid silver;
`;

const Cdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Div = styled.div`
  margin-right: ${({ type }) => (type === "gender" ? `13%` : 0)};
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  div {
    width: 4.4rem;
  }
`;

const Profile = styled.div`
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  background-color: silver;
  display: flex;
  overflow: hidden;
`;

const SayHi = styled.div`
  font-size: 40px;
  padding: 2rem 2rem 0.5rem 2rem;
`;

const Error = styled.span`
  color: red;
  position: absolute;
  right: 0;
  font-size: 0.8rem;
  height: 1.5rem;
  padding-top: 0.2rem;
`;

const Button = styled.div`
  position: absolute;
  right: 10rem;
  bottom: 7rem;
`;

const MyPage = () => {
  const [member, setMember] = useState(null);
  const id = localStorage.getItem("id");

  const context = useContext(UserContext);
  const { nick, setNick, isLogin } = context;
  //입력정보
  const [inputPw, setInputPw] = useState("");
  const [inputNick, setInputNick] = useState("");
  const [inputGender, setInputGender] = useState("비공개");
  const [inputIntro, setInputIntro] = useState("");
  //오류 메세지
  const [pwMessage, setPwMessage] = useState("");
  //유효성검사
  const [isPw, setIsPw] = useState(false);
  const [isBirth, setIsBirth] = useState(false);

  //모달창
  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [head, setHead] = useState("");

  const navigate = useNavigate();

  //모달창닫기
  const closeModal = () => {
    setModalOpen(false);
    isLogin && navigate("/main");
  };

  //비밀번호 유효성
  const onChangePw = (e) => {
    const pwRegex = /^[a-zA-Z0-9]{5,20}$/;
    const pwCurrent = e.target.value;
    setInputPw(pwCurrent);
    if (pwCurrent && !pwRegex.test(pwCurrent)) {
      setPwMessage("5~20자의 숫자,영문자,특수문자를 사용해주세요.");
      setIsPw(false);
    } else {
      setPwMessage("");
      setIsPw(true);
    }
  };

  const onChangeNick = (e) => {
    const nickCurrent = e.target.value;
    setInputNick(nickCurrent);
  };

  const onChangeGender = (e) => {
    setInputGender(e.target.value);
  };

  const onChangeIntro = (e) => {
    setInputIntro(e.target.value);
  };
  // 수정버튼 클릭
  const onClickEdit = async () => {
    if (member) {
      !inputNick && setNick(inputNick);
      const changePw = !inputPw ? inputPw : member[0].pw;
      const changeIntro = !inputIntro ? inputIntro : member[0].introdution;
      try {
        const rsp = await MyAxiosApi.memberEdit(
          id,
          changePw,
          member[0].birth,
          nick,
          member[0].email,
          inputGender,
          changeIntro
        );
        if (rsp.data) {
          setModalOpen(true);
          setHead("정보수정");
          setModalContent("회원정보를 수정했습니다.");
        } else {
          setModalOpen(true);
          setHead("오류");
          setModalContent("회원정보 수정에 실패했습니다.");
        }
      } catch (e) {
        setModalOpen(true);
        setHead("오류");
        setModalContent("서버가 응답하지 않습니다.");
      }
    }
  };

  useEffect(() => {
    const getMember = async () => {
      try {
        const rsp = await LoginAxiosApi.memberGetOne(id);
        setMember(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMember();
  }, []);

  return (
    <>
      {member && (
        <OutContainer>
          <Right>
            <InContainer>
              <Head>
                <Profile />
                <Cdiv>
                  <SayHi>'{member[0].nick}'님 안녕하세요!</SayHi>
                  <Btn>프로필 사진 변경</Btn>
                </Cdiv>
              </Head>
              <Div>
                <div>아이디</div>
                <Input_ placeholder={member[0].id} disabled={true} />
              </Div>
              <Div>
                <div>비밀번호</div>
                <Input_ placeholder={member[0].pw} onChange={onChangePw} />
                <Error>{pwMessage}</Error>
              </Div>
              <Div>
                <div>닉네임</div>
                <Input_ placeholder={member[0].nick} onChange={onChangeNick} />
              </Div>
              <Div>
                <div>생년월일</div>
                <Input_ placeholder={member[0].birth} disabled={true} />
              </Div>
              <Div>
                <div>이메일</div>
                <Input_ placeholder={member[0].email} disabled={true} />
              </Div>
              <Div type="gender">
                <div>성별</div>
                <div>
                  <label htmlFor="남">남</label>
                  <input
                    type="radio"
                    id="남"
                    name="gender"
                    value="남자"
                    onChange={onChangeGender}
                    checked={inputGender === "남자"}
                  />
                </div>
                <div>
                  <label htmlFor="여">여</label>
                  <input
                    type="radio"
                    id="여"
                    name="gender"
                    value="여자"
                    onChange={onChangeGender}
                    checked={inputGender === "여자"}
                  />
                </div>
                <div>
                  <label htmlFor="비공개">비공개</label>
                  <input
                    type="radio"
                    id="비공개"
                    name="gender"
                    value="비공개"
                    onChange={onChangeGender}
                    checked={inputGender === "비공개"}
                  />
                </div>
              </Div>
              <Div>
                <div>자기소개</div>{" "}
                <Input_
                  placeholder={member[0].introdution}
                  onChange={onChangeIntro}
                />
              </Div>
              <Button>
                <Btn>정보 수정</Btn>
              </Button>
            </InContainer>
          </Right>
        </OutContainer>
      )}
    </>
  );
};

export default MyPage;
