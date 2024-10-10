import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
    --color-green: #2f3c43;
    --color-card-container: #37474f;
    --color-card-green: #a6b37d;
    --color-card-red: #ed9898;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
      background-color: var(--color-green);
  }
`;
