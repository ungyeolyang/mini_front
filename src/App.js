import GlobalStyle from "./GlobalStyle";
import Aside from "./aside/Aside";
import Login from "./login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./login/SignUp";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
