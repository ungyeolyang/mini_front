import styled from "styled-components";
import Letters from "./Letters";
import Paging from "../component/Paging";
import { FaMagnifyingGlass } from "react-icons/fa6";

const StyledLetterBox = styled.div`
  display: flex;
  min-width: 1000px;
  flex-direction: column;
  footer {
    position: relative;
    width: 100%;
  }
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

  return (
    <StyledLetterBox>
      <Letters
        mailList={paginatedData}
        category={category}
        onClickDetail={onClickDetail}
      ></Letters>
      <footer>
        <Paging
          page={currentPage}
          itemsCountPerPage={pageSize}
          totalItemsCount={letter?.length}
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
    </StyledLetterBox>
  );
};
export default LetterBox;
