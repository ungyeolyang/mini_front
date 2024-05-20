import { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [nick, setNick] = useState(
    localStorage.getItem("nick") || "닉네임을 입력해주세요."
  );

  const [imgUrl, setImgUrl] = useState(
    localStorage.getItem("imgUrl") || "이미지를 삽입하세요"
  );

  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") || "FALSE"
  );

  const [color, setColor] = useState("transparent");

  useEffect(() => {
    localStorage.setItem("nick", nick);
  }, [nick]);

  useEffect(() => {
    localStorage.setItem("imgUrl", imgUrl);
  }, [imgUrl]);

  useEffect(() => {
    localStorage.setItem("isLogin", isLogin);
  }, [isLogin]);

  return (
    <UserContext.Provider
      value={{
        nick,
        setNick,
        imgUrl,
        setImgUrl,
        isLogin,
        setIsLogin,
        color,
        setColor,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
