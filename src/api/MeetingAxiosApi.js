import axios from "axios";
// const DOMAIN = "http://localhost:8111";
const DOMAIN = "http://192.168.10.13:8111";
const LOGO = "/dooin";

const MeetingAxiosApi = {
  //신청하기
  application: async (no, id, text) => {
    const meeting = {
      no: no,
      id: id,
      detail: text,
    };
    return await axios.post(DOMAIN + LOGO + "/application", meeting);
  },
  //모임 수락되면 true
  acceptOk: async (no, id) => {
    const member = {
      no: no,
      id: id,
    };
    return await axios.post(DOMAIN + LOGO + `/acceptok`, member);
  },

  //모임 거절되면 true
  delMember: async (no, id) => {
    const member = {
      no: no,
      id: id,
    };
    return await axios.post(DOMAIN + LOGO + `/delmember`, member);
  },
  //모집하기
  recruit: async (
    id,
    title,
    name,
    personnel,
    category,
    duration1,
    duration2,
    location,
    detail
  ) => {
    const meeting = {
      id: id,
      title: title,
      name: name,
      personnel: personnel,
      category: category,
      duration1: duration1,
      duration2: duration2,
      location: location,
      detail: detail,
    };
    return await axios.post(DOMAIN + LOGO + "/recruit", meeting);
  },
  //모임 신청 여부 확인, 했으면 true
  conAccept: async (id) => {
    return await axios.get(DOMAIN + LOGO + `/conaccept?id=${id}`);
  },

  //모임생성자 가입창에 추가
  master: async (id, detail) => {
    const master = {
      id: id,
      detail: detail,
    };
    return await axios.post(DOMAIN + LOGO + "/master", master);
  },

  //모임 신청자 list
  acceptList: async (id) => {
    return await axios.get(DOMAIN + LOGO + `/acceptlist?id=${id}`);
  },

  //가입한 모임 list
  myMeetingList: async (myId) => {
    return await axios.get(DOMAIN + LOGO + `/mymeetinglist?myId=${myId}`);
  },

  //모임 list
  meetingList: async () => {
    return await axios.get(DOMAIN + LOGO + `/meetinglist`);
  },

  //참여자 list
  memberList: async (no) => {
    return await axios.get(DOMAIN + LOGO + `/memberlist?meetingNo=${no}`);
  },
  //모임정보
  meetingInfo: async (no) => {
    return await axios.get(DOMAIN + LOGO + `/meetinginfo?no=${no}`);
  },

  //공지 list
  scheduleList: async (no) => {
    return await axios.get(DOMAIN + LOGO + `/schedulelist?meetingNo=${no}`);
  },
  //채팅 저장
  chat: async (meetingNo, id, contents) => {
    const chat = {
      meetingNo: meetingNo,
      id: id,
      contents: contents,
    };
    return await axios.post(DOMAIN + LOGO + "/chat", chat);
  },
  //그 모임의 채팅 불러오기
  chatList: async (no) => {
    return await axios.get(DOMAIN + LOGO + `/chatlist?no=${no}`);
  },

  //그 일정에 글쓴사람 불러오기
  writerList: async (mno, year, month) => {
    const writer = {
      mno: mno,
      year: year,
      month: month,
    };
    return await axios.post(DOMAIN + LOGO + `/writerlist`, writer);
  },
  // 공지 쓰기
  send: async (no, title, text, id, duration) => {
    const schedule = {
      mno: no,
      title: title,
      contents: text,
      id: id,
      sdate: duration,
    };
    return await axios.post(DOMAIN + LOGO + `/sendschedule`, schedule);
  },
  delSchedule: async (no) => {
    return await axios.get(DOMAIN + LOGO + `/delschedule?sno=${no}`);
  },
};

export default MeetingAxiosApi;
