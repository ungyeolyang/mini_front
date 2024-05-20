import Right from "../component/Right";
import styled from "styled-components";
import backgroundImage from "../image/sp_main.74b52318.png";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosApi from "../api/BoardAxiosApi";

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

const ColorBox = styled.div`
  width: 100%;
  height: 270px;
  background-color: #94b9f3;
  margin-left: 50px;
  align-items: center;
`;

const MainDetail = styled.div`
  width: 80%;
  border-radius: 30px;
  background-color: white;
`;

const DetailHearder = styled.div`
  width: 80%;
  font-weight: bold;
`;

const BoardDetail = () => {
  const { board_no } = useParams();
  const [board, setBoard] = useState("");
  const [comments, setComments] = useState("");
  const [inputComment, setInputComment] = useState("");
  const [comAddFlag, setComAddFlag] = useState(false);
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    const getBoardDetail = async () => {
      console.log("getBoardDetail : " + board_no);
      try {
        const response = await AxiosApi.boardDetail(board_no);
        setBoard(response.data);
        const response2 = await AxiosApi.commentList(board_no);
        setComments(response2.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBoardDetail();
  }, [comAddFlag, board_no]);

  const handleCommentChange = (e) => {
    setInputComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosApi.commentWrite(
        user_id,
        board_no,
        inputComment
      );
      console.log(response);
      setInputComment("");
      setComAddFlag(!comAddFlag);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Right>
      <MainContainer>
        <TopContainer>
          <Title>게시판 </Title>
          <Ham>
            <Hamburger
              style={{ backgroundImage: `url(${backgroundImage})` }}
            ></Hamburger>
          </Ham>
        </TopContainer>
        <ColorBox>
          <MainDetail>
            <DetailHearder>{board.board_title}</DetailHearder>
          </MainDetail>
        </ColorBox>
      </MainContainer>
    </Right>
  );
};

export default BoardDetail;
