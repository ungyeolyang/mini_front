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
`;
const MoimBox = styled.div`
  background-color: black;
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

const Main = () => {
  const [meeting, setMeeting] = useState();
  const [recruitOpen, setRecruitOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isDetail, setIsDetail] = useState(false);
  const [moim, setMoim] = useState();
  const [serchCategory, setserchCategory] = useState("제목");
  const [serinput, setserinput] = useState("");
  const [address, setAddress] = useState("");
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
    setAddress("");
  };
  //모임창 클릭
  const onClickMoim = (props) => {
    setIsDetail(true);
    console.log(props);
    setMoim(props);
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
        <Link to="/meeting">모임</Link>
        <MoimBox>
          {meeting &&
            paginatedData.map((e) => (
              <Moim meeting={e} onClickMoim={onClickMoim} />
            ))}
        </MoimBox>
        <Paging
          page={currentPage}
          itemsCountPerPage={pageSize}
          totalItemsCount={meeting?.length}
          onPageChange={handlePageChange}
        />
      </Container>
      <Btn onClick={onClickRecruit}>모집하기</Btn>
      <Recruit
        open={recruitOpen}
        close={closeRecruit}
        category="회원 모집"
        setModalOpen={setModalOpen}
        setModalContent={setModalContent}
        setHeader={setHeader}
        address={address}
        setAddress={setAddress}
      ></Recruit>
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
      ></MeetingDetail>
    </Right>
  );
};

export default Main;
