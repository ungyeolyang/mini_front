import styled from "styled-components";

const StyledBtn = styled.button`
  outline: none;
  cursor: pointer;
  margin-right: 10px;
  background-color: #e9edc9;
  border: 0;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  &:hover {
    background-color: #ccd5ae;
    color: #fff;
  }
`;

const Btn = ({ onClick, disabled, children }) => {
  return (
    <StyledBtn disabled={disabled} onClick={onClick}>
      {children}
    </StyledBtn>
  );
};

export default Btn;
