import styled from "styled-components";
import MailList from "./MailList";

const Container = styled.div``;
const Head = styled.div`
  display: flex;
  background-color: #b8d0fa;
`;
const Box = styled.div`
  padding: 2% 0;
  text-align: center;
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
  min-height: 20rem;
`;

const Mail = ({ mailList, category }) => {
  return (
    <Container>
      <Head>
        <Box type="author">작성자</Box>
        <Box type="title">제목</Box>
        <Box type="date">작성일</Box>
        <Box type="view">조회수</Box>
      </Head>
      <Body>
        <MailList mailList={mailList} category={category} />
      </Body>
    </Container>
  );
};

export default Mail;
