import styled from "styled-components";
import LoginAxiosApi from "../api/LoginAxiosApi";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Right from "../component/Right";
import Modal from "../component/Modal";
import { UserContext } from "../context/UserStore";
import Input_ from "../component/Input_";
import BBtn from "../component/BBtn";

const DateInput = styled.input`
  width: 14.5rem;
  height: 3rem;

  padding-left: 1rem;
  color: #757575;
  border: none;
  border-bottom: 0.1rem solid silver;
  cursor: pointer;
`;

const Gender = styled.div`
  display: flex;
  margin: 0.7rem;
  gap: 2rem;
  div {
    justify-content: center;
    align-items: center;
  }
`;

const Placeholder = styled.span`
  color: #757575;
  font-size: small;
  padding: 1rem 1rem 1rem 1.1rem;
`;

const Placeholder1 = styled.span`
  color: #757575;
  font-size: small;
  padding: 0.1rem 1rem 0 0.1rem;
`;

const H = styled.h1`
  font-size: 4rem;
`;

const Error = styled.span`
  color: red;
  font-size: 0.8rem;
  height: 1.5rem;
  padding-top: 0.2rem;
`;

const SignUp = () => {
  const context = useContext(UserContext);
  const { nick, setNick, isLogin, setIsLogin } = context;
  //입력정보
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [InputBirth, setInputBirth] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputGender, setInputGender] = useState("비공개");
  //오류 메세지
  const [idMessage, setIdMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [nickMessage, setNickMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");
  //유효성검사
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isNick, setIsNick] = useState(false);
  const [isBirth, setIsBirth] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

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

  //아이디 유효성
  const onChangeId = (e) => {
    const idRegex = /^[a-zA-Z0-9]{5,20}$/;
    const idCurrent = e.target.value;
    setInputId(idCurrent);
    if (!idCurrent) {
      setIdMessage("필수 정보입니다.");
      setIsId(false);
    } else if (!idRegex.test(idCurrent)) {
      setIdMessage("5~20자의 숫자,영문자만 사용 가능합니다.");
      setIsId(false);
    } else {
      setIdMessage("");
      certId(e);
    }
  };

  //아이디 중복확인
  const certId = async (e) => {
    setInputId(e.target.value);

    try {
      const rsp = await LoginAxiosApi.memberConId(inputId);
      console.log(rsp.data);
      if (rsp.data) {
        setIdMessage("사용할수 없는 아이디입니다. 다른아이디를 입력해주세요");
        setIsId(false);
      } else {
        setIdMessage("");
        setIsId(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //비밀번호 유효성
  const onChangePw = (e) => {
    const pwRegex = /^[a-zA-Z0-9]{5,20}$/;
    const pwCurrent = e.target.value;
    setInputPw(pwCurrent);
    if (!pwCurrent) {
      setPwMessage("필수 정보입니다.");
      setIsPw(false);
    } else if (!pwRegex.test(pwCurrent)) {
      setPwMessage("5~20자의 숫자,영문자,특수문자를 사용해주세요.");
      setIsPw(false);
    } else {
      setPwMessage("");
      setIsPw(true);
    }
  };

  //이메일 유효성
  const onChangeMail = (e) => {
    setInputEmail(e.target.value);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailCurrent = e.target.value;
    if (!emailCurrent) {
      setEmailMessage("필수 정보입니다.");
      setIsEmail(false);
    } else if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 주소가 정확한지 확인해 주세요.");
      setIsEmail(false);
    } else {
      setEmailMessage("");
      certEmail(e);
    }
  };

  // 이메일 중복확인
  const certEmail = async (e) => {
    try {
      const resp = await LoginAxiosApi.memberConEmail(
        e.target.value,
        "아이디 찾기"
      );

      if (resp.data) {
        setEmailMessage("가입된 이메일 입니다.");
        setIsEmail(false);
      } else {
        setEmailMessage("");
        setIsEmail(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //닉네임 작성여부
  const onChangeNick = (e) => {
    const nickCurrent = e.target.value;
    setNick(nickCurrent);
    if (!nickCurrent) {
      setIsNick(false);
      setNickMessage("필수 정보입니다.");
    } else {
      setIsNick(true);
      setNickMessage("");
    }
  };

  //생년월일 입력 여부
  const onChangeBirth = (e) => {
    const birthCurrent = e.target.value;
    console.log(birthCurrent);
    setInputBirth(birthCurrent);
    if (!birthCurrent) {
      setIsBirth(false);
      setBirthMessage("필수 정보입니다.");
    } else {
      setIsBirth(true);
      setBirthMessage("");
    }
  };

  const onChangeGender = (e) => {
    setInputGender(e.target.value);
  };
  // 회원가입버튼 클릭
  const onClickSignUp = async () => {
    try {
      const rsp = await LoginAxiosApi.memberSignUp(
        inputId,
        inputPw,
        nick,
        InputBirth,
        inputEmail,
        inputGender
      );

      if (rsp.data) {
        localStorage.setItem("id", inputId);
        setIsLogin(true);
        setModalOpen(true);
        setHead("가입성공");
        setModalContent("회원가입이 완료되었습니다.");
      } else {
        setModalOpen(true);
        setHead("오류");
        setModalContent("회원가입에 실패했습니다.");
      }
    } catch (e) {
      setModalOpen(true);
      setHead("오류");
      setModalContent("서버가 응답하지 않습니다.");
    }
  };

  useEffect(() => {
    setIsLogin(false);
  }, []);

  return (
    <>
      <Right>
        <H>회원가입</H>
        <Input_ placeholder="*아이디" onChange={onChangeId} />
        <Error> {idMessage}</Error>
        <Input_ placeholder="*비밀번호" onChange={onChangePw} />
        <Error>{pwMessage}</Error>
        <Input_ placeholder="*닉네임" onChange={onChangeNick} />
        <Error>{nickMessage}</Error>
        <div>
          <Placeholder>*생년월일</Placeholder>
          <DateInput type="date" onChange={onChangeBirth} />
        </div>
        <Error>{birthMessage}</Error>
        <Input_ placeholder="*이메일" onChange={onChangeMail} />
        <Error>{emailMessage}</Error>
        <Gender>
          <Placeholder1>*성별</Placeholder1>
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
        </Gender>

        <BBtn
          disabled={!(isId && isPw && isEmail && isNick && isBirth)}
          onClick={onClickSignUp}
        >
          회원가입
        </BBtn>
      </Right>
      <Modal open={modalOpen} close={closeModal} header={head} btn="확인">
        {modalContent}
      </Modal>
    </>
  );
};
// close={closeModal}
export default SignUp;
