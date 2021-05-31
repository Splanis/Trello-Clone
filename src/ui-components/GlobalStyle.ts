import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box
    }

    body {
        background-color: ${theme.colors.light};
        font-family:  ${theme.fonts.primary};
        height: 100vh;  
    }
`;
