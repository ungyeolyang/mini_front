import styled from "styled-components";

const StyledProfile = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  background-color: white;
  box-shadow: 2px 2px 1px gray;
  display: ${({ display }) => (display ? `none` : `flex`)};
  position: relative;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
`;

const Profile = (props) => {
  return (
    <StyledProfile
      size={props.size}
      onClick={props.onClick}
      display={props.display}
    >
      <img src={props.src} alt="프로필" />
      {props.children}
    </StyledProfile>
  );
};

export default Profile;
