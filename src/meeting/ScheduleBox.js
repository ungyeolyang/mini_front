import styled from "styled-components";
import Paging from "../component/Paging";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Schedule from "./Schedule";
import { useState } from "react";

const StyledScheduleBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  footer {
    position: relative;
    width: 100%;
  }
`;

const ScheduleBox = ({ category, onClickDetail, schedule }) => {
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
      ></Schedule>
      <footer>
        <Paging
          page={currentPage}
          itemsCountPerPage={pageSize}
          totalItemsCount={schedule?.length}
          onPageChange={handlePageChange}
        />
        <div>
          <select
            defaultValue="title"
            // onChange={(e) => setserchCategory(e.target.value)}
          >
            <option value="제목">제목</option>
            <option value="작성자">작성자</option>
          </select>
          <input
            type="text"
            placeholder="검색어를 입력해 주세요"
            // onChange={handleSerinputChange}
          />
          <button>
            <FaMagnifyingGlass />
          </button>
        </div>
      </footer>
    </StyledScheduleBox>
  );
};
export default ScheduleBox;
