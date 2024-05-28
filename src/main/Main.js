import styled from "styled-components";
import { Link } from "react-router-dom";
import Right from "../component/Right";
import Paging from "../component/Paging";
import Btn from "../component/Btn";
import Recruit from "./Recruit";
import KakaoMap from "../KakaoMap";
import { useEffect, useState } from "react";
import Modal from "../component/Modal";
import MeetingAxiosApi from "../api/MeetingAxiosApi";
import Moim from "../meeting/Moim";
import MeetingDetail from "./MeetingDetail";
import { FaMagnifyingGlass } from "react-icons/fa6";
import MainAxiosApi from "../api/MainAxiosApi";

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Conta = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;
const MoimBox = styled.div`
  position: relative;
  width: 60rem;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;
const SerBox = styled.div`
  display: flex;
  align-items: center;
`;
const CategorySelect = styled.select`
  padding: 10px;
  border-radius: 4px;
  margin-right: 10px;
  width: 120px;
  height: 40px;
`;
const Cateinput = styled.input`
  width: 240px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  margin-right: 10px;
  padding-left: 10px;
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
const AbsoluteBtn = styled.button`
  position: absolute;
  right: 37px;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
  background-color: #e9edc9;
  border: 0;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: #ccd5ae;
    color: #fff;
  }
`;
const Aa = styled.div`
  position: relative;
  display: flex;
`;

const Main = () => {
  const id = localStorage.getItem("id");
  const [meeting, setMeeting] = useState();
  const [recruitOpen, setRecruitOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isDetail, setIsDetail] = useState(false);
  const [moim, setMoim] = useState();
  const [serchCategory, setserchCategory] = useState("제목");
  const [serinput, setserinput] = useState("");
  const [accept, setAccept] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [header, setHeader] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 4;
  const paginatedData = meeting?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const onClickRecruit = (e) => {
    setRecruitOpen(true);
  };
  //모집창 닫기
  const closeRecruit = () => {
    setRecruitOpen(false);
  };
  //모임창 클릭
  const onClickMoim = (props) => {
    setIsDetail(true);
    console.log(props);
    setMoim(props);
  };

  //신청여부 확인
  const conAccept = async () => {
    try {
      const rsp = await MeetingAxiosApi.conAccept(id);
      if (rsp.data) {
        setAccept(rsp.data);
      } else {
        setAccept([]);
      }
    } catch (e) {}
  };

  const meetingList = async () => {
    try {
      const rsp = await MeetingAxiosApi.meetingList();
      console.log(rsp.data);
      if (rsp.data) {
        setMeeting(rsp.data);
      } else {
        console.log("데이터를 못가지고옴");
      }
    } catch (e) {
      console.log("에러");
    }
  };

  useEffect(() => {
    meetingList();
    conAccept();
  }, [recruitOpen]);

  const handleSerinputChange = (e) => {
    setserinput(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      const rsp = await MainAxiosApi.mainsersel(serchCategory, serinput);
      const sortedData = rsp.data.sort((a, b) => b.board_no - a.board_no);
      setMeeting(sortedData); // 검색 결과를 상태에 저장
      setCurrentPage(1); // 검색 결과를 첫 페이지로 설정
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Right>
      <Container>
        <Aa>
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
              onChange={handleSerinputChange}
            />
            <InputButton onClick={handleSubmit}>
              <Inputicon>
                <FaMagnifyingGlass />
              </Inputicon>
            </InputButton>
          </SerBox>
        </Aa>

        <MoimBox>
          {meeting &&
            paginatedData.map((e) => (
              <Moim meeting={e} onClickMoim={onClickMoim} />
            ))}
        </MoimBox>
        <Conta>
          <Paging
            page={currentPage}
            itemsCountPerPage={pageSize}
            totalItemsCount={meeting?.length}
            onPageChange={handlePageChange}
            styled={{ marginleft: "100px" }}
          />
          <AbsoluteBtn onClick={onClickRecruit}>모집하기</AbsoluteBtn>
        </Conta>
      </Container>
      <Recruit
        open={recruitOpen}
        close={closeRecruit}
        category="회원 모집"
        setModalOpen={setModalOpen}
        setModalContent={setModalContent}
        setHeader={setHeader}
      ></Recruit>
      <Modal
        open={modalOpen}
        close={() => setModalOpen(false)}
        header={header}
        btn="확인"
      >
        {modalContent}
      </Modal>
      <MeetingDetail
        open={isDetail}
        close={() => setIsDetail(false)}
        moim={moim}
        accept={accept}
      ></MeetingDetail>
    </Right>
  );
};

export default Main;
