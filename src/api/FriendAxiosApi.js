import axios from "axios";
// const DOMAIN = "http://localhost:8111";
const DOMAIN = "http://192.168.10.13:8111";
const LOGO = "/dooin";

const FriendAxiosApi = {
  //친구 신청
  addFriend: async (id, userId) => {
    const friend = {
      sendId: id,
      receiveId: userId,
    };
    return await axios.post(DOMAIN + LOGO + "/addfriend", friend);
  },

  //친구 신청 여부 확인, 했으면 true
  conSend: async (id, userId) => {
    const friend = {
      sendId: id,
      receiveId: userId,
    };
    return await axios.post(DOMAIN + LOGO + "/consend", friend);
  },

  //친구 여부 확인, 친구이면 true
  conFriend: async (id, userId) => {
    const friend = {
      sendId: id,
      receiveId: userId,
    };
    return await axios.post(DOMAIN + LOGO + "/confriend", friend);
  },

  //친구 신청한 사람 list
  sendList: async (id) => {
    return await axios.get(DOMAIN + LOGO + `/sendlist?id=${id}`);
  },

  //친구 수락되면 true
  friendOk: async (id, userId) => {
    const friend = {
      sendId: userId,
      receiveId: id,
    };
    return await axios.post(DOMAIN + LOGO + `/friendOk`, friend);
  },

  //친구 거절되면 true
  delFriend: async (id, userId) => {
    const friend = {
      sendId: userId,
      receiveId: id,
    };
    return await axios.post(DOMAIN + LOGO + `/delfriend`, friend);
  },

  //내친구 list
  friendList: async (id) => {
    return await axios.get(DOMAIN + LOGO + `/friendlist?id=${id}`);
  },
};

export default FriendAxiosApi;
