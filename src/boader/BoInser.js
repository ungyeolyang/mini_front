import styled from "styled-components";
import React, { useState } from "react";
import AxiosApi from "../api/BoardAxiosApi";
import Modal from "../component/Modal";
import { useNavigate } from "react-router-dom";
import { storage } from "../api/FireBase";

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
const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;
const StyledInput = styled.input`
  width: 90%; // 너비를 100%로 설정하여 컨테이너의 너비에 맞춤
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 20px; // 입력창 아래에 여백 추가
`;
const BoInser = () => {
  const [Board_title, setBoard_title] = useState("");
  const [Board_category, setBoard_category] = useState("자유게시판");
  const [Board_de, setBoard_de] = useState("");
  const [file, setFile] = useState(null); // 로컬에 있는 파일의 경로
  const [imageurl, setImageurl] = useState(null); // 파이어베이스 업로드 경로
  const user_id = localStorage.getItem("user_id");
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

  // 파일을 업로드 할 때
  const handleUploadClick = async () => {
    if (!file) {
      setImageurl(null); // 이미지가 선택되지 않았을 때 이미지 URL을 null로 설정
      return;
    }
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      // 파일 업로드
      await fileRef.put(file);
      console.log("파이어베이스에 파일 업로드 성공 !!!!");
      // 파이어베이스에 업로드된 사진의 URL 가져오기
      const imageurl = await fileRef.getDownloadURL();
      console.log("저장 경로 확인 : ", imageurl);
      setImageurl(imageurl); // 사진이 저장된 파이어베이스 경로
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    console.log(Board_title, Board_category, Board_de, imageurl);

    try {
      const rsp = await AxiosApi.BoInser(
        Board_title,
        Board_category,
        Board_de,
        user_id,
        imageurl
      );
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
  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const UserImage = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 5px;
    margin-top: 20px;
  `;
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
          <FileUploadContainer>
            <StyledInput type="file" onChange={handleFileInputChange} />
            <InsertBu onClick={handleUploadClick}>Upload</InsertBu>
          </FileUploadContainer>
          {imageurl && <UserImage src={imageurl} alt="uploaded" />}
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
