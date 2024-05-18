import styled from "styled-components";

const StyledInput = styled.input`
  width: 25rem;
  height: 3rem;
  padding-left: 1rem;
  border: none;
  border-bottom: 0.1rem solid silver;
  cursor: ${(props) => !props.disabled && `pointer`};
  &:focus {
    outline: none;
  }
`;

const Input_ = ({ onChange, placeholder, disabled, hidden }) => {
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      hidden={hidden}
    />
  );
};

export default Input_;
