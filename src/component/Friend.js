import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import LoginAxiosApi from "../api/LoginAxiosApi";
import Profile from "./Profile";

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

const StyledFriend = styled.div`
  display: flex;
  opacity: 0;
  flex-direction: column;
  margin-bottom: 1rem;
  animation: ${slideUp} 0.5s 0.4s forwards;
`;

const Cdiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Friend = ({ user, onClickDetail }) => {
  const [member, setMember] = useState();

  useEffect(() => {
    const getMember = async () => {
      try {
        const rsp = await LoginAxiosApi.memberGetOne(user);
        console.log(user);
        setMember(rsp.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    getMember();
  }, [user]);
  return (
    <StyledFriend>
      <Div>
        <Profile
          size={`5rem`}
          src={member?.profile}
          onClick={() => onClickDetail(user)}
        ></Profile>
        <Cdiv>
          <div>
            <span style={{ fontWeight: `bold` }}>{member?.nick}</span>
            <span>({user})</span>
          </div>
        </Cdiv>
      </Div>
    </StyledFriend>
  );
};

export default Friend;
