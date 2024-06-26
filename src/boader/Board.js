import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import AxiosApi from "../api/BoardAxiosApi";
import BoardList from "./BoardList";
import Paging from "../component/Paging";
import Right from "../component/Right";
import { FaMagnifyingGlass, FaBars } from "react-icons/fa6";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  overflow-y: auto;
`;

const TopContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h3`
  color: #333;
  font-size: 29px;
`;

const CategoryButton = styled.button`
  padding: 10px;
  width: 239px;
  height: 40px;
  margin-right: 10px;
  background-color: #e9edc9;
  border: 0;
  color: ${(props) => (props.active ? "#076AFF" : "black")};
  &:hover {
    background-color: #ccd5ae;
    cursor: pointer;
  }

  @media (max-width: 720px) {
    margin-left: 1px;
    padding: 0;
    margin-right: 0;
    flex: 1;
    &:not(:last-child) {
      margin-right: -1px;
    }
    ${(props) =>
      props.active
        ? `border-top: 1px solid #118716; border-left: 1px solid #118716; border-right: 1px solid #118716;`
        : `border-bottom: 1px solid #118716;`}
  }
`;

const SerchContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const BoardBox = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: #b8d0fa;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const BoardTitleBox = styled.div`
  display: flex;
  background-color: #94b9f3;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 720px) {
    display: none;
  }
`;

const BoardTitle = styled.div`
  flex: 1;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;

const BoardLi = styled.div`
  padding: 0px;

  @media (max-width: 720px) {
    width: calc(100% - 20px);
    margin: 0 auto 15px auto;
  }
`;

const Fobox = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;

  align-items: center;
  margin-bottom: 20px;
`;

const SerBox = styled.div`
  display: flex;
  margin-left: 20%;

  @media (max-width: 720px) {
    width: 100%;
    margin-left: 9%;
  }
`;

const CategorySelect = styled.select`
  padding: 10px;
  border-radius: 4px;
  margin-right: 10px;
  width: 120px;
  height: 40px;
  @media (max-width: 720px) {
    margin-left: 100px;
  }
`;

const Cateinput = styled.input`
  width: 240px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  margin-right: 10px;
  padding-left: 10px;
  @media (max-width: 720px) {
    width: 340px;
  }
`;

const InputButton = styled.button`
  padding: 0;
  background-color: white;
  border: 0;
  &:hover {
    cursor: pointer;
  }
`;

const Inputicon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WriteButton = styled.button`
  padding: 10px;
  width: 150px;
  height: 40px;
  background-color: #e9edc9;
  border: 0;
  &:hover {
    background-color: #ccd5ae;
    cursor: pointer;
  }

  @media (max-width: 720px) {
    align-self: flex-end;
    margin-bottom: 15px;
  }
`;

// Board Component
const Board = () => {
  const [boardList, setBoardList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("자유게시판");
  const id = localStorage.getItem("id");
  const [seleuserId, setseleuserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [serchCategory, setserchCategory] = useState("제목");
  const [serinput, setserinput] = useState("");
  const [pageSize, setPageSize] = useState(6);

  const navigate = useNavigate();
  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth <= 720) {
        setPageSize(8);
      } else {
        setPageSize(6);
      }
    };

    updatePageSize(); // 초기 페이지 크기 설정

    window.addEventListener("resize", updatePageSize);
    return () => {
      window.removeEventListener("resize", updatePageSize);
    };
  }, []);

  const inputFile = useRef(null);

  // 게시판에 글 띄우기
  useEffect(() => {
    fetchData();
  }, [selectedCategory, seleuserId]);

  const fetchData = async () => {
    try {
      let response;
      if (selectedCategory === id) {
        response = await AxiosApi.myboardList(seleuserId);
      } else {
        response = await AxiosApi.boardList(selectedCategory);
      }
      const sortedData = response.data.sort((a, b) => b.board_no - a.board_no);
      setBoardList(sortedData);
    } catch (error) {
      console.error("Error fetching board list:", error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category === id) {
      setseleuserId(id);
    }
    // 검색 관련 상태 초기화
    setserchCategory("제목");
    setserinput("");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = boardList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSerinputChange = (e) => {
    setserinput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const rsp = await AxiosApi.sersel(serchCategory, serinput);
      const sortedData = rsp.data.sort((a, b) => b.board_no - a.board_no);
      setBoardList(sortedData); // 검색 결과를 상태에 저장
      setCurrentPage(1); // 검색 결과를 첫 페이지로 설정
    } catch (e) {
      console.log(e);
    }
  };

  const handleDetailClick = (board_no) => {
    console.log(board_no);
    navigate(`/BoardDetail/${board_no}`);
  };

  const handleView = async (board_no) => {
    console.log(board_no);
    try {
      const rsp = await AxiosApi.BoView(board_no);
    } catch (e) {
      console.log(e);
    }
  };
  const handleClick = () => {
    navigate("/boinser");
  };

  const onKeyDownEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Right>
      <MainContainer>
        <TopContainer>
          <Title>게시판</Title>
        </TopContainer>
        <SerchContainer>
          <div>
            <CategoryButton
              onClick={() => handleCategoryChange("자유게시판")}
              active={selectedCategory === "자유게시판"}
            >
              자유게시판
            </CategoryButton>
            <CategoryButton
              onClick={() => handleCategoryChange("모임 후기 게시판")}
              active={selectedCategory === "모임 후기 게시판"}
            >
              모임 후기 게시판
            </CategoryButton>
            <CategoryButton
              onClick={() => handleCategoryChange(id)}
              active={selectedCategory === id}
            >
              내가 쓴 글
            </CategoryButton>
          </div>
        </SerchContainer>
        <BoardBox>
          <BoardTitleBox>
            <BoardTitle style={{ flex: 9 }}>제목</BoardTitle>
            <BoardTitle style={{ flex: 1 }}>작성자</BoardTitle>
            <BoardTitle style={{ flex: 1 }}>작성일</BoardTitle>
            <BoardTitle style={{ flex: 1 }}>조회수</BoardTitle>
          </BoardTitleBox>
          <BoardLi>
            <BoardList
              boardList={paginatedData}
              handleDetailClick={handleDetailClick}
              handleView={handleView}
            />
          </BoardLi>
        </BoardBox>
        <Fobox>
          <WriteButton onClick={handleClick}>글 쓰기</WriteButton>
          <SerBox>
            <Paging
              page={currentPage}
              itemsCountPerPage={pageSize}
              totalItemsCount={boardList.length}
              onPageChange={handlePageChange}
            />
          </SerBox>
        </Fobox>
        <SerBox style={{ margin: "0", marginBottom: "50px" }}>
          <CategorySelect
            defaultValue="title"
            value={serchCategory}
            onChange={(e) => setserchCategory(e.target.value)}
          >
            <option value="제목">제목</option>
            <option value="작성자">작성자</option>
          </CategorySelect>
          <Cateinput
            type="text"
            placeholder="검색어를 입력해 주세요"
            onChange={handleSerinputChange}
            onKeyDown={onKeyDownEnter}
          />
          <InputButton onClick={handleSubmit}>
            <Inputicon>
              <FaMagnifyingGlass />
            </Inputicon>
          </InputButton>
        </SerBox>
      </MainContainer>
    </Right>
  );
};

export default Board;
