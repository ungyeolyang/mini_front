import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Modal from "../component/Modal";
import LetterAxiosApi from "../api/LetterAxiosApi";
import Btn from "../component/Btn";
import InputBar from "../component/InputBar";
import { UserContext } from "../context/UserStore";
import { storage } from "../api/FireBase";
import AxiosApi from "../api/BoardAxiosApi";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Right from "../component/Right";

const Upcon = styled.div`
  display: flex;
  flex-direction: column;
`;

const Titinput = styled.input`
  width: 25rem;
  height: 3rem;
  padding-left: 1rem;
  border: none;
  border-bottom: 0.1rem solid silver;
  &:focus {
    outline: none;
  }
`;
const TextInfo = styled.textarea`
  resize: none;
  width: 25rem;
  font-size: 0.9rem;
  min-height: 10rem;
  padding: 1rem;
  margin-top: 1rem;
  &:focus {
    outline: none;
  }
`;
const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  text-align: center;
`;
const StyledInput = styled.input`
  width: 100%; // 너비를 100%로 설정하여 컨테이너의 너비에 맞춤
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 20px; // 입력창 아래에 여백 추가
`;

const Inbox = styled.div`
  display: flex;
`;

const InsertBu = styled.button`
  padding: 10px;
  width: 100px;
  height: 45px;
  margin: 50px;
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
const UserImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 5px;
  margin-top: 20px;
`;

const Update = (props) => {
  const { board_no } = useParams();
  const { state } = useLocation();
  const [UpBoard_title, setUpBoard_title] = useState("");
  const [UpBoard_de, setUpBoard_de] = useState("");
  const [file, setFile] = useState(null);
  const [Upimageurl, setUpImageurl] = useState(null);

  const [modalContent, setModalContent] = useState("");
  const [modalHeader, setModalHeader] = useState("실패");
  const [modalOpen, setModalOpen] = useState(false); // 초기값은 닫힌 상태
  const closeModal = () => {
    // 모달을 닫는 함수
    setModalOpen(false);
  };
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setUpBoard_title(e.target.value);
  };

  const handleContentChange = (e) => {
    setUpBoard_de(e.target.value);
    console.log(UpBoard_title, UpBoard_de);
  };

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = async () => {
    if (!file) {
      setUpImageurl(null); // 이미지가 선택되지 않았을 때 이미지 URL을 null로 설정
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
      setUpImageurl(imageurl); // 사진이 저장된 파이어베이스 경로
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = async () => {
    console.log(UpBoard_title, UpBoard_de, Upimageurl, board_no);
    try {
      const rsp = await AxiosApi.BoUpdate(
        UpBoard_title,
        UpBoard_de,
        Upimageurl,
        board_no
      );
      if (rsp.data) {
        setModalOpen(true);
        setModalHeader("성공");
        setModalContent("수정 성공");
      } else {
        setModalOpen(true);
        setModalHeader("실패");
        setModalContent("수정 실패");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const confirm = () => {
    navigate(`/BoardDetail/${board_no}`);
  };
  const handleBack = () => {
    navigate(`/BoardDetail/${board_no}`);
  };
  useEffect(() => {
    setUpBoard_title(state?.board_title || "");
    setUpBoard_de(state?.board_de || "");
    setUpImageurl(state?.imageurl || "");
  }, []);

  return (
    <>
      <Right>
        <Upcon>
          <Titinput
            type="text"
            placeholder="제목"
            value={UpBoard_title}
            onChange={handleTitleChange}
          ></Titinput>
          <TextInfo
            placeholder="글 내용"
            value={UpBoard_de}
            onChange={handleContentChange}
          ></TextInfo>
          <FileUploadContainer>
            <StyledInput type="file" onChange={handleFileInputChange} />
            <InsertBu onClick={handleUploadClick} style={{ margin: "0" }}>
              Upload
            </InsertBu>
          </FileUploadContainer>
          {Upimageurl && <UserImage src={Upimageurl} alt="uploaded" />}
          <Inbox>
            <InsertBu onClick={handleSubmit}>수정하기</InsertBu>
            <InsertBu onClick={handleBack}>돌아가기</InsertBu>
          </Inbox>
        </Upcon>
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
export default Update;
