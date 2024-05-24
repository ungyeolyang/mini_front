import styled from "styled-components";

const StyledInput = styled.input`
  width: 25rem;
  height: 3rem;
  margin: 0.7rem;
  padding-left: 1rem;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

const Input = ({
  onChange,
  onKeyDown,
  placeholder,
  color,
  disabled,
  hidden,
  ref,
}) => {
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      color={color}
      disabled={disabled}
      hidden={hidden}
      ref={ref}
    />
  );
};

export default Input;
