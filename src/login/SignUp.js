import styled from "styled-components";
import Logo from "../image/로고-fococlipping-standard.png";
import Naver from "../image/네이버btnG.png";
import Google from "../image/구글btn.png";
import Kakao from "../image/카카오btn.png";
import AxiosApi from "../api/AxiouApi";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../Modal";
import FindIdPw from "../FindIdPw";

const Container = styled.div`
  display: flex;
`;
const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: 100vh;
  background-color: #fefae0;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60vw;
  height: 100vh;
`;
const Input = styled.input`
  width: 20rem;
  height: 3rem;
  margin: 0.7rem;
  padding-left: 1rem;
  border: none;
  border-bottom: 0.1rem solid silver;
  cursor: pointer;
`;

const DateInput = styled.input`
  width: 14rem;
  height: 3rem;
  margin: 0.7rem;
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
  padding: 1rem 1rem 1rem 1.7rem;
`;

const Placeholder1 = styled.span`
  color: #757575;
  font-size: small;
  padding: 0.1rem 1rem 0 0.1rem;
`;

//로그인 버튼
const Button = styled.button`
  width: 25rem;
  height: 3rem;
  margin: 0.7rem;
  background-color: ${(props) => (props.disabled ? "#EAEAEA" : "#e9edc9")};
  border: none;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#D9D9D9" : "#ccd5ae")};
    color: white;
  }
`;

const H = styled.h1`
  font-size: 4rem;
`;

const Error = styled.span`
  color: ${(props) => (props.pass ? "blue" : "red")};
`;

const SignUp = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [InputConPw, setInputConPw] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputName, setInputName] = useState("");

  const [idMessage, setIdMessage] = useState("");
  const [mailMessage, setMailMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [conPwMessage, setConPwMessage] = useState("");

  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isMail, setIsMail] = useState(false);
  const [isFind, setIsFind] = useState(false);
  const [isConPw, setIsConPw] = useState(false);

  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [findContent, setFindcontent] = useState("");
  const [findOpen, setFindOpen] = useState(false);

  const [category, setCategory] = useState(null);

  const onChangeId = (e) => {
    const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,21}$/;
    const idCurrent = e.target.value;
    setInputPw(idCurrent);
    if (!idRegex.test(idCurrent)) {
      setIdMessage("5~20자의 숫자,영문자 조합만 가능합니다.");
      setIsId(false);
    } else {
      setIdMessage("");
      certId(e);
    }
  };

  const certId = async (e) => {
    setInputId(e.target.value);

    try {
      const rsp = await AxiosApi.memberCertId(inputId);
      console.log(rsp.data);
      if (rsp.data) {
        setIdMessage("사용할수 없는 아이디입니다. 다른아이디를 입력해주세요");
      } else {
        setIdMessage("");
        setIsId(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChangePw = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,17}$/;
    const passwordCurrent = e.target.value;
    setInputPw(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPwMessage("8~16자의 숫자,영문자 조합만 가능합니다.");
      setIsPw(false);
    } else {
      setPwMessage("");
      setIsPw(true);
    }
  };

  const onChangeMail = (e) => {
    setInputEmail(e.target.value);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(e.target.value)) {
      setMailMessage("이메일 형식이 올바르지 않습니다.");
      setIsMail(false);
    } else {
      setMailMessage("");
      memberRegCheck(e);
    }
  };

  // 이메일 중복확인
  const certEmail = async (e) => {
    try {
      const resp = await AxiosApi.memberRegCheck(e.target.value);

      if (resp.data !== null) {
        setMailMessage("중복된 이메일 입니다.");
      } else {
        setMailMessage("");
        setIsMail(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeConPw = (e) => {
    const passwordCurrent = e.target.value;
    setInputConPw(passwordCurrent);
    if (passwordCurrent !== inputPw) {
      setConPwMessage("비밀 번호가 일치하지 않습니다.");
      setIsConPw(false);
    } else {
      setConPwMessage("비밀 번호가 일치 합니다. )");
      setIsConPw(true);
    }
  };
  const onChangeName = (e) => {
    setInputName(e.target.value);
    setIsName(true);
  };

  // const navigate = useNavigate();
  return (
    <Container>
      <Left>
        <img src={Logo} alt="로고" />
      </Left>
      <Right>
        <H>회원가입</H>
        <div>
          <Input type="text" placeholder="*아이디" onChange={onChangeId} />
          <Error pass={isId}> {idMessage}</Error>
        </div>
        <div>
          <Input type="text" placeholder="*비밀번호" onChange={onChangePw} />
          <Error pass={isPw}>{pwMessage}</Error>
        </div>
        <Input type="text" placeholder="*닉네임" onChange={onChangeId} />
        <div>
          <Placeholder>*생년월일</Placeholder>
          <DateInput type="date" />
        </div>
        <Input type="text" placeholder="*이메일" onChange={onChangePw} />
        <Gender>
          <Placeholder1>*성별</Placeholder1>
          <div>
            <label htmlFor="남">남</label>
            <input
              type="radio"
              id="남"
              name="gender"
              value="남자"
              onChange={onChangePw}
            />
          </div>
          <div>
            <label htmlFor="여">여</label>
            <input
              type="radio"
              id="여"
              name="gender"
              value="여자"
              onChange={onChangePw}
            />
          </div>
          <div>
            <label htmlFor="비공개">비공개</label>
            <input
              type="radio"
              id="비공개"
              name="gender"
              value="비공개"
              onChange={onChangePw}
              checked
            />
          </div>
        </Gender>

        {isId && isPw ? (
          <Button enabled>회원가입</Button>
        ) : (
          <Button disabled>회원가입</Button>
        )}
      </Right>
      <Modal open={modalOpen} header="오류">
        {modalContent}
      </Modal>
    </Container>
  );
};
// close={closeModal}
export default SignUp;
