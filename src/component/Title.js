import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledTitle = styled.span`
  position: absolute;
  top: 4%;
  left: 4%;
  font-size: 3rem;
  font-weight: bold;
  cursor: ${({ point }) => (point ? "pointer" : "default")};
`;

const Title = ({ children, navigate }) => {
  const navigation = useNavigate();
  const onClickTitle = () => {
    if (!!navigate) {
      navigation(navigate);
    }
  };

  return (
    <StyledTitle onClick={onClickTitle} point={!!navigate}>
      {children}
    </StyledTitle>
  );
};

export default Title;
