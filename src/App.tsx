import { Routers } from "./Routers";
import { BrowserRouter } from "react-router-dom"

import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/theme/default";
import { GlobalStyle } from "./styles/global";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}