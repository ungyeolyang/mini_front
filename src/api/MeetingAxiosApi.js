import axios from "axios";
const DOMAIN = "http://localhost:8111";
// const DOMAIN = "http://192.168.10.13:8111";
const LOGO = "/dooin";

const MeetingAxiosApi = {
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
};

export default MeetingAxiosApi;
