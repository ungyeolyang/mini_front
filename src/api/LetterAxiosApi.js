import axios from "axios";
const DOMAIN = "http://localhost:8111";
// const DOMAIN = "http://192.168.10.13:8111";
const LOGO = "/dooin";

const LetterAxiosApi = {
  //id검색
  searchId: async (id) => {
    return await axios.get(DOMAIN + LOGO + `/searchid?id=${id}`);
  },
};

export default LetterAxiosApi;
