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
  const [isOpen, setIsOpen] = useState(false);
  const [onDisplay, setOnDisplay] = useState(false);

  useEffect(() => {
    localStorage.setItem("nick", nick);
  }, [nick]);

  useEffect(() => {
    localStorage.setItem("imgUrl", imgUrl);
  }, [imgUrl]);

  useEffect(() => {
    localStorage.setItem("isLogin", isLogin);
  }, [isLogin]);

  function formatNumber2(number) {
    return number.toString().padStart(2, "0");
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${formatNumber2(month)}-${formatNumber2(day)}`;
  };

  const formatDetailDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let hour = date.getHours();
    const minute = ("0" + date.getMinutes()).slice(-2);
    const ampm = hour < 12 ? "오전" : "오후";

    if (hour >= 12) {
      hour -= 12;
    }
    if (hour === 0) {
      hour = 12;
    }

    return `${year}-${formatNumber2(month)}-${formatNumber2(
      day
    )} ${ampm} ${hour}:${minute}`;
  };

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
        isOpen,
        setIsOpen,
        onDisplay,
        setOnDisplay,
        formatDate,
        formatDetailDate,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
