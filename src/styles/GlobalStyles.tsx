import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body{
    margin: 0;
    background-color: #adb0b3;
  
    *:focus {
      outline: none;
      outline-width: 0;
    }
  }
`;
