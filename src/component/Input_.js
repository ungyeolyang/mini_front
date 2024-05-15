import styled from "styled-components";

const StyledInput = styled.input`
  width: 25rem;
  height: 3rem;
  padding-left: 1rem;
  border: none;
  border-bottom: 0.1rem solid silver;
  cursor: pointer;
`;

const Input_ = ({ onChange, placeholder }) => {
  return (
    <StyledInput type="text" placeholder={placeholder} onChange={onChange} />
  );
};

export default Input_;
