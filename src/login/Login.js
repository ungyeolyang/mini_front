import styled from "styled-components";
import Logo from "../image/로고-fococlipping-standard.png";
import Naver from "../image/네이버btnG.png";
import Google from "../image/구글btn.png";
import Kakao from "../image/카카오btn.png";
import AxiosApi from "../api/AxiouApi";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../Modal";

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
  width: 25rem;
  height: 3rem;
  margin: 0.7rem;
  padding-left: 1rem;
`;
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

const Find = styled.span`
  margin: 0 0.5rem;

  cursor: pointer;
`;

const Regit = styled.span`
  margin-left: 7rem;
  cursor: pointer;
`;

const LoginMore = styled.div`
  display: flex;
  color: #808080;
`;

const Circle = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 1rem;

  &:hover {
    transform: translate(2px, -2px);
    box-shadow: -2px 3px 5px gray;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Api = styled.div`
  display: flex;
  margin: 3rem;
`;

const H = styled.h1`
  font-size: 4rem;
`;

const Login = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const [isId, setIsId] = useState("");
  const [isPw, setIsPw] = useState("");

  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  // const navigate = useNavigate();

  const onChangeId = (e) => {
    setInputId(e.target.value);
    e.target.value.length > 3 ? setIsId(true) : setIsId(false);
  };
  const onChangePw = (e) => {
    setInputPw(e.target.value);
    e.target.value.length >= 3 ? setIsPw(true) : setIsPw(false);
  };

  const onClickLogin = async () => {
    try {
      const rsp = await AxiosApi.memberLogin(inputId, inputPw);
      console.log(rsp.data);
      if (rsp.data) {
        localStorage.setItem("id", inputId);
        localStorage.setItem("isLogin", "TRUE");
        // navigate("/메인");
      } else {
        setModalOpen(true);
        setModalContent("아이디 및 패스워드를 재 확인 해 주세요.");
      }
    } catch (e) {
      setModalOpen(true);
      setModalContent("서버가 응답하지 않습니다.");
    }
  };
  return (
    <Container>
      <Left>
        <img src={Logo} alt="로고" />
      </Left>
      <Right>
        <H>Login</H>
        <Input
          type="text"
          placeholder="아이디를 입력해주세요."
          onChange={onChangeId}
        />
        <Input
          type="text"
          placeholder="비밀번호를 입력해주세요."
          onChange={onChangePw}
        />
        {isId && isPw ? (
          <Button enabled onClick={onClickLogin}>
            로그인
          </Button>
        ) : (
          <Button disabled>로그인</Button>
        )}
        <LoginMore>
          <Find>아이디 찾기</Find>
          <Find>비밀번호 찾기</Find>
          <Regit>회원가입</Regit>
        </LoginMore>
        <Api>
          <Circle>
            <Img src={Naver} alt="네이버" />
          </Circle>
          <Circle>
            <Img src={Google} alt="구글" />
          </Circle>
          <Circle>
            <Img src={Kakao} alt="카카오" />
          </Circle>
        </Api>
      </Right>
      <Modal open={modalOpen} close={closeModal} header="오류">
        {modalContent}
      </Modal>
    </Container>
  );
};

export default Login;
