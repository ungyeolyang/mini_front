import styled from "styled-components";
import backgroundImage from "/Users/82102/dev/mini_front/src/image/sp_main.74b52318.png";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AxiosApi from "../api/BoardAxiosApi";
import BoardList from "./BoardList";
import Paging from "../component/Paging";
import Right from "../component/Right";
import { FaMagnifyingGlass } from "react-icons/fa6";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TopContainer = styled.div`
  padding: 0 30px;
  width: 1200px;
  position: relative;
  top: 0;
  margin-bottom: 40px;
  z-index: 999;
  display: flex;
`;

const Title = styled.h3`
  color: #333;
`;
// 햄버거 버튼
const Ham = styled.button`
  position: absolute;
  right: 18px;
  margin: 10px;
  padding: 10px;
  display: inline-block;
  background-color: white;
  border: 0;
  &:hover {
    cursor: pointer;
    background-color: #fefae0;
    border-radius: 50%;
  }
`;
// 햄버거 아이콘
const Hamburger = styled.div`
  background-repeat: no-repeat;
  background-size: 422px 405px;
  background-position: -298px -310px;
  width: 27px;
  height: 21px;
`;
// 선택 버튼
const CategoryButton1 = styled.button`
  padding: 10px;
  width: 150px;
  height: 40px;
  margin-right: 50px;
  background-color: #e9edc9;
  border: 0;
  &:hover {
    background-color: #ccd5ae;
    cursor: pointer;
  }
`;

const SerchContainer = styled.div`
  padding: 0 30px;
  position: relative;
  margin: 0;
  width: 1150px;
  margin-bottom: 30px;
`;
// 여기서 부터 파란색 메인
const BoardBox = styled.div`
  position: relative;
  text-align: center;
  width: 1200px;
  height: 432px;
  margin: 0 35px;
  padding: 0;
  border: 0;
  background-color: #b8d0fa;
`;
const BoardTitleBox = styled.div`
  position: absolute;
  width: 1200px;
  height: 72px;
  margin: 0;
  padding: 0;
  border-bottom: 0;
  border-right: 0;
  border-left: 0;
  background-color: #94b9f3;
  display: flex;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const BoardTitle = styled.div`
  width: 100px;
  height: 72px;
  border: 0;
  font-weight: bold;
  font-size: 15px;
  line-height: 72px;
`;
const BoardLi = styled.div`
  position: absolute;
  width: 1200px;
  height: 360px;
  border: 0;
  margin: 0;
  padding: 0;
  bottom: 0;
`;
// 끝

const Fobox = styled.div`
  position: relative;
  width: 1200px;
  height: 50px;
  display: flex;
`;
const Pageme = styled.div`
  position: relative;
  width: 600px;
  height: 30px;
  display: flex;
`;
// 페이지 버튼
const Pagebu = styled.button`
  width: 20px;
  height: 20px;
  background-color: white;
  border: 0;
  margin: 10px;
  &:hover {
    cursor: pointer;
  }
`;
const SerBox = styled.div`
  width: 360px;
  height: 40px;
  border: 0;
  margin: 10px;
  position: absolute;
  right: 1px;
  display: flex;
`;
// 드롭다운
const CategorySelect = styled.select`
  // 카테고리 선택 드롭다운에 대한 스타일 정의
  padding: 10px;
  margin-right: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 120px; // 드롭다운 너비 조정
  height: 35px;
`;
// 검색창
const Cateinput = styled.input`
  width: 240px;
  height: 35px;
  border-radius: 4px;
  border-color: #ced4da;
`;
const InputButton = styled.button`
  margin: 0;
  padding: 0;
  background-color: white;
  border: 0;
  &:hover {
    cursor: pointer;
  }
`;
const Inputicon = styled.div`
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
`;
const Board = () => {
  const [boardList, setBoardList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("자유게시판");
  const [seleuserId, setseleuserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [serchCategory, setserchCategory] = useState("제목");
  const [serinput, setserinput] = useState("");
  const pageSize = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [selectedCategory, seleuserId]);

  const fetchData = async () => {
    try {
      let response;
      if (selectedCategory === "kimfjd") {
        response = await AxiosApi.myboardList(seleuserId);
      } else {
        response = await AxiosApi.boardList(selectedCategory);
      }
      setBoardList(response.data);
    } catch (error) {
      console.error("Error fetching board list:", error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category === "kimfjd") {
      setseleuserId("kimfjd");
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
      setBoardList(rsp.data); // 검색 결과를 상태에 저장
      setCurrentPage(1); // 검색 결과를 첫 페이지로 설정
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = () => {
    navigate("/BoInser");
  };

  return (
    <Right>
      <MainContainer>
        <TopContainer>
          <Title>게시판</Title>
          <Ham>
            <Hamburger style={{ backgroundImage: `url(${backgroundImage})` }} />
          </Ham>
        </TopContainer>
        <SerchContainer>
          <CategoryButton1 onClick={() => handleCategoryChange("자유게시판")}>
            자유게시판
          </CategoryButton1>
          <CategoryButton1
            onClick={() => handleCategoryChange("모임 후기 게시판")}
          >
            모임 후기 게시판
          </CategoryButton1>
          <CategoryButton1 onClick={() => handleCategoryChange("kimfjd")}>
            내가 쓴 글
          </CategoryButton1>
          <CategoryButton1
            style={{ position: "absolute", right: "1px" }}
            onClick={handleClick}
          >
            글 쓰기
          </CategoryButton1>
        </SerchContainer>
        <BoardBox>
          <BoardTitleBox>
            <BoardTitle
              style={{ margin: "400px", marginTop: "0", marginBottom: "0" }}
            >
              제목
            </BoardTitle>
            <BoardTitle>작성자</BoardTitle>
            <BoardTitle>작성일</BoardTitle>
            <BoardTitle>조회수</BoardTitle>
          </BoardTitleBox>
          <BoardLi>
            <BoardList boardList={paginatedData} />
          </BoardLi>
        </BoardBox>
        <Fobox>
          <Pageme>
            <Paging
              page={currentPage}
              itemsCountPerPage={pageSize}
              totalItemsCount={boardList.length}
              onPageChange={handlePageChange}
            />
          </Pageme>
          <SerBox>
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
              value={serinput}
              onChange={handleSerinputChange}
            />
            <InputButton onClick={handleSubmit}>
              <Inputicon>
                <FaMagnifyingGlass />
              </Inputicon>
            </InputButton>
          </SerBox>
        </Fobox>
      </MainContainer>
    </Right>
  );
};

export default Board;
