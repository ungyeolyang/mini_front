import styled from "styled-components";
import Right from "../component/Right";
import InputBar from "../component/InputBar";
import Btn from "../component/Btn";
import { useContext, useEffect, useRef, useState } from "react";
import LoginAxiosApi from "../api/LoginAxiosApi";
import MyAxiosApi from "../api/MyAxiosApi";
import { UserContext } from "../context/UserStore";
import Modal from "../component/Modal";
import Profile from "../component/Profile";
import { storage } from "../api/FireBase";
import Person from "../image/사람아이콘.png";
import Title from "../component/Title";

const InContainer = styled.div`
  position: absolute;
  bottom: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 87%;
  width: 65%;
  border-top-left-radius: 85px;
  border-top-right-radius: 85px;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: 1rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid silver;
`;

const Cdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Div = styled.div`
  margin-right: ${({ type }) => (type === "gender" ? `13%` : 0)};
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  div {
    width: 4.4rem;
  }
`;

const SayHi = styled.div`
  font-size: 40px;
  padding: 2rem 2rem 1rem 2rem;
`;

const Error = styled.span`
  color: red;
  position: absolute;
  right: 0;
  font-size: 0.8rem;
  height: 1.5rem;
  padding-top: 0.2rem;
`;

const Button = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 3rem;
`;

const Pw = styled.span`
  width: ${({ curPw }) => (curPw ? `7rem` : `4.4rem`)};
  span {
    display: ${({ curPw }) => (!curPw ? "none" : "inline")};
  }
`;

const MyPage = () => {
  const id = localStorage.getItem("id");
  const inputFile = useRef(null);
  const context = useContext(UserContext);
  const { nick, setNick, setImgUrl, color, setColor } = context;
  //입력정보
  const [curPw, setCurPw] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputNick, setInputNick] = useState("");
  const [inputGender, setInputGender] = useState("비공개");
  const [inputIntro, setInputIntro] = useState("");

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  //오류 메세지
  const [curPwMessage, setCurPwMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  //유효성검사
  const [isConPw, setIsConPw] = useState(false);
  const [isPw, setIsPw] = useState(false);

  //모달창
  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [head, setHead] = useState("");

  const [member, setMember] = useState(null);

  //모달창닫기
  const closeModal = () => {
    setModalOpen(false);
    window.location.reload();
  };

  const onChangFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      console.error("파일이 선택 안됨");
    }
  };

  //비밀번호 유효성
  const onChangePw = (e) => {
    const pwRegex = /^[a-zA-Z0-9]{5,20}$/;
    const pwCurrent = e.target.value;
    setInputPw(pwCurrent);
    if (pwCurrent && !pwRegex.test(pwCurrent)) {
      setPwMessage("5~20자의 숫자,영문자,특수문자를 사용해주세요.");
      setIsPw(false);
    } else {
      setPwMessage("");
      setIsPw(true);
    }
  };
  //현재 비밀번호 확인
  const onChangeCurPw = async (e) => {
    setCurPw(e.target.value);
    try {
      const rsp = await MyAxiosApi.memberConPw(id, e.target.value);
      if (!e.target.value) {
        setCurPwMessage("");
        setIsConPw(false);
      } else if (rsp.data) {
        setCurPwMessage("");
        setIsConPw(true);
      } else {
        setCurPwMessage("현재 비밀번호를 입력해주세요");
        setIsConPw(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  //닉네임 입력
  const onChangeNick = (e) => {
    const nickCurrent = e.target.value;
    setInputNick(nickCurrent);
  };
  //성별 입력
  const onChangeGender = (e) => {
    setInputGender(e.target.value);
  };
  //자기소개 입력
  const onChangeIntro = (e) => {
    setInputIntro(e.target.value);
  };
  //프로필 클릭
  const onClickInputFile = () => {
    inputFile.current.click();
  };
  //기본프로필 클릭
  const onClickBasic = () => {
    setPreviewUrl(Person);
    setFile(null);
  };

  //프로필 수정버튼 클릭
  const onClickProfileEdit = async () => {
    const storageRef = storage.ref();
    let fileRef;

    if (file) {
      fileRef = storageRef.child(file.name);
    } else {
      fileRef = storageRef.child("basic.png");
    }

    try {
      if (file) {
        await fileRef.put(file);
        console.log("파일이 정상적으로 업로드됨");
      } else {
        const response = await fetch(Person);
        const blob = await response.blob();
        await fileRef.put(blob);
        console.log("기본 프로필이 정상적으로 업로드됨");
      }

      const url = await fileRef.getDownloadURL();
      console.log("저장경로 확인 : " + url);
      setImgUrl(url);

      const rsp = await MyAxiosApi.profileEdit(id, url);

      if (rsp.data) {
        setModalOpen(true);
        setHead("프로필 수정");
        setModalContent("프로필이 수정되었습니다.");
      } else {
        setModalOpen(true);
        setHead("오류");
        setModalContent("프로필 수정에 실패했습니다.");
      }
    } catch (e) {
      setModalOpen(true);
      setHead("오류");
      setModalContent("서버가 응답하지 않습니다.");
    }
  };

  // 수정버튼 클릭
  const onClickEdit = async () => {
    if (member) {
      const changePw = inputPw || member[0].pw;
      const changeNick = inputNick || member[0].nick;
      const changeIntro = inputIntro || member[0].introduction;

      if (isConPw && !isPw) {
        setModalOpen(true);
        setHead("오류");
        setModalContent("회원정보 수정에 실패했습니다.");
        return;
      }

      try {
        const rsp = await MyAxiosApi.memberEdit(
          id,
          changePw,
          member[0].birth,
          changeNick,
          member[0].email,
          inputGender,
          changeIntro
        );
        if (rsp.data) {
          setNick(changeNick); // 닉네임 업데이트
          setModalOpen(true);
          setHead("정보수정");
          setModalContent("회원정보를 수정했습니다.");
        } else {
          setModalOpen(true);
          setHead("오류");
          setModalContent("회원정보 수정에 실패했습니다.");
        }
      } catch (e) {
        setModalOpen(true);
        setHead("오류");
        setModalContent("서버가 응답하지 않습니다.");
      }
    }
  };

  //회원정보 가져오기
  useEffect(() => {
    const getMember = async () => {
      try {
        const rsp = await LoginAxiosApi.memberGetOne(id);
        setMember(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMember();
  }, [id, nick]);

  useEffect(() => {
    if (member && member.length > 0) {
      setInputGender(member[0].gender);
      setPreviewUrl(member[0].profile);
    }
  }, [member]);

  useEffect(() => {
    setColor("#b8d0fa");
    return () => setColor("transparent");
  }, [color]);

  return (
    <>
      {member && (
        <Right>
          <Title>마이 페이지</Title>
          <InContainer>
            <Head>
              <Cdiv style={{ paddingTop: `3rem`, gap: `1rem` }}>
                <Profile size="9rem" onClick={onClickInputFile}>
                  <img src={previewUrl} alt="프로필" />
                  <input
                    type="file"
                    onChange={onChangFile}
                    ref={inputFile}
                    hidden
                  />
                </Profile>
                <Btn onClick={onClickBasic}>기본 프로필</Btn>
              </Cdiv>
              <Cdiv>
                <SayHi>'{member[0]?.nick}'님 안녕하세요!</SayHi>
                <div>
                  <Btn onClick={onClickProfileEdit}>프로필 사진 변경</Btn>
                </div>
              </Cdiv>
            </Head>
            <Div>
              <Pw curPw={curPw}>
                <span>현재 </span>비밀번호
              </Pw>
              <InputBar
                placeholder={`*`.repeat(member[0]?.pw.length)}
                onChange={onChangeCurPw}
              />
              <Error>{curPwMessage}</Error>
            </Div>
            <Div style={{ display: !curPw && "none" }}>
              <Pw curPw={curPw}>새 비밀번호</Pw>
              <InputBar
                placeholder="새로운 비밀번호를 입력해주세요"
                onChange={onChangePw}
                disabled={!isConPw}
              />
              <Error>{pwMessage}</Error>
            </Div>
            <Div>
              <div>닉네임</div>
              <InputBar placeholder={member[0]?.nick} onChange={onChangeNick} />
            </Div>
            <Div>
              <div>생년월일</div>
              <InputBar placeholder={member[0]?.birth} disabled={true} />
            </Div>
            <Div>
              <div>이메일</div>
              <InputBar placeholder={member[0]?.email} disabled={true} />
            </Div>
            <Div type="gender">
              <div>성별</div>
              <div>
                <label htmlFor="남">남</label>
                <input
                  type="radio"
                  id="남"
                  name="gender"
                  value="남자"
                  onChange={onChangeGender}
                  checked={inputGender === "남자"}
                />
              </div>
              <div>
                <label htmlFor="여">여</label>
                <input
                  type="radio"
                  id="여"
                  name="gender"
                  value="여자"
                  onChange={onChangeGender}
                  checked={inputGender === "여자"}
                />
              </div>
              <div>
                <label htmlFor="비공개">비공개</label>
                <input
                  type="radio"
                  id="비공개"
                  name="gender"
                  value="비공개"
                  onChange={onChangeGender}
                  checked={inputGender === "비공개"}
                />
              </div>
            </Div>
            <Div>
              <div>자기소개</div>{" "}
              <InputBar
                placeholder={member[0]?.introdution}
                onChange={onChangeIntro}
              />
            </Div>
            <Button>
              <Btn onClick={onClickEdit}>정보 수정</Btn>
            </Button>
          </InContainer>
        </Right>
      )}
      <Modal open={modalOpen} close={closeModal} header={head} btn="확인">
        {modalContent}
      </Modal>
    </>
  );
};

export default MyPage;
