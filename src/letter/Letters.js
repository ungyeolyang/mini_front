import styled from "styled-components";
import LetterList from "./LetterList";

const Container = styled.div``;
const Head = styled.div`
  display: flex;
  background-color: #b8d0fa;
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
        return "7%";
      case "check":
        return "5%";
      default:
        return "auto";
    }
  }};
`;
const Body = styled.div`
  background-color: #e5f3ff;
  min-height: 20rem;
`;

const Letters = ({ mailList, category, onClickDetail }) => {
  return (
    <Container>
      <Head>
        <Box type="check">
          <input type="checkbox" />
        </Box>
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
        />
      </Body>
    </Container>
  );
};

export default Letters;
