import styled from "styled-components";
import Paging from "../component/Paging";

import Schedule from "./Schedule";
import { useState } from "react";

const StyledScheduleBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  footer {
    display: flex;
    align-items: center;
    gap: 30%;
    position: relative;
    width: 100%;
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

const ScheduleBox = ({
  category,
  onClickDetail,
  schedule,
  searchCategory,
  setSearchCategory,
  text,
  setText,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;
  const paginatedData = schedule?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <StyledScheduleBox>
      <Schedule
        schedule={paginatedData}
        category={category}
        onClickDetail={onClickDetail}
        searchCategory={searchCategory}
        text={text}
      ></Schedule>
      <footer>
        <Paging
          page={currentPage}
          itemsCountPerPage={pageSize}
          totalItemsCount={schedule?.length}
          onPageChange={handlePageChange}
        />
        <Div>
          <select
            defaultValue="title"
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            <option value="title">제목</option>
            <option value="id">작성자</option>
            <option value="sdate">일정</option>
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
    </StyledScheduleBox>
  );
};
export default ScheduleBox;
