import styled from "styled-components";

const StyledMoim = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  padding: 1rem;
  background-color: #e5f3ff;
`;

const Moim = ({ meeting, onClickMoim }) => {
  return (
    <StyledMoim onClick={() => onClickMoim(meeting)}>
      <div>{meeting.category}</div>
      <div>{meeting.title}</div>
      <div>
        {meeting.duration1}
        {meeting.duration2}
      </div>
      <div>{meeting.id}</div>
    </StyledMoim>
  );
};

export default Moim;
