import axios from "axios";
// const DOMAIN = "http://localhost:8111";
const DOMAIN = "http://192.168.10.13:8111";
const LOGO = "/dooin";

const LoginAxiosApi = {
  //로그인 정보가 있으면 true
  memberLogin: async (id, pw) => {
    const login = {
      id: id,
      pw: pw,
    };
    return await axios.post(DOMAIN + LOGO + "/login", login);
  },

  //이메일로 아이디 비밀번호 찾기
  memberCertEmail: async (email, category) => {
    const findInfo = {
      email: email,
      category: category,
    };
    return await axios.post(DOMAIN + LOGO + "/certemail", findInfo);
  },
  //아이디가 있으면 true
  memberConId: async (id) => {
    return await axios.get(DOMAIN + LOGO + `/conid?id=${id}`);
  },
  //이메일이 있으면 true
  memberConEmail: async (email) => {
    return await axios.get(DOMAIN + LOGO + `/conemail?email=${email}`);
  },
  //회원가입 성공하면 true
  memberSignUp: async (id, pw, nick, birth, email, gender, profile) => {
    const SignUp = {
      id: id,
      pw: pw,
      nick: nick,
      birth: birth,
      email: email,
      gender: gender,
      profile: profile,
    };
    return await axios.post(DOMAIN + LOGO + "/signup", SignUp);
  },
  //id로 정보가져오기
  memberGetOne: async (id) => {
    return await axios.get(DOMAIN + LOGO + `/getinfo?id=${id}`);
  },
};

export default LoginAxiosApi;
