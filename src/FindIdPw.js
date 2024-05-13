import React, { useRef, useState } from "react";
import styled from "styled-components";

const ModalStyle = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .openModal {
    display: flex;
    align-items: center;
    animation: modal-bg-show 0.8s;
  }

  section {
    width: 90%;
    max-width: 750px;
    margin: 0 auto;
    border-radius: 0.6rem;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;
    header {
      position: relative;
      padding: 16px 64px 16px 16px;
      background-color: #fefae0;
      font-weight: 700;
      button {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 30px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #999;
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }
    }
    main {
      padding: 2rem 2rem 0;
      border-top: 1px solid #dee2e6;
    }
    footer {
      padding: 12px 16px;
      text-align: right;
      button {
        padding: 6px 12px;
        color: #000;
        background-color: #e9edc9;
        border-radius: 5px;
        font-size: 13px;
      }
    }
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Button = styled.button`
  outline: none;
  cursor: pointer;
  margin-right: 10px;
  border: 0;
  width: 60px;
  &:hover {
    background-color: #ccd5ae;
    color: #fff;
  }
`;

const Span = styled.span`
  padding: 1rem;
  cursor: pointer;
  border: 1px solid ${(props) => (props.active ? "white" : "grey")};
`;

const Body = styled.div`
  display: flex;
  border: 1px solid gray;
  margin-top: 1rem;
  padding: 2rem;
  flex-direction: column;
`;

const Input = styled.input`
  width: ${(props) => (props.placeholder === "인증번호" ? "12.5rem" : "25rem")};
  height: 2.5rem;
  margin: 0.7rem;
  padding-left: 1rem;
`;
const Btn = styled.button`
  height: 2.5rem;
  border: 0;
  padding: 0 1.5rem;
  background-color: #e9edc9;
  border-radius: 5px;
  &:hover {
    background-color: #ccd5ae;
    color: #fff;
  }
`;

const FindIdPw = (props) => {
  const { open, close, header } = props;
  const [category, setCategory] = useState(null);
  const id = useRef(null);
  const onClickCategory = (e) => {
    console.log(category);
    setCategory(e.target.textContent);
  };

  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>
              {category}
              <button onClick={close}>&times;</button>
            </header>
            <main>
              <Span
                onClick={onClickCategory}
                active={category === "아이디 찾기"}
              >
                아이디 찾기
              </Span>
              <Span
                onClick={onClickCategory}
                active={category === "비밀번호 찾기"}
              >
                비밀번호 찾기
              </Span>
              <Body>
                {category === "아이디 찾기" && (
                  <Input
                    type="text"
                    placeholder="아이디를 입력해주세요."
                    ref={id}
                  />
                )}

                <div>
                  <Input type="text" placeholder="이메일을 입력해주세요." />
                  <Btn>인증번호 발송</Btn>
                </div>
                <div>
                  <Input type="text" placeholder="인증번호" />
                  <Btn>확인</Btn>
                </div>
              </Body>
            </main>
            <footer>
              <Button onClick={close}>취소</Button>
            </footer>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};
export default FindIdPw;
