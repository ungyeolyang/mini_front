import styled from "styled-components";
import ScheduleList from "./ScheduleList";

const Container = styled.div`
  width: 100%;
`;
const Head = styled.div`
  display: flex;
  width: 100%;
  padding: 1% 0;
  background-color: #b8d0fa;
  cursor: pointer;
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
  height: 15.5rem;
  overflow: hidden;
`;

const Schedule = ({ schedule, onClickDetail, onClickSchedule }) => {
  return (
    <Container>
      <Head onClick={onClickSchedule}>
        <Box type="title">제목</Box>
        <Box type="author">작성자</Box>
        <Box type="date">일정</Box>
      </Head>
      <Body>
        <ScheduleList scheduleList={schedule} onClickDetail={onClickDetail} />
      </Body>
    </Container>
  );
};

export default Schedule;
