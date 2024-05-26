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

const Main = () => {
  const [meeting, setMeeting] = useState();
  const [recruitOpen, setRecruitOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isDetail, setIsDetail] = useState(false);
  const [moim, setMoim] = useState();

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
      ></MeetingDetail>
    </Right>
  );
};

export default Main;
