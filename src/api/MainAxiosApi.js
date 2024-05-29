import axios from "axios";
const DOMAIN = "http://localhost:8111";
// const DOMAIN = "http://192.168.10.13:8111";
const LOGO = "/dooin";

// 메인에 띄우기
const MainAxiosApi = {
  Mainsel: async () => {
    return await axios.get(`${DOMAIN}${LOGO}/mainsel`);
  },
  mainsersel: async (searchType, keyword) => {
    return await axios.get(`${DOMAIN}${LOGO}/mainsersel`, {
      params: {
        searchType,
        keyword,
      },
    });
  },
};
export default MainAxiosApi;
