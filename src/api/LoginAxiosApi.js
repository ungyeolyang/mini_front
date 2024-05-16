import axios from "axios";
const DOMAIN = "http://localhost:8111";
// const DOMAIN = "http://192.168.10.13:8111";
const LOGO = "/dooin";

const LoginAxiosApi = {
  memberLogin: async (id, pw) => {
    const login = {
      id: id,
      pw: pw,
    };
    return await axios.post(DOMAIN + LOGO + "/login", login);
  },

  memberCertEmail: async (email, category) => {
    const findInfo = {
      email: email,
      category: category,
    };
    return await axios.post(DOMAIN + LOGO + "/certemail", findInfo);
  },

  memberConId: async (id) => {
    return await axios.get(DOMAIN + LOGO + `/conid?id=${id}`);
  },

  memberConEmail: async (email) => {
    return await axios.get(DOMAIN + LOGO + `/conemail?email=${email}`);
  },

  memberSignUp: async (id, pw, nick, birth, email, gender) => {
    const SignUp = {
      id: id,
      pw: pw,
      nick: nick,
      birth: birth,
      email: email,
      gender: gender,
    };
    return await axios.post(DOMAIN + LOGO + "/signup", SignUp);
  },

  memberGetOne: async (id) => {
    return await axios.get(DOMAIN + LOGO + `/getinfo?id = ${id}`);
  },
};

export default LoginAxiosApi;
