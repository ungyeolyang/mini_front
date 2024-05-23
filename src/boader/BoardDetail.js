import Right from "../component/Right";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosApi from "../api/BoardAxiosApi";
import Update from "./Update";
import Modal from "../component/Modal";
import CommentList from "./CommentList";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  overflow-y: auto;
  height: 100vh;
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
const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
const CommTit = styled.h4`
  color: #333;
  font-size: 29px;
  width: 100%;
  border: 1px solid gray;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  text-align: left;
`;
const CommentdeBox = styled.div`
  border: 0;
  width: 100%;
`;
const CommentTextarea = styled.textarea`
  width: 90%;
  height: 100px;
  border: 0;
  background-color: #e9ecef;
  border-radius: 5px;
  font-size: 14px;
`;
const Fooder = styled.div`
  width: 100%;
  height: 500px;
`;

const BoardDetail = () => {
  const { board_no } = useParams();
  const [board, setBoard] = useState(null); // 초기 상태를 null로 설정
  const user_id = localStorage.getItem("id");
  const [comments, setComments] = useState(""); // 댓글에 대한 상태 관리
  const [inputComment, setInputComment] = useState(""); // 댓글 입력
  const [comAddFlag, setComAddFlag] = useState(false); // 댓글 추가 성공 여부
  const navigate = useNavigate();

  const [modalContent, setModalContent] = useState("");
  const [modalHeader, setModalHeader] = useState("실패");
  const [modalOpen, setModalOpen] = useState(false); // 초기값은 닫힌 상태
  const closeModal = () => {
    // 모달을 닫는 함수
    setModalOpen(false);
  };
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

  // 수정
  const onClickUpdate = () => {
    navigate(`/update/${board_no}`, {
      state: {
        board_title: board[0].board_title,
        board_de: board[0].board_de,
        imageurl: board[0].imageurl,
      },
    });
  };

  // 댓글 출력
  const commentData = async () => {
    try {
      let response1;
      response1 = await AxiosApi.CommentSel(board_no);
      const sortedData = response1.data.sort(
        (a, b) => b.comment_no - a.comment_no
      );
      console.log("API response1:", response1.data);
      setComments(sortedData);
    } catch (error) {
      console.error("Error fetching board list:", error);
    }
  };

  // 게시글 번호가 바뀔때 마다 상세 페이지랑 댓글 바뀜
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
    commentData();
  }, [board_no]);

  if (!board) {
    return <div>Loading...</div>; // 데이터가 아직 로드되지 않은 경우 로딩 메시지 표시
  }
  const handleBack = () => {
    navigate("/board");
  };

  const handleCommentChange = (e) => {
    setInputComment(e.target.value);
    console.log(inputComment);
  };
  // 댓글 올림
  const handleCommentSubmit = async () => {
    console.log(inputComment, board_no, user_id);

    try {
      const rsp = await AxiosApi.CommentSu(inputComment, board_no, user_id);
      if (rsp.data) {
        setModalOpen(true);
        setModalHeader("성공");
        setModalContent("댓글 쓰기 성공");
        setInputComment("");
      } else {
        setModalOpen(true);
        setModalHeader("실패");
        setModalContent("댓글 쓰기 실패");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const confirm = () => {
    window.location.reload();
  };

  return (
    <>
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
                    style={{
                      position: "absolute",
                      right: "1px",
                      margin: "5px",
                    }}
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
              <CommentBox>
                <CommTit> 댓글</CommTit>
                <CommentdeBox>
                  <CommentList comments={comments} />
                </CommentdeBox>
                <CommentTextarea
                  placeholder="댓글 입력"
                  value={inputComment}
                  onChange={handleCommentChange}
                />
                <BrButton onClick={handleCommentSubmit}>댓글 쓰기</BrButton>
              </CommentBox>
            </MainDetail>
          </ColorBox>
        </MainContainer>
        <Fooder />
      </Right>
      <Modal
        open={modalOpen}
        close={closeModal}
        header={modalHeader}
        type
        confirm={confirm}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default BoardDetail;
