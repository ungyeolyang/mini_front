import styled from "styled-components";

const StyledInput = styled.input`
  width: 25rem;
  height: 3rem;
  margin: 0.7rem;
  padding-left: 1rem;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

const Input = ({ onChange, placeholder, color, disabled }) => {
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      color={color}
      disabled={disabled}
    />
  );
};

export default Input;
