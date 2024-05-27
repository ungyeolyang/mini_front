import styled, { keyframes } from "styled-components";
import Profile from "./Profile";
import Btn from "./Btn";
import { useEffect, useState } from "react";
import LoginAxiosApi from "../api/LoginAxiosApi";

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
  opacity: 0;
  flex-direction: column;
  margin-bottom: 1rem;
  animation: ${slideUp} 0.5s 0.4s forwards;
`;
const Head = styled.div`
  background-color: #b8d0fa;
  padding: 0.7rem;
  border-radius: 1rem 1rem 0 0;
`;
const Body = styled.div`
  background-color: #e5f3ff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  border-radius: 0 0 1rem 1rem;
`;
const Cdiv = styled.div`
  background-color: #e5f3ff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Accept = ({ user, onClickOk, onClickNo }) => {
  const [member, setMember] = useState();

  useEffect(() => {
    const getMember = async () => {
      try {
        const rsp = await LoginAxiosApi.memberGetOne(user);
        setMember(rsp.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    getMember();
  }, [user]);

  return (
    <StyledAccept key={user}>
      <Head>친구신청</Head>
      <Body>
        <Profile size={`5rem`} src={member?.profile}></Profile>
        <Cdiv>
          <div>
            <span style={{ fontWeight: `bold` }}>{member?.nick}</span>
            <span> ({user})</span>
          </div>
          <div>
            <Btn onClick={() => onClickOk(user)}>수락</Btn>
            <Btn onClick={() => onClickNo(user)}>거절</Btn>
          </div>
        </Cdiv>
      </Body>
    </StyledAccept>
  );
};
export default Accept;
