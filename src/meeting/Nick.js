import { useEffect, useState } from "react";
import styled from "styled-components";
import LoginAxiosApi from "../api/LoginAxiosApi";

const StyledNick = styled.div`
  padding-left: 0.3rem;
  padding-right: 1rem;
  overflow: hidden;
  font-size: 0.8rem;
  background-color: aliceblue;
`;

const Nick = ({ id }) => {
  const [nick, setNick] = useState("");

  useEffect(() => {
    const getMember = async () => {
      try {
        const rsp = await LoginAxiosApi.memberGetOne(id);
        console.log(rsp.data);
        setNick(rsp.data[0].nick);
      } catch (e) {
        console.log(e);
      }
    };
    getMember();
  }, []);

  return <StyledNick>{nick}</StyledNick>;
};

export default Nick;
