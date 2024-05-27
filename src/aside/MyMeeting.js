import styled from "styled-components";

const StyledMyMeeting = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  background-color: blue;
`;

const MyMeeting = ({ meeting, onclickDetail }) => {
  return (
    <StyledMyMeeting onClick={() => onclickDetail(meeting)}>
      <p>{meeting.name}</p>
    </StyledMyMeeting>
  );
};
export default MyMeeting;
