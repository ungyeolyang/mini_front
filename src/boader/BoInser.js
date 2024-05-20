import styled from "styled-components";
import React, { useState } from "react";
import AxiosApi from "../api/BoardAxiosApi";
import Modal from "../component/Modal";
import { useNavigate } from "react-router-dom";

const Left = styled.div`
  width: 250px;
  height: 100vw;
  background-color: #fefae0;
  z-index: 1;
`;

const InserContainer = styled.div`
  display: flex;
`;

const InserMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-left: 300px;
`;

const Titinput = styled.input`
  width: 600px;
  height: 40px;
  border: 1px solid gray;
  border-top: 0;
  border-left: 0;
  border-right: 0;
`;
const Cabox = styled.div`
  width: 600px;
  height: 100px;
  text-align: left;
  margin-left: 0;
`;
const Explan = styled.h5`
  color: #333;
`;

const CategorySelect = styled.select`
  // 카테고리 선택 드롭다운에 대한 스타일 정의
  padding: 10px;
  margin-right: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 150px; // 드롭다운 너비 조정
  height: 35px;
`;

const InsertBu = styled.button`
  padding: 10px;
  width: 70px;
  height: 45px;
  margin-right: 50px;
  background-color: #e9edc9;
  border: 0;
  font-weight: bold;
  border-radius: 10px;
  margin-top: 10px;
  &:hover {
    background-color: #ccd5ae;
    cursor: pointer;
  }
`;
// 글 내용 입력창
const TextInfo = styled.textarea`
  width: 600px;
  height: 500px;
  border: 1px solid black;
  background-color: #ced4da;
  padding: 10px;
  resize: none;
`;
const ButtBox = styled.div`
  width: 300px;
  height: 50px;
  align-items: center;
  margin-top: 10px;
  border: 0;
  display: flex;
`;
const BoInser = () => {
  const [Board_title, setBoard_title] = useState("");
  const [Board_category, setBoard_category] = useState("자유게시판");
  const [Board_de, setBoard_de] = useState("");
  const navigate = useNavigate();

  const [modalContent, setModalContent] = useState("");
  const [modalHeader, setModalHeader] = useState("실패");
  const [modalOpen, setModalOpen] = useState(false); // 초기값은 닫힌 상태
  const closeModal = () => {
    // 모달을 닫는 함수
    setModalOpen(false);
  };

  const handleTitleChange = (e) => {
    setBoard_title(e.target.value);
  };
  const handleContentChange = (e) => {
    setBoard_de(e.target.value);
    console.log(Board_title, Board_category, Board_de);
  };

  const handleSubmit = async () => {
    try {
      const rsp = await AxiosApi.BoInser(Board_title, Board_category, Board_de);
      if (rsp.data) {
        setModalOpen(true);
        setModalHeader("성공");
        setModalContent("글쓰기 성공");
      } else {
        setModalOpen(true);
        setModalHeader("실패");
        setModalContent("글쓰기 실패");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const confirm = () => {
    navigate("/Board");
  };

  //글쓰기 취소 기능
  const handleReset = () => {
    setBoard_title("");
    setBoard_category("");
    navigate("/Board");
  };
  return (
    <>
      <InserContainer>
        <Left></Left>
        <InserMainContainer>
          <Titinput
            type="text"
            placeholder="제목"
            value={Board_title}
            onChange={handleTitleChange}
          ></Titinput>
          <Cabox>
            <Explan>글 종류</Explan>
            <CategorySelect
              value={Board_category}
              onChange={(e) => setBoard_category(e.target.value)}
              defaultValue="자유게시판"
            >
              <option value="자유게시판">자유게시판</option>
              <option value="모임 후기 게시판">모임 후기 게시판</option>
            </CategorySelect>
          </Cabox>
          <TextInfo
            placeholder="글 내용"
            value={Board_de}
            onChange={handleContentChange}
          ></TextInfo>
          <ButtBox>
            <InsertBu onClick={handleSubmit}>글쓰기</InsertBu>
            <InsertBu onClick={handleReset}>취소</InsertBu>
          </ButtBox>
        </InserMainContainer>
        <Modal
          open={modalOpen}
          close={closeModal}
          header={modalHeader}
          type
          confirm={confirm}
        >
          {modalContent}
        </Modal>
      </InserContainer>
    </>
  );
};
export default BoInser;
