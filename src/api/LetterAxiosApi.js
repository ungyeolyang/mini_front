import axios from "axios";
// const DOMAIN = "http://localhost:8111";
const DOMAIN = "http://192.168.10.13:8111";
const LOGO = "/dooin";

const LetterAxiosApi = {
  //닉네임검색
  getNick: async (id) => {
    return await axios.get(DOMAIN + LOGO + `/getnick?id=${id}`);
  },

  //id검색
  searchId: async (id) => {
    return await axios.get(DOMAIN + LOGO + `/searchid?id=${id}`);
  },

  //송신
  send: async (id, nick, receive, receiveNick, title, text) => {
    const letter = {
      sender: id,
      senderNick: nick,
      receiver: receive,
      receiverNick: receiveNick,
      title: title,
      contents: text,
    };
    return await axios.post(DOMAIN + LOGO + `/send`, letter);
  },

  delLetter: async (sno) => {
    return await axios.get(DOMAIN + LOGO + `/delletter?sno=${sno}`);
  },

  //편지리스트
  letterList: async (id, category) => {
    const letter = {
      id: id,
      category: category,
    };
    return await axios.post(DOMAIN + LOGO + `/letterList`, letter);
  },

  //편지수신
  setView: async (no) => {
    return await axios.get(DOMAIN + LOGO + `/setview?no=${no}`);
  },
};

export default LetterAxiosApi;
