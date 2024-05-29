import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserStore";

const StyledMyMeeting = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #e9edc9;
  border: 2px solid #ccd5ae;
  border-radius: 1rem;
`;

const Div = styled.div`
  width: 100%;
  padding: ${({ type }) => (type === "name" ? ` 1rem 2rem` : `0.2rem 2rem`)};
  font-size: ${({ type }) => (type === "name" ? `1rem` : `0.9rem`)};
  background-color: ${({ type }) => type === "name" && `#ccd5ae`};
  border-radius: 0.8rem 0.8rem 0 0;
`;

const MyMeeting = ({ meeting, onclickDetail }) => {
  const context = useContext(UserContext);
  const { formatDate, rpad } = context;
  return (
    <StyledMyMeeting onClick={() => onclickDetail(meeting)}>
      <Div type="name">
        {meeting.name.length < 10
          ? meeting.name
          : rpad(meeting.name.substr(0, 8), 10, ".")}
      </Div>
      <Div>
        <span>
          {meeting?.duration1 ? formatDate(meeting?.duration1) : "매일"}
        </span>
        <span>
          {meeting?.duration2 && ` ~ ${formatDate(meeting?.duration2)}`}
        </span>
      </Div>
      <Div>{meeting.location}</Div>
    </StyledMyMeeting>
  );
};
export default MyMeeting;
