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
  display: ${(props) => props.display || "block"};
`;

const InputBar = ({
  onChange,
  onKeyDown,
  placeholder,
  disabled,
  hidden,
  ref,
  display,
  value,
}) => {
  ref = useRef(null);
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
      hidden={hidden}
      ref={ref}
      display={display}
      value={value}
    />
  );
};

export default InputBar;
