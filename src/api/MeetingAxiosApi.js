import axios from "axios";
const DOMAIN = "http://localhost:8111";
// const DOMAIN = "http://192.168.10.13:8111";
const LOGO = "/dooin";

const MeetingAxiosApi = {
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
  //모임 list
  meetingList: async () => {
    return await axios.get(DOMAIN + LOGO + `/meetinglist`);
  },

  //참여자 list
  memberList: async (no) => {
    return await axios.get(DOMAIN + LOGO + `/memberlist?meetingNo=${no}`);
  },
  //공지 list
  scheduleList: async (no) => {
    return await axios.get(DOMAIN + LOGO + `/schedulelist?meetingNo=${no}`);
  },
  //채팅 저장
  chat: async (id, nick, contents) => {
    const chat = {
      id: id,
      nick: nick,
      contents: contents,
    };
    return await axios.post(DOMAIN + LOGO + "/chat", chat);
  },
  //그 모임의 채팅 불러오기
  chatList: async (meetingNo) => {
    return await axios.get(DOMAIN + LOGO + `/chatlist?meetingNo=${meetingNo}`);
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
};

export default MeetingAxiosApi;
