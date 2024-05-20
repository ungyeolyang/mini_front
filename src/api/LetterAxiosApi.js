import axios from "axios";
const DOMAIN = "http://localhost:8111";
// const DOMAIN = "http://192.168.10.13:8111";
const LOGO = "/dooin";

const LetterAxiosApi = {
  //id검색
  searchId: async (id) => {
    return await axios.get(DOMAIN + LOGO + `/searchid?id=${id}`);
  },
  //송신
  sendLetter: async (id, receive, title, text) => {
    const letter = {
      sender: id,
      receiver: receive,
      title: title,
      contents: text,
    };
    return await axios.post(DOMAIN + LOGO + `/sendletter`, letter);
  },
  //편지리스트
  letterList: async (id, category) => {
    const letter = {
      id: id,
      category: category,
    };
    return await axios.post(DOMAIN + LOGO + `/letterList`, letter);
  },
};

export default LetterAxiosApi;
