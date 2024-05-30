import React, { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Profile from "../component/Profile";
import Btn from "../component/Btn";
import LoginAxiosApi from "../api/LoginAxiosApi";
import { UserContext } from "../context/UserStore";

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledAccept = styled.div`
  display: flex;
  width: 20rem;
  opacity: 0;
  flex-direction: column;
  margin-bottom: 1rem;
  animation: ${slideUp} 0.5s 0.4s forwards;
`;

const Head = styled.div`
  background-color: #b8d0fa;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.7rem;
  border-radius: 1rem 1rem 0 0;
  span {
    position: absolute;
    padding: 0.2rem 0.6rem;
    right: 1rem;
    background-color: #e9edc9;
    border-radius: 50%;
  }
`;

const Body = styled.div`
  background-color: #e5f3ff;
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  border-radius: 0 0 1rem 1rem;
`;

const Cdiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Div = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Span = styled.span`
  visibility: ${({ on }) => (on ? "hidden" : "visible")};
`;

const Detail = styled.div`
  display: ${({ on }) => (on ? `flex` : `none`)};
  background-color: #e5f3ff;
  border: 2px solid #b8d0fa;
  padding: 1rem;
  position: absolute;
  top: 5rem;
  right: 3rem;
`;

const Accept = ({ user, onClickOk, onClickNo, num, onClickUser }) => {
  const [member, setMember] = useState();
  const [on, setOn] = useState(false);
  const context = useContext(UserContext);
  const { rpad } = context;

  useEffect(() => {
    const getMember = async () => {
      try {
        const rsp = await LoginAxiosApi.memberGetOne(user.id);
        setMember(rsp.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    if (user) {
      getMember();
    }
  }, [user]);

  if (!user) {
    return null; // user가 없으면 아무것도 렌더링하지 않음
  }

  const handleMouseEnter = () => {
    if (user.detail && user.detail.length > 12) {
      setOn(true);
    }
  };

  return (
    <StyledAccept>
      <Head>모임신청{num > 1 && <span>{num}</span>}</Head>
      <Body>
        <Profile
          size="5rem"
          src={member?.profile}
          onClick={() => {
            onClickUser(user.id);
          }}
        />
        <Cdiv>
          <div>
            <span style={{ fontWeight: "bold" }}>{member?.nick}</span>
            <span> ({user.id})</span>
          </div>
          {user.detail && (
            <>
              <Span onMouseEnter={handleMouseEnter} on={on}>
                {user.detail.length > 12
                  ? rpad(user.detail.substr(0, 9), 12, ".")
                  : user.detail}
              </Span>
              {user.detail.length > 12 && (
                <Detail on={on} onMouseLeave={() => setOn(false)}>
                  {user.detail}
                </Detail>
              )}
            </>
          )}
          <Div>
            <Btn onClick={() => onClickOk(user)}>수락</Btn>
            <Btn onClick={() => onClickNo(user)}>거절</Btn>
          </Div>
        </Cdiv>
      </Body>
    </StyledAccept>
  );
};

export default Accept;
