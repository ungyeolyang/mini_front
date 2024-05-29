import GlobalStyle from "./GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aside from "./aside/Aside";
import Login from "./login/Login";
import SignUp from "./login/SignUp";
import Main from "./main/Main";
import UserStore from "./context/UserStore";
import Meeting from "./meeting/Meeting";
import MyPage from "./mypage/MyPage";
import Board from "./boader/Board";
import BoardDetail from "./boader/BoardDetail";
import BoInser from "./boader/BoInser";
import Letter from "./letter/Letter";
import Update from "./boader/Update";

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
              <Route path="/meeting/:no" element={<Meeting />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/board" element={<Board />} />
              <Route path="/boarddetail" element={<BoardDetail />} />
              <Route path="/boarddetail/:board_no" element={<BoardDetail />} />
              <Route path="/letter" element={<Letter />} />
              <Route path="/boinser" element={<BoInser />} />
              <Route path="/update" element={<Update />} />
              <Route path="/update/:board_no" element={<Update />} />
            </Route>
          </Routes>
        </Router>
      </UserStore>
    </>
  );
}
export default App;
