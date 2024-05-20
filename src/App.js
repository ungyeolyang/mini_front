import GlobalStyle from "./GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aside from "./aside/Aside";
import Login from "./login/Login";
import SignUp from "./login/SignUp";
import Main from "./main/Main";
import UserStore from "./context/UserStore";
import Meeting from "./meeting/Meeting";
import MyPage from "./mypage/MyPage";
<<<<<<< HEAD
import Board from "./boder/Board";
import BoardDetail from "./boder/BoardDetail";
import BoInser from "./boder/BoInser";
=======
import Boders from "./boder/Boders";
import BoInser from "./boder/BoInser";
import Letter from "./letter/Letter";
import ImageUploader from "./mypage/ImageUploader";
>>>>>>> 5187d7d4cd760c81371b9fcaf061478bb73ca739

function App() {
  return (
    <>
      <GlobalStyle />
      <UserStore>
        <Router>
          <Routes>
            yar
            <Route path="/" element={<Aside />}>
              <Route index element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/main" element={<Main />} />
              <Route path="/meeting" element={<Meeting />} />
              <Route path="/mypage" element={<MyPage />} />
<<<<<<< HEAD
              <Route path="/board" element={<Board />} />
              <Route path="/boarddetail" element={<BoardDetail />} />
=======
              <Route path="/letter" element={<Letter />} />
              <Route path="/board" element={<Boders />} />
>>>>>>> 5187d7d4cd760c81371b9fcaf061478bb73ca739
              <Route path="/boinser" element={<BoInser />} />
            </Route>
          </Routes>
        </Router>
      </UserStore>
    </>
  );
}
export default App;
