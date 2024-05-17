import { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [nick, setNick] = useState(
    localStorage.getItem("nick") || "닉네임을 입력해주세요."
  );

  const [imgUrl, setImgUrl] = useState(
    localStorage.getItem("imgUrl") || "이미지경로"
  );

  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") || "FALSE"
  );

  // const [member, setMember] = useState(
  //   localStorage.getItem("member") || "null"
  // );

  useEffect(() => {
    localStorage.setItem("nick", nick);
  }, [nick]);

  useEffect(() => {
    localStorage.setItem("imgUrl", imgUrl);
  }, [imgUrl]);

  useEffect(() => {
    localStorage.setItem("isLogin", isLogin);
  }, [isLogin]);

  // useEffect(() => {
  //   localStorage.setItem("member", member);
  // }, [member]);

  return (
    <UserContext.Provider
      value={{
        nick,
        setNick,
        imgUrl,
        setImgUrl,
        isLogin,
        setIsLogin,
        // member,
        // setMember,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
