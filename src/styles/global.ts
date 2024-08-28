import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
    }

    html {
        font-size: 62.5%;
        background-color: var(--gray-2);
    }
    
    button {
      cursor: pointer !important;
    }
`;
