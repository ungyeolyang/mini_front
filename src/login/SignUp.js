import styled from "styled-components";
import LoginAxiosApi from "../api/LoginAxiosApi";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Right from "../component/Right";
import Modal from "../component/Modal";
import { UserContext } from "../context/UserStore";
import InputBar from "../component/InputBar";
import BBtn from "../component/BBtn";
import { storage } from "../api/FireBase";
import Person from "../image/사람아이콘.png";
import Profile from "../component/Profile";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  & > :nth-child(2) {
    margin-bottom: 10%;
    align-self: flex-start;
  }
  @media (max-width: 720px) {
    body {
      height: 115vw;
    }
  }
`;

const DateInput = styled.input`
  width: 19rem;
  padding-left: 1rem;
  color: #757575;
  border: none;
  border-bottom: 0.1rem solid silver;
  cursor: pointer;
`;

const Gender = styled.div`
  display: flex;
  width: 25rem;
  height: 3rem;
  gap: 2rem;
  padding-left: 1rem;
  div {
    justify-content: center;
    align-items: center;
  }
`;

const Birth = styled.div`
  display: flex;
  width: 25rem;
  height: 3rem;
  gap: 1.3rem;
`;

const Placeholder = styled.span`
  color: #757575;
  font-size: small;
  padding: 1rem 0 1rem 1rem;
`;

const Placeholder1 = styled.span`
  color: #757575;
  font-size: small;
  padding: 0.1rem 3rem 0 0.1rem;
`;

const H = styled.h1`
  font-size: 4rem;
  @media (max-width: 720px) {
    display: none;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 0.8rem;
  height: 1.5rem;
  padding-top: 0.2rem;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.8rem;
  gap: 5rem;
  @media (max-width: 720px) {
    width: 310px;
    height: 230px;
  }
`;

const SignUp = () => {
  const context = useContext(UserContext);
  const basic =
    "https://firebasestorage.googleapis.com/v0/b/test-project-37d9c.appspot.com/o/basic.png?alt=media&token=5ea5abcb-4a3a-445b-a9b0-3cae92a9eccd";
  const { setNick, isLogin, setIsLogin, setImgUrl } = context;
  const navigate = useNavigate();
  const inputFile = useRef(null);
  //입력정보
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputNick, setInputNick] = useState("");
  const [InputBirth, setInputBirth] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputGender, setInputGender] = useState("비공개");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(Person);

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

  //모달창닫기
  const closeModal = () => {
    setModalOpen(false);
    isLogin && navigate("/main");
  };

  //프로필 선택
  const onChangFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      console.error("파일이 선택 안됨");
    }
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
      certId(idCurrent);
    }
  };

  //아이디 중복확인
  const certId = async (id) => {
    try {
      const rsp = await LoginAxiosApi.memberConId(id);
      console.log(rsp.data);
      if (rsp.data) {
        setIdMessage("사용할 수 없는 아이디입니다. 다른 아이디를 입력해주세요");
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
    if (!e.target.value) {
      setIsNick(false);
      setNickMessage("필수 정보입니다.");
      setInputNick("");
    } else {
      setIsNick(true);
      setNickMessage("");
      setInputNick(e.target.value);
    }
  };

  //생년월일 입력 여부
  const onChangeBirth = (e) => {
    const birthCurrent = e.target.value;
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

  const onClickInputFile = () => {
    inputFile.current.click();
  };

  // 회원가입버튼 클릭
  const onClickSignUp = async () => {
    try {
      if (file) {
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        console.log("파일이 정상적으로 업로드됨");
        const url = await fileRef.getDownloadURL();
        console.log("저장경로 확인 : " + url);
        setImgUrl(url);
      } else {
        setImgUrl(basic);
      }
      console.log(
        inputId,
        inputPw,
        inputNick,
        InputBirth,
        inputEmail,
        inputGender,
        basic
      );
      const rsp = await LoginAxiosApi.memberSignUp(
        inputId,
        inputPw,
        inputNick,
        InputBirth,
        inputEmail,
        inputGender,
        basic
      );

      if (rsp.data) {
        localStorage.setItem("id", inputId);
        setNick(inputNick);
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
        <Container>
          <H onClick={() => {}}>회원가입</H>
          <Div>
            <Placeholder>*프로필</Placeholder>
            <Profile onClick={onClickInputFile} size={"9rem"} src={previewUrl}>
              <input
                type="file"
                onChange={onChangFile}
                ref={inputFile}
                hidden
              />
            </Profile>
          </Div>
          <InputBar placeholder="*아이디" onChange={onChangeId} />
          <Error> {idMessage}</Error>
          <InputBar placeholder="*비밀번호" onChange={onChangePw} />
          <Error>{pwMessage}</Error>
          <InputBar placeholder="*닉네임" onChange={onChangeNick} />
          <Error>{nickMessage}</Error>
          <Birth>
            <Placeholder>*생년월일</Placeholder>
            <DateInput type="date" onChange={onChangeBirth} />
          </Birth>
          <Error>{birthMessage}</Error>
          <InputBar placeholder="*이메일" onChange={onChangeMail} />
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
        </Container>
      </Right>
      <Modal open={modalOpen} close={closeModal} header={head} btn="확인">
        {modalContent}
      </Modal>
    </>
  );
};

export default SignUp;
