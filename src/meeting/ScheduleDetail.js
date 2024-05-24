import styled from "styled-components";
import { FaChevronDown, FaChevronUp, FaChevronLeft } from "react-icons/fa";
import { useContext, useState } from "react";
import Btn from "../component/Btn";
import UserDetail from "../component/UserDetail";
import { UserContext } from "../context/UserStore";

const StyledScheduleDetail = styled.div`
  display: flex;
  min-width: 1000px;
  min-height: 500px;
  flex-direction: column;
  background-color: #e5f3ff;
  /* padding: 1.5rem; */
`;
const Div = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: ${({ type }) => {
    switch (type) {
      case "head":
        return `1.5rem 0.5rem`;
      case "title":
        return `1rem 1rem 0.5rem`;
      case "receive":
        return `0 4rem 0.5rem`;
      case "my":
        return `0 4rem 0.5rem`;
      case "date":
        return `0 4rem 1rem`;
      case "contents":
        return `1rem 4rem`;
      default:
        return `0 2rem 1rem`;
    }
  }};
  font-size: ${({ type }) => {
    switch (type) {
      case "title":
        return `1.5rem`;
      case "date":
        return `0.9rem`;
      default:
        return `1rem`;
    }
  }};
  ${({ type }) => (type === "date" ? `0.9rem` : `1rem`)};
  color: ${({ type }) => (type === "date" ? `gray` : `black`)};
  ${(props) => props.type === "receive" && props.isUp && `display:none`}
`;

const StyledLeft = styled(FaChevronLeft)`
  cursor: pointer;
`;
const Bold = styled.span`
  font-weight: bold;
  font-size: inherit;
`;
const User = styled.span`
  padding: 0.2rem 0.8rem;
  border-radius: 1rem;
  cursor: pointer;
  background-color: #e9edc9;
  &:hover {
    background-color: #ccd5ae;
  }
`;
const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #b8d0fa;
`;

const ScheduleDetail = ({ user, onClickBack }) => {
  const context = useContext(UserContext);
  const { nick, imgUrl, formatDetailDate, formatDate } = context;
  const id = localStorage.getItem("id");

  const [info, setInfo] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const onClickUser = (e) => {
    setUserOpen(true);
    setInfo(e.target.getAttribute("user"));
  };

  const closeUser = () => {
    setUserOpen(false);
  };

  const on = () => {
    console.log(user);
  };

  return (
    <StyledScheduleDetail onClick={on}>
      <Body>
        <Div type="title">
          <StyledLeft onClick={onClickBack} />
          <Bold>{user.title}</Bold>
          <span>일정 : {formatDate(user.sdate)}</span>
          {id === user.id && <Btn>삭제</Btn>}
        </Div>
        <Div type="receive">
          <Bold>작성자</Bold>
          <User onClick={onClickUser} user={user.id}>
            {user.nick}({user.id})
          </User>
        </Div>
        <Div type="date">{formatDetailDate(user.bdate)}</Div>
      </Body>
      <Div type="contents">{user.contents}</Div>
      <UserDetail
        open={userOpen}
        close={closeUser}
        title="회원정보"
        userId={info}
        nick={nick}
        imgUrl={imgUrl}
      ></UserDetail>
    </StyledScheduleDetail>
  );
};
export default ScheduleDetail;
