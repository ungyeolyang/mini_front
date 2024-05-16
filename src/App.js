import GlobalStyle from "./GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aside from "./aside/Aside";
import Login from "./login/Login";
import SignUp from "./login/SignUp";
import Main from "./main/Main";
import UserStore from "./context/UserStore";
import Meeting from "./meeting/Meeting";
import MyPage from "./mypage/MyPage";

function App() {
  return (
    <>
      <GlobalStyle />
      <UserStore>
        <Router>
          <Routes>
            <Route path="/" element={<Aside />}>
              <Route index element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/main" element={<Main />} />
              <Route path="/meeting" element={<Meeting />} />
              <Route path="/mypage" element={<MyPage />} />
            </Route>
          </Routes>
        </Router>
      </UserStore>
    </>
  );
}
export default App;
