import axios from "axios";
const DOMAIN = "http://localhost:8111";
// const DOMAIN = "http://192.168.10.13:8111";
const LOGO = "/dooin";

const MyAxiosApi = {
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

  chatList: async (meetingNo) => {
    return await axios.get(
      DOMAIN + LOGO + `/memberedit?meetingNo=${meetingNo}`
    );
  },
};

export default MyAxiosApi;
