import { useRef } from "react";
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

const InputBar = ({ onChange, placeholder, disabled, hidden, ref }) => {
  ref = useRef(null);
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      hidden={hidden}
      ref={ref}
    />
  );
};

export default InputBar;
