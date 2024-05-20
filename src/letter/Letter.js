import styled from "styled-components";
import Btn from "../component/Btn";
import Right from "../component/Right";
import Paging from "../component/Paging";
import Send from "./Send";
import Mail from "./Mail";
import LetterAxiosApi from "../api/LetterAxiosApi";
import { TbMailOpened, TbSend } from "react-icons/tb";
import { useEffect, useState } from "react";
import Title from "../component/Title";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 95%;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  gap: 1rem;
`;
const LetterBox = styled.div`
  display: flex;
  width: 95%;
  flex-direction: column;
  footer {
    position: relative;
    width: 100%;
  }
`;
const Div = styled.div`
  div {
  }
`;

const Letter = () => {
  const id = localStorage.getItem("id");
  const [letterOpen, setLetterOpen] = useState(false);
  const [letter, setLetter] = useState(null);
  const [category, setCategory] = useState("receive");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSend, setIsSend] = useState(false);

  const pageSize = 5;
  const paginatedData = letter?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onClickLetter = () => {
    setLetterOpen(true);
  };

  const closeLetter = () => {
    setLetterOpen(false);
    setIsSend(false);
  };

  const onSend = (props) => {
    setIsSend(props);
  };

  //보낸 편지함 클릭
  const onClickSend = () => {
    if (category !== "send") {
      setCategory("send");
      setCurrentPage(1);
    }
  };
  //받은 편지함 클릭
  const onClickReceive = () => {
    if (category !== "receive") {
      setCategory("receive");
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getLetter = async (e) => {
      try {
        const rsp = await LetterAxiosApi.letterList(id, category);
        if (rsp.data) {
          setLetter(rsp.data);
        } else {
          setLetter(null);
          console.log("데이터가 없음");
        }
      } catch (e) {
        console.log(e);
      }
    };
    getLetter();
  }, [id, category, isSend]);

  return (
    <Right>
      <Title>{category === "send" ? `보낸 ` : `받은 `} 편지함</Title>
      <Container>
        <BtnBox>
          <Btn onClick={onClickReceive}>
            <TbMailOpened />
            받은 편지함
          </Btn>
          <Btn onClick={onClickSend}>
            <TbSend />
            보낸 편지함
          </Btn>
          <Btn onClick={onClickLetter}>쪽지 쓰기</Btn>
        </BtnBox>
        <LetterBox>
          <Mail mailList={paginatedData} category={category}></Mail>
          <footer>
            <Paging
              page={currentPage}
              itemsCountPerPage={pageSize}
              totalItemsCount={letter?.length}
              onPageChange={handlePageChange}
            />
            <Div>
              <select
                defaultValue="title"
                // onChange={(e) => setserchCategory(e.target.value)}
              >
                <option value="제목">제목</option>
                <option value="작성자">작성자</option>
              </select>
              <input
                type="text"
                placeholder="검색어를 입력해 주세요"
                // onChange={handleSerinputChange}
              />
              <button>
                <FaMagnifyingGlass />
              </button>
            </Div>
          </footer>
        </LetterBox>
      </Container>
      <Send
        open={letterOpen}
        close={closeLetter}
        category="쪽지쓰기"
        onSend={onSend}
        isSend={isSend}
      ></Send>
    </Right>
  );
};

export default Letter;
