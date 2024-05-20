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
  send: async (myId, yourId, title, contents) => {
    const letter = {
      sender: myId,
      receiver: yourId,
      title: title,
      contents: contents,
    };
    return await axios.post(DOMAIN + LOGO + `/send`, letter);
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
