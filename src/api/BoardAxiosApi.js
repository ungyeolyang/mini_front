import axios from "axios";
const DOMAIN = "http://localhost:8111";
// const DOMAIN = "http://192.168.10.13:8111";
const LOGO = "/dooin";

const AxiosApi = {
  BoInser: async (board_title, board_category, board_de, user_id, imageurl) => {
    const BoInser = {
      board_title: board_title,
      board_category: board_category,
      board_de: board_de,
      user_id: user_id,
      imageurl: imageurl,
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
  // 게시글 삭제
  boardDelete: async (board_no) => {
    return await axios.delete(`${DOMAIN}${LOGO}/delete/${board_no}`);
  },
  //게시글 수정
  BoUpdate: async (UpBoard_title, board_de, imageurl, board_no) => {
    const BoUpdate = {
      board_title: UpBoard_title,
      board_de: board_de,
      imageurl: imageurl,
      board_no: board_no,
    };
    return await axios.post(DOMAIN + LOGO + "/notboupdate", BoUpdate);
  },
  BoView: async (board_no) => {
    const BoView = {
      board_no: board_no,
    };
    return await axios.post(DOMAIN + LOGO + "/upView", BoView);
  },
};
export default AxiosApi;
