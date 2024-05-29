import styled from "styled-components";
import LetterList from "./LetterList";

const Container = styled.div`
  @media (max-width: 720px) {
  }
`;
const Head = styled.div`
  display: flex;
  background-color: #b8d0fa;

  @media (max-width: 720px) {
    display: none;
  }
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  justify-content: ${(props) => {
    switch (props.type) {
      case "title":
        return "";
      case "author":
        return "";
      case "date":
        return "center";
      case "view":
        return "center";
      case "check":
        return "center";
      default:
        return "auto";
    }
  }};
  font-weight: bold;
  width: ${(props) => {
    switch (props.type) {
      case "title":
        return "50%";
      case "author":
        return "20%";
      case "date":
        return "20%";
      case "view":
        return "10%";
      default:
        return "auto";
    }
  }};
`;
const Body = styled.div`
  background-color: #e5f3ff;
  min-height: 17rem;
  @media (max-width: 720px) {
    width: 100%;
    position: absolute;
    right: 1px;
  }
`;

const Letters = ({
  mailList,
  category,
  onClickDetail,
  searchCategory,
  text,
}) => {
  return (
    <Container>
      <Head>
        <Box type="view">읽음</Box>
        <Box type="author">{category === "send" ? `수신자` : `작성자`}</Box>
        <Box type="title">제목</Box>
        <Box type="date">작성일</Box>
      </Head>
      <Body>
        <LetterList
          mailList={mailList}
          category={category}
          onClickDetail={onClickDetail}
          searchCategory={searchCategory}
          text={text}
        />
      </Body>
    </Container>
  );
};

export default Letters;
