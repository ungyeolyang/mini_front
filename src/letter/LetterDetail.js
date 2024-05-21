import styled from "styled-components";

const StyledLetterDetail = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  background-color: #e5f3ff;
`;

const Div = styled.div`
  display: flex;
`;

const LetterDetail = ({ user, onClickBack }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let hour = date.getHours();
    const minute = ("0" + date.getMinutes()).slice(-2);
    const ampm = hour < 12 ? "오전" : "오후";

    if (hour >= 12) {
      hour -= 12;
    }
    if (hour === 0) {
      hour = 12;
    }

    return `${year}-${month}-${day} ${ampm} ${hour}:${minute}`;
  };

  return (
    <StyledLetterDetail>
      <p onClick={onClickBack}>&lt;</p>
      <h1>{user.title}</h1>
      <Div>
        보낸 사람 : {user.senderNick}({user.sender})
        <div>{formatDate(user.date)}</div>
      </Div>
      <Div>
        받는 사람 : {user.receiverNick}({user.receiver})
      </Div>
      <div>{user.contents}</div>
    </StyledLetterDetail>
  );
};
export default LetterDetail;
