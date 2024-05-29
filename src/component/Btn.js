import styled from "styled-components";

const StyledBtn = styled.button`
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
  background-color: #e9edc9;
  border: 0;
  padding: 0.5rem 1.5rem;
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
