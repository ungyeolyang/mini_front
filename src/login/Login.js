import styled from "styled-components";
import Naver from "../image/네이버btnG.png";
import Google from "../image/구글btn.png";
import Kakao from "../image/카카오btn.png";
import LoginAxiosApi from "../api/LoginAxiosApi";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../component/Modal";
import FindIdPw from "./FindIdPw";
import Right from "../component/Right";
import { UserContext } from "../context/UserStore";
import BBtn from "../component/BBtn";
import Input from "../component/Input";

const Find = styled.span`
  margin: 0 0.5rem;

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
  const context = useContext(UserContext);
  const { setIsLogin } = context;
  const navigate = useNavigate();

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const [isId, setIsId] = useState("");
  const [isPw, setIsPw] = useState("");
  const [isFind, setIsFind] = useState(false);

  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [findOpen, setFindOpen] = useState(false);

  const [category, setCategory] = useState(null);

  const onSelect = (category) => {
    setCategory(category);
  };
  const onFind = (e) => {
    setIsFind(e);
  };
  //오류창닫기
  const closeModal = () => {
    setModalOpen(false);
  };
  //아이디찾기창 닫기
  const closeFind = () => {
    setFindOpen(false);
    setIsFind(false);
  };

  //아이디 입력
  const onChangeId = (e) => {
    setInputId(e.target.value);
    e.target.value.length > 3 ? setIsId(true) : setIsId(false);
  };
  //비밀번호 입력
  const onChangePw = (e) => {
    setInputPw(e.target.value);
    e.target.value.length >= 3 ? setIsPw(true) : setIsPw(false);
  };
  //로그인버튼 클릭
  const onClickLogin = async () => {
    try {
      const rsp = await LoginAxiosApi.memberLogin(inputId, inputPw);
      if (rsp.data) {
        localStorage.setItem("id", inputId);
        setIsLogin(true);
        navigate("/main");
      } else {
        setModalOpen(true);
        setModalContent("아이디 및 패스워드를 재 확인 해 주세요.");
      }
    } catch (e) {
      setModalOpen(true);
      setModalContent("서버가 응답하지 않습니다.");
    }
  };
  //찾기버튼 클릭
  const onClickFind = (e) => {
    setFindOpen(true);
    setCategory(e.target.textContent);
  };
  const onKeyDownEnter = (e) => {
    if (e.key === "Enter") {
      onClickLogin();
    }
  };

  useEffect(() => {
    setIsLogin(false);
  }, []);

  return (
    <>
      <Right>
        <H>Login</H>
        <Input
          type="text"
          placeholder="아이디를 입력해주세요."
          onChange={onChangeId}
          onKeyDown={onKeyDownEnter}
        />
        <Input
          type="text"
          placeholder="비밀번호를 입력해주세요."
          onChange={onChangePw}
          onKeyDown={onKeyDownEnter}
        />
        <BBtn disabled={!(isId && isPw)} onClick={onClickLogin}>
          로그인
        </BBtn>
        <LoginMore>
          <Find onClick={onClickFind}>아이디 찾기</Find>
          <Find onClick={onClickFind}>비밀번호 찾기</Find>
          <Link to="/signup" style={{ marginLeft: "7rem" }}>
            회원가입
          </Link>
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
      <Modal open={modalOpen} close={closeModal} header="오류" btn="확인">
        {modalContent}
      </Modal>
      <FindIdPw
        open={findOpen}
        close={closeFind}
        category={category}
        onSelect={onSelect}
        isFind={isFind}
        onFind={onFind}
      ></FindIdPw>
    </>
  );
};

export default Login;
