import styled from "styled-components";

const StyledBBtn = styled.button`
  border: 0;
  padding: 1rem 1.5rem;
  background-color: #e9edc9;
  border-radius: 5px;
  &:hover {
    background-color: #ccd5ae;
    color: #fff;
  }
`;

const Btn = ({ onClick, disabled, children }) => {
  return (
    <StyledBBtn disabled={disabled} onClick={onClick}>
      {children}
    </StyledBBtn>
  );
};

export default Btn;
