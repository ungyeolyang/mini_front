import styled from "styled-components";

const StyledBBtn = styled.button`
  width: 25rem;
  height: 3rem;
  margin: 0.7rem;
  background-color: ${(props) => (props.disabled ? "#EAEAEA" : "#e9edc9")};
  border: none;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#D9D9D9" : "#ccd5ae")};
    color: white;
  }
`;

const BBtn = ({ onClick, disabled, children }) => {
  return (
    <StyledBBtn disabled={disabled} onClick={onClick}>
      {children}
    </StyledBBtn>
  );
};

export default BBtn;
