import axios from "axios";
const DOMAIN = "http://localhost:8111";
// const DOMAIN = "http://192.168.10.13:8111";
const LOGO = "/dooin";

//글쓰기
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

  //카테고리로 게시글 가져오기
  boardList: async (board_category) => {
    return await axios.get(`${DOMAIN}${LOGO}/boardsl`, {
      params: {
        board_category,
      },
    });
  },
  // 내가 쓴 글 게시판에 띄우기
  myboardList: async (user_id) => {
    return await axios.get(`${DOMAIN}${LOGO}/myboardsl`, {
      params: {
        user_id,
      },
    });
  },
  // 검색창
  sersel: async (searchType, keyword) => {
    return await axios.get(`${DOMAIN}${LOGO}/sersel`, {
      params: {
        searchType,
        keyword,
      },
    });
  },
  // 상세페이지 조회
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
  // 게시글 클릭 할때 마다 해당 게시글 조회수 증가
  BoView: async (board_no) => {
    const BoView = {
      board_no: board_no,
    };
    return await axios.post(DOMAIN + LOGO + "/upView", BoView);
  },
  // 댓글 쓰기
  CommentSu: async (inputComment, board_no, user_id) => {
    const CommentSu = {
      comment_detail: inputComment,
      board_no: board_no,
      comment_id: user_id,
    };
    return await axios.post(DOMAIN + LOGO + "/commentInsert", CommentSu);
  },
  // 댓글 띄우기
  CommentSel: async (board_no) => {
    return await axios.get(`${DOMAIN}${LOGO}/commentSel`, {
      params: {
        board_no,
      },
    });
  },
  CommentDelete: async (comment_no) => {
    return await axios.delete(`${DOMAIN}${LOGO}/commentdel/${comment_no}`);
  },
};
export default AxiosApi;
