import axios from "axios";
const DOMAIN = "http://localhost:8111";
// const DOMAIN = "http://192.168.10.13:8111";
const LOGO = "/dooin";

const AxiosApi = {
  BoInser: async (board_title, board_category, board_de, user_id) => {
    const BoInser = {
      board_title: board_title,
      board_category: board_category,
      board_de: board_de,
      user_id: user_id,
    };
    return await axios.post(DOMAIN + LOGO + "/notboinsert", BoInser);
  },

  boardList: async (board_category) => {
    return await axios.get(`${DOMAIN}${LOGO}/boardsl`, {
      params: {
        board_category,
      },
    });
  },
  myboardList: async (user_id) => {
    return await axios.get(`${DOMAIN}${LOGO}/myboardsl`, {
      params: {
        user_id,
      },
    });
  },
  sersel: async (searchType, keyword) => {
    return await axios.get(`${DOMAIN}${LOGO}/sersel`, {
      params: {
        searchType,
        keyword,
      },
    });
  },
  detailapi: async (board_no) => {
    return await axios.get(`${DOMAIN}${LOGO}/detail`, {
      params: {
        board_no,
      },
    });
  },
};
export default AxiosApi;
