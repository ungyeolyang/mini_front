import styled from "styled-components";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import LoginAxiosApi from "../api/LoginAxiosApi";

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

const Member = ({ size, id }) => {
  const [user, setUser] = useState();

  const getMember = async () => {
    try {
      const rsp = await LoginAxiosApi.memberGetOne(id);
      console.log(rsp.data[0].profile);
      setUser(rsp.data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMember();
  }, []);

  return (
    <People>
      <Profile size={size}>
        <img src={user?.profile} alt="프로필" />
      </Profile>
      <span>{user?.nick}</span>
      <span>{`(${id})`}</span>
    </People>
  );
};

export default Member;
