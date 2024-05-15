import styled from "styled-components";

const StyledInput = styled.input`
  width: 25rem;
  height: 3rem;
  margin: 0.7rem;
  padding-left: 1rem;
  cursor: pointer;
`;

const Input = ({ onChange, placeholder }) => {
  return (
    <StyledInput type="text" placeholder={placeholder} onChange={onChange} />
  );
};

export default Input;
