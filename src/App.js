import { BrowserRouter } from "react-router-dom";

import "./App.scss";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { defaultTheme } from "./themes/default.theme";
import { Router } from "./routes/Router";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
