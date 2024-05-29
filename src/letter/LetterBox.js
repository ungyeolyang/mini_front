import styled from "styled-components";
import Letters from "./Letters";
import Paging from "../component/Paging";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";

const StyledLetterBox = styled.div`
  display: flex;
  min-width: 1000px;
  flex-direction: column;
  footer {
    display: flex;
    align-items: center;
    gap: 20rem;
    position: relative;
    width: 100%;
  }
  @media (max-width: 720px) {
    footer {
      display: flex;
      align-items: center;
      gap: 0;
      position: absolute;
      top: 320px;
      width: 100%;
    }
  }
`;

const Div = styled.div`
  display: flex;

  input,
  button {
    height: 2rem;
    border: none;
    background-color: transparent;
    &:focus {
      outline: none;
    }
  }
  button {
    cursor: pointer;
    &:hover {
      color: #94b9f3;
    }
  }
`;

const InputBox = styled.div`
  border: 1px solid gray;
  padding: 0 0.5rem;
`;

const LetterBox = ({
  category,
  onClickDetail,
  currentPage,
  letter,
  handlePageChange,
}) => {
  const pageSize = 5;
  const paginatedData = letter?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const [searchCategory, setSearchCategory] = useState("title");
  const [text, setText] = useState("");

  return (
    <StyledLetterBox>
      <Letters
        mailList={paginatedData}
        category={category}
        onClickDetail={onClickDetail}
        searchCategory={searchCategory}
        text={text}
      ></Letters>
      <footer>
        <Paging
          page={currentPage}
          itemsCountPerPage={pageSize}
          totalItemsCount={letter?.length}
          onPageChange={handlePageChange}
        />
        <Div>
          <select
            defaultValue="title"
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            <option value="title">제목</option>
            <option value="senderNick">작성자</option>
            <option value="receiverNick">수신자</option>
          </select>
          <InputBox>
            <input
              type="text"
              placeholder="검색어를 입력해 주세요"
              onChange={(e) => setText(e.target.value)}
            />
          </InputBox>
        </Div>
      </footer>
    </StyledLetterBox>
  );
};
export default LetterBox;
