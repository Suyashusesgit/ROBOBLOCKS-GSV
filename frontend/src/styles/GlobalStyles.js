import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    ${props => Object.entries(props.theme).map(([key, value]) => `${key}: ${value};`).join('\n')}
    
    --transition-fast: 0.3s ease;
    --transition-smooth: 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: radial-gradient(circle at 50% 0%, #151520 0%, #050507 100%);
    background-attachment: fixed;
    color: var(--color-text);
    font-family: var(--font-main);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: none;
    
    /* Fix layout shift */
    display: flex;
    justify-content: center;
    width: 100vw;
    min-height: 100vh;
  }

  #root {
    width: 100%;
    max-width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading, "Orbitron", sans-serif);
    font-weight: 700;
    color: var(--color-text);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #fff;
  }

  a {
    text-decoration: none;
    color: inherit;
    cursor: none;
  }

  button {
    cursor: none;
    border: none;
    outline: none;
    font-family: inherit;
  }
  
  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: var(--color-bg); 
  }
   
  ::-webkit-scrollbar-thumb {
    background: var(--color-border); 
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary); 
  }
`;
