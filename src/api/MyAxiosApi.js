import axios from "axios";
// const DOMAIN = "http://localhost:8111";
const DOMAIN = "http://192.168.10.13:8111";
const LOGO = "/dooin";

const MyAxiosApi = {
  //정보수정되면true
  memberEdit: async (id, pw, birth, nick, email, gender, intro) => {
    const member = {
      id: id,
      pw: pw,
      birth: birth,
      nick: nick,
      email: email,
      gender: gender,
      introdution: intro,
    };
    return await axios.post(DOMAIN + LOGO + "/memberedit", member);
  },
  //프로필 수정되면 true
  profileEdit: async (id, profile) => {
    const editProfile = {
      id: id,
      profile: profile,
    };
    return await axios.post(DOMAIN + LOGO + `/profileedit`, editProfile);
  },

  //비밀번호가 있으면 true
  memberConPw: async (id, pw) => {
    const memberConPw = {
      id: id,
      pw: pw,
    };
    return await axios.post(DOMAIN + LOGO + `/conpw`, memberConPw);
  },
};

export default MyAxiosApi;
