import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html, body {
  width: 100vw;
  height: 100vh;
  margin: 0;
}
`;

export default GlobalStyle;
