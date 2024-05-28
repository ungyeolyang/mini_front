import styled from "styled-components";
import React, { useState } from "react";
import AxiosApi from "../api/BoardAxiosApi";
import Modal from "../component/Modal";
import { useNavigate } from "react-router-dom";
import { storage } from "../api/FireBase";
import Right from "../component/Right";

const InserMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #fff7d6;
  margin-left: 10px;
  @media (max-width: 720px) {
    width: 77vw;
    margin: 0;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 720px;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const RightSidebar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Titinput = styled.input`
  width: 100%;
  height: 45px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
`;

const Cabox = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
`;

const Explan = styled.h5`
  color: #333;
`;

const CategorySelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 100%;
  height: 40px;
  background-color: #fff;
`;

const InsertBu = styled.button`
  padding: 10px;
  width: 100px;
  height: 45px;
  background-color: #94b9f3;
  border: 0;
  font-weight: bold;
  border-radius: 10px;
  margin-top: 3px;
  color: #fff;
  cursor: pointer;
`;

const TextInfo = styled.textarea`
  width: 100%;
  height: 85%; /* 높이를 두 배로 */
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  padding: 10px;
  resize: none;
`;

const FileUploadContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;
`;

const UploadButton = styled(InsertBu)`
  margin-left: 10px;
`;

const UserImage = styled.img`
  max-width: 100%;
  max-height: 300px;
`;

const ButtBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;
const DetailContent = styled.p`
  font-size: 15px;
`;
const DetailHearder = styled.div`
  width: 100%;
  font-weight: bold;
  height: 40px;
  padding-top: 15px;
  font-size: 18px;
`;
const MainDetail = styled.div`
  width: 95%;
  border-radius: 50px;
  margin: 0 15px;
  margin-top: 15px;
  background-color: white;
  box-shadow: 10px 10px 20px #94b9f3;
  height: 30vw;
`;
const DetailCenter = styled.div`
  width: 80%;
  height: 60px;
  background-color: #ced4da;
  margin: 15px 40px;
  display: flex;
`;
const ColorBox = styled.div`
  width: 98%;
  height: 270px;
  background-color: #94b9f3;
  align-items: center;
  text-align: center;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 130px;
  right: 80px;
  width: 50%;
  overflow-y: auto;
  height: 100%;
  @media (max-width: 720px) {
    display: none;
  }
`;
const BoInser = () => {
  const [Board_title, setBoard_title] = useState("");
  const [Board_category, setBoard_category] = useState("자유게시판");
  const [Board_de, setBoard_de] = useState("");
  const [file, setFile] = useState(null);
  const [imageurl, setImageurl] = useState(null);
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  const [modalContent, setModalContent] = useState("");
  const [modalHeader, setModalHeader] = useState("실패");
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleTitleChange = (e) => {
    setBoard_title(e.target.value);
    console.log(Board_title);
  };

  const handleContentChange = (e) => {
    setBoard_de(e.target.value);
    console.log(Board_de);
  };

  const handleUploadClick = async () => {
    if (!file) {
      setImageurl(null);
      return;
    }
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      const imageUrl = await fileRef.getDownloadURL();
      setImageurl(imageUrl);
      // 이미지 URL 출력
      window.alert(imageUrl);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    try {
      const rsp = await AxiosApi.BoInser(
        Board_title,
        Board_category,
        Board_de,
        id,
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

  const confirm = () => {
    navigate("/Board");
  };

  const handleReset = () => {
    setBoard_title("");
    setBoard_category("자유게시판");
    setBoard_de("");
    navigate("/Board");
  };

  return (
    <>
      <Right center="center">
        <InserMainContainer>
          <ContentContainer>
            <ContentWrapper>
              <Titinput
                type="text"
                placeholder="제목"
                value={Board_title}
                onChange={handleTitleChange}
              />
              <Cabox>
                <Explan>글 종류</Explan>
                <CategorySelect
                  value={Board_category}
                  onChange={(e) => setBoard_category(e.target.value)}
                >
                  <option value="자유게시판">자유게시판</option>
                  <option value="모임 후기 게시판">모임 후기 게시판</option>
                </CategorySelect>
              </Cabox>
              <TextInfo
                placeholder="글 내용"
                value={Board_de}
                onChange={handleContentChange}
              />
              <FileUploadContainer>
                <StyledInput type="file" onChange={handleFileInputChange} />
                <UploadButton onClick={handleUploadClick}>Upload</UploadButton>
              </FileUploadContainer>
              <ButtBox>
                <InsertBu onClick={handleSubmit}>글쓰기</InsertBu>
                <InsertBu onClick={handleReset}>취소</InsertBu>
              </ButtBox>
            </ContentWrapper>
          </ContentContainer>
        </InserMainContainer>

        <MainContainer>
          <ColorBox>
            <MainDetail>
              <DetailHearder>{Board_title}</DetailHearder>
              <DetailCenter />
              {imageurl && <UserImage src={imageurl} alt="uploaded" />}
              <DetailContent>{Board_de}</DetailContent>
            </MainDetail>
          </ColorBox>
        </MainContainer>
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
export default BoInser;
