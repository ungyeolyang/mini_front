import styled from "styled-components";
import Logo from "../image/로고-fococlipping-standard.png";

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
  height: 2.5rem;
  margin: 0.5rem;
`;
const Button = styled.button`
  width: 20rem;
  height: 2.5rem;
  background-color: #e9edc9;
  border: none;

  &:hover {
    background-color: #ccd5ae;
    color: white;
  }
`;

const Span = styled.span`
  cursor: pointer;
`;

const Login = () => {
  return (
    <Container>
      <Left>
        <img src={Logo} alt="로고" />
      </Left>
      <Right>
        <h1>Login</h1>
        <Input type="text" placeholder="아이디를 입력해주세요." />
        <Input type="text" placeholder="비밀번호를 입력해주세요." />
        <Button>로그인</Button>
        <>
          <Span>아이디 찾기</Span>
          <Span>비밀번호 찾기</Span>
          <Span>회원가입</Span>
        </>
      </Right>
    </Container>
  );
};

export default Login;
