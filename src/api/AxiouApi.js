import axios from "axios";
const DOMAIN = "http://localhost:8111";

const AxiosApi = {
  memberLogin: async (id, pw) => {
    const login = {
      id: id,
      pw: pw,
    };
    return await axios.post(DOMAIN + "/auth/login", login);
  },
};

export default AxiosApi;
