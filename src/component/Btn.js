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
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  &:hover {
    background-color: #ccd5ae;
    color: #fff;
  }
  ${({ mediaQuery }) =>
    mediaQuery &&
    `
    @media (max-width: 720px) {
      border-radius: 0;
      width: 237px;
      height: 37px;
      padding: 0;
      margin:0;
      padding:0; 
      margin-left: 2px;     
      margin-right: 0;
      &:not(:last-child) {
      margin-right: -1px;
    }
    }
  `}
`;

const Btn = ({ onClick, disabled, children, mediaQuery }) => {
  return (
    <StyledBtn disabled={disabled} onClick={onClick} mediaQuery={mediaQuery}>
      {children}
    </StyledBtn>
  );
};

export default Btn;
