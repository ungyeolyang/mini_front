import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../component/Modal";
import { storage } from "../api/FireBase";
import AxiosApi from "../api/BoardAxiosApi";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Right from "../component/Right";

// 스타일 정의
const InserMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #fff7d6;
  margin-left: 10px;
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

const Titinput = styled.input`
  width: 100%;
  height: 45px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
`;

const TextInfo = styled.textarea`
  width: 100%;
  height: 500px;
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
  height: 38vw;
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
  top: 100px;
  right: 80px;
  width: 50%;
  overflow-y: auto;
  height: 100%;
`;

const Update = () => {
  const { board_no } = useParams();
  const { state } = useLocation();
  const [UpBoard_title, setUpBoard_title] = useState("");
  const [UpBoard_de, setUpBoard_de] = useState("");
  const [file, setFile] = useState(null);
  const [Upimageurl, setUpImageurl] = useState(null);

  const [modalContent, setModalContent] = useState("");
  const [modalHeader, setModalHeader] = useState("실패");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => setModalOpen(false);

  const handleTitleChange = (e) => setUpBoard_title(e.target.value);

  const handleContentChange = (e) => setUpBoard_de(e.target.value);

  const handleFileInputChange = (e) => setFile(e.target.files[0]);

  const handleUploadClick = async () => {
    if (!file) {
      setUpImageurl(null);
      return;
    }
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      const imageurl = await fileRef.getDownloadURL();
      setUpImageurl(imageurl);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
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

  const confirm = () => navigate(`/BoardDetail/${board_no}`);
  const handleBack = () => navigate(`/BoardDetail/${board_no}`);

  useEffect(() => {
    setUpBoard_title(state?.board_title || "");
    setUpBoard_de(state?.board_de || "");
    setUpImageurl(state?.imageurl || "");
  }, [state]);

  return (
    <>
      <Right center="center">
        <InserMainContainer>
          <ContentContainer>
            <ContentWrapper>
              <Titinput
                type="text"
                placeholder="제목"
                value={UpBoard_title}
                onChange={handleTitleChange}
              />
              <TextInfo
                placeholder="글 내용"
                value={UpBoard_de}
                onChange={handleContentChange}
              />
              <FileUploadContainer>
                <StyledInput type="file" onChange={handleFileInputChange} />
                <UploadButton onClick={handleUploadClick}>Upload</UploadButton>
              </FileUploadContainer>
              <ButtBox>
                <InsertBu onClick={handleSubmit}>수정하기</InsertBu>
                <InsertBu onClick={handleBack}>돌아가기</InsertBu>
              </ButtBox>
            </ContentWrapper>
          </ContentContainer>
        </InserMainContainer>

        <MainContainer>
          <ColorBox>
            <MainDetail>
              <DetailHearder>{UpBoard_title}</DetailHearder>
              <DetailCenter />
              {Upimageurl && <UserImage src={Upimageurl} alt="uploaded" />}
              <DetailContent>{UpBoard_de}</DetailContent>
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

export default Update;
