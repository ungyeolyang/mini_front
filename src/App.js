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
import ImageUploader from "./mypage/ImageUploader";
import Test from "./Test";

function App() {
  return (
    <>
      <GlobalStyle />
      <UserStore>
        <Router>
          <Routes>
            yar
            <Route path="/" element={<Aside />}>
              {/* <Route index element={<ImageUploader />} /> */}
              <Route index element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/main" element={<Main />} />
              <Route path="/meeting" element={<Meeting />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/board" element={<Board />} />
              <Route path="/boarddetail" element={<BoardDetail />} />
              <Route path="/boarddetail/:board_no" element={<BoardDetail />} />
              <Route path="/letter" element={<Letter />} />
              <Route path="/boinser" element={<BoInser />} />
            </Route>
          </Routes>
        </Router>
      </UserStore>
    </>
  );
}
export default App;
