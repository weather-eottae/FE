import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  


  body {
    margin: 0;
    padding: 0;
    font-family: 'Jua', sans-serif;
    color: #000;
  
  }

  /* 다른 HTML 요소들에 대한 스타일 */
  a {
    text-decoration: none;
    color: inherit;
  }

  input textarea {
    font-family: inherit;

  }

  button {
    cursor: pointer;
  }


`;
