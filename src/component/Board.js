import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;
const Head = styled.div`
  display: flex;
  padding: 1% 0;
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
`;
const Line = styled.div`
  display: flex;
  border-bottom: 1px solid gray;
`;
const Board = () => {
  return (
    <Container>
      <Head>
        <Box type="title">제목</Box>
        <Box type="author">작성자</Box>
        <Box type="date">작성일</Box>
        <Box tyep="view">조회수</Box>
      </Head>
      <Body>
        <Line>
          <Box type="title">제목</Box>
          <Box type="author">작성자</Box>
          <Box type="date">작성일</Box>
          <Box tyep="view">조회수</Box>
        </Line>
        <Line>
          <Box type="title">제목</Box>
          <Box type="author">작성자</Box>
          <Box type="date">작성일</Box>
          <Box tyep="view">조회수</Box>
        </Line>
        <Line>
          <Box type="title">제목</Box>
          <Box type="author">작성자</Box>
          <Box type="date">작성일</Box>
          <Box tyep="view">조회수</Box>
        </Line>
        <Line>
          <Box type="title">제목</Box>
          <Box type="author">작성자</Box>
          <Box type="date">작성일</Box>
          <Box tyep="view">조회수</Box>
        </Line>
        <Line>
          <Box type="title">제목</Box>
          <Box type="author">작성자</Box>
          <Box type="date">작성일</Box>
          <Box tyep="view">조회수</Box>
        </Line>
      </Body>
    </Container>
  );
};

export default Board;
