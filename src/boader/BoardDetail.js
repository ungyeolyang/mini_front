import Right from "../component/Right";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosApi from "../api/BoardAxiosApi";
import Update from "./Update";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
`;

const TopContainer = styled.div`
  padding: 0 30px;
  width: 100%;
  position: relative;
  top: 0;
  margin-bottom: 8px;
  z-index: 999;
  display: flex;
`;

const Title = styled.h3`
  color: #333;
  font-size: 29px;
`;

const ColorBox = styled.div`
  width: 98%;
  height: 270px;
  background-color: #94b9f3;
  align-items: center;
  text-align: center;
  border-radius: 30px;
`;

const MainDetail = styled.div`
  width: 95%;
  height: 100vh;
  border-radius: 50px;
  margin: 0 30px;
  margin-top: 15px;
  background-color: white;
  box-shadow: 10px 10px 20px #94b9f3;
`;

const DetailHearder = styled.div`
  width: 100%;
  font-weight: bold;
  height: 40px;
  padding-top: 15px;
  font-size: 18px;
`;
const DetailCenter = styled.div`
  width: 93%;
  height: 60px;
  background-color: #ced4da;
  margin: 15px 40px;
  display: flex;
`;
const Board_View = styled.p`
  font-weight: bold;
  color: black;
  font-size: 15px;
  text-align: center;
  margin: 20px;
`;

const BoardDate = styled.p`
  margin: 20px;
  font-weight: bold;
  color: black;
  font-size: 15px;
  margin-right: 30%;
`;

const UserId = styled.p`
  font-style: italic;
  margin: 20px;
  font-weight: bold;
  color: black;
  font-size: 15px;
  margin-right: 30%;
`;
const DetailContent = styled.p`
  font-size: 15px;
`;
const BoardImage = styled.img`
  width: 350px;
  height: 350px;
`;
const ButtonBox = styled.div`
  width: 100%;
  height: 60px;
  position: relative;
`;
const BrButton = styled.button`
  width: 130px;
  height: 40px;
  padding: 10px;
  background-color: #e9edc9;
  border: 0;
  &:hover {
    background-color: #ccd5ae;
    cursor: pointer;
  }
`;

const BoardDetail = () => {
  const { board_no } = useParams();
  const [board, setBoard] = useState(null); // 초기 상태를 null로 설정
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();

  //삭제
  const deleteBoard = () => {
    console.log("게시글 삭제하기 함수 호출");
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const delBoardApi = async () => {
        try {
          const rsp = await AxiosApi.boardDelete(board_no);
          console.log(board_no);
          if (rsp.data) {
            alert("게시글이 삭제되었습니다.");
            navigate("/Board");
          }
        } catch (e) {
          console.log(e);
        }
      };
      delBoardApi();
    }
  };

  const onClickUpdate = () => {
    navigate(`/update/${board_no}`, {
      state: {
        board_title: board[0].board_title,
        board_de: board[0].board_de,
        imageurl: board[0].imageurl,
      },
    });
  };

  useEffect(() => {
    const getBoardDetail = async () => {
      console.log("getBoardDetail : " + board_no);
      try {
        const response = await AxiosApi.detailapi(board_no);
        console.log("API response:", response.data); // API 응답 로그 출력
        setBoard(response.data);
      } catch (error) {
        console.log("API error:", error); // 에러 로그 출력
      }
    };
    getBoardDetail();
  }, [board_no]);

  if (!board) {
    return <div>Loading...</div>; // 데이터가 아직 로드되지 않은 경우 로딩 메시지 표시
  }
  const handleBack = () => {
    navigate("/board");
  };

  return (
    <Right>
      <MainContainer>
        <TopContainer>
          <Title>게시판</Title>
        </TopContainer>
        <ColorBox>
          <MainDetail>
            <DetailHearder>{board[0].board_title}</DetailHearder>
            <DetailCenter>
              <UserId>작성자: {board[0].user_id}</UserId>
              <BoardDate>작성일: {board[0].board_date}</BoardDate>
              <Board_View>조회수: {board[0].board_view}</Board_View>
            </DetailCenter>
            <BoardImage src={board[0].imageurl} alt="Board image" />
            <DetailContent>{board[0].board_de}</DetailContent>
            <ButtonBox>
              <BrButton
                style={{ position: "absolute", left: "1px", margin: "5px" }}
                onClick={handleBack}
              >
                돌아가기
              </BrButton>

              {user_id === board[0].user_id && (
                <BrButton
                  style={{ position: "absolute", right: "1px", margin: "5px" }}
                  onClick={deleteBoard}
                >
                  삭제하기
                </BrButton>
              )}
              {user_id === board[0].user_id && (
                <BrButton
                  style={{
                    position: "absolute",
                    right: "150px",
                    margin: "5px",
                  }}
                  onClick={onClickUpdate}
                >
                  수정하기
                </BrButton>
              )}
            </ButtonBox>
          </MainDetail>
        </ColorBox>
      </MainContainer>
    </Right>
  );
};

export default BoardDetail;
