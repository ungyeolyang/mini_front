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
  a{
    text-decoration: none;
    color:inherit;
  }

`;

export default GlobalStyle;
