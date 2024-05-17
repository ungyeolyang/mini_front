import styled from "styled-components";

const Container = styled.div`
  width: 95%;
  height: 100px;
  display: flex;
  background-color: blue;
`;
const People = styled.div`
  width: 20%;
  padding: 0.5rem 0;
  gap: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    font-size: 0.8rem;
    font-weight: bold;
  }
`;
const Profil = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: silver;
  display: "flex";
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
`;

const Member = () => {
  return (
    <Container>
      <People>
        <Profil></Profil>
        <span>이름</span>
      </People>
    </Container>
  );
};

export default Member;
