import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :focus {
    outline: none;
    box-shadow: 0px 0px 0px 2px ${props => props.theme["green-500"]};
  }
  body {
    -webkit-font-smoothing: antialiased;
    background: ${ props => props.theme["gray-900"]};
    color: ${ props => props.theme["gray-100"]};
  }
  body, input, button {
    font-size: 1rem;
    font-weight: bold;
    font-family: 'Roboto';
  }
`