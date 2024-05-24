import styled from "styled-components";
import Profile from "./Profile";
import { useEffect } from "react";

const People = styled.div`
  width: 20%;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > span {
    font-size: 0.8rem;
    font-weight: bold;
  }
`;

const Member = ({ size, user }) => {
  useEffect(() => {
    console.log(user.id);
  }, []);

  return (
    <People>
      <Profile size={size}>
        <img src={user.profile} alt="프로필" />
      </Profile>
      <span>{user.nick}</span>
      <span>{`(${user.id})`}</span>
    </People>
  );
};

export default Member;
