import axios from "axios";
const DOMAIN = "http://localhost:8111";
// const DOMAIN = "http://192.168.10.13:8111";
const LOGO = "/dooin";

const AxiosApi = {
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
    return await axios.post(DOMAIN + LOGO + "/certEmail", findInfo);
  },

  memberCertId: async (id) => {
    return await axios.get(DOMAIN + LOGO + `/certId?id=${id}`);
  },

  memberCertPw: async (email) => {
    return await axios.get(DOMAIN + LOGO + `/certEmail?email=${email}`);
  },
};

export default AxiosApi;
